const User = require("../model/user");
const jwt = require("jsonwebtoken");
const env = require("../config/environment");

module.exports.createSession = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        message: "Invalid username or password",
      });
    }
    res.status(200).json({
      message: "Signed in successfully",
      success: true,
      
      data: {
        user: user,
        token: jwt.sign(user.toJSON(), env.secretKey, {
          expiresIn: "1h",
        }),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

module.exports.registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({
      username,
      password,
      email,
    });

    await newUser.save();

    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.registerAdmin = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({
      username,
      password,
      email,
      role: "admin",
    });

    await newUser.save();

    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
