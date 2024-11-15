import { LoginSchemaType } from "@/Auth/Schema/LoginSchema";
import configureAxios from "./axiosConfig";

const requests = configureAxios();

const AuthServices = {
  //   registerUser: (data: SignupSchemaType) => {
  //     return requests.post("/auth/register/user/", data);
  //   },
  loginUser: (data: LoginSchemaType) => {
    return requests.post("/auth/login/admin/", data);
  },

  // verify otp
  //   verifyOtp: (data: VerifyOtpSchemaType, isloginOtpMode: boolean) => {
  //     return requests.post(
  //       `/auth/${isloginOtpMode ? "login/user" : "forgot-password"}/verify-otp/`,
  //       data
  //     );
  //   },
  //   // verify otp
  //   resendOtp: (data: { email: string }) => {
  //     return requests.post(`/auth/resend-otp/`, data);
  //   },

  //   // logout user
  //   logoutUser: async () => {
  //     return requests.post("/auth/logout/user/", {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${await getCookies()}`,
  //     });
  //   },
  //   // Forgot password verify
  //   FPVerify: (data: FPVerifySchemaType) => {
  //     return requests.post("/auth/forgot-password/", data);
  //   },
  //   // Forgot password verify
  //   forgotPassword: (data: ForgotPasswordSchemaType) => {
  //     return requests.post("/auth/forgot-password/change-password/", data);
  //   },

  //   // get user data
  //   fetchUserData: async (userId: string) => {
  //     return requests.get(`/auth/user/retrieve/${userId}/`, {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${await getCookies()}`,
  //     });
  //   },

  //   // update user data
  //   updateUserData: async (data: UserProfile) => {
  //     return requests.patch("/auth/user/details/", data, {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: `Bearer ${await getCookies()}`,
  //     });
  //   },

  //   // change password
  //   changePassword: async (data: ChangePasswordSchemaType) => {
  //     return requests.post("/auth/change-password/", data, {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${await getCookies()}`,
  //     });
  //   },
};

export default AuthServices;
