import Back from "@/assets/images/iconsvg/back.svg";
import Delivery from "@/assets/images/iconsvg/delivery.svg";
import { Button } from "@/components/Shared/Button";
import MainHeader from "@/components/Shared/MainHeader";
import { useLocalCart } from "@/hooks/useLocalCart";
import { useProductCtx } from "@/lib/productsCtx";
import { useGetCartQuery } from "@/services/cart";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";

import { useGetProfileQuery } from "@/services/auth";
import axios from "axios";
import { ActivityIndicator } from "react-native";
// import {
//   AdditionalPaymentMethodType,
//   authorize,
//   CurrencyCode,
//   Failure,
//   getAuthorizationState,
//   getAuthorizedLocation,
//   mapUserInfoToFailure,
//   ProcessingMode,
//   PromptMode,
//   startPayment,
//   type PaymentParameters,
//   type PromptParameters,
// } from "mobile-payments-sdk-react-native";

const checkout = () => {
  const { setCartState, cartState } = useProductCtx();

  const { data, isLoading: loadingProfile } = useGetProfileQuery();
  const { data: cart, isLoading: loadingCart } = useGetCartQuery();
  const { orderData, finalCartData } = cartState!;
  const { calculations } = useLocalCart(cart?.data.items);

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const line_items = finalCartData.map((c) => {
    return {
      uid: uuid.v4(),
      name: c.name,
      quantity: c.quantity.toString(),
      item_type: "ITEM",
      base_price_money: {
        amount: c.price,
        currency: JSON.stringify(orderData!.currency),
      },
      variation_total_price_money: {
        amount: c.price * c.quantity,
        currency: JSON.stringify(orderData!.currency),
      },
      total_money: {
        amount: c.price * c.quantity,
        currency: JSON.stringify(orderData!.currency),
      },
    };
  });

  console.log(
    ">>>>>process.env.EXPO_PUBLIC_CHECKOUT_URL",
    process.env.EXPO_PUBLIC_CHECKOUT_URL
  );

  const checkoutPaymentLink = async () => {
    setIsLoading(true);
    try {
      await axios
        .post(
          `https://connect.squareup.com/v2/online-checkout/payment-links`,
          {
            idempotency_key: uuid.v4(),
            order: {
              id: JSON.stringify(orderData!.order_id),
              location_id: "LQ9TND1H83BK3",
              customerId: data?.data.email,
              reference_id: uuid.v4(),
              line_items,
              total_money: {
                amount: calculations.subtotal,
                currency: JSON.stringify(orderData!.currency),
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer EAAAl87FCIEp02eMxZNXU2WeH1LnGyFnFf8R4Ps54-1lKrJN0sOTE1SZDkTFmrxR`,
            },
          }
        )
        .then((res) => {
          setIsLoading(false);
          console.log(">>>>>res", res.data);
        });
    } catch (e) {
      console.log(">>>e", e);
      setIsLoading(false);
    }
  };

  // const handleStartPayment = async () => {
  //   const paymentParameters: PaymentParameters = {
  //     amountMoney: { amount: 1, currencyCode: CurrencyCode.EUR },
  //     appFeeMoney: { amount: 0, currencyCode: CurrencyCode.EUR },
  //     idempotencyKey: uuid.v4(),
  //     note: "Payment for services",
  //     processingMode: ProcessingMode.AUTO_DETECT,
  //     orderId: JSON.stringify(orderData!.order_id),
  //     customerId: data?.data.email,
  //     referenceId: "",
  //   };

  //   const promptParameters: PromptParameters = {
  //     additionalMethods: [AdditionalPaymentMethodType.ALL],
  //     mode: PromptMode.DEFAULT,
  //   };

  //   try {
  //     const payment = await startPayment(paymentParameters, promptParameters);
  //     console.log("Payment successful:", payment);
  //   } catch (error: any) {
  //     // convert the error.userInfo into a Failure object
  //     const failure: Failure = mapUserInfoToFailure(error.userInfo);
  //     console.log("Payment error:", JSON.stringify(failure));
  //   }
  // };

  // const handleAuthorize = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Add your own access token and location ID from developer.squareup.com
  //     let auth = await authorize(
  //       "EAAAl87FCIEp02eMxZNXU2WeH1LnGyFnFf8R4Ps54-1lKrJN0sOTE1SZDkTFmrxR",
  //       "LQ9TND1H83BK3"
  //     );
  //     console.log(auth);
  //     let authorizedLocation = await getAuthorizedLocation();
  //     let authorizationState = await getAuthorizationState();
  //     setIsAuthorized(true);
  //     console.log(
  //       "SDK Authorized with location " + JSON.stringify(authorizedLocation)
  //     );
  //     console.log(
  //       "SDK Authorization Status is " + JSON.stringify(authorizationState)
  //     );
  //   } catch (error: any) {
  //     setIsAuthorized(false);
  //     console.log("Authorization error: ", JSON.stringify(error));
  //     Alert.alert("Error Authenticating", error.message);
  //   }
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   handleAuthorize()
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 bg-white  px-4 pt-6">
        <ScrollView>
          <MainHeader
            left={<Back onPress={() => router.back()} width={35} height={35} />}
            header={"Checkout"}
            right={<View />}
          />

          <View className="flex-row items-center justify-between mt-6">
            <View className="flex-row items-center gap-3">
              <Delivery className="" />
              <View>
                <Text className="font-montserrat-Medium text-xl">
                  Delivery address
                </Text>
                <Text className="font-montserrat-Regular text-sm">
                  {orderData.delivery_address.address_1}
                </Text>
              </View>
            </View>
            {/* <Arrow width={20} height={20} className="" /> */}
          </View>
          {/* <View className="flex-row items-center justify-between mt-6 border-t-[0.5px] border-[#D9D9D9] pt-4">
            <View className="flex-row items-center gap-3">
              <Payment className="" />
              <View>
                <Text className="font-montserrat-Medium text-xl">Payment</Text>
                <Text className="font-montserrat-Regular text-sm">
                  XXXX XXXX XXXX 3456
                </Text>
              </View>
            </View>
            <Arrow width={20} height={20} className="" />
          </View> */}

          <View className="mt-6 border-t-[0.5px] border-[#D9D9D9] pt-4">
            <Text className="font-montserrat-Regular">Additional Notes:</Text>
            <TextInput
              numberOfLines={5}
              placeholder="Write Here"
              className="border-[0.3px] flex-row justify-start font-montserrat-Regular px-3 h-20 border-[#D9D9D9] mt-2 rounded-[8px]"
            />
          </View>

          <View className="mt-28">
            {finalCartData.map((c) => {
              return (
                <View className="flex-row font-montserrat-Regular items-center justify-between mt-3">
                  <Text className="font-montserrat-Medium text-sm">
                    {c.name}
                  </Text>
                  <Text className="font-montserrat-Medium text-sm">
                    {c.quantity} x £ {c.price}
                  </Text>
                </View>
              );
            })}

            {/* <View className="flex-row font-montserrat-Regular items-center justify-between mt-5">
              <Text className="font-montserrat-Medium text-sm text-[#CC0D39]">
                Discount
              </Text>
              <Text className="font-montserrat-Medium text-sm text-[#CC0D39]">
                -£100.00
              </Text>
            </View> */}
            <View className="flex-row font-montserrat-Regular items-center justify-between mt-5">
              <Text className="font-montserrat-Medium text-sm ">Shipping</Text>
              <Text className="font-montserrat-Medium text-sm text-[#159E42]">
                FREE Delivery
              </Text>
            </View>

            <View className="flex-row font-montserrat-Regular items-center justify-between border-y-[0.5px] border-[#D9D9D9] mt-5 py-6">
              <Text className="font-montserrat-Bold text-lg  ">My Order</Text>
              <Text className="font-montserrat-Bold text-lg ">
                £ {calculations.subtotal}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View className="flex-row items-center gap-3 border-[#D9D9D9] border-t py-4">
          <Button
            onPress={() => {
              checkoutPaymentLink();
              // router.push("/(order)/ongoingOrder");
            }}
            children={isLoading ? <ActivityIndicator /> : "Submit order"}
            className="bg-black rounded-[8px] px-4 py-4  w-full"
            textClassName="text-white font-montserrat-Medium text-base"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default checkout;
