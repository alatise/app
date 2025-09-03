import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  OtpConfirmationRequest,
  RegisterRequest,
  ResetPasswordRequest,
  User,
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
      invalidatesTags: ["Profile"],
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
    changePassword: builder.mutation<
      ForgotPasswordResponse,
      ChangePasswordRequest
    >({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "POST",
        data,
      }),
      invalidatesTags: [],
    }),
    getProfile: builder.query<{ data: User }, void>({
      query: () => ({
        url: `/profile`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    editProfile: builder.mutation<
      LoginResponse,
      { name: string; phone: string }
    >({
      query: (data) => ({
        url: `/profile/edit`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Profile"],
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
  useGetProfileQuery,
  useEditProfileMutation,
  useChangePasswordMutation
} = authApi;
