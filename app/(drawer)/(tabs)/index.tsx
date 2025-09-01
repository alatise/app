import Close from "@/assets/images/iconsvg/close1.svg";
import Logo from "@/assets/images/iconsvg/logo.svg";
import Menu from "@/assets/images/iconsvg/menu.svg";
import Search from "@/assets/images/iconsvg/search.svg";
import Products from "@/components/Products";
import { CategoryItem } from "@/components/Shared/CategoryItem";
import MainHeader from "@/components/Shared/MainHeader";
import SearchResultsComp from "@/components/Shared/SearchResults";
import { useProductCtx } from "@/lib/productsCtx";
import { SearchProductsResponse } from "@/lib/type";
import { useHomeDataQuery } from "@/services/products";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, TextInput } from "react-native";

import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [showSearch, setShowSearch] = useState(false);
  const navigation = useNavigation();
  const { data, isLoading } = useHomeDataQuery();
  const { selectCategory, setSelectCategory } = useProductCtx();
  const categories = data?.data?.featured_categories.map((c) => c);

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 100,
      }}
    >
      <MainHeader
        left={
          <Menu
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            width={16}
            height={16}
          />
        }
        center={showSearch ? SearchComp : <Logo width={62} height={40} />}
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
          <View className="mt-2">
            <Text className="font-inter-semibold text-lg pt-4">
              Explore Products
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

          <Products />
        </>
      )}
    </SafeAreaView>
  );
}
