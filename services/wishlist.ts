import { Category, HomeResponse } from "@/lib/type";
import { api } from "./base";

export const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    wishlists: builder.query<HomeResponse, void>({
      query: () => ({
        url: `/wishlists`,
        method: "GET",
      }),
    }),
    addWishlist: builder.mutation<Category[], void>({
      query: () => ({
        url: `/wishlist/add`,
        method: "GET",
      }),
    }),
    removeWishlist: builder.mutation<Category[], void>({
      query: () => ({
        url: `/wishlist/remove`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddWishlistMutation,
  useLazyWishlistsQuery,
  useWishlistsQuery,
} = wishlistApi;
