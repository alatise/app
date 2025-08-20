
import Arrow from '@/assets/images/iconsvg/arrowleft2.svg';
import Cart from '@/assets/images/iconsvg/cart.svg';
import Grid from '@/assets/images/iconsvg/gridicon.svg';
import Search from '@/assets/images/iconsvg/search2.svg';
import User from '@/assets/images/iconsvg/user2.svg';
import FilterModal from '@/components/Products/FilterModal';
import { products } from '@/components/Products/product';
import { NewProductGridCard, NewProductListCard } from '@/components/Products/ProductCard';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Products = () => {
  const categories = [
    "Crazy Deals",
    "Budget Buys",
    "Gold",
    "Silver",
    "Diamond",
    "Platinum",
    "Pearl",
  ];

  const filterRef = useRef<BottomSheetModal>(null)


  const [toggleGrid, setToggleGrid] = useState(false)

  function openFilterModal(open: boolean) {
    open
      ? filterRef.current?.present()
      : filterRef.current?.dismiss()
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => {
          filterRef.current?.dismiss()
        }}
      />
    ),
    [],
  )


  return (
    <SafeAreaView style={{ flex: 1 }} >
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white pt-10 px-4">
          <View className="flex-1">
            {/* Scrollable content */}
            <ScrollView className="flex-1">
              {/* Your top section */}
              <View className="flex-row justify-between">
                <View className="flex-row gap-2 w-[62%]">
                  <Arrow width={45} height={45} onPress={() => router.back()} />
                  <View className="flex-row w-full border-[#CCCCCC] border-[1px] rounded-[8px] px-4 items-center">
                    <Search width={20} height={20} />
                    <TextInput
                      placeholder="Search Products"
                      className="text-base text-[#666666] font-montserrat-Regular px-4 h-[43px] rounded-[8px]"
                    />
                  </View>
                </View>

                <View className="flex-row items-center gap-4">
                  <Grid onPress={() => setToggleGrid(!toggleGrid)} width={18} height={18} />
                  <Cart onPress={() => router.push('/myCart')} width={28} height={28} />
                </View>
              </View>

              {/* Horizontal scroll categories */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
                {categories.map((c, i) => (
                  <View
                    key={i}
                    className={`rounded-[8px] h-[38px] items-center flex-row px-8 mr-5 ${i === 0 ? 'bg-black' : 'bg-[#F2F2F2]'
                      }`}
                  >
                    <Text
                      className={`text-[13px] font-montserrat-Regular ${i === 0 ? 'text-white' : 'text-[#222]'
                        }`}
                    >
                      {c}
                    </Text>
                  </View>
                ))}
              </ScrollView>

              <View className="bg-[#999999] w-full h-[53px] rounded-[8px] mt-6" />

              {/* Product grid or list */}
              {toggleGrid ? (
                <View className="mt-5">
                  <FlatList
                    data={products}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({ item, index }) => <NewProductGridCard key={index} />}
                    columnWrapperStyle={{
                      justifyContent: 'space-between',
                      marginBottom: 20,
                    }}
                  />
                </View>
              ) : (
                <View className="mt-5">
                  {products.map((p, i) => (
                    <NewProductListCard key={i} />
                  ))}
                </View>
              )}
            </ScrollView>

            {/* Fixed Bottom Bar */}
            <View className="flex-row items-center justify-center gap-6 border-t border-[#D9D9D9] px-4 py-4 bg-white">
              <View className="flex-row items-center gap-2 border-[#D9D9D9] border-r pr-4">
                <User />
                <Text className="font-montserrat-Regular text-[15px]">GENDER</Text>
              </View>
              <View className="flex-row items-center gap-2 border-[#D9D9D9] border-r px-4">
                <User />
                <Text className="font-montserrat-Regular text-[15px]">SORT</Text>
              </View>
              <TouchableOpacity onPress={() => openFilterModal(true)} className="flex-row items-center gap-2 px-4">
                <User />
                <Text className="font-montserrat-Regular text-[15px]">FILTER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <BottomSheetModal
          ref={filterRef}
          index={0}
          snapPoints={['80%']}
          containerStyle={{
            zIndex: 20,
          }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={{ flex: 1 }}>
            <FilterModal />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>


  )
}

export default Products





