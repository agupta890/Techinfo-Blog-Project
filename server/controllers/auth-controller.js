const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

//register controller logic
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check user already register or not

    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(409).json({ message: "User already exist" });
    }

    //hash password
    const salt = 10;
    const hash_password = await bcrypt.hash(password, salt);
    //create a new user
    const User = await userModel.create({
      username,
      email,
      password: hash_password,
      role: "User",
    });

    const userData = {
      id: User._id,
      username: User.username,
      email: User.email,
      role: User.role,
    };

    //generate auth token
    const token = jwt.sign(
      { id: User._id, email: User.email, role: User.role }, //payload
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Register Sucess", Data: userData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//login controller logic

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      return res.status(401).json({ message: "User not register" });
    }

    const data = {
      id: existUser._id,
      username: existUser.username,
      email: existUser.email,
      role: existUser.role,
    };
    //login logic using bcrypt
    const IsPasswordMatch = await bcrypt.compare(password, existUser.password);
    if (!IsPasswordMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //generate auth token
    const token = jwt.sign(
      { id: existUser._id, role: existUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login successful", user: data });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "internal server error",error: error.message,});
  }
};

//logout logic controller

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

module.exports = { register, login,logout };
