import Bell from "@/assets/images/iconsvg/bell.svg";
import Logo from "@/assets/images/iconsvg/logo.svg";
import Man from "@/assets/images/iconsvg/man.svg";
import Menu from "@/assets/images/iconsvg/menu.svg";
import Products from "@/components/Products";
import { CategoryItem } from "@/components/Shared/CategoryItem";
import MainHeader from "@/components/Shared/MainHeader";
import TopCategories from "@/components/Shared/TopCategories";
import { useProductCtx } from "@/lib/productsCtx";
import { useHomeDataQuery } from "@/services/products";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList } from "react-native";

import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { data, isLoading } = useHomeDataQuery();

  const { selectCategory, setSelectCategory } = useProductCtx();

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

  const renderHeader = () => (
    <View>
      <MainHeader
        left={
          <Menu
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            width={16}
            height={16}
          />
        }
        center={<Logo width={62} height={40} />}
        right={
          <Bell
            onPress={() => router.push("/notifications")}
            width={35}
            height={35}
          />
        }
      />
      <View className="mt-4">
        <TopCategories view_all />

        <View className="mt-6">
          <Text className="uppercase text-[#CC0D39] text-[8px] font-inter-regular">
            luxury and self-expression
          </Text>
          <Text className="text-[22px] font-inter-bold pt-2">
            Best Selling Grillz
          </Text>
          {/* <Button
          textClassName="text-black text-sm font-inter-medium"
          className="mt-3 h-[40px] w-[190px] bg-secondary"
        >
          Shop Now
        </Button> */}

          <View className="mt-8">
            <Man />
          </View>
        </View>

        <Text className="font-inter-semibold text-lg pt-4">
          Explore Products
        </Text>

        {/* Horizontal Categories */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCategories}
          renderItem={({ item }) => (
            <CategoryItem
              setSelectCategory={setSelectCategory!}
              selectCategory={selectCategory!}
              item={item}
            />
          )}
          keyExtractor={(item) => `${item.id}`}
          style={{ marginTop: 10 }}
        />
      </View>
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
        center={<Logo width={62} height={40} />}
        right={
          <Bell
            onPress={() => router.push("/notifications")}
            width={35}
            height={35}
          />
        }
      />
      <View className="mt-4">
        {/* <TopCategories view_all />

        <View className="mt-6">
          <Text className="uppercase text-[#CC0D39] text-[8px] font-inter-regular ">
            luxury and self-expression
          </Text>
          <Text className="text-[22px] font-inter-bold pt-2">
            Best Selling Grillz
          </Text>
          <Button
            textClassName="text-black items-center  text-sm font-inter-medium  "
            className="mt-3 h-[40px] w-[190px] bg-secondary"
            children="Shop Now"
            onPress={() => {}}
          />

          <View className="mt-8">
            <Man />
          </View>
        </View> */}

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

      {/* <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between py-2 mt-6 bg-white gap-4">
          <TextInput
            placeholder="Search Products"
            className="text-base text-[#666666] font-inter-medium border-[#CCCCCC] px-4 border-[1px] h-[50px] rounded-[8px] flex-1"
          />
          <Filter width={50} height={50} />
        </View>

        <TopCategories view_all />

        <View className="mt-6">
          <Text className="uppercase text-[#CC0D39] text-[8px] font-inter-regular ">
            luxury and self-expression
          </Text>
          <Text className="text-[22px] font-inter-bold pt-2">
            Best Selling Grillz
          </Text>
          <Button
            textClassName="text-black items-center  text-sm font-inter-medium  "
            className="mt-3 h-[40px] w-[190px] bg-secondary"
            children="Shop Now"
            onPress={() => {}}
          />

          <View className="mt-8">
            <Man />
          </View>
        </View>
      </ScrollView> */}

      <Products />
    </SafeAreaView>
  );
}
