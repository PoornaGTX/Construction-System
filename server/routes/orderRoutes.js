const express = require("express");
const {
    addToOrder
} = require("../controllers/orderControllers");

const authenticateUser = require("../middleware/auth");
const router = express.Router();

router.route("/").post(authenticateUser,addToOrder);
module.exports = router;
