const User = require("../model/userModel");
const bcrypt = require("bcrypt");

//register
module.exports.register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const usernameCheck = await User.findOne({ username });
    //check exist username
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    //check exist email
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password; //non show password
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};
//{}

//login
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    //check have username
    if (!user)
      return res.json({ msg: "Incorrect username or password", status: false });
    //verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    //check correct pass
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect username or password", status: false });
    //All good
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

//set avatar
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });

    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

//get all user
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    return res.json(users);
  } catch (error) {
    next(error);
  }
};
