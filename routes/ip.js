const express = require("express");
const router = express.Router();

const {
    welcomeTest,
    getIPs,
    newIP } = require("../controllers/ipController");

router.route("/welcome").get(welcomeTest);
router.route("/").get(getIPs);


module.exports = router;

