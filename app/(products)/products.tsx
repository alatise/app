import Arrow from "@/assets/images/iconsvg/arrowleft2.svg";
import Cart from "@/assets/images/iconsvg/cart2.svg";

import Grid from "@/assets/images/iconsvg/gridicon.svg";
import Search from "@/assets/images/iconsvg/search2.svg";
import User from "@/assets/images/iconsvg/user2.svg";
import FilterModal from "@/components/Products/FilterModal";
import {
  NewProductGridCard,
  NewProductListCard,
} from "@/components/Products/ProductCard";
import { ProductCategoryItem } from "@/components/Shared/CategoryItem";
import { useProductCtx } from "@/lib/productsCtx";
import { useGetCartQuery } from "@/services/cart";
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryIdQuery,
} from "@/services/products";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Products = () => {
  const { data, isLoading: loadingCategories } = useGetCategoriesQuery();
  const categories = data?.data?.categories.map((c) => c);
  const { data: cart, isLoading: loadingCart } = useGetCartQuery();

  const {
    selectCategory,
    setSelectCategory,
    currentPage,
    setCurrentPage,
    hasMore,
    setHasMore,
  } = useProductCtx();

  const sortedCategories = [
    {
      id: 0,
      name: "All",
      slug: "",
      image_url: "",
      product_count: 0,
      subcategories: [],
    },
    ...(categories ?? []),
  ];

  const filterRef = useRef<BottomSheetModal>(null);

  const [toggleGrid, setToggleGrid] = useState(false);

  function openFilterModal(open: boolean) {
    open ? filterRef.current?.present() : filterRef.current?.dismiss();
  }

  const {
    data: categoryProducts,
    isLoading: loadingProducts,
    isFetching,
  } = useGetProductsByCategoryIdQuery({
    id: selectCategory!?.id,
    page: currentPage,
    per_page: 15,
  });

  const loadMore = useCallback(() => {
    if (!loadingProducts && !isFetching && hasMore && categoryProducts) {
      setCurrentPage(currentPage + 1);
    }
  }, [
    loadingProducts,
    isFetching,
    hasMore,
    categoryProducts,
    currentPage,
    setCurrentPage,
  ]);

  const onEndReached = useCallback(() => {
    loadMore();
  }, [loadMore]);

  const renderFooter = () => {
    if (!isFetching) return null;
    return (
      <View className="py-4 items-center">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        pressBehavior={"collapse"}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => {
          filterRef.current?.dismiss();
        }}
      />
    ),
    []
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white pt-10 px-4">
          <View className="flex-1">
            {/* Scrollable content */}
            <ScrollView className="flex-1">
              {/* Your top section */}
              <View className="flex-row justify-between">
                <View className="flex-row gap-2 w-[62%]">
                  <Arrow width={45} height={45} onPress={() => router.back()} />
                  <View className="flex-row w-full border-[#CCCCCC] border-[1px] rounded-[8px] px-4 items-center">
                    <Search width={20} height={20} />
                    <TextInput
                      placeholder="Search Products"
                      className="text-base text-[#666666] font-montserrat-Regular px-4 h-[43px] rounded-[8px]"
                    />
                  </View>
                </View>

                <View className="flex-row items-center gap-4">
                  <Grid
                    onPress={() => setToggleGrid(!toggleGrid)}
                    width={18}
                    height={18}
                  />
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
                    <View className="bg-red-500 absolute flex-row justify-center items-center w-[16px] top-0 right-0 h-[16px]  rounded-full">
                      <Text className="text-white font-inter-regular text-[11px]">
                        {cart?.data.item_count}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>

              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={sortedCategories}
                renderItem={({ item }) => (
                  <ProductCategoryItem
                    setSelectCategory={setSelectCategory!}
                    selectCategory={selectCategory!}
                    item={item}
                  />
                )}
                style={{ marginTop: 20 }}
                keyExtractor={(item) => `${item.id}`}
              />

              {/* Product grid or list */}
              {isFetching && currentPage === 1 ? (
                // Category switched → full loader
                <View className="flex-1 items-center justify-center py-10">
                  <ActivityIndicator size="large" />
                  <Text className="mt-2">Loading products...</Text>
                </View>
              ) : (
                <>
                  {toggleGrid ? (
                    <View className="mt-5">
                      <FlatList
                        key={"grid"}
                        data={categoryProducts?.data.products ?? []}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        renderItem={({ item, index }) => (
                          <NewProductGridCard {...item} key={index} />
                        )}
                        columnWrapperStyle={{
                          justifyContent: "space-between",
                          marginBottom: 20,
                        }}
                        onEndReached={hasMore ? onEndReached : null}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                        keyExtractor={(item, index) => `${item.id}+${index} `}
                        removeClippedSubviews={true} // perf
                        maxToRenderPerBatch={10}
                        windowSize={10}
                      />
                    </View>
                  ) : (
                    <View className="mt-5">
                      <FlatList
                        key={"list"}
                        data={categoryProducts?.data.products ?? []}
                        renderItem={({ item, index }) => (
                          <NewProductListCard {...item} key={index} />
                        )}
                        onEndReached={hasMore ? onEndReached : null}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                        keyExtractor={(item, index) => `${item.id}+${index} `}
                        removeClippedSubviews={true} // perf
                        maxToRenderPerBatch={10}
                        windowSize={10}
                      />
                    </View>
                  )}
                </>
              )}
            </ScrollView>

            {/* Fixed Bottom Bar */}
            <View className="flex-row items-center justify-center gap-6 border-t border-[#D9D9D9] px-4 py-4 bg-white">
              <View className="flex-row items-center gap-2 border-[#D9D9D9] border-r pr-4">
                <User />
                <Text className="font-montserrat-Regular text-[15px]">
                  GENDER
                </Text>
              </View>
              <View className="flex-row items-center gap-2 border-[#D9D9D9] border-r px-4">
                <User />
                <Text className="font-montserrat-Regular text-[15px]">
                  SORT
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => openFilterModal(true)}
                className="flex-row items-center gap-2 px-4"
              >
                <User />
                <Text className="font-montserrat-Regular text-[15px]">
                  FILTER
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <BottomSheetModal
          ref={filterRef}
          index={0}
          snapPoints={["80%"]}
          containerStyle={{
            zIndex: 20,
          }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={{ flex: 1 }}>
            <FilterModal />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

export default Products;
