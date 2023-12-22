const mongoose = require("mongoose");
const { errorCode } = require("../config/codeConfig");

const Schema = mongoose.Schema;

const userInfoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "UserCred",
    },
    name: {
      type: String,
      trim: true,
    },
    profession: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    contactAddress: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    age: {
      type: Number,
      default: 0
    },
    userVisibility: {
      type: Boolean,
      default: true
    },
    gender: {
      type: String,
    },
    images: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;
