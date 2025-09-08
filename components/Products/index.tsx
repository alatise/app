// import { useProductPagination } from "@/hooks/useProductPagination";
import { useProductCtx } from "@/lib/productsCtx";
import {
  useGetProductsByCategoryIdQuery,
  useHomeDataQuery,
} from "@/services/products";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import ProductCard from "./ProductCard";

const ProductsView = () => {
  const { data, isLoading } = useHomeDataQuery();
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

  console.log(">>>>loadingPorducts", loadingProducts);

  const products = categoryProducts?.data.products;

  useEffect(() => {
    if (categoryProducts) {
      const isLastPage =
        currentPage >= categoryProducts?.data.pagination.total_pages;
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
    //@ts-expect-error
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

  // ✅ Categories
  const categories = data?.data?.featured_categories.map((c) => c);

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

  return (
    <View className="mt-4 pb-[140px]">
      {products?.length === 0 && !isFetching && (
        <View className="flex items-center justify-center mt-20">
          <Text className="mt-2 text-black text-sm font-inter-medium">
            No products under this category..
          </Text>
        </View>
      )}

      {isFetching && currentPage === 1 ? (
        <View className="flex items-center justify-center mt-20">
          <ActivityIndicator size="small" color="#B29954" />
          <Text className="mt-2 text-black text-sm font-inter-medium">
            Loading products...
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products ?? []}
          numColumns={2}
          renderItem={({ item }) => <ProductCard {...item} />}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 20,
          }}
          //@ts-expect-error
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          ListFooterComponent={renderFooter}
          keyExtractor={(item, index) => `${item.id}+${index}`}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      )}

      {/* 🔹 Overlay while fetching next page (not initial) */}
      {isLoadingMore && (
        <View className="absolute bottom-6 left-0 right-0 flex items-center">
          <View className="px-4 py-2 bg-black/70 rounded-full flex-row items-center">
            <ActivityIndicator size="small" color="#fff" />
            <Text className="ml-2 text-black text-sm font-inter-medium">
              Loading more products...
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProductsView;
