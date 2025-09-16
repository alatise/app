import Back from "@/assets/images/iconsvg/back.svg";
import Cart from "@/assets/images/iconsvg/cart2.svg";
import { Button } from "@/components/Shared/Button";

import MainHeader from "@/components/Shared/MainHeader";
import TabWrapper from "@/components/Shared/TabWrapper";
import { CustomAlert } from "@/constants/toastConfig";
import { useSession } from "@/lib/authCtx";
import { useProductCtx } from "@/lib/productsCtx";
import { Product } from "@/lib/type";
import { useWishlist } from "@/lib/wishlistCtx";
import { useAddToCartMutation, useGetCartQuery } from "@/services/cart";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const productDetails = () => {
  const { product, setProduct } = useProductCtx();
  const { name, price, image_url, description, id } = product!;
  const { wishlist, toggleWishlist } = useWishlist();
  const inWishlist = wishlist.some((p) => p.id === id);
  const [selectedOption, setSelectedOption] = useState<string | null>("");
  const [quantity, setQuantity] = useState(1);
  const [buyingNow, setBuyingNow] = useState(false);

  const { showAlert, setRequestResponse, alertVisible, requestResponse } =
    useSession();

  const { data: cart, isLoading: loadingCart } = useGetCartQuery();
  const [performAddToCart, { isLoading: addingToCart }] =
    useAddToCartMutation();

  const addToCart = async () => {
    if (!selectedOption) {
      showAlert();
      setRequestResponse({
        status: 400,
        title: "Please select a set option",
        message: "Please select a set option before adding item to cart",
        type: "error",
      });
      return;
    }
    try {
      const response = await performAddToCart({
        product_id: id,
        quantity: quantity,
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
        message: error.data.message,
        type: "error",
      });
      showAlert();
      return Promise.reject(error);
    }
  };

  const buyNow = async () => {
    try {
      setBuyingNow(true);
      const token = await SecureStore.getItemAsync("session");
      const body: any = {
        product_id: product!.id,
        quantity: quantity,
        variation_id: selectVariation?.variation_id ?? undefined,
      };
      const response = await axios.post(
        "https://kabilsgrillz.com/wp-json/mobile-app/v1/buy-now",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const paymentLink = response.data?.data?.payment_link;
      if (paymentLink) {
        router.push({
          pathname: "/(payment)/buyNow",
          params: { url: paymentLink },
        });
      }
    } catch (error) {
      console.log("Buy Now error", error);
    } finally {
      setBuyingNow(false);
    }
  };

  const itemExistInCart = () => {
    return cart?.data.items.some((c) => c.product_id === id);
  };

  const setOptions =
    product?.variations &&
    product!?.variations?.map((v) => v.attributes.attribute_pa_sets);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  const selectVariation =
    product?.variations &&
    product?.variations.find(
      (v) => v.attributes.attribute_pa_sets === selectedOption
    );

  useEffect(() => {
    if (!selectedOption && setOptions && setOptions.length > 0) {
      setSelectedOption(setOptions[0]!);
    }
  }, [product?.id]);

  useEffect(() => {
    if (selectedOption) {
      setProduct(selectedProducts);
    }
  }, [selectedOption]);

  const selectedProducts: Product = {
    id: selectVariation?.variation_id!,
    name: selectVariation?.image.title!,
    slug: "",
    description: product?.description!,
    price: selectVariation?.display_price!,
    regular_price: "",
    sale_price: "",
    on_sale: false,
    image_url: selectVariation?.image.url!,
    gallery_images: [],
    rating: 0,
    rating_count: 0,
    category_id: 0,
    category_name: "",
    stock_status: "",
    in_stock: false,
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    attributes: {
      pa_sets: {},
    },
    variations: product?.variations!,
  };

  console.log(">>>>product?.variations?.length", product?.variations?.length);

  return (
    <TabWrapper>
      <View className="flex-1 bg-white mb-16">
        <MainHeader
          left={<Back onPress={() => router.back()} width={35} height={35} />}
          header={"Product Details"}
          right={
            <Pressable
              onPress={() => router.push("/myCart")}
              className="relative"
            >
              {loadingCart ? (
                <ActivityIndicator size={"small"} />
              ) : (
                <Cart width={35} height={35} />
              )}
              <View className="bg-red-500 absolute flex-row justify-center items-center w-[16px] h-[16px] top-0 right-0 rounded-full">
                <Text className="text-white font-inter-regular text-[11px]">
                  {cart?.data.item_count}
                </Text>
              </View>
            </Pressable>
          }
        />
        <ScrollView className="pb-4">
          <View className=" bg-black rounded-[12px] mt-3">
            {/* <Product width={352} className="mt-10" /> */}
            <Image
              source={{
                uri: image_url,
              }}
              width={352}
              height={260}
              className="rounded-[12px] w-full"
            />
          </View>

          <Text className="font-montserrat-Medium text-xl pt-5">{name}</Text>

          <View className="flex-row items-center justify-between pt-3">
            <Text className="font-montserrat-Bold text-2xl">
              £ {Number(price).toLocaleString("GBP")}
            </Text>
            <Pressable
              onPress={(e) => {
                toggleWishlist(product!);
              }}
              className="bg-[#E8E8E8] w-[46px] h-[40px] flex-row justify-center items-center rounded-[8px]"
            >
              <AntDesign
                name="heart"
                size={18}
                color={inWishlist ? "#CC0D39" : "#C6B4B8"}
              />
            </Pressable>
          </View>

          {product?.variations?.length != 0 && (
            <View className="my-4 px-0">
              <Text className="font-montserrat-Medium mb-2">Sets</Text>
              <View className="flex-row flex-wrap justify-between">
                {setOptions?.map((option, index) => {
                  const isSelected = selectedOption === option;
                  return (
                    <Pressable
                      key={index}
                      onPress={() => handleSelect(option)}
                      className={`mb-3 rounded-[10px] px-4 py-3 flex-row items-center ${
                        isSelected ? "bg-black" : "bg-[#F6F6F6]"
                      }`}
                      style={{ width: "48%" }}
                    >
                      <View
                        className={`w-[16px] h-[16px] rounded-full mr-2 border ${
                          isSelected
                            ? "bg-white border-white"
                            : "border-[#BDBDBD] bg-transparent"
                        }`}
                      />
                      <Text
                        className={`text-sm font-montserrat-Regular ${
                          isSelected ? "text-white" : "text-[#222]"
                        }`}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ flexShrink: 1, minWidth: 0 }}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}

          <View className="flex-row items-center justify-between pt-4">
            <Text className="font-montserrat-Medium">Quantity</Text>
            <View className="flex-row items-center">
              <Pressable
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-[8px] bg-[#F2F2F2] items-center justify-center mr-3"
              >
                <Text className="text-lg">-</Text>
              </Pressable>
              <Text className="w-10 text-center font-montserrat-Medium text-base">
                {quantity}
              </Text>
              <Pressable
                onPress={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-[8px] bg-[#F2F2F2] items-center justify-center ml-3"
              >
                <Text className="text-lg">+</Text>
              </Pressable>
            </View>
          </View>

          <Text className="font-montserrat-Semibold pt-4">Description:</Text>
          <Text className="pt-3 text-[#797777] font-montserrat-Regular text-sm tracking-wider">
            {description}
          </Text>
        </ScrollView>

        <View className="flex-row items-center gap-3 border-[#D9D9D9] border-t py-4">
          <View className="flex-1 flex-row gap-2 items-stretch">
            <Button
              disabled={addingToCart || itemExistInCart()!}
              loading={addingToCart}
              cart
              onPress={addToCart}
              children={itemExistInCart() ? "Added" : "Add To Cart"}
              className="bg-secondary rounded-[8px] h-[55px] flex-1"
              textClassName="text-white font-montserrat-Medium text-base"
            />
            <Button
              onPress={buyNow}
              disabled={buyingNow}
              loading={buyingNow}
              children="Buy Now"
              className="bg-black rounded-[8px] h-[55px] flex-1"
              textClassName="text-white font-montserrat-Medium text-base"
            />
          </View>
        </View>
      </View>

      <CustomAlert
        visible={alertVisible}
        title={requestResponse.message!}
        message={requestResponse.message!}
        type={requestResponse.type!}
      />
    </TabWrapper>
  );
};

export default productDetails;
