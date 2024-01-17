const utils = require("../../utils");
const defaultConfig = require("../../config/defaultConfig");
const appConfig = require("../../config/appConfig");

const {
  userInfo,
  userUpdate,
  createCategory,
  searchUser,
  searchProject,
  searchTask,
  deleteUser,
  firebaseToken,
  myNotification,
  findReviewById,
  updateProject,
  updateTask,
  updateClock,
  chats,
  reports
} = require("./coreFunction/dashboard");
const { IsPresent, errorMsg } = require("../../utils");
const ChatComments = require("../../models/chatComments");

exports.userDetails = function (req, res) {
  userInfo(req, res);
};

exports.detailsById = function (req, res) {
  try {
    userInfo(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.updateDetails = function (req, res) {
  try {
    userUpdate(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.createCategory = function (req, res) {
  try {
    createCategory(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.searchUser = function (req, res) {
  try {
    searchUser(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};


exports.searchProject = function (req, res) {
  try {
    searchProject(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};
exports.searchTask = function (req, res) {
  try {
    searchTask(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.findReviewById = function (req, res) {
  try {
    if (IsPresent(req.query, ["id"])) {
      return res.status(400).send(IsPresent(req.query, ["id"]));
    }
    findReviewById(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.deleteUser = function (req, res) {
  try {
    deleteUser(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.firebaseToken = function (req, res) {
  try {
    if (IsPresent(req.body, ["token", "location"])) {
      return res.status(400).send(IsPresent(req.body, ["token", "location"]));
    }
    if (IsPresent(req.body?.location, ["lat", "long"])) {
      return res
        .status(400)
        .send(IsPresent(req.body?.location, ["lat", "long"]));
    }
    firebaseToken(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.updateProject = function (req, res) {
  try {
    updateProject(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.updateTask = function (req, res) {
  try {
    if (!req.body.id && IsPresent(req.body, ["project"])) {
      return res.status(400).send(IsPresent(req.body, ["id","project"]));
    }
    updateTask(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};
exports.reports = function (req, res) {
  try {
    if (IsPresent(req.query, ["sDate", "eDate"])) {
      return res.status(400).send(IsPresent(req.query, ["sDate", "eDate"]));
    }
    if(!(utils.isValidDate(req.query.sDate) && utils.isValidDate(req.query.eDate))){
      return res.status(400).send(errorMsg('invalid date'));
    }
    reports(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.updateClock = function (req, res) {
  try {
    updateClock(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.myNotification = function (req, res) {
  try {
    myNotification(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};
exports.chats = function (req, res) {
  try {
    chats(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};
