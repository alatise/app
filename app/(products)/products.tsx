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
import SortModal from "@/components/Products/SortModal";
import SearchResultsComp from "@/components/Shared/SearchResults";
import { useProductCtx } from "@/lib/productsCtx";
import { SearchProductsResponse } from "@/lib/type";
import { useGetCartQuery } from "@/services/cart";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/services/products";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
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

  const [filters, setFilters] = useState({
    order: "",
    orderBy: "",
    min_price: 0,
    max_price: 0,
    category: "",
  });

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const lastLoadedPageRef = useRef(1);
  const highestViewedPageRef = useRef(1); // Track the highest page actually viewed

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 300, // item must stay visible briefly
  };

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
  const sortRef = useRef<BottomSheetModal>(null);

  const [toggleGrid, setToggleGrid] = useState(false);

  function openFilterModal(open: boolean) {
    open ? filterRef.current?.present() : filterRef.current?.dismiss();
  }

  function openSortModal(open: boolean) {
    open ? sortRef.current?.present() : sortRef.current?.dismiss();
  }

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
  } = useGetProductsQuery({
    id: selectCategory!?.id,
    page: currentPage,
    per_page: 16,
    category: filters.category,
    max_price: filters.max_price,
    min_price: filters.min_price,
    order: filters.order,
    orderby: filters.orderBy,
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
          sortRef.current?.dismiss();
        }}
      />
    ),
    []
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white pt-6 px-4">
          <View className="flex-1">
            {/* Scrollable content */}
            <View className="flex-1">
              {/* Your top section */}
              <View>
                <View className="flex-row justify-between">
                  <View className="flex-row gap-2 w-[62%]">
                    <Arrow
                      width={45}
                      height={45}
                      onPress={() => router.back()}
                    />
                    <View className="flex-row w-full border-[#CCCCCC] border-[1px] rounded-[8px] px-4 items-center">
                      <Search width={20} height={20} />
                      <TextInput
                        value={searchState}
                        onChangeText={(text) => setSearchState(text)}
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

                {/* <FlatList
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
                /> */}
              </View>

              {/* Product grid or list */}

              {searchState ? (
                <SearchResultsComp
                  searchResults={searchResults!}
                  searching={searching}
                  searchState={searchState}
                />
              ) : (
                <>
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
                              marginBottom: 30,
                            }}
                            //@ts-expect-error
                            onViewableItemsChanged={onViewableItemsChanged}
                            viewabilityConfig={viewabilityConfig}
                            ListFooterComponent={renderFooter}
                            keyExtractor={(item, index) =>
                              `${item.id}+${index}`
                            }
                            removeClippedSubviews={true}
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
                            //@ts-expect-error
                            onViewableItemsChanged={onViewableItemsChanged}
                            viewabilityConfig={viewabilityConfig}
                            ListFooterComponent={renderFooter}
                            keyExtractor={(item, index) =>
                              `${item.id}+${index}`
                            }
                            removeClippedSubviews={true}
                            maxToRenderPerBatch={10}
                            windowSize={10}
                          />
                        </View>
                      )}
                    </>
                  )}
                </>
              )}
            </View>
          </View>
        </View>

        {/* Fixed Bottom Bar */}
        <View className="flex-row bottom h-[60px] items-center mt-20 justify-center gap-6 border-t border-[#D9D9D9] px-4 py-4 bg-white">
          <Pressable
            onPress={() =>
              setFilters({
                min_price: 0,
                max_price: 0,
                category: "",
                order: "DESC",
                orderBy: "",
              })
            }
            className="flex-row items-center gap-2 border-[#D9D9D9] border-r px-4"
          >
            <Text className="font-montserrat-Regular text-[15px]">RESET</Text>
          </Pressable>
          <Pressable
            onPress={() => openSortModal(true)}
            className="flex-row items-center gap-2 border-[#D9D9D9] border-r px-4"
          >
            <User />
            <Text className="font-montserrat-Regular text-[15px]">SORT</Text>
          </Pressable>
          <TouchableOpacity
            onPress={() => openFilterModal(true)}
            className="flex-row items-center gap-2 px-4"
          >
            <User />
            <Text className="font-montserrat-Regular text-[15px]">FILTER</Text>
          </TouchableOpacity>
        </View>

        <BottomSheetModal
          ref={filterRef}
          index={1}
          snapPoints={["60%"]}
          containerStyle={{
            zIndex: 20,
          }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={{ flex: 1 }}>
            <FilterModal
              openFilterModal={openFilterModal}
              filters={filters}
              setFilters={setFilters}
            />
          </BottomSheetView>
        </BottomSheetModal>
        <BottomSheetModal
          ref={sortRef}
          index={1}
          snapPoints={["60%"]}
          containerStyle={{
            zIndex: 20,
          }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={{ flex: 1 }}>
            <SortModal
              openSortModal={openSortModal}
              filters={filters}
              setFilters={setFilters}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

export default Products;
