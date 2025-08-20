import Back from '@/assets/images/iconsvg/back.svg';
import Edit from '@/assets/images/iconsvg/edit.svg';
import Call from '@/assets/images/iconsvg/call.svg';
import Map from '@/assets/images/iconsvg/map.svg';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Shared/Button';

import MainHeader from '@/components/Shared/MainHeader';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProfile = () => {
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View className="flex-1 bg-white  px-4 pt-6">

                <ScrollView>
                    <MainHeader left={<Back onPress={() => router.back()} width={35} height={35} />} header={"Edit Profile"} right={<View />}
                    />

                    <View className='flex-row items-center justify-center gap-3 py-6'>

                        <View className='w-[150px] relative h-[150px] p-1 bg-white border-black border-[1px] rounded-full mb-6'>
                            <View className='bg-[#999999] h-full w-full rounded-full'>

                            </View>
                            <View className='absolute right-0 bottom-2 '>
                                <Edit width={40} height={40} />
                            </View>
                        </View>
                    </View>

                    <View className='space-y-4 gap-4'>
                        <Input
                            backround
                            inputLg
                            placeholder="Full Name"
                            value={""}
                            icon={<Feather name="user" size={20} color="#000" />}
                        />
                        <Input
                            backround
                            inputLg
                            placeholder="Email Address"
                            value={""}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            icon={<Feather name="mail" size={20} color="#000" />}
                        />
                        <Input
                            backround
                            inputLg
                            placeholder="Mobile Number"
                            value={""}
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            icon={<Call />}
                        />
                        <Input
                            backround
                            inputLg
                            placeholder="Location"
                            value={""}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            icon={<Map />}
                        />
                    </View>


                </ScrollView>

                <View className="flex-row items-center gap-3 border-[#D9D9D9] border-t py-4">
                    <Button onPress={() => { }} children="Update Profile" className="bg-black rounded-[8px] px-4 py-4  w-full"
                        textClassName='text-white font-montserrat-Medium text-base' />
                </View>
            </View>
        </SafeAreaView >
    )
}

export default EditProfile