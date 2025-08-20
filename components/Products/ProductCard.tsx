import Add from '@/assets/images/iconsvg/add.svg';
import Arrow2 from '@/assets/images/iconsvg/arrowright2.svg';
import Arrow from '@/assets/images/iconsvg/goldenarrow.svg';
import Love from '@/assets/images/iconsvg/love.svg';
import Product1 from '@/assets/images/iconsvg/product1.svg';
import Star from '@/assets/images/iconsvg/star.svg';
import Substract from '@/assets/images/iconsvg/substract.svg';
import Trash from '@/assets/images/iconsvg/trash.svg';
import { router } from 'expo-router';




import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


type GridProductCardProp = {
    order?: boolean
}
export const GridProductCard = ({ order }: GridProductCardProp) => {
    return (
        <View className={`bg-white flex-row px-3 pb-6 pt-1 mt-10 justify-between ${order ? 'items-center' : 'items-end'}   shadow-black shadow border-[0.2px] border-[#ccc] rounded-[12px]`}>
            <Product1 width={105} height={103} />

            <View className='w-[107px]'>
                <Text className='text-[11px] font-inter-regular'>Four tooth 14ct solid gold grillz</Text>
                <Text className='text-[13px] font-inter-semibold pt-'>£550 - £1,070</Text>

                {order ? <View> </View> :
                    <View className='flex-row gap-4 items-center pt-2'>
                        <Substract />
                        <Text className='text-black font-inter-medium text-[11px]'>02</Text>
                        <Add />
                    </View>
                }
            </View>

            {order ? <View> </View> :
                <View className='flex-row gap-1 items-center'>
                    <Trash />
                    <Text className='text-[#a3a0a0] font-inter-medium text-[11px]'>Remove</Text>
                </View>
            }
        </View>
    )
}


const ProductCard = () => {
    return (
        <View className='bg-white w-[48%] shadow-black shadow border-[0.2px] border-[#ccc] rounded-[6px] p-2 py-4'>
            <Product1 width={164} height={161} />

            <View className='flex-row items-center justify-between '>
                <View className='w-[107px]'>
                    <Text className='text-[11px] font-inter-regular'>Four tooth 14ct solid gold grillz</Text>
                    <Text className='text-[13px] font-inter-semibold pt-2'>£550 - £1,070</Text>

                    <View className='flex-row justify-between items-center pt-4'>
                        <View className='flex-row gap-1'>
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <Star width={10} key={idx} />
                            ))}
                        </View>
                        <Text className='text-[#A4A9B3] font-inter-light text-[9px]'>56890</Text>
                    </View>
                </View>
                <Arrow />
            </View>
        </View>
    )
}

export const NewProductGridCard = () => {
    return (
        <TouchableOpacity onPress={() => router.push('/(products)/productDetails')} className='w-[48%] '>
            <View className='bg-[#D9D9D9] rounded-[8px] h-[190px]  px-2'>
                <View className='flex-row justify-end py-3 px-2'>
                    <Love />
                </View>
                <View className='bg-[#999999] h-[118px] w-full rounded-[5px]'>
                </View>
            </View>

            <View className='pt-4'>
                <Text className='font-montserrat-Regular'>
                    Swift Glide Sprinter Soles
                </Text>


                <View className='flex-row justify-between items-center'>
                    <Text className=' font-montserrat-Semibold'>£199</Text>
                    <Arrow2 />
                </View>
            </View>

        </TouchableOpacity>
    )
}

export const NewProductListCard = ({ order }: GridProductCardProp) => {
    return (
        <TouchableOpacity onPress={() => router.push('/(products)/productDetails')} className=' flex-row gap-5 mt-6 border-b-[0.2px] pb-3 border-[#e5e5e5]'>
            <View className='bg-[#D9D9D9] flex-row justify-center items-center rounded-[8px] h-[120px] w-[120px] px-2'>
                <View className='bg-[#999999] h-[90px] w-full rounded-[5px]'>
                </View>
            </View>

            <View className='pt-4 w-[60%]'>
                <Text className='font-montserrat-Regular'>
                    Swift Glide Sprinter Soles
                </Text>


                <Text className=' font-montserrat-Semibold pt-4'>£199</Text>

                <View className='flex-row justify-between items-center pt-2'>
                    <Text className=' font-montserrat-Regular text-red-600'>40% Off</Text>
                    {order ? <View> <Text onPress={() => router.push('/(order)/writeReview')} className='font-montserrat-Medium text-sm bg-[#F6F6F6] p-2 rounded-[10px]'>Write Review</Text> </View> :
                        <Arrow2 />
                    }
                </View>
            </View>

        </TouchableOpacity>
    )
}

export default ProductCard