import Back from "@/assets/images/iconsvg/back.svg";

import Search from "@/assets/images/iconsvg/search.svg";
import ProductCard from "@/components/Products/ProductCard";
import { CategoryItem } from "@/components/Shared/CategoryItem";
import MainHeader from "@/components/Shared/MainHeader";
import TabWrapper from "@/components/Shared/TabWrapper";
import { useProductCtx } from "@/lib/productsCtx";
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryIdQuery,
} from "@/services/products";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function CategoryScreen() {
  const { data, isLoading: loadingCategories } = useGetCategoriesQuery();
  // const {
  //   selectCategory,
  //   setSelectCategory,
  //   currentPage,
  //   setCurrentPage,
  //   hasMore,
  //   setHasMore,
  // } = useProductCtx();

  // const {
  //   data: categoryProducts,
  //   isLoading: loadingProducts,
  //   isFetching,
  // } = useGetProductsByCategoryIdQuery({
  //   id: selectCategory!?.id,
  //   page: currentPage,
  //   per_page: 15,
  // });

  // ✅ Categories
  const categories = data?.data?.categories.map((c) => c);

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

  // const loadMore = useCallback(() => {
  //   if (!loadingProducts && !isFetching && hasMore && categoryProducts) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // }, [
  //   loadingProducts,
  //   isFetching,
  //   hasMore,
  //   categoryProducts,
  //   currentPage,
  //   setCurrentPage,
  // ]);

  // const onEndReached = useCallback(() => {
  //   loadMore();
  // }, [loadMore]);

  // const renderFooter = () => {
  //   if (!isFetching) return null;
  //   return (
  //     <View className="py-4 items-center">
  //       <ActivityIndicator size="small" color="#000" />
  //     </View>
  //   );
  // };

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const lastLoadedPageRef = useRef(1);
  const highestViewedPageRef = useRef(1); // Track the highest page actually viewed

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 300, // item must stay visible briefly
  };

  const {
    selectCategory,
    setSelectCategory,
    currentPage,
    setCurrentPage,
    hasMore,
    setHasMore,
  } = useProductCtx();

  const {
    data: categoryProducts,
    isLoading: loadingProducts,
    isFetching,
  } = useGetProductsByCategoryIdQuery({
    id: selectCategory!?.id,
    page: currentPage,
    per_page: 16,
  });

  const products = categoryProducts?.data;

  useEffect(() => {
    if (categoryProducts) {
      const isLastPage = currentPage >= products!.pagination.total_pages;
      setHasMore(!isLastPage);
      setIsLoadingMore(false);
      // Update the last loaded page when data successfully loads
      lastLoadedPageRef.current = currentPage;
    }
  }, [products, currentPage, setHasMore]);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
    lastLoadedPageRef.current = 1; // reset pagination tracker
    highestViewedPageRef.current = 1; // reset viewed page tracker
    setIsLoadingMore(false);
  }, [selectCategory!?.id, setCurrentPage]);

  const loadMore = useCallback(() => {
    if (
      isLoadingMore ||
      loadingProducts ||
      isFetching ||
      !hasMore ||
      !products
    ) {
      return;
    }

    console.log("Loading more - Current page:", currentPage);
    setIsLoadingMore(true);
    setCurrentPage((prev: any) => prev + 1);
  }, [
    isLoadingMore,
    loadingProducts,
    isFetching,
    hasMore,
    products,
    currentPage,
    setCurrentPage,
  ]);

  const renderFooter = () => {
    if (!isFetching && !isLoadingMore) return null;
    return (
      <View className="py-4 items-center">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  };

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<{ index: number }> }) => {
      if (!hasMore || isLoadingMore || !viewableItems.length) return;

      const lastVisibleIndex =
        viewableItems[viewableItems.length - 1]?.index ?? 0;

      // Calculate which page this item belongs to (1-based)
      const pageOfLastVisibleItem = Math.floor(lastVisibleIndex / 15) + 1;

      // Update the highest viewed page
      if (pageOfLastVisibleItem > highestViewedPageRef.current) {
        highestViewedPageRef.current = pageOfLastVisibleItem;
      }

      // Only load more if:
      // 1. User has viewed items from a page that's already loaded (or is currently loading)
      // 2. User is near the end of that page (12th+ item in the page)
      // 3. We haven't already requested the next page
      const itemPositionInPage = lastVisibleIndex % 15;
      const shouldLoadMore =
        pageOfLastVisibleItem >= lastLoadedPageRef.current && // User has caught up to loaded content
        itemPositionInPage >= 12 && // User is near end of current page
        pageOfLastVisibleItem >= currentPage - 1; // Don't load if we're viewing old content

      if (shouldLoadMore) {
        console.log("Triggering loadMore:", {
          lastVisibleIndex,
          pageOfLastVisibleItem,
          itemPositionInPage,
          lastLoadedPage: lastLoadedPageRef.current,
          currentPage,
          highestViewedPage: highestViewedPageRef.current,
        });
        loadMore();
      }
    },
    [hasMore, isLoadingMore, loadMore, currentPage]
  );

  // // ✅ Categories
  // const categories = data?.data?.featured_categories.map((c) => c);

  // const sortedCategories = [
  //   {
  //     id: 0,
  //     name: "All",
  //     slug: "",
  //     image_url: "",
  //     product_count: 0,
  //     subcategories: [],
  //   },
  //   ...(categories ?? []),
  // ];

  return (
    <TabWrapper>
      <MainHeader
        left={<Back onPress={() => router.back()} width={35} height={35} />}
        header={"Category"}
        right={<Search width={35} height={35} />}
      />

      {/* <TopCategories /> */}

      <Text className="font-inter-semibold text-lg pt-8">Explore Products</Text>
      {loadingCategories ? (
        <ActivityIndicator size={"small"} color="#FDEBD5" />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={sortedCategories}
          renderItem={({ item }) => (
            <CategoryItem
              setSelectCategory={setSelectCategory!}
              selectCategory={selectCategory!}
              item={item}
            />
          )}
          style={{ marginTop: 10 }}
          keyExtractor={(item) => `${item.id}`}
        />
      )}

      <Text className="font-inter-semibold text-lg pt-8">
        Discover latest collection{" "}
      </Text>

      <View className="mt-10">
        {isFetching && currentPage === 1 ? (
          // Category switched → full loader
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" />
            <Text className="mt-2">Loading products...</Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={products!?.products ?? []}
            numColumns={2}
            renderItem={({ item }) => <ProductCard {...item} />}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 10,
            }}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            ListFooterComponent={renderFooter}
            keyExtractor={(item, index) => `${item.id}+${index}`}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
          />
        )}
        {isFetching && products!?.products?.length === 0 && (
          <View
            style={{ backgroundColor: "red" }}
            className="absolute top-0 left-0 right-0 bottom-0 bg-red-200 flex items-center justify-center z-10"
          >
            <ActivityIndicator size="large" color="#000" />
            <Text className="mt-2 text-base font-inter-medium">
              Loading products...
            </Text>
          </View>
        )}

        {/* 🔹 Overlay while fetching next page (not initial) */}
        {isFetching && products!?.products.length > 0 && (
          <View className="absolute bottom-6 left-0 right-0 flex items-center">
            <View className="px-4 py-2 bg-black/70 rounded-full flex-row items-center">
              <ActivityIndicator size="small" color="#fff" />
              <Text className="ml-2 text-white text-sm font-inter-medium">
                Loading more products...
              </Text>
            </View>
          </View>
        )}
      </View>
    </TabWrapper>
  );
}
