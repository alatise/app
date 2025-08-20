import Visa from '@/assets/images/iconsvg/visa.svg';
import React from 'react';
import { Text, View } from 'react-native';

type CardProps = {
    className?: string
}

const Card: React.FC<CardProps> = ({ className }) => {
    return (

        <View className={` rounded-lg shadow-md p-4 py-6 mt-4 mr-4 ${className}`}>
            <View className='flex-row items-center justify-between mb-4'>
                <View className='flex-row items-center gap-3'>
                    <View className='flex-row h-5 w-5 items-center gap-3 justify-center border-[1px] border-white p-1 rounded-full'>
                        <View className='bg-white h-3 w-3 rounded-full' />
                    </View>
                    <Text className='text-white font-montserrat-Regular text-xs'>CREDIT CARD</Text>
                </View>
                <Visa />
            </View>

            <Text className='text-white font-montserrat-Regular text-lg tracking-[4px] pt-2'>**** **** **** 4532</Text>


            <View className='flex-row items-center justify-between mt-4'>
                <Text className='text-white font-montserrat-Medium'>Roopa Smith</Text>

                <View className='flex-row items-center gap-8'>
                    <View>
                        <Text className='text-[#c5c0c0] font-montserrat-Regular text-xs'>EXP</Text>
                        <Text className='text-white font-montserrat-Medium'>14/07</Text>
                    </View>
                    <View>
                        <Text className='text-[#c5c0c0] font-montserrat-Regular text-xs'>CVV</Text>
                        <Text className='text-white font-montserrat-Medium'>201</Text>
                    </View>
                </View>

            </View>
        </View>

    )
}

export default Card