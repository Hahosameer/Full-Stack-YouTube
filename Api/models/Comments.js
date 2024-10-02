import mongoose from 'mongoose';
// import validator from 'validator';

const Comment = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please Add Last Name"],
    },
    videoId: {
      type: String,
      required: [true, "Please Add Last Name"],
    },
    desc: {
      type: String,
      required: [true, "Please Add Last Name"],
    },
  

  
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", Comment);
