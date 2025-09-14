import Add from "@/assets/images/iconsvg/add.svg";
import Arrow2 from "@/assets/images/iconsvg/arrowright2.svg";
import Arrow from "@/assets/images/iconsvg/goldenarrow.svg";
import Substract from "@/assets/images/iconsvg/substract.svg";
import Trash from "@/assets/images/iconsvg/trash.svg";
import { useLocalCart } from "@/hooks/useLocalCart";
import { useProductCtx } from "@/lib/productsCtx";

import { CartItem, Product } from "@/lib/type";
import { useWishlist } from "@/lib/wishlistCtx";
import { useGetCartQuery, useUpdateCartMutation } from "@/services/cart";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type GridProductCardProp = {
  order?: boolean;
  item: CartItem;
  currentQuantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
};
export const GridProductCard = ({
  order,
  item,
  currentQuantity,
  onUpdateQuantity,
  onRemove,
}: GridProductCardProp) => {
  const { name, image_url, price, quantity, product_id, cart_item_key } = item;
  const { data: cart, isLoading: loadingCart } = useGetCartQuery();

  const {
    calculations,
    updateQuantity,
    removeItem,
    getFinalCartData,
    getItemQuantity,
  } = useLocalCart(cart?.data.items);

  const finalCartData = getFinalCartData();

  const [updateCartItem, { isLoading: addingToCart }] = useUpdateCartMutation();

  const handleDecrease = () => {
    onUpdateQuantity(currentQuantity - 1);
  };

  const handleIncrease = () => {
    onUpdateQuantity(currentQuantity + 1);
  };

  // Don't render if quantity is 0 (item was removed)
  if (currentQuantity === 0) {
    return null;
  }

  return (
    <View
      className={`bg-white flex-row px-3  py-3 mt-10 justify-between ${order ? "items-center" : "items-end"}   shadow-black shadow-[0.5px] border-[0.2px] border-[#ccc] rounded-[12px]`}
    >
      {/* <Product1 width={105} height={103} /> */}

      <View className="bg-[#000000] rounded-[12px]">
        <Image
          source={{ uri: image_url }}
          width={105}
          height={103}
          className="rounded-[12px] "
        />
      </View>

      {order ? (
        <View className="w-[107px]">
          <Text className="text-[11px] font-inter-regular">{name}</Text>
          <Text className="text-[13px] font-inter-semibold pt-2">
            {" "}
            £ {(price * currentQuantity).toFixed(2)}
          </Text>
        </View>
      ) : (
        <View className="w-[107px]">
          <Text className="text-[11px] font-inter-regular">{name}</Text>
          <Text className="text-[13px] font-inter-semibold pt-2">
            {" "}
            £ {(price * currentQuantity).toFixed(2)}
          </Text>

          <View className="flex-row gap-4 items-center pt-3">
            <Substract onPress={handleDecrease} />
            {addingToCart ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-black font-inter-medium text-[11px]">
                {currentQuantity}
              </Text>
            )}
            <Add onPress={handleIncrease} />
          </View>
        </View>
      )}

      {order ? (
        <View>
          {" "}
          <Text
            onPress={() => router.push("/(order)/writeReview")}
            className="font-montserrat-Medium text-sm bg-[#F6F6F6] p-2 rounded-[10px]"
          >
            Write Review
          </Text>
        </View>
      ) : (
        <Pressable onPress={onRemove} className="flex-row gap-1 items-center">
          <Trash />
          <Text className="text-[#a3a0a0] font-inter-medium text-[11px]">
            Remove
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const ProductCard = ({ ...item }: Product) => {
  const { setProduct } = useProductCtx();
  const { image_url, name, price, rating, id } = item;
  const { wishlist, toggleWishlist } = useWishlist();
  const inWishlist = wishlist.some((p) => p.id === id);

  return (
    <Pressable
      onPress={() => {
        setProduct(item);
        router.push("/(products)/productDetails");
      }}
      className="bg-white w-[48%] h-[265px]  shadow-slate-50 shadow border-[0.2px] border-[#ccc] rounded-[6px] p-2 py-4"
    >
      <View className="flex-row absolute top-8 z-10 right-5 justify-end">
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            toggleWishlist(item);
          }}
          className="flex-row justify-end w-10 h-8 "
        >
          <AntDesign
            name="heart"
            size={18}
            color={inWishlist ? "#CC0D39" : "#C6B4B8"}
          />
        </Pressable>
      </View>

      <View className="bg-[#000000] rounded-[12px]">
        <Image
          source={{ uri: image_url }}
          width={164}
          height={161}
          className="rounded-[12px] w-full"
        />
      </View>

      <View className="flex-row items-center justify-between ">
        <View className="w-[107px] pt-4">
          <Text className="text-[11px] font-inter-regular">{name}</Text>
          <Text className="text-[13px] font-inter-semibold pt-2">
            £ {Number(price).toLocaleString("GBP")}
          </Text>
        </View>
        <Arrow />
      </View>
    </Pressable>
  );
};

export const NewProductGridCard = ({ ...item }: Product) => {
  const { setProduct } = useProductCtx();
  const { image_url, name, price, rating, id } = item;
  const { wishlist, toggleWishlist } = useWishlist();
  const inWishlist = wishlist.some((p) => p.id === id);
  return (
    <TouchableOpacity
      onPress={() => {
        setProduct(item);
        router.push("/(products)/productDetails");
      }}
      className="w-[48%] "
    >
      <View className="bg-[#D9D9D9] rounded-[8px] h-[190px]  px-2">
        <View className="flex-row justify-end py-3 px-2">
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              toggleWishlist(item);
            }}
            className="flex-row justify-end w-10 h-8 "
          >
            <AntDesign
              name="heart"
              size={18}
              color={inWishlist ? "#CC0D39" : "#C6B4B8"}
            />
          </Pressable>
        </View>
        <View className="bg-[#000000] h-[118px] w-full rounded-[5px]">
          <Image
            source={{ uri: image_url }}
            height={118}
            className="rounded-[12px]  h-[118px] w-full"
          />
        </View>
      </View>

      <View className="pt-4">
        <Text className="font-montserrat-Regular">{name}</Text>

        <View className="flex-row justify-between items-center">
          <Text className=" font-montserrat-Semibold">
            {" "}
            £ {Number(price).toLocaleString("GBP")}
          </Text>
          <Arrow2 />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const NewProductListCard = ({ ...item }: Product) => {
  const { setProduct } = useProductCtx();
  const { image_url, name, price, rating, id } = item;
  const { wishlist, toggleWishlist } = useWishlist();
  const inWishlist = wishlist.some((p) => p.id === id);
  return (
    <TouchableOpacity
      onPress={() => {
        setProduct(item);
        router.push("/(products)/productDetails");
      }}
      className=" flex-row gap-5 mt-6 border-b-[0.2px] pb-3 border-[#e5e5e5]"
    >
      <View className="bg-[#D9D9D9] flex-row justify-center items-center rounded-[8px] h-[120px] w-[120px] px-2">
        <View className="bg-[#000000] h-[90px] w-full rounded-[5px]">
          <Image
            source={{ uri: image_url }}
            height={90}
            className="rounded-[12px]  w-full"
          />
        </View>
      </View>

      <View className="pt-4 w-[60%]">
        <View className="h-10">
          <Text className="font-montserrat-Regular">{name}</Text>
        </View>

        <Text className="font-montserrat-Semibold pt-2">
          {" "}
          £ {Number(price).toLocaleString("GBP")}
        </Text>

        <View className="flex-row justify-between items-center pt-6">
          {/* <Text className=" font-montserrat-Regular text-red-600">40% Off</Text> */}
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              toggleWishlist(item);
            }}
            className="flex-row justify-end  "
          >
            <AntDesign
              name="heart"
              size={18}
              color={inWishlist ? "#CC0D39" : "#C6B4B8"}
            />
          </Pressable>
          <Arrow2 />
          {/* {order ? (
            <View>
              {" "}
              <Text
                onPress={() => router.push("/(order)/writeReview")}
                className="font-montserrat-Medium text-sm bg-[#F6F6F6] p-2 rounded-[10px]"
              >
                Write Review
              </Text>{" "}
            </View>
          ) : (
            <Arrow2 />
          )} */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
