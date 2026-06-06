import User from "./user.model.js";

/**
 * Get All Users
 */
export const getUsersService = async () => {
  return await User.find().select("-password").sort({
    createdAt: -1,
  });
};

/**
 * Get User By Id
 */
export const getUserByIdService = async (userId) => {
  return await User.findById(userId).select("-password");
};

/**
 * Update Profile
 */
export const updateProfileService = async (userId, payload) => {
  return await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  }).select("-password");
};

/**
 * Update User Role
 */
export const updateRoleService = async (userId, role) => {
  return await User.findByIdAndUpdate(
    userId,
    { role },
    {
      new: true,
    },
  ).select("-password");
};

/**
 * Update User Status
 */
export const updateStatusService = async (userId, isActive) => {
  return await User.findByIdAndUpdate(
    userId,
    { isActive },
    {
      new: true,
    },
  ).select("-password");
};
