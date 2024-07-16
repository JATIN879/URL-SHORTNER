const express = require("express");
const router = express.Router();
const {userSignUp,userlogin} = require("../controllers/user")

router.post("/",userSignUp);
router.post("/login",userlogin);


module.exports = router;