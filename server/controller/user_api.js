const User = require("../model/user");
const jwt = require("jsonwebtoken");
const env = require("../config/environment");

module.exports.createSession = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
    return res.json(200, {
      message: "Signed in successfully",
      data: {
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
