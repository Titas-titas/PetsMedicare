import argon2 from "argon2";
import { createUser, getUserByEmail, getUserById } from "../models/usersModel.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";


//sukuria ir grazina jwt tokena
const signToken = (id) =>{
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
}

//iraso i front cookie su jwt tokenu, options yra cookie nustatimai
const sentTokenCookie = (token, res) => {
  const cookieOptions = {
    expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000,
    ),

    httpOnly: true,
  }

  res.cookie('jwt', token, cookieOptions);
}

//iraso vartotoja i duomenu baze
export const signup = async (req, res, next) => {
  try {
    const newUser = req.body;
    const hash = await argon2.hash(newUser.password);

    newUser.password = hash;

    const createdUser = await createUser(newUser);

    if (!createdUser) {
      throw new AppError("User not created", 400);
    }

    createdUser.password = undefined;

    res.status(201).json({
      status: "success",
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

//vartotojas prisijungia
export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        
        const user = await getUserByEmail(email);
        if (!user) {
            throw new AppError("Invalid user email or password", 400);
        }

        const passwordCorrect = await argon2.verify(user.password, password);
        if (!passwordCorrect) {
            throw new AppError("Invalid user email or password", 400);
        }

        const token = signToken(user.id);
        sentTokenCookie(token, res);

        user.password = undefined

        res.status(200).json({
            status: "success",
            data: user,
        });
        
    } catch (error) {
        next(error);
    }
}

//autorizacijos middleware, routes apsougo nou neregistruotu vartotoju
export const protect = async (req, res, next) => {
  try {
    let token = req.cookies?.jwt;
    if (!token) {
      throw new AppError("You are not logged in! please log in to get access")
    }
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decodedUser);
    
    const currentUser = await getUserById(decodedUser.id);

    if(!currentUser){
      throw new AppError("The user belonging to this token does no longer exist", 401)
    }

    req.user = currentUser;

    next();
  } catch (error) {
    next(error);
  }
}

//tikrina vartotojo role ir suteikia teises
export const allowAccessTo = (...roles) => {
  return (req, res, next) => {
    try {
      if(!roles.includes(req.user.role)){
        throw new AppError("You not have premitions to this platform action", 403)
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

export const logout = (req, res, next) => {
  return res.clearCookie('jwt').status(200).json({
    status: "success",
    message: "Your are now logged out",
  })
}


export const getAuthenticatedUser = (req, res, next) => {
  try {
    req.user.password = undefined;

    res.status(200).json({
      status: "success",
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
}