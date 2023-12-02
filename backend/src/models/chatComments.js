const mongoose = require("mongoose");
const { errorCode } = require("../config/codeConfig");
const defaultConfig = require("../config/defaultConfig");

const Schema = mongoose.Schema;

const ChatCommentsSchema = new Schema(
  {
    sender_user_id: {
      type: Schema.Types.ObjectId,
      ref: "UserCred",
    },
    receiver_user_id: {
      type: Schema.Types.ObjectId,
      ref: "UserCred",
    },
    room_id: {
      type: String
    },
    viewList: {
      type: Array
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    blockedBy: {
      type: Schema.Types.ObjectId,
      ref: "UserCred",
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "UserCred",
        },
        msg: {
          type: String,
          trim: true,
        },
        image: {
          type: String,
        },
        time: {
          type: Date,
          default: Date.now,
        }
      },
    ],
    createdAt: {
      type: Date,
      expires: defaultConfig[defaultConfig.env].expTime,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const ChatComments = mongoose.model("ChatComments", ChatCommentsSchema);

module.exports = ChatComments;
