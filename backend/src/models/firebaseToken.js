const mongoose = require("mongoose");
const { errorCode } = require("../config/codeConfig");

const Schema = mongoose.Schema;

const FirebaseTokenSchema = new Schema(
  {
    token: {
      type: String,
      require: true
    },
    location: {
      type: { type: String, enum: "Point", default: "Point" },
      coordinates: { type: Array, default: [0, 0] },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "UserCred",
    },
  },
  { timestamps: true }
);
FirebaseTokenSchema.index({ location: "2dsphere" });
const FirebaseToken = mongoose.model("FirebaseToken", FirebaseTokenSchema);

module.exports = FirebaseToken;
