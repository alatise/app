import Back from "@/assets/images/iconsvg/back.svg";
import Delivery from "@/assets/images/iconsvg/delivery.svg";
import { Button } from "@/components/Shared/Button";
import MainHeader from "@/components/Shared/MainHeader";
import TabWrapper from "@/components/Shared/TabWrapper";
import { useLocalCart } from "@/hooks/useLocalCart";
import { useProductCtx } from "@/lib/productsCtx";
import { useGetProfileQuery } from "@/services/auth";
import { useGetCartQuery } from "@/services/cart";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import uuid from "react-native-uuid";
import { WebView } from "react-native-webview";
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
  const [squareUrl, setSquareUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [squareLoading, setSquareLoading] = useState(false);

  const [isAuthorized, setIsAuthorized] = useState(false);

  const line_items = finalCartData.map((c) => {
    return {
      uid: uuid.v4(),
      name: c.name,
      quantity: c.quantity.toString(),
      item_type: "ITEM",
      base_price_money: {
        amount: c.price,
        currency: "GBP",
      },
    };
  });

  console.log(">>>>uuuidddd", uuid.v4());

  console.log(">>>>>>line_items", line_items);

  const checkoutPaymentLink = async () => {
    setIsLoading(true);

    console.log(">>>>d", {
      idempotency_key: uuid.v4(),
      order: {
        location_id: "LQ9TND1H83BK3",
        customerId: data?.data.email,
        reference_id: uuid.v4(),
        line_items,
      },
    });

    try {
      await axios
        .post(
          `https://connect.squareupsandbox.com/v2/online-checkout/payment-links`,
          {
            idempotency_key: uuid.v4(),
            order: {
              location_id: "LQ9TND1H83BK3",
              customerId: data?.data.email,
              reference_id: uuid.v4(),
              line_items,
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
          console.log(">>>>>Square res", res.data);
          setSquareUrl(res.data.payment_link.url);
        });
    } catch (e) {
      console.log(">>>e", e);
      setIsLoading(false);
    }
  };

  return (
    <TabWrapper>
      <View className="flex-1">
        {squareUrl ? (
          <View className="flex-1">
            {squareLoading && (
              <View className="pt-20">
                <ActivityIndicator size="large" color="#6200ee" />
                <Text className=" text-center text-[20px] ">
                  Loading payment gateway.....
                </Text>
              </View>
            )}
            <WebView
              onLoadStart={() => setSquareLoading(true)}
              onLoadEnd={() => setSquareLoading(false)}
              source={{ uri: squareUrl }}
            />

            <Button
              onPress={() => {
                router.push("/(order)/ongoingOrder");
                setSquareUrl("");
              }}
              children={
                isLoading ? (
                  <ActivityIndicator />
                ) : (
                  "Click (When payment has been made)"
                )
              }
              className="bg-black rounded-[8px] px-4 py-4 mb-20  w-full"
              textClassName="text-white font-montserrat-Medium text-base"
            />
          </View>
        ) : (
          <ScrollView>
            <MainHeader
              left={
                <Back onPress={() => router.back()} width={35} height={35} />
              }
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

            {/* <View className="mt-6 border-t-[0.5px] border-[#D9D9D9] pt-4">
              <Text className="font-montserrat-Regular">Additional Notes:</Text>
              <TextInput
                numberOfLines={5}
                placeholder="Write Here"
                className="border-[0.3px] flex-row justify-start font-montserrat-Regular px-3 h-20 border-[#D9D9D9] mt-2 rounded-[8px]"
              />
            </View> */}

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
                <Text className="font-montserrat-Medium text-sm ">
                  Shipping
                </Text>
                <Text className="font-montserrat-Medium text-sm text-[#159E42]">
                  FREE Delivery
                </Text>
              </View>

              <View className="flex-row font-montserrat-Regular items-center justify-between border-y-[0.5px] border-[#D9D9D9] mt-5 py-6">
                <Text className="font-montserrat-Bold text-lg  ">My Order</Text>
                <Text className="font-montserrat-Bold text-lg ">
                  £ {Number(calculations.subtotal).toLocaleString("GBP")}
                </Text>
              </View>
            </View>
          </ScrollView>
        )}

        {!squareUrl && (
          <View className="flex-row items-center gap-3 mb-10 border-[#D9D9D9] border-t py-4">
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
        )}
      </View>
    </TabWrapper>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)", // optional dim effect
  },
});
export default checkout;
