import generateToken from "../JWT/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {

    const { email, userName, password } = req.body;

    if (!email && !userName) {
      return res.status(400).json({ error: "Email or user name is required" });
    }

    // $or: Takes the one wich is not null. It compares two
    // ...: Spreads the values of the inner array into the outer one
    const user = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(userName ? [{ userName: userName }] : []),
      ],
    });

    // Check the password. If user exists it takes it's password otherwise empty string
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!isPasswordCorrect || !user) {
      return res.status(400).json({ error: "Invalid login credentials" });
    }

    // Create a token and set it in the header
    generateToken(user._id, res);

    // Send the response
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    let headers = new Headers();
    headers.delete("AccessToken");
    console.log("TEST");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      userName,
      password,
      confirmPassword,
      gender,
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // checks if user email exists in DB
    // This is equivalent to ({ email: email }). But since the key and value have the same name it's not neccesary.
    const userEmail = await User.findOne({ email });
    const userUserName = await User.findOne({ userName: userName });
    // Random profile picture (37:46)

    if (userEmail) {
      return res.status(400).json({ error: "E-Mail already exists" });
    }
    if (userUserName) {
      return res.status(400).json({ error: "This username is not available" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword, // Value of password gets overwritten by hashed password
      gender,
    });

    if (newUser) {
      await newUser.save();
      try {
        generateToken(newUser._id, res);
        res.json({
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          userName: newUser.userName,
          email: newUser.email,
        });
        res.status(201);
      } catch (error) {
        console.log(error);
        res.status(401);
      }
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
