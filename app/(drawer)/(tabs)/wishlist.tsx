import Back from "@/assets/images/iconsvg/back.svg";
import Search from "@/assets/images/iconsvg/search.svg";
import ProductCard from "@/components/Products/ProductCard";
import MainHeader from "@/components/Shared/MainHeader";
import TabWrapper from "@/components/Shared/TabWrapper";
import { useWishlist } from "@/lib/wishlistCtx";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WishlistScreen() {
  const { wishlist, toggleWishlist } = useWishlist();
  const router = useRouter();

  return (
    <TabWrapper>
      <MainHeader
        left={<Back onPress={() => router.back()} width={35} height={35} />}
        header={"WishList"}
        right={
          <Search
            width={35}
            height={35}
            onPress={() => router.push("/search")}
          />
        }
      />

      <View className="pt-10">
        {wishlist.length === 0 ? (
          <Text className="text-gray-500 text-center">
            No items in your wishlist.
          </Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={wishlist}
            numColumns={2}
            renderItem={({ item }) => <ProductCard {...item} />}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 10,
            }}
            // onEndReached={hasMore ? onEndReached : null}
            // onEndReachedThreshold={0.5}
            // ListFooterComponent={renderFooter}
            keyExtractor={(item, index) => `${item.id}+${index} `}
            removeClippedSubviews={true} // perf
            maxToRenderPerBatch={10}
            windowSize={10}
          />
        )}
      </View>
    </TabWrapper>
  );
}
