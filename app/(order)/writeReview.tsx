import Back from '@/assets/images/iconsvg/back.svg';
import Star from '@/assets/images/iconsvg/redStar.svg';



import { NewProductListCard } from '@/components/Products/ProductCard';
import { Button } from '@/components/Shared/Button';


import MainHeader from '@/components/Shared/MainHeader';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const WriteReview = () => {
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View className="flex-1 bg-white  px-4 pt-6">

                <ScrollView showsHorizontalScrollIndicator={false}>
                    <MainHeader left={<Back onPress={() => router.back()} width={35} height={35} />} header={"Write Review"} right={<View />}
                    />

                    <NewProductListCard />

                    <Text className='font-montserrat-Medium text-center text-2xl pt-6'>
                        Overall Rating
                    </Text>

                    <Text className='font-montserrat-Medium text-center text-[#00000080] text-base pt-1'>
                        Your average rating is 4.0
                    </Text>

                    <View className="flex-row justify-center items-center mt-2 mb-2 gap-2">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <Star key={idx} />
                        ))}
                    </View>

                    <View className='mt-4'>
                        <Text className='font-montserrat-Regular'>Review Title</Text>
                        <TextInput className='border-[0.5px] flex-row justify-start font-montserrat-Regular px-3 h-14 border-[#D9D9D9] mt-2 rounded-[8px]' />
                    </View>

                    <View className='mt-4'>
                        <Text className='font-montserrat-Regular'>Product Review</Text>
                        <TextInput className='border-[0.5px] flex-row justify-start font-montserrat-Regular px-3 h-40 border-[#D9D9D9] mt-2 rounded-[8px]' />
                    </View>
                </ScrollView>

                <View className="flex-row items-center gap-3 border-[#D9D9D9] border-t py-4">
                    <Button onPress={() => { }} children="Submit Review" className="bg-black rounded-[8px] px-4 py-4  w-full"
                        textClassName='text-white font-montserrat-Medium text-base' />
                </View>

            </View>
        </SafeAreaView >
    )
}

export default WriteReview