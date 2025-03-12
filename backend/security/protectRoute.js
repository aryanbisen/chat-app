import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    
    // Not implemented yet
    let token = req.headers["authorization"];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }
    if (token.startsWith("Bearer ")) {
      token = token.substring(7, token.length);
    }
    // The JWT was signed by the same JWT_SECRET, so the verify is same
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    //console.log(null.userId);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Add 'user' object
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protected route security", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
