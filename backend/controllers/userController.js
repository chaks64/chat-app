const User = require("../model/userModel");
const bycrypt = require("bcrypt");

module.exports.register = async (req, res, nex) => {
  console.log(req.body);
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
      password,
    });
    delete user.password;
    return res.json({ status: true, user });
  } 
  
  catch (error) {
    next(error)
  }
};
