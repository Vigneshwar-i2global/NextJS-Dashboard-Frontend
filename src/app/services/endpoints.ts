// API Endpoints Configuration

// Direct API calls (CORS fixed on backend)
export const API_BASE_URL = "https://api.crispyminds.com/api/v1";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
    VERIFY_OTP: "/verify-otp",
  },
  // Add more endpoint categories as needed
} as const;
