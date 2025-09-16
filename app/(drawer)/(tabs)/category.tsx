/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import Back from "@/assets/images/iconsvg/back.svg";
import Close from "@/assets/images/iconsvg/close1.svg";
import Search from "@/assets/images/iconsvg/search.svg";
import ProductCard from "@/components/Products/ProductCard";
import MainHeader from "@/components/Shared/MainHeader";
import SearchResultsComp from "@/components/Shared/SearchResults";
import TabWrapper from "@/components/Shared/TabWrapper";
import { SearchProductsResponse } from "@/lib/type";
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryIdQuery,
} from "@/services/products";
import axios from "axios";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CategoryScreen() {
  const { data, isLoading: loadingCategories } = useGetCategoriesQuery();
  const [showSearch, setShowSearch] = useState(false);
  const [showOnlySelected, setShowOnlySelected] = useState(false);

  // LOCAL state for CategoryScreen - not using global context
  const [localSelectCategory, setLocalSelectCategory] = useState<any>({
    id: 0,
    name: "All",
    slug: "",
    image_url: "",
    product_count: 0,
    subcategories: [],
  });
  const [localCurrentPage, setLocalCurrentPage] = useState(1);
  const [localHasMore, setLocalHasMore] = useState(true);

  // search state
  const [searchState, setSearchState] = useState("");
  const [searchResults, setSearchResult] = useState<SearchProductsResponse>();
  const [searching, setSearching] = useState(false);

  const getResults = async () => {
    setSearching(true);
    try {
      await axios
        .get(
          `${process.env.EXPO_PUBLIC_BASE_URL}/search?q=${searchState}&page=1&per_page=16`
        )
        .then((res) => {
          setSearching(false);
          setSearchResult(res.data);
        });
    } catch (e) {
      console.log("---error", e);
      setSearching(false);
    }
  };

  useEffect(() => {
    getResults();
  }, [searchState]);

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

  console.log(">>>>>>categories data", sortedCategories);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const lastLoadedPageRef = useRef(1);
  const highestViewedPageRef = useRef(1); // Track the highest page actually viewed

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 300, // item must stay visible briefly
  };

  const {
    data: categoryProducts,
    isLoading: loadingProducts,
    isFetching,
  } = useGetProductsByCategoryIdQuery({
    id: localSelectCategory?.id === 0 ? 18 : localSelectCategory?.id,
    page: localCurrentPage,
    per_page: 16,
  });

  const products = categoryProducts?.data;

  useEffect(() => {
    if (categoryProducts) {
      const isLastPage = localCurrentPage >= products!.pagination.total_pages;
      setLocalHasMore(!isLastPage);
      setIsLoadingMore(false);
      // Update the last loaded page when data successfully loads
      lastLoadedPageRef.current = localCurrentPage;
    }
  }, [products, localCurrentPage]);

  // Reset page when category changes
  useEffect(() => {
    setLocalCurrentPage(1);
    lastLoadedPageRef.current = 1; // reset pagination tracker
    highestViewedPageRef.current = 1; // reset viewed page tracker
    setIsLoadingMore(false);
  }, [localSelectCategory?.id]);

  const loadMore = useCallback(() => {
    if (
      isLoadingMore ||
      loadingProducts ||
      isFetching ||
      !localHasMore ||
      !products
    ) {
      return;
    }

    console.log("Loading more - Current page:", localCurrentPage);
    setIsLoadingMore(true);
    setLocalCurrentPage((prev: any) => prev + 1);
  }, [
    isLoadingMore,
    loadingProducts,
    isFetching,
    localHasMore,
    products,
    localCurrentPage,
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
    ({ viewableItems }: { viewableItems: { index: number }[] }) => {
      if (!localHasMore || isLoadingMore || !viewableItems.length) return;

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
        pageOfLastVisibleItem >= localCurrentPage - 1; // Don't load if we're viewing old content

      if (shouldLoadMore) {
        console.log("Triggering loadMore:", {
          lastVisibleIndex,
          pageOfLastVisibleItem,
          itemPositionInPage,
          lastLoadedPage: lastLoadedPageRef.current,
          currentPage: localCurrentPage,
          highestViewedPage: highestViewedPageRef.current,
        });
        loadMore();
      }
    },
    [localHasMore, isLoadingMore, loadMore, localCurrentPage]
  );

  const SearchComp = (
    <View className="flex-row border-[#CCCCCC] border-[1px] w-[240px] rounded-[10px] px-2 items-center">
      <TextInput
        value={searchState}
        onChangeText={(text) => setSearchState(text)}
        placeholder="Search Products"
        className="text-base text-[#666666] font-montserrat-Regular px-4 h-[40px] rounded-[8px]"
      />
    </View>
  );

  return (
    <TabWrapper>
      <MainHeader
        left={<Back onPress={() => router.back()} width={35} height={35} />}
        header={showSearch ? SearchComp : "Category"}
        right={
          !showSearch ? (
            <Search
              onPress={() => setShowSearch(true)}
              width={35}
              height={35}
            />
          ) : (
            <Close onPress={() => setShowSearch(false)} />
          )
        }
      />

      {searchState ? (
        <SearchResultsComp
          searchResults={searchResults!}
          searching={searching}
          searchState={searchState}
        />
      ) : (
        <>
          <Text className="font-inter-semibold text-lg pt-4">
            Explore Categories
          </Text>
          {loadingCategories ? (
            <View className="flex items-center justify-center mt-10">
              <ActivityIndicator size="small" color="#B29954" />
              <Text className="mt-2 text-black text-sm  font-inter-medium">
                Loading categories...
              </Text>
            </View>
          ) : (
            <View className="mt-3">
              {showOnlySelected ? (
                <View className="flex-row items-center">
                  <View
                    className={`rounded-[8px] h-[38px] items-center flex-row px-3 flex-1 ${"bg-black"}`}
                    style={{ minWidth: 0 }}
                  >
                    {localSelectCategory?.image_url ? (
                      <Image
                        source={{
                          uri: localSelectCategory.image_url as string,
                        }}
                        className="w-[28px] h-[28px] rounded-full mr-2"
                      />
                    ) : (
                      <View className="w-[28px] h-[28px] rounded-full bg-[#E5E5E5] items-center justify-center mr-2">
                        <Text className="text-[12px] text-[#333] font-inter-semibold">
                          {localSelectCategory?.name?.charAt(0)?.toUpperCase()}
                        </Text>
                      </View>
                    )}
                    <Text
                      className={`text-[13px] font-inter-semibold flex-1 text-white`}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ flexShrink: 1, minWidth: 0 }}
                    >
                      {localSelectCategory?.name}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => setShowOnlySelected(false)}
                    className="px-3 h-[38px] rounded-[8px] bg-[#F2F2F2] items-center justify-center ml-2"
                  >
                    <Text className="text-[12px] font-inter-semibold text-[#222]">
                      Show all categories
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <View className="flex-row flex-wrap justify-between">
                  {(categories ?? []).map((item) => (
                    <Pressable
                      key={item.id}
                      onPress={() => {
                        setLocalSelectCategory(item);
                        setShowOnlySelected(true);
                      }}
                      className={`rounded-[8px] h-[38px] items-center flex-row px-3 mb-3 ${
                        localSelectCategory.name === item.name
                          ? "bg-black"
                          : "bg-[#F2F2F2]"
                      }`}
                      style={{ width: "48%" }}
                    >
                      {item.image_url ? (
                        <Image
                          source={{ uri: item.image_url }}
                          className="w-[28px] h-[28px] rounded-full mr-2"
                        />
                      ) : (
                        <View className="w-[28px] h-[28px] rounded-full bg-[#E5E5E5] items-center justify-center mr-2">
                          <Text className="text-[12px] text-[#333] font-inter-semibold">
                            {item.name?.charAt(0)?.toUpperCase()}
                          </Text>
                        </View>
                      )}
                      <Text
                        className={`text-[13px] font-inter-semibold flex-1 ${
                          localSelectCategory.name === item.name
                            ? "text-white"
                            : "text-[#222]"
                        }`}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ flexShrink: 1, minWidth: 0 }}
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          )}

          <Text className="font-inter-semibold text-lg pt-6">
            {`Discover ${localSelectCategory?.name || "latest collection"}`}
          </Text>

          <View className="mt-4">
            {isFetching && localCurrentPage === 1 ? (
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
            {isFetching && products!?.products?.length === 0 && (
              <View
                style={{ backgroundColor: "red" }}
                className="absolute top-0 left-0 right-0 bottom-0 bg-red-200 flex items-center justify-center z-10"
              >
                <ActivityIndicator size="large" color="#000" />
                <Text className="mt-2 text-base font-inter-medium">
                  Loading products ---...
                </Text>
              </View>
            )}
          </View>
        </>
      )}
    </TabWrapper>
  );
}
