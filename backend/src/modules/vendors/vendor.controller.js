import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";

import {
  createVendorService,
  getAllVendorsService,
  getVendorByIdService,
  updateVendorService,
  deleteVendorService,
} from "./vendor.service.js";

/**
 * @desc Create Vendor
 * @route POST /api/vendors
 * @access ADMIN, PROCUREMENT
 */
export const createVendor = asyncHandler(async (req, res) => {
  const vendor = await createVendorService({
    ...req.body,
    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json(new apiResponse(201, vendor, "Vendor created successfully"));
});

/**
 * @desc Get All Vendors
 * @route GET /api/vendors
 * @access ADMIN, PROCUREMENT, MANAGER
 */
export const getAllVendors = asyncHandler(async (req, res) => {
  const vendors = await getAllVendorsService();

  return res
    .status(200)
    .json(new apiResponse(200, vendors, "Vendors fetched successfully"));
});

/**
 * @desc Get Vendor By Id
 * @route GET /api/vendors/:id
 * @access ADMIN, PROCUREMENT, MANAGER
 */
export const getVendorById = asyncHandler(async (req, res) => {
  const vendor = await getVendorByIdService(req.params.id);

  if (!vendor) {
    throw new apiError(404, "Vendor not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, vendor, "Vendor fetched successfully"));
});

/**
 * @desc Update Vendor
 * @route PATCH /api/vendors/:id
 * @access ADMIN, PROCUREMENT
 */
export const updateVendor = asyncHandler(async (req, res) => {
  const vendor = await updateVendorService(req.params.id, req.body);

  if (!vendor) {
    throw new apiError(404, "Vendor not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, vendor, "Vendor updated successfully"));
});

/**
 * @desc Delete Vendor
 * @route DELETE /api/vendors/:id
 * @access ADMIN
 */
export const deleteVendor = asyncHandler(async (req, res) => {
  const vendor = await deleteVendorService(req.params.id);

  if (!vendor) {
    throw new apiError(404, "Vendor not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, null, "Vendor deleted successfully"));
});
