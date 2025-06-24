import { User } from "../models/user.model.js";
import { asyncHandler } from "../utiles/AsyncHandler.js";
import { ApiError } from "../utiles/ApiError.js";
import { ApiResponse } from "../utiles/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  if (!username) {
    throw new ApiError(400, "username is required");
  }
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  if (!password) {
    throw new ApiError(400, "password is required");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User already existed in database");
  }
  const user = await User.create({
    username,
    email,
    password,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "User registration done succesfully", user));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email.trim()) {
    throw new ApiError(404, "Username is required for login");
  }

  if (!password) {
    throw new ApiError(404, "Password is required for login");
  }

  const user = req.user;
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "wrong password");
  }

  return res.status(200).json(new ApiResponse(200, "user login succesful"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "Please enter a email to delete your account");
  }
  if (!password) {
    throw new ApiError(400, "Please enter  password to delete your account");
  }
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  await User.findByIdAndDelete(user._id);
  return res
    .status(200)
    .json(new ApiResponse(200, "successfully deleted your account"));
});

const updateAccount = asyncHandler(async (req, res) => {
  const { newusername, newemail } = req.body;
  const user = req.user;

  user.username = newusername || user.username;
  user.email = newemail || user.email;
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, "Infromation successfully updated"));
});

export { registerUser, loginUser, deleteUser,updateAccount };
