import Back from '@/assets/images/iconsvg/back.svg';

import { Button } from '@/components/Shared/Button';

import MainHeader from '@/components/Shared/MainHeader';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddDeliveryAddress = () => {
    const categories = [
        "Home",
        "Shop",
        "Office"
    ];
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View className="flex-1 bg-white  px-4 pt-6">

                <ScrollView>
                    <MainHeader left={<Back onPress={() => router.back()} width={35} height={35} />} header={"Add Delivery Address"} right={<View />}
                    />

                    <View className='flex-row items-center justify-between pt-4'>
                        <Text className='font-montserrat-Semibold text-base '>Contact Details</Text>
                    </View>

                    <View>
                        <View className='mt-4'>
                            <Text className='font-montserrat-Regular'>Full Name</Text>
                            <TextInput placeholder='Enter Card Name' className='border-[0.5px] flex-row justify-start font-montserrat-Regular px-3 h-14 border-[#D9D9D9] mt-2 rounded-[8px]' />
                        </View>

                        <View className='mt-4'>
                            <Text className='font-montserrat-Regular'>Mobile No.</Text>
                            <TextInput placeholder='Enter Card Name' className='border-[0.5px] flex-row justify-start font-montserrat-Regular px-3 h-14 border-[#D9D9D9] mt-2 rounded-[8px]' />
                        </View>
                    </View>

                    <View className='flex-row items-center justify-between pt-4'>
                        <Text className='font-montserrat-Semibold text-base '>Address</Text>
                    </View>

                    <View>
                        <View className='mt-4'>
                            <Text className='font-montserrat-Regular'>Pin Code</Text>
                            <TextInput placeholder='Enter Card Name' className='border-[0.5px] flex-row justify-start font-montserrat-Regular px-3 h-14 border-[#D9D9D9] mt-2 rounded-[8px]' />
                        </View>

                        <View className='mt-4'>
                            <Text className='font-montserrat-Regular'>Address</Text>
                            <TextInput placeholder='Enter Card Name' className='border-[0.5px] flex-row justify-start font-montserrat-Regular px-3 h-14 border-[#D9D9D9] mt-2 rounded-[8px]' />
                        </View>

                        <View className='mt-4'>
                            <Text className='font-montserrat-Regular'>Locality/Town</Text>
                            <TextInput placeholder='Enter Card Name' className='border-[0.5px] flex-row justify-start font-montserrat-Regular px-3 h-14 border-[#D9D9D9] mt-2 rounded-[8px]' />
                        </View>

                        <View className='mt-4'>
                            <Text className='font-montserrat-Regular'>City/District</Text>
                            <TextInput placeholder='Enter Card Name' className='border-[0.5px] flex-row justify-start font-montserrat-Regular px-3 h-14 border-[#D9D9D9] mt-2 rounded-[8px]' />
                        </View>

                        <View className='my-4'>
                            <Text className='font-montserrat-Regular'>State</Text>
                            <TextInput placeholder='Enter Card Name' className='border-[0.5px] flex-row justify-start font-montserrat-Regular px-3 h-14 border-[#D9D9D9] mt-2 rounded-[8px]' />
                        </View>


                        <Text className='font-montserrat-Semibold text-base '>Save Address As </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="my-4 mb-10">
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
                    </View>






                </ScrollView>

                <View className="flex-row items-center gap-3 border-[#D9D9D9] border-t py-4">
                    <Button onPress={() => { }} children="Save Address" className="bg-black rounded-[8px] px-4 py-4  w-full"
                        textClassName='text-white font-montserrat-Medium text-base' />
                </View>
            </View>
        </SafeAreaView >
    )
}

export default AddDeliveryAddress