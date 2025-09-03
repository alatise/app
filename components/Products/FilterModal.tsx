import Close from "@/assets/images/iconsvg/close1.svg";
import { useProductCtx } from "@/lib/productsCtx";
import { useGetCategoriesQuery } from "@/services/products";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Button } from "../Shared/Button";
import { CategoryItem } from "../Shared/CategoryItem";
import PriceRangeSlider from "./PriceRangeSlider/PriceRangeSlider";
import { ScrollView } from "react-native-gesture-handler";

// const products = [
//   {
//     img: IMAGES.nike,
//     name: "Nike",
//   },
//   {
//     img: IMAGES.adidas,
//     name: "Adidas",
//   },
//   {
//     img: IMAGES.reebook,
//     name: "Reebok",
//   },
//   {
//     img: IMAGES.puma,
//     name: "Puma ",
//   },
//   {
//     img: IMAGES.adidas,
//     name: "Adidas",
//   },
//   {
//     img: IMAGES.adidas,
//     name: "Adidas",
//   },
// ];

type Filters = {
  order: string;
  orderBy: string;
  min_price: number;
  max_price: number;
  category: string;
};

type prop = {
  openFilterModal: (open: boolean) => void;
  filters: Filters;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      order: string;
      orderBy: string;
      min_price: number;
      max_price: number;
      category: string;
    }>
  >;
};

const FilterModal = ({ filters, setFilters, openFilterModal }: prop) => {
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(50000);
  const { data, isLoading: loadingCategories } = useGetCategoriesQuery();

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

  const {
    selectCategory,
    setSelectCategory,
    currentPage,
    setCurrentPage,
    hasMore,
    setHasMore,
  } = useProductCtx();

  return (
    <View>
      <View className="flex-row justify-between items-center border-b-[0.2px] border-[#ccc] pb-4 px-6 mb-4">
        <Text className=" font-montserrat-Medium text-xl">Filters</Text>
        <Close onPress={() => openFilterModal(false)} />
      </View>

      <View className="px-6 py-3">
        {/* <View className='flex-row justify-between items-center  mb-4'>
          <Text className=' font-montserrat-Medium text-[17px]'>Brand</Text>
          <Text className=' font-montserrat-Regular text-black text-[13px]'>See All</Text>
        </View> */}

        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row gap-4 mb-4'>
          {products.map((item, index) => (
            <View className='w-[60px] mr-8'>
              <View className=' rounded-full w-[60px] h-[60px] border-[#CCCCCC] border-[0.3px] flex-row items-center justify-center mb-2'>
                <Image source={item.img} width={30} height={30} />
              </View>
              <Text className='text-sm font-montserrat-Medium text-center'>{item.name}</Text>
            </View>
          ))}
        </ScrollView> */}

        <View className="flex-row justify-between items-center  mb-4 mt-2">
          <Text className=" font-montserrat-Medium text-[17px]">
            Categories:
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row flex-wrap">
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
            style={{ marginTop: 6, flexWrap: "wrap" }}
            keyExtractor={(item) => `${item.id}`}
          />
        </ScrollView>

        {/* <View className="flex-row justify-between items-center  mb-4 mt-4">
          <Text className=" font-montserrat-Medium text-[17px]">Size:</Text>
          <Text className=" font-montserrat-Regular text-black text-[13px]">
            See All
          </Text>
        </View>

        <View className="flex-row flex-wrap">
          {nums.map((c, i) => (
            <View
              key={i}
              className={`rounded-[8px] h-[38px] items-center flex-row px-6 mr-2 mb-2 ${
                i === 0 ? "bg-black" : "bg-[#F2F2F2]"
              }`}
            >
              <Text
                className={`text-[13px] font-inter-semibold ${
                  i === 0 ? "text-white" : "text-[#222]"
                }`}
              >
                {c}
              </Text>
            </View>
          ))}
        </View> */}

        <View className="pt-6">
          <PriceRangeSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            setMinPrice={setMinPrice}
          />
        </View>

        <View className="flex-row gap-4 w-full">
          <Button
            children="Reset"
            onPress={() => {
              openFilterModal(false);
              setFilters({
                ...filters,
                min_price: 0,
                max_price: 0,
                category: "",
                order: "DESC",
                orderBy: "",
              });
            }}
            className="bg-[#F6F6F6] rounded-[8px] px-4 py-4 mt-4 w-[48%]"
            textClassName="text-black font-montserrat-Medium text-base"
          />
          <Button
            onPress={() => {
              openFilterModal(false);
              setFilters({
                ...filters,
                min_price: minPrice,
                max_price: maxPrice,
                category: selectCategory?.slug!,
              });
            }}
            children="Apply"
            className="bg-[#000] rounded-[8px] px-4 py-4 mt-4 w-[48%]"
            textClassName="text-white font-montserrat-Medium text-base"
          />
        </View>
      </View>
    </View>
  );
};

export default FilterModal;
