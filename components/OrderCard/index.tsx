import { Order } from "@/lib/type";
import React from "react";
import { Image, Text, View } from "react-native";

const OrderCard = (order: Order) => {
  return (
    <View className="border-[#ccc] border-[0.5px] rounded-[10px] mt-4 p-2">
      <View className="flex-row gap-2 border-b-[0.5px] pb-2 border-[#ccc]">
        {/* <View className="bg-[#ccc] w-10 h-10 rounded-full"></View> */}
        <View>
          <View className=" bg-green-100 self-start rounded-[10px] px-3 ">
            <Text className=" font-inter-regular text-center text-[12px]">
              {order?.status}
            </Text>
          </View>
          <Text className="font-inter-bold text-[16px]">
            Order #{order.order_number}
          </Text>
        </View>
      </View>

      <Text className="text-[14px] font-inter-regular pt-3 px-2">
        {order?.items.length} Items{" "}
      </Text>

      {order.items.map((item) => {
        return (
          <View className="bg-[#f8f7f7] p-2 mt-3 rounded-[8px] flex-row gap-4">
            <View className="bg-[#ccc] w-12 h-12 rounded-full">
              <Image
                source={{ uri: item.image_url }}
                className="rounded-full w-12 h-12"
              />
            </View>
            <View className="flex-row justify-between items-center w-[80%]">
              <View>
                <Text className="text-[#b8b8b8] font-inter-regular text-[12px]">
                  No of Units : {item?.quantity}
                </Text>

                <Text className="text-black font-inter-regular text-[14px]">
                  {item.name}
                </Text>
              </View>
              <View>
                <Text className="text-[#b8b8b8] font-inter-regular text-[12px]">
                  Price
                </Text>

                <Text className="text-black font-inter-regular text-[14px]">
                  £ {Number(item.price).toLocaleString("GBP")}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default OrderCard;
