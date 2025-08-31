import Back from "@/assets/images/iconsvg/back.svg";
import Checked from "@/assets/images/iconsvg/orderchecked.svg";
import Unchecked from "@/assets/images/iconsvg/unchecked.svg";

import { NewProductListCard } from "@/components/Products/ProductCard";

import MainHeader from "@/components/Shared/MainHeader";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type OrderStatusProp = {
  icon?: React.ReactNode;
  status: string;
  date: string;
  msg: string;
  success?: boolean;
};
const OrderStatus = ({ status, msg, date, success }: OrderStatusProp) => {
  return (
    <View className="flex-row gap-4 mt-10">
      {!success ? <Unchecked /> : <Checked />}
      <View>
        <Text
          className={`${success ? "text-[#CC0D39]" : "text-black"}  font-montserrat-Semibold`}
        >
          {status}{" "}
          <Text className="text-[#00000080] font-montserrat-Regular">
            {date}
          </Text>
        </Text>
        <Text className="text-black font-montserrat-Regular">{msg}</Text>
      </View>
    </View>
  );
};

const TrackOrder = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 bg-white  px-4 pt-6">
        <ScrollView showsHorizontalScrollIndicator={false}>
          <MainHeader
            left={<Back onPress={() => router.back()} width={35} height={35} />}
            header={"Track Order"}
            right={<View />}
          />

          <NewProductListCard />

          <Text className="font-montserrat-Medium text-lg pt-6">
            Track order
          </Text>

          <View className=" pt-4">
            <OrderStatus
              success
              date="27 Dec 2025"
              status="order placed"
              msg="We have received your order"
            />
            <View className="bg-red-700 h-16 w-[2px]  absolute top-20 left-[10px]"></View>
            <OrderStatus
              success
              date="27 Dec 2025"
              status="order Confirm"
              msg="We have received your order"
            />
            <View className="bg-red-700 h-16 w-[2px]  absolute top-40 left-[10px]"></View>
            <OrderStatus
              date="27 Dec 2025"
              status="order processed"
              msg="We have received your order"
            />
            <View className="bg-[#CCCCCC] h-14 w-[2px]  absolute top-[220px] left-[10px]"></View>
            <OrderStatus
              date="27 Dec 2025"
              status="Ready To ship"
              msg="We have received your order"
            />
            <View className="bg-[#CCCCCC] h-14 w-[2px]  absolute top-[293px] left-[10px]"></View>
            <OrderStatus
              date="27 Dec 2025"
              status="Out for delivery"
              msg="We have received your order"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TrackOrder;
