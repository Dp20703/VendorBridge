import apiError from "../../utils/apiError.js";
import User from "./user.model.js";

export const registerUserService = async ({
  firstName,
  lastName,
  email,
  password,
  phone,
  role,
}) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new apiError(409, "Email already exists");
  }

  const user = await User.create({
    email,
    password,
    phone,
    role,
    fullName: {
      firstName,
      lastName,
    },
  });

  return await User.findById(user._id).select("-password");
};

export const loginUserService = async (email, password) => {
  const user = await User.findOne({
    email: email.toLowerCase(),
  }).select("+password");

  if (!user) {
    throw new apiError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new apiError(403, "Account is inactive");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new apiError(401, "Invalid email or password");
  }

  user.password = undefined;

  return user;
};
