import Close from "@/assets/images/iconsvg/close1.svg";
import { useProductCtx } from "@/lib/productsCtx";
import { useGetCategoriesQuery } from "@/services/products";
import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { Button } from "../Shared/Button";

type Filters = {
  order: string;
  orderBy: string;
  min_price: number;
  max_price: number;
  category: string;
};

type prop = {
  openSortModal: (open: boolean) => void;
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

const SortModal = ({ filters, setFilters, openSortModal }: prop) => {
  const { data, isLoading: loadingCategories } = useGetCategoriesQuery();
  const [sort, setSort] = useState({
    order: "",
    orderBy: "",
  });

  const categories = data?.data?.categories.map((c) => c);

  console.log(">>>>folter", filters, sort);

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

  const orderBys = [
    {
      name: "Ascending",
      path: "ASC",
    },
    {
      name: "Descending",
      path: "DESC",
    },
  ];

  const order = [
    {
      name: "Rating",
      path: "rating",
    },
    {
      name: "Price",
      path: "price",
    },
  ];

  return (
    <View>
      <View className="flex-row justify-between items-center border-b-[0.2px] border-[#ccc] pb-4 px-6 mb-4">
        <Text className=" font-montserrat-Medium text-xl">Sort</Text>
        <Close onPress={() => openSortModal(false)} />
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
          <Text className=" font-montserrat-Medium text-[17px]">Order:</Text>
        </View>

        <FlatList
          data={order}
          numColumns={2}
          renderItem={({ item }: any) => (
            <Pressable
              onPress={() =>
                setSort({
                  ...sort,
                  order: item.path,
                })
              }
              className={`flex-row items-center  justify-center bg-[#F6F6F6] w-[48%] px-4 py-3 rounded-[8px] mb-4 ${
                sort.order === item.path
                  ? "bg-black"
                  : "rounded-[8px] bg-[#F2F2F2]"
              }`}
            >
              <Text
                className={`text-base font-inter-regular text-center ${
                  sort.order === item.path ? "text-white" : "text-[#222]"
                }`}
              >
                {item.name}
              </Text>
            </Pressable>
          )}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 0,
          }}
        />

        <View className="flex-row justify-between items-center  mb-4 mt-4">
          <Text className=" font-montserrat-Medium text-[17px]">Order By:</Text>
        </View>

        <FlatList
          data={orderBys}
          numColumns={2}
          renderItem={({ item }: any) => (
            <Pressable
              onPress={() =>
                setSort({
                  ...sort,
                  orderBy: item.path,
                })
              }
              className={`flex-row items-center  justify-center bg-[#F6F6F6] w-[48%] px-4 py-3 rounded-[8px] mb-4 ${
                sort.orderBy === item.path
                  ? "bg-black"
                  : "rounded-[8px] bg-[#F2F2F2]"
              }`}
            >
              <Text
                className={`text-base font-inter-regular text-center ${
                  sort.orderBy === item.path ? "text-white" : "text-[#222]"
                }`}
              >
                {item.name}
              </Text>
            </Pressable>
          )}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 0,
          }}
        />

        {/* <View className="pt-6">
          <PriceRangeSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            setMinPrice={setMinPrice}
          />
        </View> */}

        <View className="flex-row gap-4 mt-10 w-full">
          <Button
            children="Reset"
            onPress={() => {
              openSortModal(false);
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
              openSortModal(false);
              setFilters({
                ...filters,
                orderBy: sort.orderBy,
                order: sort.order,
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

export default SortModal;
