import { asyncHandler } from "../utiles/AsyncHandler.js";
import { ApiError } from "../utiles/ApiError.js";
import { ApiResponse } from "../utiles/ApiResponse.js";
import { User } from "../models/user.model.js";
const getUserId = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if(!email){
    throw new ApiError(400,"Email is missing");
  }
  const user=await User.findOne({email});
  if(!user){
    throw new ApiError(400,"User not found in database");
  }

  req.user=user;
  next();
});

export {getUserId};
