import {
  AddCardRequest,
  CheckoutRequest,
  CheckoutResponse,
  DeliveryAddressRequest,
  DeliveryAddressResponse,
} from "@/lib/type";
import { api } from "./base";

export const deliveryAddressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDeliveryAddress: builder.query<DeliveryAddressResponse, void>({
      query: () => ({
        url: `/delivery-addresses`,
        method: "GET",
      }),
      providesTags: ["DeliveryAddress"],
    }),
    addDeliveryAddress: builder.mutation<any, DeliveryAddressRequest>({
      query: (data) => ({
        url: `/delivery-address/add`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["DeliveryAddress"],
    }),
    getCards: builder.mutation<any, DeliveryAddressRequest>({
      query: (data) => ({
        url: `/delivery-address/add`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Cards"],
    }),

    addCard: builder.mutation<any, AddCardRequest>({
      query: (data) => ({
        url: `/cards/add`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Cards"],
    }),
    checkOut: builder.mutation<CheckoutResponse, CheckoutRequest>({
      query: (data) => ({
        url: `/checkout`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Cards"],
    }),
  }),
});

export const {
  useAddDeliveryAddressMutation,
  useAddCardMutation,
  useGetCardsMutation,
  useGetDeliveryAddressQuery,
  useCheckOutMutation
} = deliveryAddressApi;
