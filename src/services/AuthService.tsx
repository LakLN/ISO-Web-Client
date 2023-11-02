  import axiosInstance from "../utils/AxiosInstance";
  import {
    UserLoginParamsInterface,
    UserRegisterParamsInterface,
    UserVerifySendParamsInterface,
  } from "./services";

  async function register({
    fullName,
    email,
    password,
    confirmPassword,
  }: UserRegisterParamsInterface) {
    return axiosInstance.post(`/auth/register`, {
      fullName,
      email,
      password,
      confirmPassword,
    });
  }

  function login({ email, password }: UserLoginParamsInterface) {
    return axiosInstance.post(
      `/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  function verifyOtp({ otp, email }: UserVerifySendParamsInterface) {
    if (otp === null || email === null || otp === "" || email === "") {
      throw new Error(`Invalid parameters`);
    }

    return axiosInstance.post(`/auth/verifyOTP`, { otp, email });
  }

  const forgetPassword = async (email: string) => {
    return await axiosInstance.post(`/user/forgot-password?email=${email}`);
  };

  const createNewPassword = async (token: string, data: FormData) => {
    return await axiosInstance.put(`/user/reset-password?token=${token}`, data);
  };

  export const AuthService = {
    register,
    login,
    verifyOtp,
    forgetPassword,
    createNewPassword,
  };
