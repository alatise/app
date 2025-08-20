import Back from '@/assets/images/iconsvg/back.svg';
import { products } from '@/components/Products/product';
import { GridProductCard, NewProductListCard } from '@/components/Products/ProductCard';
import { Button } from '@/components/Shared/Button';


import MainHeader from '@/components/Shared/MainHeader';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyOrder = () => {
    const [toggleOrder, setToggleOrder] = useState('ongoing')

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View className="flex-1 bg-white  px-4 pt-6">

                <ScrollView showsHorizontalScrollIndicator={false}>
                    <MainHeader left={<Back onPress={() => router.back()} width={35} height={35} />} header={"My Order"} right={<View />}
                    />

                    <View className='flex-row gap-4 w-full'>
                        <Button
                            children="Ongoing"
                            onPress={() => setToggleOrder('ongoing')}
                            className={`${toggleOrder === 'ongoing' ? 'bg-black' : 'bg-white border-black border-[0.5px]'}  rounded-[8px] px-4 py-4 mt-4 w-[48%]`}
                            textClassName={`${toggleOrder === 'ongoing' ? 'text-white' : 'text-black'} font-montserrat-Medium text-base`}
                        />
                        <Button
                            children="Completed"
                            onPress={() => setToggleOrder('completed')}
                            className={`${toggleOrder === 'completed' ? 'bg-black' : 'bg-white'} border-black border-[1px] rounded-[8px] px-4 py-4 mt-4 w-[48%]`}
                            textClassName={`${toggleOrder === 'completed' ? 'text-white' : 'text-black'} font-montserrat-Medium text-base`}
                        />
                    </View>


                    {toggleOrder === 'ongoing' ?
                        <FlatList
                            data={products}
                            renderItem={() => (<GridProductCard order />)}
                        /> :

                        <View className="mt-5">
                            {products.map((p, i) => (
                                <NewProductListCard order key={i} />
                            ))}
                        </View>
                    }

                </ScrollView>


            </View>
        </SafeAreaView >
    )
}

export default MyOrder