const config = require("../../config/defaultConfig");
const CategoryInfo = require("../../models/categoryInfo");
const GlobalChat = require("../../models/globalChat");
const UserCred = require("../../models/userCred");
const { DataModulePopulate, paginationChatData } = require("../../utils");

exports.addUser = (id, room, loadPage, callback) => {
  try {
    DataModulePopulate(
      GlobalChat.findOne({
        room_id: "global" + room,
      }).populate({
        path: "comments.user",
        select: "userId",
      })
    )
      .then((data) => {
        if (data === null) {
          let varData = new GlobalChat();
          varData.category = room;
          varData.room_id = "global" + room;
          varData.comments = [];
          varData.save((error, sdata) => {
            if (error) {
              callback({ error: error });
            }
            const page = loadPage !== null ? loadPage : null;
            const pageData = paginationChatData(sdata.comments, page);
            callback({ data: pageData });
          });
        } else {
          const page = loadPage !== null ? loadPage : null;
          const pageData = paginationChatData(data.comments, page);
          callback({ data: pageData });
        }
      })
      .catch((err) => {
        callback({ error: err?.toString() });
      });
  } catch (e) {
    callback({ error: e?.toString() });
  }
};

exports.updateMsg = (room, user_id, msg, image, callback) => {
  try {
    DataModulePopulate(
      GlobalChat.findOne({
        room_id: "global" + room,
      })
    )
      .then((data) => {
        if (data === null) {
          let tempMsg = {
            msg: msg,
            image: image,
            ...(user_id && user_id.length > 1 && { user: user_id }),
            time: new Date(),
          };
          let varData = new GlobalChat();
          varData.category = room;
          varData.room_id = "global" + room;
          varData.comments = [
            {
              ...(user_id && user_id.length > 1 && { user: user_id }),
              msg: msg,
              image: image,
            },
          ];
          varData.save((error) => {
            if (error) {
              callback({ error: error });
            }
            if (user_id && user_id.length > 1) {
              try {
                DataModulePopulate(
                  UserCred.findOne({
                    _id: user_id,
                  })
                ).then((sData) => {
                  tempMsg.user = {
                    _id: user_id,
                    userId: sData?.userId,
                  };
                  callback({ data: tempMsg });
                });
              } catch (e) {
                callback({ data: tempMsg });
              }
            } else {
              callback({ data: tempMsg });
            }
          });
        } else {
          let varData = data.comments;
          let tempMsg = {
            msg: msg,
            image: image,
            ...(user_id && user_id.length > 1 && { user: user_id }),
            time: new Date(),
          };
          varData.push({
            ...(user_id && user_id.length > 1 && { user: user_id }),
            msg: msg,
            image: image,
          });
          if (varData?.length > config[config.env].chatLength) {
            varData.shift();
          }
          data.comments = varData;
          data.save((error) => {
            if (error) {
              callback({ error: error });
            }
            if (user_id && user_id.length > 1) {
              try {
                DataModulePopulate(
                  UserCred.findOne({
                    _id: user_id,
                  })
                ).then((sData) => {
                  tempMsg.user = {
                    _id: user_id,
                    userId: sData?.userId,
                  };
                  callback({ data: tempMsg });
                });
              } catch (e) {
                callback({ data: tempMsg });
              }
            } else {
              callback({ data: tempMsg });
            }
          });
        }
      })
      .catch((err) => {
        callback({ error: err?.toString() });
      });
  } catch (e) {
    callback({ error: e?.toString() });
  }
};
