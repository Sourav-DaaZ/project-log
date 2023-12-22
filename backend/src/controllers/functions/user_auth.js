const {
  loginPasswordUser,
  loginOtpUser,
  emailCheck,
  registerUser,
  userCheck,
  requestForChangePassword,
  changePassword,
  userIDCheck,
  logoutUser,
  socialLogin,
  changeUserid,
  verifyUserList,
  requestedForUserVerification,
  actionUserVerification
} = require("./coreFunction/user_auth");

const { IsPresent, ApiValidationArr, errorMsg } = require("../../utils");
const { verifyUserOption } = require("../../config/defaultConfig");

// -------------------------------------  otp sent  -------------------------------------

exports.userVerification = function (req, res) {
  try {
    if (!(!IsPresent(req.body, ["userId"]))) {
      return res.status(400).send(IsPresent(req.body, ["userId"]));
    }
    userIDCheck(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.userIdCheck = function (req, res) {
  try {
    if (IsPresent(req.body, ["userId"])) {
      return res.status(400).send(IsPresent(req.body, ["userId"]));
    }
    userCheck(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.registerUser = function (req, res) {
  try {
    if (IsPresent(req.body, ["otp", "userId", "password"])) {
      return res.status(400).send(IsPresent(req.body, ["otp", "userId", "password"]));
    }
    registerUser(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.loginUser = function (req, res) {
  try {
    const errorIndex = ApiValidationArr([
      IsPresent(req.body, ["userId"]),
      req.body.otp && req.body.password,
      !req.body.otp && !req.body.password,
      !req.body.otp && req.body.password,
      req.body.otp && !req.body.password,
    ]);
    switch (errorIndex) {
      case 0:
        return res.status(400).send(IsPresent(req.body, ["userId"]));

      case 1:
        return res.status(400).send(errorMsg(513));

      case 2:
        return res.status(400).send(errorMsg(514));

      case 3:
        loginPasswordUser(req, res);

        break;

      case 4:
        loginOtpUser(req, res);
        break;

      default:
        return res.status(500).send(errorMsg(505));
    }
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.requestForChangePassword = function (req, res) {
  try {
    if (IsPresent(req.body, ["userId"])) {
      return res.status(400).send(IsPresent(req.body, ["userId"]));
    }
    requestForChangePassword(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.logoutUser = function (req, res) {
  try {
    logoutUser(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.changePassword = function (req, res) {
  try {
    if (IsPresent(req.body, ["password", "user", "otp"])) {
      return res.status(400).send(IsPresent(req.body, ["password", "user", "otp"]));
    }
    changePassword(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.socialLogin = function (req, res) {
  try {
    if (IsPresent(req.body, ["fbId"]) && IsPresent(req.body, ["googleId"])) {
      return res.status(400).send(IsPresent(req.body, ["fbId", "googleId"]));
    }
    socialLogin(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.changeUserid = function (req, res) {
  try {
    if (IsPresent(req.body, ["userId"])) {
      return res.status(400).send(IsPresent(req.body, ["userId"]));
    }
    changeUserid(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.verifyUserList = function (req, res) {
  try {
    verifyUserList(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.requestedForUserVerification = function (req, res) {
  try {
    if (IsPresent(req.body, ["userImage", "userIdProof", "contactNumber"])) {
      return res.status(400).send(IsPresent(req.body, ["userImage", "userIdProof", "contactNumber"]));
    }
    requestedForUserVerification(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};

exports.actionUserVerification = function (req, res) {
  try {
    if (IsPresent(req.body, ["status", "id"])) {
      return res.status(400).send(IsPresent(req.body, ["user", "id"]));
    }
    if (!verifyUserOption[req.body.status]) {
      return res.status(400).send(errorMsg(523));
    }
    actionUserVerification(req, res);
  } catch (e) {
    return res.status(500).send(errorMsg(505));
  }
};
