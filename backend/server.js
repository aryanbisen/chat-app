import express from "express";
import dotenv from "dotenv";
// Bei auth.routes.js wird routes exportiert. Hier wird routes importiert mit dem namen authRoutes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from "cors";
const app = express();

dotenv.config(); // makes eotenv start
const PORT = process.env.PORT || 5000;

app.use(express.json());
 
app.use(
  cors({
    origin: ["http://localhost:5174"],
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "AccessToken");
  next();
});
/*
app.get("/", (req, res) => {
  res.send("hELLO wORLD");
});
*/

//Für alle requests die mit /api/auth beginnen soll authRoutes benutzt werden
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  //Mit MongoDB verbinden
  connectToMongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
