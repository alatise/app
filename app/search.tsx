import Arrow from '@/assets/images/iconsvg/arrowLeft.svg';
import Close from '@/assets/images/iconsvg/close.svg';

import ExploreProductCategory from '@/components/Products/ExploreProductCategory';
import TabWrapper from '@/components/Shared/TabWrapper';
import React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

type SettingsCardProps = {
    title: string
}
const SettingsCard = ({ title }: SettingsCardProps) => {
    return (
        <View className='flex-row items-center justify-between py-1 rounded-[8px] mb-4'>
            <View className='flex-row items-center gap-3'>
                <Text className='text-base font-inter-regular'>{title}</Text>
            </View>

            <Close width={20} height={20} />
        </View>
    );
}

const search = () => {
    return (
        <TabWrapper>
            <ScrollView className="flex-1 bg-white">
                <View className='flex-row items-center justify-between py-2 mt-6 bg-white gap-4'>
                    <Arrow width={48} height={48} />
                    <TextInput placeholder='Search Best items for You' className='text-base text-[#666666] font-inter-medium border-[#CCCCCC] px-4 border-[1px] h-[50px] rounded-[8px] flex-1' />
                </View>

                <Text className='font-inter-semibold text-lg mt-4 '>Categories</Text>
                <ExploreProductCategory />

                <View className='flex-row items-center justify-between mt-6'>
                    <Text className='text-lg font-inter-medium text-title'>Search History</Text>
                    <Text className='underline text-sm font-inter-medium'>Clear All</Text>
                </View>


                <View className='mt-4'>
                    <SettingsCard title='Tooth whitening' />
                    <SettingsCard title='Diamond carat' />
                    <SettingsCard title='Silver bracelet' />
                    <SettingsCard title='Accessories' />
                    <SettingsCard title='Iced out solid' />
                </View>


            </ScrollView>
        </TabWrapper>
    )
}

export default search