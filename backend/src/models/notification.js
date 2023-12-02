const mongoose = require("mongoose");
const defaultConfig = require("../config/defaultConfig");

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    users: [{
      type: Schema.Types.ObjectId,
      ref: "UserCred",
    }],
    isAuth: {
      type: Boolean,
      default: true
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "UserCred",
      required: true,
    },
    data: {
      type: Object,
    },
    createdAt: {
      type: Date,
      expires: defaultConfig[defaultConfig.env].tempExpTime,
      default: Date.now,
    }
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
