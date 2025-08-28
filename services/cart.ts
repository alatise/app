import { AddCartResponse, CartResponse } from "@/lib/type";
import { api } from "./base";

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => ({
        url: `/cart`,
        method: "GET",
      }),
      providesTags: ["Carts"],
    }),
    addToCart: builder.mutation<
      AddCartResponse,
      { product_id: number; quantity: number }
    >({
      query: (data) => ({
        url: `/cart/add`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Carts"],
    }),
    updateCart: builder.mutation<
      void,
      { cart_item_key: string; quantity: number }
    >({
      query: (data) => ({
        url: `/cart/update`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Carts"],
    }),
    removeFromCart: builder.mutation<void, { cart_item_key: string }>({
      query: (data) => ({
        url: `/cart/remove`,
        method: "DELETE",
        data,
      }),
      invalidatesTags: ["Carts"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
