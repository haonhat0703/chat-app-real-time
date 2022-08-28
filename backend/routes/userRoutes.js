const {
  register,
  login,
  setAvatar,
  getAllUsers,
} = require("../controllers/userController");

const express = require("express");
const router = express.Router();
//POST api/auth/login
//login user
//public
router.post("/login", login);

//POST api/auth/register
//add user
//public
router.post("/register", register);

//POST api/auth/setAvatar
//add image to user
//public
router.post("/setAvatar/:id", setAvatar);

//GET api/auth/allusers
//get all user
//private
router.get("/allusers/:id", getAllUsers);

module.exports = router;
