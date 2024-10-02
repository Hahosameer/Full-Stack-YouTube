import express from "express";

import {
  deleteUser,
  disLike,
  getUser,
  like,
  subscribe,
  unSubscribe,
  updated,
} from "../controllers/user.js";
import { virifyToken } from "../virifyToken.js";


const router = express.Router(); 

// UPDATED A USER
router.put("/:id",virifyToken, updated);
// DELETE USER
router.delete("/:id", virifyToken, deleteUser);

// GET A USER
router.get("/find/:id", getUser);

// SUBSCRIBE A USER
router.put("/sub/:id", virifyToken, subscribe);

// UNSUBSCRIBE A USER
router.put("/unsub/:id", virifyToken, unSubscribe);

// LIKE A USER 
router.put("/like/:videoId", virifyToken, like);

// DISLIKE A USER
router.put("/dislike/:videoId", virifyToken, disLike);


export default router;
