const User = require("../model/userModel");
const bycrypt = require("bcrypt");

//-----Login Controller-----//
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userNameCheck = await User.findOne({ username });
    if (userNameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already exists", status: false });
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

//-----Login Controller-----//
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

//-----Set avatar controller----//
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const image = req.body.image;

    const userData = await User.findByIdAndUpdate(userId, {
      isAvatar: true,
      avatar: image,
    });
    return res.json({ isSet: userData.isAvatar, image: userData.avatar });
  } catch (error) {
    next(error);
  }
};


//------all users----//
module.exports.allUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatar",
      "_id",
    ]);
    return res.json(users)
  } catch (error) {
    next(error);
  }
};
