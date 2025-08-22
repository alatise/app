import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  OtpConfirmationRequest,
  RegisterRequest,
  ResetPasswordRequest,
  WelcomeSlides,
} from "@/lib/type";
import { api } from "./base";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSplash: builder.query<WelcomeSlides, void>({
      query: () => ({
        url: `/splash`,
        method: "GET",
      }),
    }),
    getWelcome: builder.query<WelcomeSlides, void>({
      query: () => ({
        url: `/welcome`,
        method: "GET",
      }),
    }),
    signin: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: `/auth/signin`,
        method: "POST",
        data,
      }),
      invalidatesTags: [],
    }),
    signup: builder.mutation<LoginResponse, RegisterRequest>({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        data,
      }),
      invalidatesTags: [],
    }),
    sendOtp: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (data) => ({
        url: `/auth/send-otp`,
        method: "POST",
        data,
      }),
      invalidatesTags: [],
    }),
    otpConfirm: builder.mutation<
      ForgotPasswordResponse,
      OtpConfirmationRequest
    >({
      query: (data) => ({
        url: `/auth/otp-confirm`,
        method: "POST",
        data,
      }),
      invalidatesTags: [],
    }),
    resetPassword: builder.mutation<
      ForgotPasswordResponse,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: "POST",
        data,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useGetSplashQuery,
  useGetWelcomeQuery,
  useSigninMutation,
  useSignupMutation,
  useSendOtpMutation,
  useOtpConfirmMutation,
  useResetPasswordMutation,
} = authApi;
