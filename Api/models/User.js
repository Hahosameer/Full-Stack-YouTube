import mongoose from 'mongoose';
// import validator from 'validator';

const User = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add Last Name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please Add Email"],
      unique: true,
      trim: true,
      lowercase: true,
      // validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      // minlength: 8,
      trim: true,
    },
    img: {
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      type: [],
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", User);
