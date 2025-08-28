import Back from "@/assets/images/iconsvg/back.svg";
import Cart from "@/assets/images/iconsvg/cart2.svg";
import { Button } from "@/components/Shared/Button";

import MainHeader from "@/components/Shared/MainHeader";
import { useSession } from "@/lib/authCtx";
import { useProductCtx } from "@/lib/productsCtx";
import { useWishlist } from "@/lib/wishlistCtx";
import { useAddToCartMutation, useGetCartQuery } from "@/services/cart";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const productDetails = () => {
  const { product } = useProductCtx();
  const { name, price, image_url, description, id } = product!;
  console.log(">>>>>>item", product);

  const { wishlist, toggleWishlist } = useWishlist();
  const inWishlist = wishlist.some((p) => p.id === id);

  const { showAlert, setRequestResponse } = useSession();

  const { data: cart, isLoading: loadingCart } = useGetCartQuery();
  const [performAddToCart, { isLoading: addingToCart }] =
    useAddToCartMutation();

  const addToCart = async () => {
    try {
      const response = await performAddToCart({
        product_id: id,
        quantity: 1,
      }).unwrap();
      if (response.status === 200) {
        setRequestResponse({
          status: response.status,
          title: response.message,
          message: response.data.message,
          type: "success",
        });
        showAlert();
        return Promise.resolve();
      }
    } catch (error: any) {
      setRequestResponse({
        status: error.data.status,
        title: error.data.message,
        type: "error",
      });
      showAlert();
      return Promise.reject(error);
    }
  };

  const itemExistInCart = () => {
    return cart?.data.items.some((c) => c.product_id === id);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 bg-white  px-4 pt-6">
        <ScrollView>
          <MainHeader
            left={<Back onPress={() => router.back()} width={35} height={35} />}
            header={"Product Details"}
            right={
              <Pressable className="relative">
                {loadingCart ? (
                  <ActivityIndicator size={"small"} />
                ) : (
                  <Cart
                    onPress={() => router.push("/myCart")}
                    width={35}
                    height={35}
                  />
                )}
                <View className="bg-red-500 absolute flex-row justify-center items-center w-[16px] h-[16px] top-0 right-0 rounded-full">
                  <Text className="text-white font-inter-regular text-[11px]">
                    {cart?.data.item_count}
                  </Text>
                </View>
              </Pressable>
            }
          />
          <View className="pt-5">
            {/* <Product width={352} className="mt-10" /> */}
            <Image
              source={{ uri: image_url }}
              width={352}
              height={260}
              className="rounded-[12px] w-full"
            />
          </View>

          <Text className="font-montserrat-Medium text-xl pt-5">{name}</Text>

          <Text className="font-montserrat-Bold text-2xl pt-3">£{price}</Text>

          <Text className="font-montserrat-Semibold pt-3">Description:</Text>

          <Text className="pt-3 text-[#797777] font-montserrat-Regular">
            {description}
          </Text>

          <View className="flex-row items-center justify-between mt-8 px-10">
            <Text className="font-montserrat-Medium">Sets</Text>

            <View className="bg-[#F6F6F6] px-4 py-3 rounded-[8px] w-[223px]">
              <Text className="font-montserrat-Regular text-sm text-center">
                Choose an option
              </Text>
            </View>
          </View>
        </ScrollView>

        <View className="flex-row items-center gap-3 border-[#D9D9D9] border-t pr-4 py-4">
          <Pressable
            onPress={(e) => {
              toggleWishlist(product!);
            }}
            className="bg-[#E8E8E8] w-[76px] h-[55px] flex-row justify-center items-center rounded-[8px]"
          >
            <AntDesign
              name="heart"
              size={18}
              color={inWishlist ? "#CC0D39" : "#C6B4B8"}
            />
          </Pressable>

          <Button
            disabled={addingToCart || itemExistInCart()!}
            loading={addingToCart}
            cart
            onPress={addToCart}
            children={itemExistInCart() ? "Added" : "Add To Cart"}
            className="bg-secondary rounded-[8px] px-4 py-5  w-[75%]"
            textClassName="text-white font-montserrat-Medium text-base"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default productDetails;
