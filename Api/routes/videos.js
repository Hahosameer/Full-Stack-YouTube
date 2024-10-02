import express from "express";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, upadteVideo } from "../controllers/video.js";
import { virifyToken } from "../virifyToken.js";

const router = express.Router();

router.post("/", virifyToken, addVideo);

router.put("/:id", virifyToken,upadteVideo );

router.delete("/:id", virifyToken ,deleteVideo );

router.get("/find/:id", getVideo );

router.put("/view/:id", addView );

router.get("/trend", trend );

router.get("/random", random);

router.get("/sub",virifyToken, sub );

router.get("/tags", getByTag);

router.get("/search", search );

export default router;

