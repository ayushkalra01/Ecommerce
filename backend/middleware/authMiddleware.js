const admin = require("../config/firebase");
const userSchema = require("../models/userModel");
const tokenCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authorization);
    req.user = firebaseUser;
    req.user.token = req.headers.authorization;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

const adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await userSchema.findOne({ email }).exec();
  if (adminUser.role === "Ecommerce_Admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an admin");
  }
};

module.exports = {
  tokenCheck,
  adminCheck,
};

// import jwt from 'jsonwebtoken'
// import asyncHandler from 'express-async-handler'
// import UserSchema from '../models/userModel.js'

// const protect = asyncHandler(async (req, res, next) => {
//   let token
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1]
//       const decoded = jwt.verify(token, process.env.JWT_SECRET)
//       req.user = await UserSchema.findById(decoded.id).select('-password')
//       next()
//     } catch (error) {
//       console.error(error)
//       res.status(401)
//       throw new Error('Not Authorized,Token Failedf')
//     }
//   }
//   if (!token) {
//     res.status(401)
//     throw new Error('Not Authorized,No Token')
//   }
// })
