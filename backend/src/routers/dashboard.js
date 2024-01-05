const express = require("express");
const auth = require("../middleware/auth");
const controllerObj = require("../controllers");
const router = new express.Router();


router.get("/details", auth, (req, res) => {
  const action = "user_details";
  controllerObj.controller(req, res, action);
});

router.get("/user_details", auth, (req, res) => {
  const action = "details_by_id";
  controllerObj.controller(req, res, action);
});

router.patch("/update_details", auth, (req, res) => {
  const action = "update_details";
  controllerObj.controller(req, res, action);
});

router.patch("/update_project", auth, (req, res) => {
  const action = "update_project";
  controllerObj.controller(req, res, action);
});

router.patch("/update_task", auth, (req, res) => {
  const action = "update_task";
  controllerObj.controller(req, res, action);
});

router.patch("/update_clock", auth, (req, res) => {
  const action = "update_clock";
  controllerObj.controller(req, res, action);
});

router.get("/users", (req, res) => {
  const action = "search_user";
  controllerObj.controller(req, res, action);
});
router.delete("/delete_user", auth, (req, res) => {
  const action = "delete_user";
  controllerObj.controller(req, res, action);
});

router.post("/firebase_token", (req, res) => {
  const action = "firebase_token";
  controllerObj.controller(req, res, action);
});

router.get("/my_notification", (req, res) => {
  const action = "my_notification";
  controllerObj.controller(req, res, action);
});
router.get("/search_project", auth, (req, res) => {
  const action = "search_project";
  controllerObj.controller(req, res, action);
});

router.get("/search_task", auth, (req, res) => {
  const action = "search_task";
  controllerObj.controller(req, res, action);
});


module.exports = router;
