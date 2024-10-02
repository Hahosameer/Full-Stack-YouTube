import jwt from "jsonwebtoken";
import {createError} from './error.js'
// export const virifyToken = async (req, res, next) => {
//   // const token = req.headers.token;
  
//   const token = await req.headers.cookie.split('=')[1];
  
//   console.log("request header", req.headers);
//   if (!token) return next(createError(401, "You are not authenticated"));

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
//     if (err) return next(createError(403, "Token is not valid"));

//     req.user = user;
//     next();
//   });
// }
// import jwt from "jsonwebtoken";

export  const virifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split("=")[1]; // This will fail if `authorization` is undefined

  if (!token) {
    return res.status(403).json("Token is required");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }
    req.user = user;
    next();
  });
};

// // default virifyToken;
// export const virifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) return next(createError(401, "You are not Authenticated!"));
//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) return next(createError(403, "Token is not valid!"));
//     // console.log("user", user);
//     req.user = user;
//     next();
//   });
// };