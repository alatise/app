import {
  CategoryProducts,
  CategoryResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  HomeResponse,
  OtpConfirmationRequest,
  Product,
  ProductParam,
  ResetPasswordRequest,
} from "@/lib/type";
import { api } from "./base";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    homeData: builder.query<HomeResponse, void>({
      query: () => ({
        url: `/home`,
        method: "GET",
      }),
    }),
    getCategories: builder.query<CategoryResponse, void>({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
    }),
    getProductsByCategoryId: builder.query<CategoryProducts, ProductParam>({
      query: ({ id, page = 1, per_page = 15 }) => ({
        url:
          id === 0
            ? `/products?page=${page}&per_page=${per_page}`
            : `/categories/${id}/products?page=${page}&per_page=${per_page}`,
        method: "GET",
      }),

      // ⬇️ These must be here (endpoint level), not inside `query(...)`
      serializeQueryArgs: ({ queryArgs }) => {
        const { id } = queryArgs as ProductParam;
        // cache key depends only on category id
        return { id };
      },

      merge: (currentCache: any, newItems: any, { arg }) => {
        const { page = 1 } = (arg || {}) as ProductParam;

        // first page or no cache → replace
        if (page === 1) return newItems;

        // append into data.products (preserve the wrapper shape)
        return {
          ...newItems,
          data: {
            ...newItems.data,
            products: [
              ...(currentCache.data?.products ?? []),
              ...(newItems.data?.products ?? []),
            ],
            // keep latest pagination/meta from server (optional)
            pagination:
              newItems.data?.pagination ?? currentCache.data?.pagination,
          },
        };
      },

      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.id !== previousArg?.id ||
          currentArg?.page !== previousArg?.page
        );
      },

      providesTags: (result, error, { id }) => [{ type: "Products", id }],
    }),
    searchProducts: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: `/auth/send-otp`,
        method: "POST",
        data,
      }),
      invalidatesTags: [],
    }),
    getProducts: builder.mutation<
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
    getProductsById: builder.query<{ data: Product }, { id: string }>({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    filterProducts: builder.mutation<
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
    reviewProductsById: builder.mutation<
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
  useHomeDataQuery,
  useGetProductsByCategoryIdQuery,
  useGetCategoriesQuery,
} = productsApi;
