const mongoose = require("mongoose");
const { errorCode } = require("../config/codeConfig");

const Schema = mongoose.Schema;

const clockSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "UserCred",
      require: true
    },
    checkIn: {
      type: Date,
      default: Date.now()
    },
    break: [{
      in: {
        type: Date
      },
      out: {
        type: Date
      }
    }],
    clockOut: {
      type: Date
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "UserCred",
    },
    isPending: {
      type: Boolean,
      default: false
    },
    note: {
      type: String,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    location: {
      type: String,
    },
    image: {
      type: String
    }
  },
  { timestamps: true }
);

const Clock = mongoose.model("Clock", clockSchema);

module.exports = Clock;
