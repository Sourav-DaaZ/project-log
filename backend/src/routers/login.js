const express = require("express");
const corsOrigin = require("../middleware/cors");
const controllerObj = require("../controllers");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/v1/user_varification", async (req, res) => {
  const action = "user_verification";
  controllerObj.controller(req, res, action);
});

router.post("/v1/register_user", async (req, res) => {
  const action = "register_user";
  controllerObj.controller(req, res, action);
});

router.post("/v1/login", async (req, res) => {
  const action = "login_user";
  controllerObj.controller(req, res, action);
});

router.post("/v1/logout", auth, async (req, res) => {
  const action = "logout_user";
  controllerObj.controller(req, res, action);
});

router.post("/v1/refresh_token", async (req, res) => {
  const action = "refresh_token";
  controllerObj.controller(req, res, action);
});

router.post("/v1/check_username", async (req, res) => {
  const action = "verify_username";
  controllerObj.controller(req, res, action);
});

router.post("/v1/user_id_check", async (req, res) => {
  const action = "user_id_check";
  controllerObj.controller(req, res, action);
});

router.post("/v1/social_login", async (req, res) => {
  const action = "social_login";
  controllerObj.controller(req, res, action);
});

router.post("/v1/request_for_change_password", async (req, res) => {
  const action = "request_for_change_password";
  controllerObj.controller(req, res, action);
});

router.post("/v1/change_userid", auth, async (req, res) => {
  const action = "change_userid";
  controllerObj.controller(req, res, action);
});

// router.post("/v1/change_password/*", async (req, res) => {
//   const action = "change_password";
//   controllerObj.controller(req, res, action);
// });

router.post("/v1/change_password", async (req, res) => {
  const action = "change_password";
  controllerObj.controller(req, res, action);
});

router.get("/v1/verify_user_list", auth, async (req, res) => {
  const action = "verify_user_list";
  controllerObj.controller(req, res, action);
});

router.post("/v1/requested_for_user_verification", auth, async (req, res) => {
  const action = "requested_for_user_verification";
  controllerObj.controller(req, res, action);
});

router.post("/v1/action_user_verification", auth, async (req, res) => {
  const action = "action_user_verification";
  controllerObj.controller(req, res, action);
});

module.exports = router;
