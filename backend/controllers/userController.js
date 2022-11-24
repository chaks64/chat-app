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
  } 
  
  catch (error) {
    next(error)
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
  
      const isPasswordValid = await bycrypt.compare(password, user.password)
      if (!isPasswordValid) {
          return res.json({ msg: "Incorrect Username or Password", status: false });
      }
      
      delete user.password;
      return res.json({ status: true, user });
    } 
    
    catch (error) {
      next(error)
    }
  };