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
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    contactNumber: {
      type: String,
    },
    contactAddress: {
      type: String,
    },
    age: {
      type: String,
      default: 0
    },
    gender: {
      type: String,
    },
    companyName: {
      type: String,
    },
    companyCapacity: {
      type: String,
    },
    payroll: {
      type: String,
    },
    workHr: {
      type: Number,
    },
    images: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;
