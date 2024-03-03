const asyncHandler = require("express-async-handler");
const UserDB = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide all fields");
  }
  if (password.length < 6 && password.length > 23) {
    res.status(400);
    throw new Error("Password should be 6 - 23 characters");
  }
  const userExists = await UserDB.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  //  create a new user
  const createdUser = await UserDB.create({
    name,
    email,
    password,
  });

  // return response with status and data
  if (createdUser) {
    const { _id, name, email, photo, phone, bio } = createdUser;
    // generate Token
    const token = generateToken(_id);
    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
      message: "User Created Successfully",
    });
  } else {
    res.status(500);
    throw new Error("Server error");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide an email and a password");
  }
  const user = await UserDB.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }
  // check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (user && passwordIsCorrect) {
    const { _id, name, email, photo, phone, bio } = user;
    // generate Token
    const token = generateToken(_id);
    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
      message: "User LoggedIn Successfully",
    });
  } else {
    res.status(403);
    throw new Error("Invalid email or password");
  }
});

module.exports = { registerUser, loginUser };
