import axios, { AxiosError } from "axios";
import { API_BASE_URL, ENDPOINTS } from "./endpoints";
import type {
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  AuthError,
} from "../types/auth.types";

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

// Set auth token if available
export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Generic HTTP methods
export const getMethod = async <T = any>(url: string): Promise<T> => {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};

export const postMethod = async <T = any, D = any>(
  url: string,
  data?: D
): Promise<T> => {
  try {
    const response = await axios.post<T>(url, data);
    return response.data;
  } catch (error) {
    console.error("POST request failed:", error);
    throw error;
  }
};

export const putMethod = async <T = any, D = any>(
  url: string,
  data?: D
): Promise<T> => {
  try {
    const response = await axios.put<T>(url, data);
    return response.data;
  } catch (error) {
    console.error("PUT request failed:", error);
    throw error;
  }
};

export const deleteMethod = async <T = any>(url: string): Promise<T> => {
  try {
    const response = await axios.delete<T>(url);
    return response.data;
  } catch (error) {
    console.error("DELETE request failed:", error);
    throw error;
  }
};

// Authentication API Methods
export const loginApi = async (
  phoneNumber: string
): Promise<LoginResponse> => {
  try {
    const requestData: LoginRequest = {
      phone_number: phoneNumber,
    };

    const response = await axios.post<LoginResponse>(
      ENDPOINTS.AUTH.LOGIN,
      requestData
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<AuthError>;
    console.error("Login API failed:", axiosError.response?.data || error);
    throw axiosError;
  }
};

export const verifyOtpApi = async (
  phoneNumber: string,
  otp: string,
  role: string = "seller"
): Promise<VerifyOtpResponse> => {
  try {
    const requestData: VerifyOtpRequest = {
      phone_number: phoneNumber,
      otp,
      role,
    };

    const response = await axios.post<VerifyOtpResponse>(
      ENDPOINTS.AUTH.VERIFY_OTP,
      requestData
    );

    // Set auth token after successful verification
    if (response.data.data?.token) {
      setAuthToken(response.data.data.token);
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<AuthError>;
    console.error("Verify OTP API failed:", axiosError.response?.data || error);
    throw axiosError;
  }
};
