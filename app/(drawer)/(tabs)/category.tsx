import Back from '@/assets/images/iconsvg/back.svg';

import Search from '@/assets/images/iconsvg/search.svg';
import ExploreProductCategory from '@/components/Products/ExploreProductCategory';
import { Button } from '@/components/Shared/Button';
import MainHeader from "@/components/Shared/MainHeader";
import TabWrapper from '@/components/Shared/TabWrapper';
import TopCategories from '@/components/Shared/TopCategories';
import React from "react";
import { FlatList, Text, View } from "react-native";

export default function CategoryScreen() {
  return (
    <TabWrapper>
      <MainHeader left={<Back width={35} height={35} />} header={"Category"}
        right={<Search width={35} height={35} />} />

      <TopCategories />

      <Text className='font-inter-semibold text-lg pt-8'>Explore Products</Text>
      <ExploreProductCategory />


      <Text className='font-inter-semibold text-lg pt-8'>Discover latest collection </Text>

      <View className='mt-6'>
        <FlatList
          data={Array(4).fill(0)}
          numColumns={2}
          renderItem={() => (<View className='bg-[#FDEBD5] w-[48%] rounded-[8px] '>
            <View className='bg-[#999999] h-[139px] mx-2'></View>
            <Button children="Woman (44 Items)" onPress={() => { }} className='bg-[#BE9D74] mt-4' textClassName='text-white text-base font-inter-medium ' />
          </View>)}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 10,
          }} />
      </View>
    </TabWrapper>
  );
}
