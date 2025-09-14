import Arrow from "@/assets/images/iconsvg/arrowright.svg";
import Back from "@/assets/images/iconsvg/back.svg";
import Check from "@/assets/images/iconsvg/check.svg";
import Add from "@/assets/images/iconsvg/plusaddress.svg";
import { GridProductCard } from "@/components/Products/ProductCard";
import { Button } from "@/components/Shared/Button";
import MainHeader from "@/components/Shared/MainHeader";
import TabWrapper from "@/components/Shared/TabWrapper";
import { CustomAlert } from "@/constants/toastConfig";
import { useLocalCart } from "@/hooks/useLocalCart";
import { useSession } from "@/lib/authCtx";
import { useProductCtx } from "@/lib/productsCtx";
import { useGetCartQuery } from "@/services/cart";
import { useGetDeliveryAddressQuery } from "@/services/deliveryAddress";
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function CartScreen() {
  const { data: cart, isLoading: loadingCart, isFetching } = useGetCartQuery();

  const {
    localCart,
    calculations,
    updateQuantity,
    removeItem,
    getFinalCartData,
    getItemQuantity,
  } = useLocalCart(cart?.data.items);

  const { setCartState } = useProductCtx();
  const [proceedingNow, setProceedingNow] = useState(false);
  const { showAlert, setRequestResponse, alertVisible, requestResponse } =
    useSession();
  const { data: deliveryAddresses, isLoading: gettingAddress } =
    useGetDeliveryAddressQuery();

  const handleProceedToBuy = async () => {
    // Build payload from current cart items, including variations
    const cartItems = (cart?.data.items ?? []).map((item) => ({
      product_id: Number(item.product_id),
      quantity: getItemQuantity(item.cart_item_key) || item.quantity,
      variation_id: Number(item.variation_id) || 0,
      variation: item.variation_data ?? undefined,
    }));

    try {
      setProceedingNow(true);
      const token = await SecureStore.getItemAsync("session");
      const body: any = {
        cart_items: cartItems,
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
        router.push({ pathname: "/(payment)/buyNow", params: { url: paymentLink } });
      }
    } catch (error: any) {
      setRequestResponse({
        status: error?.response?.status ?? 400,
        title: "Buy Now failed",
        message: error?.response?.data?.message ?? "Unable to start checkout",
        type: "error",
      });
      showAlert();
    } finally {
      setProceedingNow(false);
    }
  };

  return (
    <TabWrapper>
      <ScrollView className="">
        <MainHeader
          left={<Back onPress={() => router.back()} width={35} height={35} />}
          header={"My Cart"}
          right={<View />}
        />

        {loadingCart ? (
          <View className=" justify-center items-center pt-20">
            <ActivityIndicator color={"#B29954"} />
            <Text className="pt-2">Loading your cart items..</Text>
          </View>
        ) : (
          <>
            {isFetching && (
              <View className="flex-row items-center justify-center gap-2 bg-[#F6F6F6] border border-[#E2E2E2] py-2 px-3 rounded-[8px] mt-3">
                <ActivityIndicator size="small" color="#000" />
                <Text className="text-[12px] font-inter-medium">Updating cart…</Text>
              </View>
            )}
            {cart?.data.item_count === 0 ? (
              <View className="justify-center items-center pt-20">
                <Text>You have no item in your cart</Text>
                <Button
                  textClassName="text-black text-sm font-inter-medium"
                  className="mt-6 h-[40px] w-[190px] bg-secondary"
                  children="Shop Now"
                  onPress={() => router.push("/(drawer)/(tabs)")}
                />
              </View>
            ) : (
              <View className="mt-6">
                <Text className="font-inter-regular text-lg ">
                  Subtotal{" "}
                  <Text className=" font-inter-bold">
                    £ {calculations.subtotal}
                  </Text>
                </Text>

                <View className="flex-row  items-center gap-3 pt-1">
                  <Check width={23} height={23} />
                  <Text className="text-secondary text-[15px] font-inter-medium">
                    Your order is eligible for free Devivery
                  </Text>
                </View>
              </View>
            )}

            <View className="mb-10">
              <FlatList
                data={cart?.data.items}
                renderItem={({ item }) => (
                  <GridProductCard
                    currentQuantity={getItemQuantity(item.cart_item_key)}
                    onUpdateQuantity={(quantity) =>
                      updateQuantity(item.cart_item_key, quantity)
                    }
                    onRemove={() => removeItem(item.cart_item_key)}
                    item={item!}
                  />
                )}
              />

              {deliveryAddresses!?.data.addresses.length === 0 && (
                <TouchableOpacity
                  onPress={() =>
                    router.push("/(deliveryAddress)/addDeliveryAddress")
                  }
                  className="mt-6 border-t-[0.5px] border-[#D9D9D9] pt-4"
                >
                  <View className="flex-row items-center justify-between border-[1px] p-3 rounded-[8px] border-[#D9D9D9] mt-2 ">
                    <View className="flex-row items-center gap-3">
                      <Add width={20} height={20} />
                      <Text className="font-montserrat-Regular">
                        Add New Address
                      </Text>
                    </View>
                    <Arrow width={20} height={20} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </ScrollView>

      {cart?.data.items.length !== 0 && !loadingCart && (
        <Button
          disabled={proceedingNow || gettingAddress || loadingCart}
          loading={proceedingNow || gettingAddress || loadingCart}
          children={`Proceed to Buy (${calculations.totalItems}  items)`}
          onPress={handleProceedToBuy}
          className="bg-[#000] my-6 py-4"
          textClassName="text-white text-base font-inter-regular "
        />
      )}

      <CustomAlert
        visible={alertVisible}
        title={requestResponse.message!}
        message={requestResponse.message!}
        type={requestResponse.type!}
      />
    </TabWrapper>
  );
}
