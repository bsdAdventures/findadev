const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");
const { User } = require("../../models");
const {
  validateRegistration,
  validateLogin
} = require("../../helper/validation");

// @route 			GET api/users/register
// @description		register user
// @access 			public

router.post("/register", async (req, res, next) => {
  const { email, name, password } = req.body;
  const saltRounds = 10;
  // destructred validation helper function take req.body as param
  //to validate data from client
  const { errors, isValid } = validateRegistration(req.body);

  //if req is not valid send status 400
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    //check if user exits
    const findUser = await User.findOne({ email });

    if (findUser) {
      //if user exits return status 400

      //add error to errors object and return to client
      errors.email = "Email already exisits";
      return res.status(400).json(errors);
    } else {
      //get avatar
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      //hash password
      const hashPassword = await bcrypt.hash(password, saltRounds);
      //create moongoose user object with hashed password
      const newUser = new User({
        name,
        email,
        avatar,
        password: hashPassword
      });
      //save to db
      const savedUser = await newUser.save();
      res.json(savedUser);
    }
  } catch (error) {
    console.log(error, "registration error");
    return res
      .status(400)
      .json({ status: 400, message: "Registration was Unsuccesfull" });
    // return next(error)
  }
});

// @route 			GET api/users/login
// @description		login user / return JWT TOKEN
// @access 			public

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  // destructred validation helper function take req.body as param
  //to validate data from client
  const { errors, isValid } = validateLogin(req.body);

  //if req is not valid send status 400
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    //check if user is registered
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      //if existing user not found respond with status 400

      //add error to errors object and return to client
      errors.email = "User was not found";
      return res.status(404).json(errors);
    }

    //compare entered password and sstored password
    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (matchedPassword) {
      //destructure user found
      const { id, name, avatar, email } = existingUser;
      //create token with user data - secretkey and expiratiom time
      const token = jwt.sign({ id, name, avatar, email }, keys.secretKey, {
        expiresIn: 3600 * 2
      });
      //respond to client with token
      res.json({ success: true, token: `Bearer ${token}` });
    } else {
      //password compare failed - send response to client
      //add error to errors object and return to client

      errors.password = "Email or Password is incorrect";
      return res.status(400).json(errors);
    }
  } catch (error) {
    console.log(error, "login error");
    return res
      .status(400)
      .json({ status: 400, message: "Invalid username or password" });
    // return next(error)
  }
});

module.exports = router;
