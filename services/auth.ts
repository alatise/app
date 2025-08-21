import { LoginRequest, LoginResponse, RegisterRequest } from "@/lib/type";
import { api } from "./base";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSplash: builder.query({
      query: () => ({
        url: `/splash`,
        method: "GET",
      }),
    }),
    getWelcome: builder.query({
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
  }),
});

export const { useGetSplashQuery, useSigninMutation, useSignupMutation } =
  authApi;
