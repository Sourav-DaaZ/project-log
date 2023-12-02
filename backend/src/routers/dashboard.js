const express = require("express");
const auth = require("../middleware/auth");
const controllerObj = require("../controllers");
const router = new express.Router();

router.get("/details", auth, (req, res) => {
  const action = "user_details";
  controllerObj.controller(req, res, action);
});

module.exports = router;
