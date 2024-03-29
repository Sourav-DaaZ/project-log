const UserInfo = require("../../../models/userInfo");
const Project = require("../../../models/project");
const Task = require("../../../models/task");
const Clock = require("../../../models/clock");
const UserCred = require("../../../models/userCred");
const Notification = require("../../../models/notification");
const FirebaseToken = require("../../../models/firebaseToken");
const { DataModule, errorMsg, successMsg, removeKeyForReturn, DataModulePopulate, paginationData, updateToFile, getRandomFileName, isValidDate } = require("../../../utils");
const { userNotification } = require("../../../services/notifications");
const ChatComments = require("../../../models/chatComments");

const userUpdatePatch = (vardata, req) => {
  try {
    for (const [key, value] of Object.entries(req)) {
      if (["name", "profession", "categoryPreference", "gender", "contactNumber", "project", "contactAddress", "age", "companyName", "companyCapacity", "payroll", "workHr"].includes(key)) {
        vardata[key] = value;
      }
    }
    return vardata;
  } catch (e) {
    return vardata;
  }
};

const commentsRemove = (data) => {
  try {
    data?.forEach((element) => {
      element.comments = element.comments[element.comments.length - 1];
    });
    return data;
  } catch (e) {
    return data;
  }
};

exports.userInfo = (req, res) => {
  try {
    DataModulePopulate(UserCred.findOne({ _id: req.user._id }).populate({
      path: 'userInfo'
    }))
      .then((data) => {
        if (data === null) {
          return res.status(400).send(errorMsg(520));
        } else {
          return res.status(200).send(successMsg(data, 201));
        }
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.userUpdate = (req, res) => {
  console.log('hii')
  try {
    DataModule(UserInfo, "findOne", { user: req.user._id })
      .then((data, tErr) => {
        if (data === null) {
          DataModule(UserCred, "findOne", { _id: req.user._id })
            .then(async (credData) => {
              if (credData === null) {
                return res.status(400).send(errorMsg(520));
              }
              let vardata = { user: req.user._id };
              vardata = userUpdatePatch(vardata, req.body);
              let userData = new UserInfo(vardata);
              if (req.body.images) {
                let dataVal = '';
                if (req.body.images.includes('data:image')) {
                  dataVal = await updateToFile(req.user._id, req.body.images);
                } else {
                  dataVal = req.body.images;
                }
                userData.images = dataVal;
              }
              userData.save((dErr) => {
                if (dErr) {
                  return res.status(400).send(errorMsg(dErr));
                }
                credData.userInfo = userData._id;
                credData.save((sErr) => {
                  if (sErr) {
                    return res.status(400).send(errorMsg(sErr));
                  }
                  return res.status(200).send(successMsg(undefined, 204));
                });
              });
            })
            .catch((err) => {
              return res.status(500).send(errorMsg(err));
            });
        } else {
          DataModule(UserCred, "findOne", { _id: req.user._id })
            .then((credData) => {
              if (credData === null) {
                return res.status(400).send(errorMsg(520));
              }
              if (credData.userInfo === null) {
                credData.userInfo = data._id;
              }
              credData.save(async (updateError) => {
                if (updateError) {
                  return res.status(500).send(errorMsg(updateError));
                }
                for (const [key, value] of Object.entries(req.body)) {
                  if (["name", "profession", "gender", "contactNumber", "contactAddress", "age", "companyName", "companyCapacity", "payroll", "workHr"].includes(key)) {
                    data[key] = value;
                  } else if (["images"].includes(key)) {
                    let dataVal = '';
                    if (value?.includes('data:image')) {
                      if (data[key]) {
                        await updateToFile(data[key], null, true);
                      }
                      dataVal = await updateToFile(req.user._id, value);
                    } else if (value?.trim() === '') {
                      if (data[key]) {
                        await updateToFile(data[key], null, true);
                      }
                      dataVal = value;
                    } else {
                      dataVal = value;
                    }
                    data[key] = dataVal;
                  }
                }
                data.save((userUpdateError) => {
                  if (userUpdateError) {
                    return res.status(500).send(errorMsg(userUpdateError));
                  }
                  return res.status(200).send(successMsg(undefined, 204));
                });
              });
            })
            .catch((err) => {
              return res.status(500).send(errorMsg(err));
            });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};


exports.firebaseToken = (req, res) => {
  try {
    let varParam = [{ token: req.body.token }];
    if (req.body.user_id) {
      varParam.push({ user: req.body.user_id })
    }
    DataModulePopulate(FirebaseToken.findOne({ $or: varParam }))
      .then((data) => {
        if (data === null) {
          let varData = new FirebaseToken();
          varData.token = req.body.token;
          if (req.body.user_id) {
            varData.user = req.body.user_id;
          }
          if (req.body.location && req.body.location.lat && req.body.location.long) {
            varData.location = {
              type: "Point",
              coordinates: [req.body.location.lat, req.body.location.long],
            }
          }
          varData.save((dataError) => {
            if (dataError) {
              return res.status(500).send(errorMsg(dataError));
            }
            return res.status(201).send(successMsg(undefined, 204));
          });
        } else {
          data.token = req.body.token;
          if (req.body.user_id) {
            data.user = req.body.user_id;
          }
          if (req.body.location && req.body.location.lat && req.body.location.long) {
            data.location = {
              type: "Point",
              coordinates: [req.body.location.lat, req.body.location.long],
            }
          }
          data.save((dataError) => {
            if (dataError) {
              return res.status(500).send(errorMsg(dataError));
            }
            return res.status(200).send(successMsg(undefined, 204));
          });
        }
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      })
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.myNotification = (req, res) => {
  try {
    let paramData = { $or: [{ isAuth: false }] };
    if (req.query?.id) {
      paramData = { $or: [{ isAuth: false }, { users: { "$in": [req.query.id] } }] };
    }
    DataModulePopulate(Notification.find(paramData).populate({
      path: 'created_by',
      select: 'userInfo',
      populate: {
        path: 'userInfo',
        select: ["name", "images"],
      },
    }).sort({ createdAt: -1 }))
      .then(async (data) => {
        if (data === null) {
          return res.status(400).send(errorMsg(520));
        } else {
          const pageData = await paginationData(data, req.query.page)
          return res.status(200).send(successMsg(pageData, 201));
        }
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      })
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.updateProject = (req, res) => {
  try {
    DataModulePopulate(Project.findOne({ _id: req.body.id }))
      .then(async (data) => {
        if (data === null) {
          if (req.body.id) {
            return res.status(400).send(errorMsg(520));
          }
          let userData = new Project();
          for (const [key, value] of Object.entries(req.body)) {
            if (["name", "details", "shift", "assignedTo", "lat", "long"].includes(key)) {
              userData[key] = value;
            } else if (req?.body?.image && key === "image") {
              let dataVal = '';
              if (req.body.image?.includes('data:image')) {
                dataVal = await updateToFile(req.user._id, req.body.image);
              } else {
                dataVal = req.body.image;
              }
              userData.image = dataVal;
            }
          }
          userData.owner = req.user._id;
          userData.save((dErr) => {
            if (dErr) {
              return res.status(400).send(errorMsg(dErr));
            }
            return res.status(200).send(successMsg(undefined, 204));
          });
        } else {
          for (const [key, value] of Object.entries(req.body)) {
            if (["name", "details", "shift", "assignedTo", "lat", "long"].includes(key)) {
              data[key] = value;
            } else if (req?.body?.image && key === "image") {
              let dataVal = '';
              if (req.body.image?.includes('data:image')) {
                dataVal = await updateToFile(req.user._id, req.body.image);
              } else {
                dataVal = req.body.image;
              }
              data.image = dataVal;
            }
          }
          data.save((dErr) => {
            if (dErr) {
              return res.status(400).send(errorMsg(dErr));
            }
            return res.status(200).send(successMsg(undefined, 204));
          });
        }
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      })
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.updateTask = (req, res) => {
  try {
    DataModulePopulate(Task.findOne({ _id: req.body.id }))
      .then(async (data) => {
        if (data === null) {
          if (req.body.id) {
            return res.status(400).send(errorMsg(520));
          }
          let userData = new Task();
          for (const [key, value] of Object.entries(req.body)) {
            if (["name", "details", "project", "assignedTo", "status", "shift"].includes(key)) {
              userData[key] = value;
            } else if (req?.body?.image && key === "image") {
              let dataVal = '';
              if (req.body.image?.includes('data:image')) {
                dataVal = await updateToFile(req.user._id, req.body.image);
              } else {
                dataVal = req.body.image;
              }
              userData.image = dataVal;
            }
          }
          userData.owner = req.user._id;
          userData.save((dErr) => {
            if (dErr) {
              return res.status(400).send(errorMsg(dErr));
            }
            return res.status(200).send(successMsg(undefined, 204));
          });
        } else {
          for (const [key, value] of Object.entries(req.body)) {
            if (["name", "details", "project", "assignedTo", "status", "shift"].includes(key)) {
              data[key] = value;
            } else if (req?.body?.image && key === "image") {
              let dataVal = '';
              if (req.body.image?.includes('data:image')) {
                dataVal = await updateToFile(req.user._id, req.body.image);
              } else {
                dataVal = req.body.image;
              }
              data.image = dataVal;
            }
          }
          data.save((dErr) => {
            if (dErr) {
              return res.status(400).send(errorMsg(dErr));
            }
            return res.status(200).send(successMsg(undefined, 204));
          });
        }
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      })
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.updateClock = (req, res) => {
  try {
    DataModulePopulate(Clock.findOne({ _id: req.body.id }))
      .then(async (data) => {
        if (data === null) {
          if (req.body.id) {
            return res.status(400).send(errorMsg(520));
          }
          let userData = new Clock();
          for (const [key, value] of Object.entries(req.body)) {
            if (["checkIn", "clockOut", "manager", "isPending", "task", "project"].includes(key)) {
              userData[key] = value;
            } else if (["image"].includes(key)) {
              let dataVal = '';
              if (value?.includes('data:image')) {
                if (userData[key]) {
                  await updateToFile(userData[key], null, true);
                }
                dataVal = await updateToFile(req.user._id, value);
              } else if (value?.trim() === '') {
                if (userData[key]) {
                  await updateToFile(userData[key], null, true);
                }
                dataVal = value;
              } else {
                dataVal = value;
              }
              userData[key] = dataVal;
            } else if (["break"].includes(key)) {
              userData[key] = [req.body.break]
            }
          }
          userData.owner = req.user._id;
          userData.save((dErr) => {
            if (dErr) {
              return res.status(400).send(errorMsg(dErr));
            }
            return res.status(200).send(successMsg(undefined, 205));
          });
        } else {
          for (const [key, value] of Object.entries(req.body)) {
            if (["checkIn", "clockOut", "manager", "isPending", "task", "project"].includes(key)) {
              data[key] = value;
            } else if (["image"].includes(key)) {
              let dataVal = '';
              if (value?.includes('data:image')) {
                if (data[key]) {
                  await updateToFile(data[key], null, true);
                }
                dataVal = await updateToFile(req.user._id, value);
              } else if (value?.trim() === '') {
                if (data[key]) {
                  await updateToFile(data[key], null, true);
                }
                dataVal = value;
              } else {
                dataVal = value;
              }
              data[key] = dataVal;
            } else if (["break"].includes(key)) {
              let varVal = [...data[key], req.body.break]
              data[key] = varVal
            }
          }
          data.save((dErr, sdata) => {
            if (dErr) {
              return res.status(400).send(errorMsg(dErr));
            }
            return res.status(200).send(successMsg({id: sdata._id}, 204));
          });
        }
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      })
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.searchUser = (req, res) => {
  try {
    DataModulePopulate(UserCred.find(req.query.id ? { manager: req.query.id } : {}).populate({
      path: 'userInfo',
      populate: {
        path: "user",
        select: "userId email manager type",
      },
    }))
      .then(async (data) => {
        if (data === null) {
          return res.status(400).send(errorMsg(520));
        } else {
          return await res.status(200).send(successMsg(data, 201));
        }
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};


exports.searchProject = (req, res) => {
  try {
    DataModulePopulate(Project.find({ $or: [{ assignedTo: req?.user?._id }, { owner: req?.user?._id }] }))
      .then(async (data) => {
        if (data === null) {
          return res.status(400).send(errorMsg(520));
        } else {
          return await res.status(200).send(successMsg(data, 201));
        }
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};



exports.searchTask = (req, res) => {
  try {
    DataModulePopulate(Task.find(req.query.id ? { project: req.query.id } : { owner: req?.user?._id }))
      .then(async (data) => {
        if (data === null) {
          return res.status(400).send(errorMsg(520));
        } else {
          return await res.status(200).send(successMsg(data, 201));
        }
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(e));
  }
};

exports.chats = (req, res) => {
  try {
    DataModulePopulate(
      ChatComments.find({
        $or: [
          { sender_user_id: req.user._id },
          { receiver_user_id: req.user._id },
        ],
      })
        .populate({
          path: "sender_user_id receiver_user_id",
          select: "userId",
          populate: {
            path: "userInfo",
            populate: {
              path: "user",
              select: "userId",
            },
          },
        })
        .sort({ updatedAt: -1 })
    )
      .then(async (data) => {
        if (data === null) {
          return res.status(404).send(errorMsg(520));
        }
        let pageData = data;
        if (req.query.page) {
          pageData = await paginationData(data, req.query.page);
        }
        const varData = commentsRemove(pageData);
        return res.status(200).send(successMsg(varData, 204));
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};



exports.reports = (req, res) => {
  try {
    DataModulePopulate(
      Clock.find({ $and: [{ "checkIn.time": { 
        $gte: req.query.sDate
        ,$lte: req.query.eDate 
      }}, { owner: req.query.id ? req.query.id : req.user._id }] })
    )
      .then(async (data) => {
        if (data === null) {
          return res.status(404).send(errorMsg(520));
        }
        data?.map((x, i) => {
          let varTime = (isValidDate(x?.clockOut?.time) ? new Date(x?.clockOut?.time) : 0) - (isValidDate(x?.checkIn?.time) ? new Date(x?.checkIn?.time) : 0);
          x?.break?.map((y, i) => {
            varTime = varTime - ((isValidDate(y?.out) ? new Date(y?.out) : 0) - (isValidDate(y?.in) ? new Date(y?.in) : 0))
          })
          x._doc.workHr = Math.ceil(Number(varTime) / (1000 * 60 * 60 * 24));
        })
        return res.status(200).send(successMsg(data, 204));
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    console.log(e)
    return res.status(500).send(errorMsg(e));
  }
};


