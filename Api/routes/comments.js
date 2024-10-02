import express from "express";
import { addComment, deleteDomment, getComment } from "../controllers/comment.js";
import { virifyToken } from "../virifyToken.js";

const router = express.Router();

router.post("/", virifyToken, addComment  );
router.delete("/:id", virifyToken , deleteDomment );
router.get("/:videoId", virifyToken, getComment );

export default router;
