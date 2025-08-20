import Gold from '@/assets/images/iconsvg/categoryimg.svg';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const TopCategories = () => {
    const categories = [
        "Gold",
        "Silver",
        "Diamond",
        "Platinum",
        "Pearl",
        "Ruby",
        "Emerald",
        "Sapphire",
        "Opal",
        "Topaz"
    ];

    return (
        <View className='mt-6'>
            <View className='flex-row items-center justify-between'>
                <Text className='text-lg font-inter-medium text-title'>Top Categories</Text>
                <Text className='underline text-sm font-inter-medium'>View All</Text>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal className='mt-4'>
                {categories.map((name, i) => (
                    <View key={i} className='justify-center w-[60px] mr-8'>
                        <Gold width={60} height={60} className='mx-auto' />
                        <Text className='text-sm font-inter-medium text-title text-center pt-2'>{name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default TopCategories