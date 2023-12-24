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
    task: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
