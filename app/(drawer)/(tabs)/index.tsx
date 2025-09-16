import Close from "@/assets/images/iconsvg/close1.svg";
import Logo from "@/assets/images/iconsvg/logo.svg";
import Menu from "@/assets/images/iconsvg/menu.svg";
import Search from "@/assets/images/iconsvg/search.svg";
import ProductCard from "@/components/Products/ProductCard";
import { CategoryItem } from "@/components/Shared/CategoryItem";
import MainHeader from "@/components/Shared/MainHeader";
import SearchResultsComp from "@/components/Shared/SearchResults";
import TabWrapper from "@/components/Shared/TabWrapper";
import { useProductCtx } from "@/lib/productsCtx";
import { SearchProductsResponse } from "@/lib/type";
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryIdQuery,
} from "@/services/products";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function HomeScreen() {
  const [showSearch, setShowSearch] = useState(false);
  const navigation = useNavigation();
  const { data, isLoading } = useGetCategoriesQuery();

  // Product context with pagination
  const {
    selectCategory,
    setSelectCategory,
    currentPage,
    setCurrentPage,
    hasMore,
    setHasMore,
  } = useProductCtx();

  // Pagination refs
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const lastLoadedPageRef = useRef(1);
  const highestViewedPageRef = useRef(1);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 300,
  };

  // Categories data
  const categories = data?.data?.categories.map((c) => c);

  // Fetch products based on selected category
  const {
    data: categoryProducts,
    isLoading: loadingProducts,
    isFetching,
  } = useGetProductsByCategoryIdQuery({
    id: selectCategory?.id === 0 ? 18 : selectCategory?.id, // Use 18 for "All" category or adjust as needed
    page: currentPage,
    per_page: 16,
  });

  const products = categoryProducts?.data;

  // Search state
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

  // Handle pagination when products data changes
  useEffect(() => {
    if (categoryProducts) {
      const isLastPage = currentPage >= products!.pagination.total_pages;
      setHasMore(!isLastPage);
      setIsLoadingMore(false);
      lastLoadedPageRef.current = currentPage;
    }
  }, [products, currentPage, setHasMore]);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
    lastLoadedPageRef.current = 1;
    highestViewedPageRef.current = 1;
    setIsLoadingMore(false);
  }, [selectCategory?.id, setCurrentPage]);

  // Load more products
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
    setCurrentPage(currentPage + 1);
  }, [
    isLoadingMore,
    loadingProducts,
    isFetching,
    hasMore,
    products,
    currentPage,
    setCurrentPage,
  ]);

  // Footer for loading indicator
  const renderFooter = () => {
    if (!isFetching && !isLoadingMore) return null;
    return (
      <View className="py-4 items-center">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  };

  // Handle viewable items for infinite scroll
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (!hasMore || isLoadingMore || !viewableItems.length) return;

      const lastVisibleIndex =
        viewableItems[viewableItems.length - 1]?.index ?? 0;

      const pageOfLastVisibleItem = Math.floor(lastVisibleIndex / 15) + 1;

      if (pageOfLastVisibleItem > highestViewedPageRef.current) {
        highestViewedPageRef.current = pageOfLastVisibleItem;
      }

      const itemPositionInPage = lastVisibleIndex % 15;
      const shouldLoadMore =
        pageOfLastVisibleItem >= lastLoadedPageRef.current &&
        itemPositionInPage >= 12 &&
        pageOfLastVisibleItem >= currentPage - 1;

      if (shouldLoadMore) {
        loadMore();
      }
    },
    [hasMore, isLoadingMore, loadMore, currentPage]
  );

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
        left={
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            className=" w-[50px] h-[40px] flex-row items-center justify-start"
          >
            <Menu
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              width={16}
              height={16}
            />
          </Pressable>
        }
        center={
          showSearch ? (
            SearchComp
          ) : (
            <Logo onPress={() => setCurrentPage(1)} width={62} height={40} />
          )
        }
        right={
          !showSearch ? (
            <Search
              onPress={() => setShowSearch(true)}
              width={35}
              height={35}
            />
          ) : (
            <Close
              onPress={() => {
                setSearchState("");
                setShowSearch(false);
              }}
            />
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
          <View className="mt-2">
            <Text className="font-inter-semibold text-lg pt-4">
              Featured & Hot 🔥
            </Text>

            {isLoading ? (
              <View className="flex items-center justify-center mt-10">
                <ActivityIndicator size="small" color="#B29954" />
                <Text className="mt-2 text-black text-sm  font-inter-medium">
                  Loading categories...
                </Text>
              </View>
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
          </View>

          {/* Products Section */}
          <Text className="font-inter-semibold text-lg pt-6">
            {`Discover ${selectCategory?.name || "latest collection"}`}
          </Text>

          <View className="mt-4 flex-1">
            {isFetching && currentPage === 1 ? (
              // Category switched → full loader
              <View className="flex-1 items-center justify-center py-20">
                <ActivityIndicator size="large" />
                <Text className="mt-2">Loading products...</Text>
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={products?.products ?? []}
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
            {isFetching && products?.products?.length === 0 && (
              <View className="absolute top-0 left-0 right-0 bottom-0 bg-red-200 flex items-center justify-center z-10">
                <ActivityIndicator size="large" color="#000" />
                <Text className="mt-2 text-base font-inter-medium">
                  Loading products...
                </Text>
              </View>
            )}
          </View>
        </>
      )}
    </TabWrapper>
  );
}
