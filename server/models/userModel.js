const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userDBSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    password: {
      type: String,
      required: [true, "Please add a Password"],
      minLength: [6, "Password must be at least 6 characters"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email address",
        // this is the regular expression to validate
      ],
    },
    photo: {
      type: String,
      required: [true, "Please add a photo to your account"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "+91",
    },
    bio: {
      type: String,
      maxLength: [250, "Bio must not be more than 250 characters"],
    },
  },
  { timestamps: true }
);
// Encrypt password before saving to DB
userDBSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const UserBD = mongoose.model("UserDB", userDBSchema);
module.exports = UserBD;
