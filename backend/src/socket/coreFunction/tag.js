const config = require("../../config/defaultConfig");
const TagComments = require("../../models/tagComments");
const UserCred = require("../../models/userCred");
const Tags = require("../../models/tags");
const { DataModulePopulate, paginationChatData } = require("../../utils");

exports.addUser = (id, room, loadPage, callback) => {
  try {
    DataModulePopulate(
      TagComments.findOne({
        room_id: "tag" + room,
      }).populate({
        path: "tag comments.user",
        select: "userId",
      })
    )
      .then((data) => {
        if (data === null) {
          let varData = new TagComments();
          varData.tag = room;
          varData.room_id = "tag" + room;
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
      TagComments.findOne({
        room_id: "tag" + room,
      }).populate({
        path: "tag"
      })
    )
      .then((data) => {
        if (data === null) {
          let tempMsg = {
            msg: msg,
            image: image,
            isHidden: data?.tag?.isHidden ? data.tag.isHidden : false,
            ...(user_id && user_id.length > 1 && { user: user_id }),
            time: new Date(),
          };
          let varData = new TagComments();
          varData.tag = room;
          varData.room_id = "tag" + room;
          varData.comments = [
            {
              ...(user_id && user_id.length > 1 && { user: user_id }),
              msg: msg,
              image: image,
              isHidden: data?.tag?.isHidden ? data.tag.isHidden : false,
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
            isHidden: data?.tag?.isHidden ? data.tag.isHidden : false,
            time: new Date(),
          };
          varData.push({
            user: user_id,
            msg: msg,
            image: image,
            isHidden: data?.tag?.isHidden ? data.tag.isHidden : false,
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
