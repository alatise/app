import Back from '@/assets/images/iconsvg/back.svg';
import Search from '@/assets/images/iconsvg/search.svg';
import MainHeader from '@/components/Shared/MainHeader';
import TabWrapper from '@/components/Shared/TabWrapper';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

type SettingsCardProps = {
    title: string
    subtitle?: string
}
const NotificationCard = ({ title, subtitle }: SettingsCardProps) => {
    return (
        <View className='flex-row items-center gap-3 py-1 rounded-[8px] mb-4 border-b border-[#CCCCCC]'>
            <View className='w-[60px] h-[60px] bg-[#999999] rounded-full '>
            </View>
            <View className=''>
                <Text className='text-lg font-inter-medium'>{title}</Text>
                <Text className='text-[13px] font-inter-regular'>{subtitle}</Text>
            </View>

        </View>
    );
}

const notifications = () => {
    return (
        <TabWrapper>
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-white pt-10">
                <MainHeader left={<Back onPress={() => router.back()} width={35} height={35} />} header={"Notifications (12)"}
                    right={<Search width={35} height={35} />} />


                <View className='mt-8'>
                    <NotificationCard title='New Arrivals Alert!' subtitle='15 July 2025' />
                    <NotificationCard title='Flash Sale Announcement' subtitle='10 July 2025' />
                    <NotificationCard title='Price Drop on Wishlist Item' subtitle='5 July 2025' />
                    <NotificationCard title='New Collection Launch' subtitle='1 July 2025' />
                    <NotificationCard title='Feedback Request' subtitle='25 June 2025' />
                    <NotificationCard title='Special Offer Just for You' subtitle='20 June 2025' />
                    <NotificationCard title='Dont Miss Out on Savings' subtitle='20 June 2025' />
                    <NotificationCard title='Get Ready to Shop' subtitle='20 June 2025' />

                </View>
            </ScrollView>
        </TabWrapper>
    )
}

export default notifications