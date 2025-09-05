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
import { router } from "expo-router";
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

  const { showAlert, setRequestResponse, alertVisible, requestResponse } =
    useSession();

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

  const setOptions =
    product?.variations &&
    product!?.variations?.map((v) => v.attributes.attribute_pa_sets);

  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>("");

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setShowOptions(false); // hide dropdown after selection
  };

  const selectVariation =
    product?.variations &&
    product?.variations.find(
      (v) => v.attributes.attribute_pa_sets === selectedOption
    );

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
          <View className=" bg-[#999999] rounded-[12px] mt-3">
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

          <Text className="font-montserrat-Bold text-2xl pt-3">
            {" "}
            £ {Number(price).toLocaleString("GBP")}
          </Text>

          {product?.variations?.length != 0 && (
            <>
              <View className="flex-row items-center justify-center my-4  gap-4 px-10">
                <Text className="font-montserrat-Medium">Sets</Text>

                <View className=" self-start items-center justify-center">
                  <Pressable
                    onPress={() => setShowOptions((prev) => !prev)}
                    className="bg-[#F6F6F6] px-4 py-3 rounded-[8px] "
                  >
                    <Text className="font-montserrat-Regular text-sm text-center">
                      {selectedOption ? selectedOption : "Choose an option"}
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View className="flex-row items-center justify-center my-4  gap-4 px-10">
                <View className="w-[20%]" />

                {showOptions && (
                  <View className="bg-white mt-2 rounded-[8px] border border-gray-300 w-[60%]">
                    {setOptions?.map((option, index) => {
                      const isSelected = selectedOption === option;
                      return (
                        <Pressable
                          key={index}
                          onPress={() => handleSelect(option)}
                          className={`px-4 py-3 rounded-[8px] ${
                            isSelected ? "bg-secondary" : "bg-white"
                          }`}
                        >
                          <Text
                            className={`text-sm ${
                              isSelected ? "text-white font-bold" : "text-black"
                            }`}
                          >
                            {option}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </View>
            </>
          )}

          <Text className="font-montserrat-Semibold pt-1">Description:</Text>
          <Text className="pt-3 text-[#797777] font-montserrat-Regular text-sm tracking-wider">
            {description}
          </Text>
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
