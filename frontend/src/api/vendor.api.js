export const getVendors = () => api.get("/api/vendors");

export const createVendor = (data) => api.post("/api/vendors", data);
