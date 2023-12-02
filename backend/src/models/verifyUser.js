const mongoose = require("mongoose");
const { errorCode } = require("../config/codeConfig");
const defaultConfig = require("../config/defaultConfig");

const Schema = mongoose.Schema;

const VerifyUserSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "UserCred",
      require: true
    },
    userImage: {
      type: String
    },
    userIdProof: {
      type: String
    },
    contactNumber: {
      type: String,
    },
    status: {
      type: String,
      default: defaultConfig.verifyUserOption.pending
    },
    createdAt: {
      type: Date,
      expires: defaultConfig[defaultConfig.env].expTime,
      default: Date.now,
    }
  },
  { timestamps: true }
);

const VerifyUser = mongoose.model("VerifyUser", VerifyUserSchema);

module.exports = VerifyUser;
