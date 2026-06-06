import Vendor from "./vendor.model.js";

/**
 * Create Vendor
 */
export const createVendorService = async (payload) => {
  return await Vendor.create(payload);
};

/**
 * Get All Vendors
 */
export const getAllVendorsService = async () => {
  return await Vendor.find()
    .populate("createdBy", "fullName email phone role")
    .sort({
      createdAt: -1,
    });
};

/**
 * Get Vendor By Id
 */
export const getVendorByIdService = async (vendorId) => {
  return await Vendor.findById(vendorId).populate(
    "createdBy",
    "fullName email phone role",
  );
};

/**
 * Update Vendor
 */
export const updateVendorService = async (vendorId, payload) => {
  return await Vendor.findByIdAndUpdate(vendorId, payload, {
    new: true,
    runValidators: true,
  }).populate("createdBy", "fullName email phone role");
};

/**
 * Delete Vendor
 */
export const deleteVendorService = async (vendorId) => {
  return await Vendor.findByIdAndDelete(vendorId);
};
