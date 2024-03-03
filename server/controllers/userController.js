const asyncHandler = require("express-async-handler");
const UserDB = require("../models/userModel");

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
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      message: "User Created Successfully",
    });
  } else {
    res.status(500);
    throw new Error("Server error");
  }
});

module.exports = { registerUser };
