/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import cookies from "js-cookie";
import { toast } from "sonner";
import {
  apiBaseUrl,
  accessTokenCookieName,
  refreshTokenCookieName,
  roleCookieName,
} from "@/lib/constants";
import { logIn } from "@/store/AuthSlice";
import { Axios } from "./axios";

export const ResendOTP = async (parameters) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/auth/resend-email-verification`,
      parameters
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};
export const login = async (parameters, navigate, dispatch) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/auth/login`, parameters);
    if (response.data.success) {
      if (response.data.statusCode == 200) {
        await dispatch(logIn(response.data.data.user));
        window.location.href = "/";
      }
      const data = response.data.data.token;
      cookies.set(accessTokenCookieName, data.AccessToken, {
        expires: data.ExpiresIn,
      });
      cookies.set(roleCookieName, response.data.data.user.role, {
        expires: data.ExpiresIn,
      });
      cookies.set(refreshTokenCookieName, data.RefreshToken, {
        expires: data.ExpiresIn,
      });
      localStorage.setItem("user", JSON.stringify(response.data.data.user));

      toast.success("Login Successful");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.data.message === "EMAIL_NOT_VERIFIED") {
          toast.info("Please verify your email.");
          const data = await ResendOTP({ email: parameters.email });
          if (data.success) {
            navigate("/verify-otp", { state: { email: parameters.email } });
          }
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error(error.message);
      }
    }
  }
};

export const register = async (parameters) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/auth/register`,
      parameters
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};

export const verifyOTP = async (parameters) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/auth/verify-email`,
      parameters
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};

export const forgotPasswordVerifyEmail = async (parameters, navigate) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/auth/forgot-password-request`,
      parameters
    );

    if (response.data.success && navigate) {
      toast.success("OTP sent successfully to your email.");
      navigate("/set-password", {
        state: { email: parameters.email },
      });
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};

export const forgotPassword = async (parameters, navigate) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/auth/forgot-password`,
      parameters
    );

    if (response.data.success) {
      toast.success("Password Changed Successfully");
      navigate("/");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};

export const changePassword = async (parameters) => {
  const response = await Axios.post(
    `${apiBaseUrl}/auth/change-password`,
    parameters
  );
  return response;
};
export const refreshAccessToken = async () => {
  const refreshToken = cookies.get(refreshTokenCookieName);
  const response = await Axios.post(`${apiBaseUrl}/auth/refresh-token`, {
    refreshToken,
  });
  const { AccessToken, ExpiresIn } = response.data;
  cookies.set(accessTokenCookieName, AccessToken, {
    expires: ExpiresIn,
  });
  return response;
};

export const handleLogout = () => {
  cookies.remove(accessTokenCookieName);
  cookies.remove(refreshTokenCookieName);
  cookies.remove(roleCookieName);
  window.location.href = "/";
};
