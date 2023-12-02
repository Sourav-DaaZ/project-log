const utils = require("../../utils");
const defaultConfig = require("../../config/defaultConfig");
const appConfig = require("../../config/appConfig");

const {
  userInfo,
  userUpdate,
  userLocationUpdate,
  categoryList,
  createCategory,
  searchUser,
  referral,
  getReview,
  createReview,
  deleteUser,
  userDetail,
  allUser,
  firebaseToken,
  myNotification,
  getReviewForOther,
  editReview,
  editCategory,
  findReviewById,
} = require("./coreFunction/dashboard");
const { IsPresent, errorMsg } = require("../../utils");
const ChatComments = require("../../models/chatComments");

exports.userDetails = function (req, res) {
  userInfo(req, res);
};

exports.detailsById = function (req, res) {
  try {
    if (IsPresent(req.query, ["user_id"])) {
      return res.status(400).send(IsPresent(req.query, ["user_id"]));
    }
    userDetail(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.allUser = function (req, res) {
  try {
    if (IsPresent(req.query, ["lat", "long", "category"])) {
      return res
        .status(400)
        .send(IsPresent(req.query, ["lat", "long", "category"]));
    }
    allUser(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.updateDetails = function (req, res) {
  try {
    if (
      req.body?.gender &&
      !defaultConfig.genderOption.includes(req.body.gender)
    ) {
      return res.status(400).send(errorMsg(523));
    }
    userUpdate(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.updateLocation = function (req, res) {
  try {
    if (IsPresent(req.body, ["lat", "long"])) {
      return res.status(400).send(IsPresent(req.body, ["lat", "long"]));
    }
    userLocationUpdate(req, res);
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

exports.editCategory = function (req, res) {
  try {
    if (IsPresent(req.body, ["id"])) {
      return res.status(400).send(IsPresent(req.body, ["id"]));
    }
    editCategory(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.categoryList = function (req, res) {
  try {
    categoryList(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.searchUser = function (req, res) {
  try {
    if (IsPresent(req.query, ["search"])) {
      return res.status(400).send(IsPresent(req.query, ["search"]));
    }
    searchUser(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.referral = function (req, res) {
  try {
    if (IsPresent(req.body, ["user_id"])) {
      return res.status(400).send(IsPresent(req.body, ["user_id"]));
    }
    referral(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.getReview = function (req, res) {
  try {
    getReview(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.getReviewForOther = function (req, res) {
  try {
    if (IsPresent(req.query, ["user_id"])) {
      return res.status(400).send(IsPresent(req.query, ["user_id"]));
    }
    getReviewForOther(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.createReview = function (req, res) {
  try {
    if (IsPresent(req.body, ["user_id", "description", "token"])) {
      return res
        .status(400)
        .send(IsPresent(req.body, ["user_id", "description", "token"]));
    }
    if (
      req.body?.sender_id &&
      !(req.body?.booking_id || req.body?.post_id) &&
      req.body?.user_id === req.body?.sender_id
    ) {
      return res.status(400).send(utils.errorMsg(528));
    }
    createReview(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.editReview = function (req, res) {
  try {
    if (IsPresent(req.body, ["id"])) {
      return res.status(400).send(IsPresent(req.body, ["id"]));
    }
    editReview(req, res);
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

exports.appConfig = function (req, res) {
  try {
    if (req.query.id) {
      utils
        .DataModulePopulate(
          ChatComments.find({
            $or: [
              { sender_user_id: req.query.id },
              { receiver_user_id: req.query.id },
            ],
          }).sort({ updatedAt: -1 })
        )
        .then(async (data) => {
          if (data === null) {
            return res.status(404).send(errorMsg(520));
          }
          let varChat = 0;
          data?.map((x) => {
            if (!x.viewList.includes(req.query.id.toString())) {
              varChat = varChat + 1;
            }
          });
          return res
            .status(200)
            .send(
              utils.successMsg(
                { ...appConfig[appConfig.env], chatCount: varChat },
                201
              )
            );
        })
        .catch((err) => {
          return res.status(500).send(errorMsg(err));
        });
    } else {
      return res
        .status(200)
        .send(utils.successMsg(appConfig[appConfig.env], 201));
    }
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

exports.myNotification = function (req, res) {
  try {
    myNotification(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};
