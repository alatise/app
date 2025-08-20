import Back from '@/assets/images/iconsvg/back.svg';
import Search from '@/assets/images/iconsvg/search.svg';
import Products from "@/components/Products";
import MainHeader from "@/components/Shared/MainHeader";
import TabWrapper from "@/components/Shared/TabWrapper";
import { router } from 'expo-router';
import React from "react";

export default function WishlistScreen() {
  return (
    <TabWrapper>
      <MainHeader left={<Back onPress={() => router.back()} width={35} height={35} />} header={"WishList"}
        right={<Search width={35} height={35} onPress={() => router.push('/search')} />} />
      <Products />
    </TabWrapper>

  );
}
