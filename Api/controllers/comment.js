import { createError } from "../error.js";
import Comment from "../models/Comments.js";
import Video from "../models/Comments.js";

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const saveComment = await newComment.save();
    res.status(200).json(saveComment);
  } catch (error) {
    next(error);
  }
};
export const deleteDomment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been delete");
    } else {
      return next(createError(403, "You can delete only your comment"));
    }
  } catch (error) {
    next(error);
  }
};
export const getComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
