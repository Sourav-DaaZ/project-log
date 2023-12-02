const config = require("../../config/defaultConfig");
const ChatComments = require("../../models/chatComments");
const { DataModulePopulate, paginationChatData } = require("../../utils");

exports.addUser = (id, room, users, loadPage, callback) => {
  try {
    DataModulePopulate(
      ChatComments.findOne({
        room_id: "chat" + room,
      }).populate("receiver_user_id")
    )
      .then((data) => {
        if (data === null) {
          if (id) {
            let varData = new ChatComments();
            varData.sender_user_id = users[0];
            varData.receiver_user_id = users[1];
            varData.room_id = "chat" + room;
            varData.viewList = [users[0]];
            varData.comments = [];
            varData.save((error, sdata) => {
              if (error) {
                callback({ error: error });
              }

              const page = loadPage !== null ? loadPage : null;
              if (sdata.comments) {
                const pageData = paginationChatData(sdata.comments, page);
                callback({ data: pageData, isBlocked: data?.isBlocked });
              } else {
                callback({ data: [], isBlocked: data?.isBlocked });
              }
            });
          } else {
            callback({ data: [] });
          }
        } else {
          let varViewList = data.viewList;
          if (!varViewList.includes(users[0])) {
            varViewList.push(users[0]);
            data.viewList = varViewList;
          }
          data.save((error, sdata) => {
            if (error) {
              callback({ error: error });
            }
            const page = loadPage !== null ? loadPage : null;
            const pageData = paginationChatData(sdata.comments, page);
            callback({ data: pageData, isBlocked: data?.isBlocked });
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

exports.updateMsg = (room, users, msg, image, callback) => {
  try {
    DataModulePopulate(
      ChatComments.findOne({
        room_id: "chat" + room,
      })
    )
      .then((data) => {
        if (data === null) {
          let tempMsg = {
            msg: msg,
            image: image,
            user: users[0],
            time: new Date(),
          };
          let varData = new ChatComments();
          varData.viewList = [users[0]];
          varData.category = room;
          varData.sender_user_id = users[0];
          varData.receiver_user_id = users[1];
          varData.room_id = "chat" + room;
          varData.comments = [
            {
              user: users[0],
              msg: msg,
              image: image,
            },
          ];
          varData.save((error) => {
            if (error) {
              callback({ error: error });
            }
            callback({ data: tempMsg });
          });
        } else if (data.isBlocked) {
          callback({ error: "Chat room is blocked!" });
        } else {
          data.viewList = [users[0]];
          let varData = data.comments;
          let tempMsg = {
            msg: msg,
            image: image,
            user: users[0],
            time: new Date(),
          };
          varData.push({
            user: users[0],
            image: image,
            msg: msg,
          });
          if (varData?.length > config[config.env].chatLength) {
            varData.shift();
          }
          data.comments = varData;
          data.save((error) => {
            if (error) {
              callback({ error: error });
            }

            callback({ data: tempMsg });
          });
        }
      })
      .catch((err) => {
        callback({ error: err });
      });
  } catch (e) {
    callback({ error: e?.toString() });
  }
};

exports.blockUser = (room, users, isBlocked, callback) => {
  try {
    DataModulePopulate(
      ChatComments.findOne({
        room_id: "chat" + room,
      }).populate("receiver_user_id")
    )
      .then((data) => {
        if (data === null) {
          if (id) {
            let varData = new ChatComments();
            varData.sender_user_id = users[0];
            varData.receiver_user_id = users[1];
            varData.room_id = "chat" + room;
            varData.viewList = [users[0]];
            varData.comments = [];
            varData.isBlocked = isBlocked;
            varData.blockedBy = users[0];
            varData.save((error, sdata) => {
              if (error) {
                callback({ error: error });
              }
              callback({ data: [] });
            });
          } else {
            callback({ data: [] });
          }
        } else if (
          (isBlocked === false &&
            data.blockedBy?.toString() === users[0]?.toString()) ||
          isBlocked
        ) {
          data.isBlocked = isBlocked;
          data.blockedBy = users[0];
          data.save((error, sdata) => {
            if (error) {
              callback({ error: error });
            }
            callback({ data: [] });
          });
        } else {
          callback({ error: "Not able to change!" });
        }
      })
      .catch((err) => {
        callback({ error: err?.toString() });
      });
  } catch (e) {
    callback({ error: e?.toString() });
  }
};
