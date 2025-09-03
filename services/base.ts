import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data }) => {
    try {
      let headers: AxiosRequestConfig["headers"] = {};
      const session = SecureStore.getItem("session");

      if (session) {
        headers.Authorization = `Bearer ${session}`;
      }

      console.log(">>>>> baseUrl + url", baseUrl + url, session);

      const result = await axios({ url: baseUrl + url, method, data, headers });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError<any>;
      // return {
      //   error: { status: err.response?.status, data: err.response?.data },
      // };
      if (err.response?.status === 401) {
        try {
          const userId = await SecureStore.getItemAsync("user_id");

          if (!userId) {
            throw new Error("No refresh token or user id available");
          }

          // Request new access token
          const refreshResponse = await axios.post(baseUrl + "/auth/refresh", {
            user_id: Number(userId),
          });

          const session = refreshResponse.data.token;

          // Save new token
          await SecureStore.setItemAsync("session", session);

          let headers: AxiosRequestConfig["headers"] = {};

          if (session) {
            headers.Authorization = `Bearer ${session}`;
          }

          // Retry original request with new token
          const result = await axios({
            url: baseUrl + url,
            method,
            data,
            headers,
          });

          return { data: result.data };
        } catch (refreshError) {
          return {
            error: {
              status: 401,
              data: { message: "Session expired. Please log in again." },
            },
          };
        }
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 })

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: "splitApi",
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  // baseQuery: baseQueryWithRetry,
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL || "",
  }),
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: ["Products", "Profile", "Carts", "DeliveryAddress", "Cards"],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({
    getRequest: () => "test",
  }),
});
