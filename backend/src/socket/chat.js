const { userNotification } = require("../services/notifications");
const {
  sortArrayForChat,
  apiDecryptionData,
  apiEncryptionData,
  isValidObjectId,
} = require("../utils");
const { addUser, updateMsg, blockUser } = require("./coreFunction/chat");

module.exports = (io) => {
  const chatVar = "/api/chat";
  io.of(chatVar).on("connect", (socket) => {
    socket.on("join", (qData, callback) => {
      try {
        const pData = apiDecryptionData(qData);
        const room = sortArrayForChat(pData.users);
        if (
          !room &&
          isValidObjectId(pData.users[0]) &&
          isValidObjectId(pData.users[1])
        ) {
          callback({
            error: "users are invalid.",
          });
        } else {
          addUser(null, room, pData.users, null, (data) => {
            if (data.error) {
              callback({ error: data.error });
            }
            socket.join("chat" + room);
            callback({ data: data.data, isBlocked: data.isBlocked });
          });
        }
      } catch (e) {
        callback(apiEncryptionData({ error: e?.toString() }));
      }
    });

    socket.on("loadData", (qData, callback) => {
      try {
        const pData = apiDecryptionData(qData);
        const room = sortArrayForChat(pData.users);
        if (
          !room &&
          isValidObjectId(pData.users[0]) &&
          isValidObjectId(pData.users[1])
        ) {
          callback({
            error: "users are invalid.",
          });
        } else {
          addUser(socket.id, room, pData.users, pData.page, (data) => {
            if (data.error) {
              callback({ error: data.error });
            }
            callback({ data: data.data });
          });
        }
      } catch (e) {
        callback(apiEncryptionData({ error: e?.toString() }));
      }
    });

    socket.on("blockUser", (qData, callback) => {
      try {
        const pData = apiDecryptionData(qData);
        const room = sortArrayForChat(pData.users);
        if (
          !room &&
          isValidObjectId(pData.users[0]) &&
          isValidObjectId(pData.users[1])
        ) {
          callback({
            error: "users are invalid.",
          });
        } else {
          blockUser(room, pData.users, pData.isBlocked, (data) => {
            if (data.error) {
              callback({ error: data.error });
            }
            callback({ success: true });
          });
        }
      } catch (e) {
        callback(apiEncryptionData({ error: e?.toString() }));
      }
    });

    socket.on("sendMessage", (qData, callback) => {
      try {
        const pData = apiDecryptionData(qData);
        const room = sortArrayForChat(pData.users);
        if (
          !room &&
          isValidObjectId(pData.users[0]) &&
          isValidObjectId(pData.users[1])
        ) {
          callback({
            error: "users are invalid.",
          });
        } else {
          updateMsg(room, pData.users, pData.msg, pData.image, (data) => {
            if (data.error) {
              callback(apiEncryptionData({ error: data.error }));
            } else {
              io.of(chatVar)
                .in("chat" + room)
                .emit(
                  "receivedMessage",
                  apiEncryptionData({ data: data.data })
                );
              const payloadData = {
                route: "userChat",
                id: pData.my_id,
                auth: "true",
                title: "New Message: " + pData.msg,
              };
              const payloadTitle = {
                title: "New Message",
                body: pData.msg,
              };
              userNotification(
                pData.user_id,
                payloadTitle,
                payloadData,
                null,
                () => {}
              );
              callback(apiEncryptionData({ success: "success" }));
            }
          });
        }
      } catch (e) {
        callback(apiEncryptionData({ error: e?.toString() }));
      }
    });

    socket.on("close", (qData) => {
      try {
        const pData = apiDecryptionData(qData);
        const room = sortArrayForChat(pData.users);
        socket.leave("chat" + room);
        socket.disconnect();
      } catch (e) {
        console.log(e);
        socket.disconnect();
      }
    });
  });
};
