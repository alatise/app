import Arrow from "@/assets/images/iconsvg/arrowright.svg";
import Back from "@/assets/images/iconsvg/back.svg";
import Check from "@/assets/images/iconsvg/check.svg";
import Add from "@/assets/images/iconsvg/plusaddress.svg";
import { GridProductCard } from "@/components/Products/ProductCard";
import { Button } from "@/components/Shared/Button";
import MainHeader from "@/components/Shared/MainHeader";
import TabWrapper from "@/components/Shared/TabWrapper";
import { useLocalCart } from "@/hooks/useLocalCart";
import { useSession } from "@/lib/authCtx";
import { useProductCtx } from "@/lib/productsCtx";
import { useGetCartQuery } from "@/services/cart";
import {
  useCheckOutMutation,
  useGetDeliveryAddressQuery,
} from "@/services/deliveryAddress";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const { data: cart, isLoading: loadingCart } = useGetCartQuery();

  const {
    calculations,
    updateQuantity,
    removeItem,
    getFinalCartData,
    getItemQuantity,
  } = useLocalCart(cart?.data.items);

  const { setCartState } = useProductCtx();

  const [performCheckout, { isLoading }] = useCheckOutMutation();
  const { showAlert, setRequestResponse } = useSession();
  const { data: deliveryAddresses, isLoading: gettingAddress } =
    useGetDeliveryAddressQuery();

  const addresses = deliveryAddresses?.data.addresses;

  const handleProceedToBuy = async () => {
    const finalCartData = getFinalCartData();
    console.log("Final cart data for API:", finalCartData);

    try {
      const response = await performCheckout({
        cart_items: finalCartData!,
        delivery_address: {
          street: addresses![0].address_1,
          city: addresses![0].city,
          zip: addresses![0].postcode,
        },
      }).unwrap();
      if (response.status === 200) {
        setCartState({
          finalCartData,
          orderData: response.data,
        });
        router.push({
          pathname: "/(products)/checkout",
        });
        setRequestResponse({
          status: response.status,
          title: response.message,
          message: response.message,
          type: "success",
        });
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

    // router.push({
    //   pathname: "/(products)/checkout"
    // })
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

      {cart?.data.item_count !== 0 && !loadingCart && (
        <Button
          disabled={isLoading || gettingAddress || loadingCart}
          loading={isLoading || gettingAddress || loadingCart}
          children={`Proceed to Buy (${calculations.totalItems}  items)`}
          onPress={handleProceedToBuy}
          className="bg-[#000] my-6 py-4"
          textClassName="text-white text-base font-inter-regular "
        />
      )}
    </TabWrapper>
  );
}
