import Arrow from "@/assets/images/iconsvg/arrowright.svg";
import Back from "@/assets/images/iconsvg/back.svg";
import Delivery from "@/assets/images/iconsvg/delivery.svg";
import { Button } from "@/components/Shared/Button";

import MainHeader from "@/components/Shared/MainHeader";
import { useLocalCart } from "@/hooks/useLocalCart";
import { useProductCtx } from "@/lib/productsCtx";
import { useGetCartQuery } from "@/services/cart";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const checkout = () => {
  const { setCartState, cartState } = useProductCtx();

  const { data: cart, isLoading: loadingCart } = useGetCartQuery();

  const { orderData, finalCartData } = cartState!;
  const { calculations } = useLocalCart(cart?.data.items);

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
            <Arrow width={20} height={20} className="" />
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
              router.push("/(products)/deliveryAddress");
            }}
            children="Submit order"
            className="bg-black rounded-[8px] px-4 py-4  w-full"
            textClassName="text-white font-montserrat-Medium text-base"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default checkout;
