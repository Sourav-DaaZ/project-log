const mongoose = require("mongoose");
const { errorCode } = require("../config/codeConfig");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      require: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "UserCred",
      require: true
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "UserCred",
      require: true
    },
    name: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
    },
    status: {
      type: String,
    },
    image: {
      type: String
    }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
