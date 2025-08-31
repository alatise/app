import Back from "@/assets/images/iconsvg/back.svg";
import { GridProductCard } from "@/components/Products/ProductCard";
import { Button } from "@/components/Shared/Button";
import MainHeader from "@/components/Shared/MainHeader";
import { useLocalCart } from "@/hooks/useLocalCart";
import { useGetCartQuery } from "@/services/cart";
import { useGetProductsQuery } from "@/services/products";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyOrder = () => {
  const [toggleOrder, setToggleOrder] = useState("ongoing");

  const { data: cart, isLoading: loadingCart } = useGetCartQuery();

  const {
    calculations,
    updateQuantity,
    removeItem,
    getFinalCartData,
    getItemQuantity,
  } = useLocalCart(cart?.data.items);

  const { data: products, isLoading } = useGetProductsQuery({
    page: 1,
    per_page: 5,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 bg-white  px-4 pt-6">
        <ScrollView showsHorizontalScrollIndicator={false}>
          <MainHeader
            left={<Back onPress={() => router.back()} width={35} height={35} />}
            header={"My Order"}
            right={<View />}
          />

          <View className="flex-row gap-4 w-full">
            <Button
              children="Ongoing"
              onPress={() => setToggleOrder("ongoing")}
              className={`${toggleOrder === "ongoing" ? "bg-black" : "bg-white border-black border-[0.5px]"}  rounded-[8px] px-4 py-4 mt-4 w-[48%]`}
              textClassName={`${toggleOrder === "ongoing" ? "text-white" : "text-black"} font-montserrat-Medium text-base`}
            />
            <Button
              children="Completed"
              onPress={() => setToggleOrder("completed")}
              className={`${toggleOrder === "completed" ? "bg-black" : "bg-white"} border-black border-[1px] rounded-[8px] px-4 py-4 mt-4 w-[48%]`}
              textClassName={`${toggleOrder === "completed" ? "text-white" : "text-black"} font-montserrat-Medium text-base`}
            />
          </View>

          {loadingCart ? (
            <View className=" justify-center items-center pt-20">
              <ActivityIndicator color={"#B29954"} />
              <Text className="pt-2">
                {toggleOrder === "ongoing"
                  ? "Loading Ongoing Order.."
                : "Loading Completed Order.."}
              </Text>
            </View>
          ) : (
            <>
              {toggleOrder === "ongoing" ? (
                <FlatList
                  data={cart?.data.items}
                  renderItem={({ item }) => (
                    <GridProductCard
                      order
                      currentQuantity={getItemQuantity(item.cart_item_key)}
                      onUpdateQuantity={() => {}}
                      onRemove={() => {}}
                      item={item!}
                    />
                  )}
                />
              ) : (
                <FlatList
                  data={cart?.data.items}
                  renderItem={({ item }) => (
                    <GridProductCard
                      order
                      currentQuantity={getItemQuantity(item.cart_item_key)}
                      onUpdateQuantity={() => {}}
                      onRemove={() => {}}
                      item={item!}
                    />
                  )}
                />
              )}
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyOrder;
