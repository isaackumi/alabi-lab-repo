const express = require("express");
const router = express.Router();

const {
    welcomeTest,
    getIPs,
    IPlog,
    newIP } = require("../controllers/ipController");

router.route("/welcome").get(welcomeTest);
router.route("/").get(IPlog);


module.exports = router;

