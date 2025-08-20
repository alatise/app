import Back from '@/assets/images/iconsvg/back.svg';
import Check from '@/assets/images/iconsvg/check.svg';
import Search from '@/assets/images/iconsvg/search.svg';
import { products } from '@/components/Products/product';
import { GridProductCard } from '@/components/Products/ProductCard';
import { Button } from '@/components/Shared/Button';
import MainHeader from "@/components/Shared/MainHeader";
import TabWrapper from '@/components/Shared/TabWrapper';
import { router } from 'expo-router';
import React from "react";
import { FlatList, Text, View } from "react-native";

export default function CartScreen() {
  return (
    <TabWrapper>
      <MainHeader left={<Back onPress={() => router.back()} width={35} height={35} />} header={"My Cart"}
        right={<Search onPress={() => router.push('/search')} width={35} height={35} />} />

      <View className='mt-6'>
        <Text className='font-inter-regular text-lg '>Subtotal <Text className=' font-inter-bold'>£3,599</Text></Text>

        <View className='flex-row  items-center gap-3 pt-1'>
          <Check width={23} height={23} />
          <Text className='text-secondary text-[15px] font-inter-medium'>Your order is eligible for free Devivery</Text>
        </View>
      </View>


      <View className='mb-10'>
        <FlatList
          data={products}
          renderItem={() => (<GridProductCard  />)}
        />

        <Button children="Proceed to Buy (4 items)" onPress={() => { }} className='bg-[#000] mt-6 py-4' textClassName='text-white text-base font-inter-regular ' />
      </View>
    </TabWrapper>
  );
}
