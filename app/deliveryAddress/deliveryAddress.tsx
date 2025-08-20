import Arrow from '@/assets/images/iconsvg/arrowright.svg';
import Back from '@/assets/images/iconsvg/back.svg';
import Delivery from '@/assets/images/iconsvg/delivery.svg';
import Home from '@/assets/images/iconsvg/home2.svg';
import Shop from '@/assets/images/iconsvg/shop.svg';



import Add from '@/assets/images/iconsvg/plusaddress.svg';

import { Button } from '@/components/Shared/Button';

import MainHeader from '@/components/Shared/MainHeader';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type DeliveryCardProps = {
    icon?: React.ReactNode;
    title: string
    address: string;
};

const DeliveryCard = ({ address, title, icon }: DeliveryCardProps) => {
    return (
        <View className='flex-row items-center justify-between mt-6'>
            <View className='flex-row items-center gap-3'>
                {icon}
                <View>
                    <Text className='font-montserrat-Medium text-xl'>{title}</Text>
                    <Text className='font-montserrat-Regular text-sm'>{address}</Text>
                </View>
            </View>
            <View className='flex-row h-5 w-5 items-center gap-3 justify-center border-[1px] border-black p-1 rounded-full'>
                <View className='bg-black h-3 w-3 rounded-full' />
            </View>
        </View >
    )

}

const deliveryAddress = () => {
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View className="flex-1 bg-white  px-4 pt-6">

                <ScrollView>
                    <MainHeader left={<Back onPress={() => router.back()} width={35} height={35} />} header={"Delivery Address"} right={<View />}
                    />
                    <DeliveryCard icon={<Home />} title='Home Address' address='123 Main Street, Anytown, USA 12345' />
                    <DeliveryCard icon={<Delivery />} title='Office Address' address='456 Corporate Blvd, Business City, USA 67890' />
                    <DeliveryCard icon={<Home />} title='Vacation Home' address='789 Beachside Ave, Coastal Town, USA 54321' />
                    <DeliveryCard icon={<Shop />} title='Shop Address' address='321 Family Lane, Hometown, USA 98765' />

                    <TouchableOpacity onPress={() => router.push('/deliveryAddress/addDeliveryAddress')} className='mt-6 border-t-[0.5px] border-[#D9D9D9] pt-4'>
                        <View className='flex-row items-center justify-between border-[1px] p-3 rounded-[8px] border-[#D9D9D9] mt-2 '>

                            <View className='flex-row items-center gap-3'>
                                <Add width={20} height={20} />
                                <Text className='font-montserrat-Regular'>Add New Address</Text>
                            </View>
                            <Arrow width={20} height={20} />
                        </View>
                    </TouchableOpacity>
                </ScrollView>

                <View className="flex-row items-center gap-3 border-[#D9D9D9] border-t py-4">
                    <Button onPress={() => { }} children="Save Address" className="bg-black rounded-[8px] px-4 py-4  w-full"
                        textClassName='text-white font-montserrat-Medium text-base' />
                </View>

            </View>
        </SafeAreaView >
    )
}

export default deliveryAddress