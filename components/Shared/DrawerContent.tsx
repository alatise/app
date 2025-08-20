import Arrow from '@/assets/images/iconsvg/arrowright.svg';
import { IMAGES } from '@/constants/Images';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';


export default function CustomDrawerContent(props: any) {

    const drawerItems = [
        {
            icon: IMAGES.home,
            name: "Home",
            navigate: "index",
        },
        {
            icon: IMAGES.producta,
            name: "Products",
            navigate: "products",
        },
        {
            icon: IMAGES.components,
            name: "Components",
            navigate: "Components",
        },
        {
            icon: IMAGES.star,
            name: "Featured",
            navigate: "Writereview",
        },
        {
            icon: IMAGES.heart,
            name: "Wishlist",
            navigate: "wishlist",
        },
        {
            icon: IMAGES.order,
            name: "My Orders",
            navigate: 'orders',
        },
        {
            icon: IMAGES.shopping,
            name: "My Cart",
            navigate: 'myCart',
        },
        {
            icon: IMAGES.chat,
            name: "Chat List",
            navigate: 'Chat',
        },
        {
            icon: IMAGES.user3,
            name: "Profile",
            navigate: "profile",
        },
        {
            icon: IMAGES.logout,
            name: "Logout",
            navigate: 'logout',
        },
    ]

    const navigation = useNavigation();


    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            {/* Profile Header */}
            <View className="flex-row  items-center gap-3  px-2 ">
                <Image
                    source={{ uri: 'https://i.pravatar.cc/100' }}
                    className="w-16 h-16 rounded-full"
                />
                <View>
                    <Text className="text-black text-lg font-inter-semibold">John Doe</Text>
                    <Text className="text-black text-[15px] font-inter-regular">john@example.com</Text>
                </View>

            </View>

            {/* Drawer Items */}
            <View className="flex-1  pt-4">
                {/* <DrawerItemList {...props} /> */}

                {drawerItems.map((item, idx) => (
                    <Pressable
                        key={idx}
                        onPress={() => {
                            navigation.dispatch(DrawerActions.closeDrawer());


                            if (item.navigate === "index") {
                                navigation.dispatch(DrawerActions.closeDrawer());
                            }
                            if (item.navigate === "wishlist") {
                                router.push('/(drawer)/(tabs)/wishlist');
                            }
                            if (item.navigate === "orders") {
                                router.push('/(order)/ongoingOrder');
                            }
                            if (item.navigate === "myCart ") {
                                router.push('/(drawer)/(tabs)/myCart');
                            }
                            if (item.navigate === "profile ") {
                                router.push('/(drawer)/(tabs)/profile');
                            }
                            if (item.navigate === "products") {
                                router.push('/(products)/products');
                            } else {
                                navigation.navigate(item.navigate as never)

                            }
                        }}
                        className="flex-row items-center justify-between px-2 py-4 "
                    >
                        <View className="flex-row items-center space-x-3">
                            <Image source={item.icon}
                                style={{
                                    height: 18,
                                    width: 18,
                                    marginRight: 14,
                                    resizeMode: 'contain'
                                }} />
                            <Text className="text-black font-inter-regular text-base">{item.name}</Text>
                        </View>
                        <Arrow />
                    </Pressable>
                ))}
            </View>

            {/* Logout */}
            <Pressable
                onPress={() => {
                    console.log('Logout');
                }}
                className="px-2 mt-10 border-t-[1px] border-[#ccc] pt-3"
            >
                <Text className="text- text-base font-inter-medium">Kabils Grillz</Text>
                <Text className='text-[13px] font-inter-regular'>App Version 1.0</Text>
            </Pressable>
        </DrawerContentScrollView>
    );
}
