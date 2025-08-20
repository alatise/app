import Back from '@/assets/images/iconsvg/back.svg';
import Cart from '@/assets/images/iconsvg/cart2.svg';
import Love from '@/assets/images/iconsvg/love.svg';
import Product from '@/assets/images/iconsvg/product2.svg';
import { Button } from '@/components/Shared/Button';



import MainHeader from '@/components/Shared/MainHeader';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const productDetails = () => {
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View className="flex-1 bg-white  px-4 pt-6">

                <ScrollView>


                    <MainHeader left={<Back onPress={() => router.back()} width={35} height={35} />} header={"Product Details"}
                        right={<Cart onPress={() => router.push('/myCart')} width={35} height={35} />} />
                    <View className='pt-5'>
                        <Product width={352} className='mt-10' />
                    </View>

                    <Text className='font-montserrat-Medium text-xl pt-5'>Four tooth 14ct solid gold grillz</Text>

                    <Text className='font-montserrat-Bold text-2xl pt-3'>£550 - £1,070</Text>

                    <Text className='font-montserrat-Semibold pt-3'>Description:</Text>

                    <Text className='pt-3 text-[#797777] font-montserrat-Regular'>Crafted with precision and excellence,
                        each of our exclusive gold grillz are made
                        entirely from solid gold – not just plated.
                        This commit</Text>


                    <View className='flex-row items-center justify-between mt-8 px-10'>
                        <Text className='font-montserrat-Medium'>Sets</Text>

                        <View className='bg-[#F6F6F6] px-4 py-3 rounded-[8px] w-[223px]'>
                            <Text className='font-montserrat-Regular text-sm text-center'>Choose an option</Text>
                        </View>
                    </View>
                </ScrollView>

                <View className="flex-row items-center gap-3 border-[#D9D9D9] border-t pr-4 py-4">
                    <View className='bg-[#E8E8E8] w-[76px] h-[55px] flex-row justify-center items-center rounded-[8px]'>
                        <Love />
                    </View>

                    <Button cart onPress={() => {router.push('/(products)/checkout') }} children="Add To Cart" className="bg-secondary rounded-[8px] px-4 py-5  w-[75%]"
                        textClassName='text-white font-montserrat-Medium text-base' />
                </View>

            </View>
        </SafeAreaView >
    )
}

export default productDetails