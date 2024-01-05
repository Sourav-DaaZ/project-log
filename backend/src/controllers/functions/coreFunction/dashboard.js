const UserInfo = require("../../../models/userInfo");
const Project = require("../../../models/project");
const Task = require("../../../models/task");
const Clock = require("../../../models/clock");
const UserCred = require("../../../models/userCred");
const Notification = require("../../../models/notification");
const FirebaseToken = require("../../../models/firebaseToken");
const { DataModule, errorMsg, successMsg, removeKeyForReturn, DataModulePopulate, paginationData, updateToFile, getRandomFileName } = require("../../../utils");
const { userNotification } = require("../../../services/notifications");

const userUpdatePatch = (vardata, req) => {
  try {
    for (const [key, value] of Object.entries(req)) {
      if (["name", "profession", "categoryPreference", "gender", "contactNumber", "contactAddress", "age", "companyName", "companyCapacity", "payroll", "workHr"].includes(key)) {
        vardata[key] = value;
      }
    }
    return vardata;
  } catch (e) {
    return vardata;
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
          if (data?.userInfo) {
            let varData = data.userInfo;
            varData._doc.type = data.type;
            varData._doc.userId = data.userId;
            return res.status(200).send(successMsg(varData, 201));
          } else {
            var varData = {};
            varData.user = data._id;
            varData.type = data.type;
            return res.status(200).send(successMsg(varData, 201));
          }
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
          let userData = new Project();
          for (const [key, value] of Object.entries(req.body)) {
            if (["name", "details", "shift", "location", "assignedTo"].includes(key)) {
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
            if (["name", "details", "shift", "location", "assignedTo"].includes(key)) {
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
          let userData = new Task();
          for (const [key, value] of Object.entries(req.body)) {
            if (["name", "details", "project", "assignedTo", "status"].includes(key)) {
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
            if (["name", "details", "project", "assignedTo", "status"].includes(key)) {
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
          let userData = new Clock();
          for (const [key, value] of Object.entries(req.body)) {
            if (["checkIn", "clockOut", "manager", "isPending", "task", "project", "location"].includes(key)) {
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
            if (["checkIn", "clockOut", "manager", "isPending", "task", "project", "location"].includes(key)) {
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

exports.searchUser = (req, res) => {
  try {
    DataModulePopulate(UserCred.find(req.query.id ? { manager: req.query.id } : {}).populate({
      path: 'userInfo'
    }))
      .then(async (data) => {
        if (data === null) {
          return res.status(400).send(errorMsg(520));
        } else {
          let UData = [];
          data?.map((x, i) => {
            let varData = {};
            if (x?.userInfo) {
              varData = x.userInfo;
              varData._doc.type = x.type;
              varData._doc.userId = x.userId;
              varData._doc.manager = x.manager;
            } else {
              varData.user = x._id;
              varData.type = x.type;
              varData.manager = x.manager;
            }
            UData.push(varData);
          })
          return await res.status(200).send(successMsg(UData, 201));
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


