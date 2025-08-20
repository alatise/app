import Back from '@/assets/images/iconsvg/back.svg';
import Add from '@/assets/images/iconsvg/plusaddress.svg';

import { Button } from '@/components/Shared/Button';
import Card from '@/components/Shared/card';

import MainHeader from '@/components/Shared/MainHeader';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddCard = () => {
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View className="flex-1 bg-white  px-4 pt-6">

                <ScrollView>
                    <MainHeader left={<Back onPress={() => router.back()} width={35} height={35} />} header={"Add Card"} right={<View />}
                    />

                    <View className='flex-row items-center justify-between pt-4'>
                        <Text className='font-montserrat-Medium text-base '>Payment Method</Text>
                        <View className='flex-row items-center gap-3'>
                            <Add width={14} height={14} />
                            <Text className='font-montserrat-Medium text-[13px]'>Add Card</Text>
                        </View>
                    </View>


                    <Card className='bg-[#A11F3D]' />

                    <View>
                        <View className='mt-4'>
                            <Text className='font-montserrat-Regular'>Card Name</Text>
                            <TextInput placeholder='Enter Card Name' className='border-[0.3px] flex-row justify-start font-montserrat-Regular px-3 h-14 border-[#D9D9D9] mt-2 rounded-[8px]' />
                        </View>

                        <View className='mt-4'>
                            <Text className='font-montserrat-Regular'>Card Number</Text>
                            <TextInput placeholder='Enter Card Name' className='border-[0.3px] flex-row justify-start font-montserrat-Regular px-3 h-14 border-[#D9D9D9] mt-2 rounded-[8px]' />
                        </View>

                        <View className='flex-row  mt-4 gap-4'>
                            <View className='mt-4 w-[48%]'>
                                <Text className='font-montserrat-Regular'>Expiry Date</Text>
                                <TextInput placeholder='MM/YY' className='border-[0.3px] flex-row justify-start font-montserrat-Regular px-3 h-14 border-[#D9D9D9] mt-2 rounded-[8px]' />
                            </View>
                            <View className='mt-4 w-[48%]'>
                                <Text className='font-montserrat-Regular'>CVV</Text>
                                <TextInput placeholder='456' className='border-[0.3px] flex-row justify-start font-montserrat-Regular px-3 h-14 border-[#D9D9D9] mt-2 rounded-[8px]' />
                            </View>
                        </View>

                    </View>




                </ScrollView>

                <View className="flex-row items-center gap-3 border-[#D9D9D9] border-t py-4">
                    <Button onPress={() => { }} children="Add Card" className="bg-black rounded-[8px] px-4 py-4  w-full"
                        textClassName='text-white font-montserrat-Medium text-base' />
                </View>
            </View>
        </SafeAreaView >
    )
}

export default AddCard