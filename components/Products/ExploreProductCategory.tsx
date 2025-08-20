import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const ExploreProductCategory = () => {
    const categories = [
        "All",
        "Jewelry",
        "Gold",
        "Silver",
        "Diamond",
        "Platinum",
        "Pearl",

    ];
    return (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal className='mt-4'>
            {categories.map((c, i) => (
                <View className={`rounded-[8px] h-[38px] items-center flex-row px-8 mr-5 ${i === 0 ? 'bg-black' : 'rounded-[8px] bg-[#F2F2F2]'
                    }`}>
                    <Text className={`text-[13px] font-inter-semibold ${i === 0 ? 'text-white' : 'text-[#222]'
                        }`}>
                        {c}
                    </Text>
                </View>
            ))}
        </ScrollView>
    )
}

export default ExploreProductCategory