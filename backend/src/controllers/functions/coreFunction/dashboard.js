const UserInfo = require("../../../models/userInfo");
const RegLocations = require("../../../models/regLocation");
const CategoryInfo = require("../../../models/categoryInfo");
const UserCred = require("../../../models/userCred");
const Review = require("../../../models/review");
const Notification = require("../../../models/notification");
const FirebaseToken = require("../../../models/firebaseToken");
const config = require("../../../config/defaultConfig")
const { DataModule, errorMsg, successMsg, removeKeyForReturn, DataModulePopulate, paginationData, updateToFile, getRandomFileName } = require("../../../utils");
const { userNotification } = require("../../../services/notifications");

const userUpdatePatch = (vardata, req) => {
  try {
    for (const [key, value] of Object.entries(req)) {
      if (key === "fb_link" || key === "insta_link") {
        vardata = {
          ...vardata,
          user_socials: {
            ...vardata.user_socials,
            [key]: value,
          },
        };
      } else if (["name", "profession", "categoryPreference", "gender", "enlistedCategory", "subProfession", "contactNumber", "contactAddress", "age"].includes(key)) {
        vardata[key] = value;
      }
    }
    return vardata;
  } catch (e) {
    return vardata;
  }
};

const checkUser = (x, cat) => {
  try {
    if (x.user && x.user?.userInfo && x.user.userInfo?.enlistedCategory && x.user.userInfo.enlistedCategory?.some((x) => { return x._id?.toString() === cat?.toString() })) {
      return x
    }
  } catch (e) {
    console.log(e);
  }
}

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
                  if (key === "fb_link" || key === "insta_link") {
                    data.user_socials[key] = value;
                  } else if (["name", "profession", "categoryPreference", "gender", "enlistedCategory", "subProfession", "contactNumber", "contactAddress", "age"].includes(key)) {
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

exports.userLocationUpdate = (req, res) => {
  try {
    DataModule(RegLocations, "findOne", { user: req.user._id })
      .then((data) => {
        if (data === null) {
          let userData = new RegLocations({
            user: req.user._id,
            location: {
              type: "Point",
              coordinates: [req.body.lat, req.body.long]
            }
          });
          userData.save((locationUpdateErr) => {
            if (locationUpdateErr) {
              return res.status(500).send(errorMsg(locationUpdateErr));
            }
            return res.status(200).send(successMsg(undefined, 204));
          });
        } else {
          data.location = {
            type: "Point",
            coordinates: [req.body.lat, req.body.long]
          };
          data.save((locationUpdateError) => {
            if (locationUpdateError) {
              return res.status(500).send(errorMsg(locationUpdateError));
            }
            return res.status(200).send(successMsg(undefined, 204));
          });
        }
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.categoryList = (req, res) => {
  try {
    DataModule(CategoryInfo, "find", {})
      .then((data) => {
        if (data.length === 0) {
          return res.status(404).send(errorMsg(520));
        }
        return res.status(200).send(successMsg(data, 204));
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.createCategory = (req, res) => {
  try {
    DataModule(UserCred, "findOne", { _id: req.user._id })
      .then(async (data) => {
        if (data === null) {
          return res.status(400).send(errorMsg(520));
        }
        if (data.type === 'sadmin') {
          let varData = new CategoryInfo();
          for (const [key, value] of Object.entries(req.body)) {
            if (["category_name", "description"].includes(key)) {
              varData[key] = value;
            } else if (["images"].includes(key) && value.length > 0) {
              if (value.includes('data:image')) {
                varData[key] = await updateToFile(req.user._id, value);
              } else {
                varData[key] = value
              }
            }
          }
          varData.save((error) => {
            if (error) {
              return res.status(500).send(errorMsg(error));
            }
            return res.status(200).send(successMsg(undefined, 205));
          });
        } else {
          return res.status(500).send(errorMsg(501));
        }
      })
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.editCategory = (req, res) => {
  try {
    DataModule(UserCred, "findOne", { _id: req.user._id })
      .then((data) => {
        if (data === null) {
          return res.status(400).send(errorMsg(520));
        }
        if (data.type === 'sadmin') {
          DataModule(CategoryInfo, "findOne", { _id: req.body.id })
            .then(async (data) => {
              if (data === null) {
                return res.status(400).send(errorMsg(520));
              }
              for (const [key, value] of Object.entries(req.body)) {
                if (["category_name", "description", "images"].includes(key)) {
                  data[key] = value;
                } else if (["images"].includes(key) && value.length > 0) {
                  let dataVal = [];
                  if (value?.includes('data:image')) {
                    if (data[key] && data[key]) {
                      await updateToFile(data[key], null, true);
                    }
                    dataVal.push(await updateToFile(req.user._id, x));
                  } else if (value.trim() === '') {
                    if (data[key] && data[key]) {
                      await updateToFile(data[key], null, true);
                    }
                    dataVal.push(value);
                  } else {
                    dataVal.push(value);
                  }
                  data[key] = dataVal;
                }
              }
              data.save((error) => {
                if (error) {
                  return res.status(500).send(errorMsg(error));
                }
                return res.status(200).send(successMsg(undefined, 204));
              });
            })
        } else {
          return res.status(500).send(errorMsg(501));
        }
      })
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.searchUser = (req, res) => {
  try {
    DataModulePopulate(
      UserCred.find({}).populate({
        path: 'userInfo',
        populate: {
          path: 'enlistedCategory',
          select: 'category_name'
        }
      })
    )
      .then(async (data) => {
        const datas = data.filter(function (user) {
          if ((user?.userId?.toLowerCase().indexOf(req.query.search.toLowerCase()) >= 0) || (user?.userInfo?.name.toLowerCase().indexOf(req.query.search.toLowerCase()) >= 0)) {
            return user
          }
        });
        datas.map(x => removeKeyForReturn(x));
        const pageData = await paginationData(datas, req.query.page)
        return res.status(200).send(successMsg(pageData, 201));
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.referral = (req, res) => {
  try {
    DataModule(UserInfo, "findOne", { user: req.body.user_id })
      .then((data) => {
        if (data === null) {
          return res.status(404).send(errorMsg(520));
        }
        let refData = [];
        if (data.referrals.length) {
          data.referrals.map((x) => refData.push(x.id.toString()));
        }
        if ((refData.includes(req.user._id.toString()) || req.body.user_id.toString() === req.user._id.toString())) {
          return res.status(400).send(errorMsg(524));
        } else {
          data.referrals[refData.length] = { id: req.user._id };
          data.save((referralError) => {
            if (referralError) {
              return res.status(500).send(errorMsg(referralError));
            }
            return res.status(200).send(successMsg(undefined, 204));
          });
        }
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.deleteUser = (req, res) => {
  try {
    DataModule(UserCred, "findOne", { _id: req.user._id })
      .then((data) => {
        if (data === null) {
          return res.status(404).send(errorMsg(520));
        }
        DataModule(UserInfo, "findOne", { user: req.user._id })
          .then((userData) => {
            if (userData === null) {
              return res.status(404).send(errorMsg(520));
            }
            userData.remove((userDataError) => {
              if (userDataError) {
                return res.status(500).send(errorMsg(userDataError));
              }
            });
            data.remove((dataError) => {
              if (dataError) {
                return res.status(500).send(errorMsg(dataError));
              }
            });
            return res.status(200).send(successMsg(undefined, 206));
          })
          .catch((err) => {
            return res.status(500).send(errorMsg(err));
          });
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.createReview = (req, res) => {
  try {
    let varData = [{ receiver_id: req.body.user_id }];
    if (req.body.post_id) {
      varData.push({ post_id: req.body.post_id });
      varData.push({ sender_id: req.user._id });
    } else if (req.body.booking_id) {
      varData.push({ booking_id: req.body.booking_id });
      varData.push({ sender_id: req.user._id });
    } else if (req.user._id) {
      varData.push({ sender_id: req.user._id });
      varData.push({ isPublic: req.body.isPublic });
    }

    DataModule(Review, "findOne", { $and: varData })
      .then(async (data) => {
        if (req.body.post_id && data !== null) {
          return res.status(400).send(errorMsg(526));
        } else if (req.body.booking_id && data !== null) {
          return res.status(400).send(errorMsg(526));
        }
        let varData = new Review();
        varData.receiver_id = req.body.user_id;
        varData.sender_id = req.user._id;
        varData.sender_token = req.body.token;
        for (const [key, value] of Object.entries(req.body)) {
          if (["post_id", "description", "token", "booking_id", "image", "isPublic"].includes(key)) {
            if (key === "image") {
              let dataVal = '';
              if (value.includes('data:image')) {
                dataVal = await updateToFile(req.body?.sender_id ? req.body.sender_id : getRandomFileName(''), value);
              } else {
                dataVal = value;
              }
              varData[key] = dataVal;
            } else {
              varData[key] = value;
            }
          } else if (key === "rating" && (req.body.booking_id || req.body.post_id)) {
            varData[key] = value;
          }
        }
        varData.save((dataError, dataSuccess) => {
          if (dataError) {
            return res.status(500).send(errorMsg(dataError));
          }
          const payloadData = {
            route: 'myReview',
            id: `${dataSuccess._id}`,
            auth: 'true',
            title: 'New Review: ' + `${req.body?.description}`,
            users: `${req.user._id}`
          }
          const payloadTitle = {
            'title': "New Review",
            'body': `${dataSuccess.description}`,
          }
          userNotification(req.body?.user_id, payloadTitle, payloadData, req.user._id, () => {
          })
          if (req.body.rating && Number.isInteger(req.body.rating) && req.body?.booking_id) {
            DataModule(UserInfo, "findOne", { user: req.body.user_id })
              .then((usr) => {
                if ((usr === null)) {
                  return res.status(400).send(errorMsg(527));
                }
                usr.rating.totalRating = Number(usr.rating.totalRating) + Number(req.body.rating);
                usr.rating.numberOfUser = Number(usr.rating.numberOfUser) + 1;
                usr.save((usrError) => {
                  if (usrError) {
                    return res.status(500).send(errorMsg(usrError));
                  }
                  return res.status(201).send(successMsg(undefined, 204));
                })
              })
          } else {
            return res.status(201).send(successMsg(undefined, 204));
          }
        });
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.editReview = (req, res) => {
  try {
    DataModule(Review, "findOne", { _id: req.body.id })
      .then(async (data) => {
        if ((data.sender_id.toString() === req.user._id.toString()) || (data.receiver_id.toString() === req.user._id.toString())) {
          const valRating = Number(data.rating);
          for (const [key, value] of Object.entries(req.body)) {
            if (["isPublic", "description", "image", "rating"].includes(key)) {
              if (data.sender_id.toString() === req.user._id.toString()) {
                if (key === "image") {
                  let dataVal = '';
                  if (value.includes('data:image')) {
                    if (data[key]) {
                      await updateToFile(data[key], null, true);
                    }
                    dataVal = await updateToFile(req.user._id, value);
                  } else if (value.trim() === '') {
                    if (data[key]) {
                      await updateToFile(data[key], null, true);
                    }
                    dataVal = value;
                  } else {
                    dataVal = value;
                  }
                  data[key] = dataVal;
                } else {
                  data[key] = value;
                }
              } else {
                return res.status(400).send(errorMsg(501));
              }
            }

            if (key === 'comment') {
              let varData = []
              if (data[key]) {
                varData = data[key];
              }
              varData.push({
                user: req.user._id,
                msg: req.body.comment
              })
              data.comment = varData;
            }
          }
          data.save((dataError, dataSuccess) => {
            if (dataError) {
              return res.status(500).send(errorMsg(dataError));
            }
            const payloadData = {
              route: 'myReview',
              id: `${dataSuccess._id}`,
              auth: 'true',
              title: 'Update Review: ' + `${dataSuccess?.description}`,
              users: `${req.user._id}`
            }
            const payloadTitle = {
              'title': "Update Review",
              'body': `${dataSuccess.description}`,
            }
            const uId = dataSuccess.receiver_id.toString() === req.user._id.toString() ? dataSuccess.sender_id.toString() : dataSuccess.receiver_id.toString();
            userNotification(uId, payloadTitle, payloadData, req.user._id, () => {
            })
            if (req.body.rating && Number.isInteger(req.body.rating) && data?.booking_id) {
              DataModule(UserInfo, "findOne", { user: data.receiver_id })
                .then((usr) => {
                  if ((usr === null)) {
                    return res.status(400).send(errorMsg(527));
                  }
                  usr.rating.totalRating = Number(usr.rating.totalRating) - valRating + Number(req.body.rating);
                  usr.save((usrError) => {
                    if (usrError) {
                      return res.status(500).send(errorMsg(usrError));
                    }
                    return res.status(201).send(successMsg(data, 204));
                  })
                });
            } else {
              return res.status(201).send(successMsg(data, 204));
            }
          });
        } else {
          return res.status(400).send(errorMsg(501));
        }
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.getReview = (req, res) => {
  try {
    let isPublic = true;
    if (req.query?.isPublic) {
      isPublic = req.query?.isPublic;
    }
    let my_id = [{ receiver_id: req.user._id }, { isPublic: isPublic }];
    if (req.query?.myReview) {
      my_id = [{ sender_id: req.user._id }]
    }
    DataModulePopulate(Review.find({ $and: my_id }).sort({ updatedAt: -1 }))
      .then(async (data) => {
        if (data === null) {
          return res.status(404).send(errorMsg(520));
        }
        const pageData = await paginationData(data, req.query.page)
        return res.status(200).send(successMsg(pageData, 201));
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.getReviewForOther = (req, res) => {
  try {
    DataModulePopulate(Review.find({ $and: [{ $or: [{ receiver_id: req.query.user_id }, { sender_token: req.query.token }] }, { isPublic: true }] }).sort({ createdAt: -1 }))
      .then(async (data) => {
        if (data === null) {
          return res.status(404).send(errorMsg(520));
        }
        const pageData = await paginationData(data, req.query.page)
        return res.status(200).send(successMsg(pageData, 201));
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.findReviewById = (req, res) => {
  try {
    DataModulePopulate(Review.findOne({ _id: req.query.id }))
      .then((data) => {
        if (data === null) {
          return res.status(404).send(errorMsg(520));
        }
        return res.status(200).send(successMsg(data, 204));
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      });
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
}

exports.userDetail = (req, res) => {
  try {
    DataModulePopulate(UserInfo.findOne({ user: req.query.user_id }).populate({
      path: 'user',
      select: 'userId'
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

exports.allUser = (req, res) => {
  try {
    DataModulePopulate(RegLocations.find({
      location: {
        $near: {
          $maxDistance: req.query.distance ? req.query.distance : config.defaultDistance,
          $geometry: {
            type: "Point",
            coordinates: [req.query.lat, req.query.long],
          },
        },
      }
    })
      .sort("-score")
      .populate({
        path: 'user',
        select: 'userInfo',
        populate: {
          path: 'userInfo',
          populate: {
            path: 'enlistedCategory',
          },
        },
      })
    )
      .then(async (data) => {
        if (data === null) {
          return res.status(400).send(errorMsg(520));
        } else {
          const varData = data.filter((x) => checkUser(x, req.query.category));
          const pageData = await paginationData(varData, req.query.page)
          return res.status(200).send(successMsg(pageData, 200));
        }
      })
      .catch((err) => {
        return res.status(500).send(errorMsg(err));
      })
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
