import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import ProductCard from './ProductCard';
import { products } from './product';

const Products = () => {
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
        <View className='py-6'>
            <Text className='font-inter-semibold text-lg '>Explore Products</Text>
            <ScrollView horizontal className='mt-4'>
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


            <View className='mt-10'>
                <FlatList
                    data={products}
                    numColumns={2}
                    renderItem={() => (<ProductCard />)}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        marginBottom: 10,
                    }} />
            </View>

        </View>
    )
}

export default Products