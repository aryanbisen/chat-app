import express from "express";
import { addUser, getFriendRequests, getFriends, getSentRequests, getUsers, manageFriendRequest } from "../controllers/user.controller.js";
import protectRoute from "../security/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getFriends);
router.get("/sentrequests", protectRoute, getSentRequests);
router.get("/friendrequests", protectRoute, getFriendRequests);
router.post("/add/:receiver", protectRoute, addUser);
router.post("/managerequest/:friendUserId", protectRoute, manageFriendRequest);




export default router;
