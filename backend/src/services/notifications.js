const admin = require("./firebase_config");
const FirebaseToken = require("../models/firebaseToken");
const Notification = require("../models/notification");
const {
  DataModule,
  errorMsg,
  successMsg,
  DataModulePopulate,
} = require("../utils");
const config = require("../config/defaultConfig");
const mongoose = require("mongoose");

const postNotification = async (
  registrationTokens,
  payloadTitle,
  payloadData
) => {
  const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };

  const localPayload = {
    notification: payloadTitle,
    // NOTE: The 'data' object is inside payload, not inside notification
    data: payloadData,
  };
  try {
    await admin
      .messaging()
      .sendToDevice(registrationTokens, localPayload, options)
      .then((response) => {
        return;
      });
  } catch (e) {
    console.log(e);
    return;
  }
};

const checkUserToken = (x, postData) => {
  try {
    if (
      x.user?.userInfo?.categoryPreference?.includes(postData?.category_id) &&
      x.user?.userInfo?.age <= postData?.maxAge &&
      x.user?.userInfo?.age >= postData?.minAge &&
      (postData?.genderSpecific === "all" ||
        postData?.genderSpecific === x.user?.userInfo?.gender)
    ) {
      return x;
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.searchUserForNotification = (postData, payload, callback) => {
  try {
    DataModulePopulate(
      FirebaseToken.find({
        location: {
          $near: {
            $maxDistance: config.defaultDistance,
            $geometry: payload.location,
          },
        },
      }).populate({
        path: "user",
        select: "user",
        populate: {
          path: "userInfo",
        },
      })
    )
      .then(async (data) => {
        if (data === null) {
          callback();
        }
        const varData = await data.filter((x) => checkUserToken(x, postData));
        let varDataNotification = new Notification({
          created_by: postData.owner,
          data: {
            route: "postDetails",
            id: payload.id,
            title: payload.title,
            userVisible: payload.userVisible,
          },
        });
        const tokenData = [];
        const userData = [];
        const payloadData = {
          route: "postDetails",
          id: `${payload.id}`,
          auth: "false",
        };
        const payloadTitle = {
          title: "Post: " + payload.sendTitle,
          body: payload.message,
        };
        await varData.map((x) => {
          tokenData.push(x.token);
          userData.push(x.user);
        });
        varDataNotification.users = userData;
        varDataNotification.isAuth = false;
        varDataNotification.save();
        if (tokenData.length > 0) {
          postNotification(tokenData, payloadTitle, payloadData);
        }
        callback();
      })
      .catch((err) => {
        callback();
      });
  } catch (e) {
    callback();
  }
};

module.exports.userNotification = (
  user_id,
  payload,
  payloadData,
  nCreateUser,
  callback
) => {
  try {
    DataModulePopulate(
      FirebaseToken.findOne({ user: user_id }).populate({
        path: "user",
        select: "user",
        populate: {
          path: "userInfo",
        },
      })
    )
      .then(async (data) => {
        if (nCreateUser) {
          let varDataNotification = new Notification({
            created_by: nCreateUser,
            data: payloadData,
            users: [user_id],
          });
          varDataNotification.save();
        }
        if (data === null) {
          callback();
        }
        if (data.token !== "") {
          postNotification([data.token], payload, payloadData);
        }
        callback();
      })
      .catch((err) => {
        callback();
      });
  } catch (e) {
    callback();
  }
};

module.exports.tagNotification = (
  room,
  payload,
  payloadData,
  myUser,
  callback
) => {
  try {
    
  } catch (e) {
    callback();
  }
};
