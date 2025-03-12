import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Doesn't need id because generated automatically
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      minLength: 5,
    },
    gender: {
      type: String,
      require: true,
      enum: ["male", "female"],
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    alerts: [
      {
        message: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
