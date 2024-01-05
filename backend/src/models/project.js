const mongoose = require("mongoose");
const { errorCode } = require("../config/codeConfig");

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
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
    image: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
