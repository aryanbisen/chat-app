import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {

  // Payload(Just the userId), secret, options
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });

  //localStorage.setItem("token", token);
  //console.log(localStorage.getItem(token))

  // Header name: AccessToken
  res.setHeader("AccessToken", `${token}`);
};

export default generateToken;
  