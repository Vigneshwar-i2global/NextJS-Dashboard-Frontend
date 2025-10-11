
export const API_BASE_URL = "https://api.crispyminds.com/api/v1";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
    VERIFY_OTP: "/verify-otp",
  },

  CATEGORY:{
    CATEGORIES:"/categories"
  },

  ATTRIBUTES:{
   ATTRIBUTES : "/attributes"
  }
} as const;
