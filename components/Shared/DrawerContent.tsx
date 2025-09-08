import Arrow from "@/assets/images/iconsvg/arrowright.svg";
import Avatar from "@/assets/images/iconsvg/avatar.svg";

import { IMAGES } from "@/constants/Images";
import { useSession } from "@/lib/authCtx";
import { useGetProfileQuery } from "@/services/auth";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { router } from "expo-router";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";

export default function CustomDrawerContent(props: any) {
  const { session, isSessionLoading, setSession } = useSession();
  const { data, isLoading } = useGetProfileQuery();

  const { navigation } = props;

  const drawerItems = [
    {
      icon: IMAGES.home,
      name: "Home",
      navigate: "home",
    },
    {
      icon: IMAGES.producta,
      name: "Products",
      navigate: "products",
    },
    {
      icon: IMAGES.producta,
      name: "Categories",
      navigate: "categories",
    },

    // {
    //   icon: IMAGES.star,
    //   name: "Featured",
    //   navigate: "Writereview",
    // },
    {
      icon: IMAGES.heart,
      name: "Wishlist",
      navigate: "wishlist",
    },
    {
      icon: IMAGES.order,
      name: "My Orders",
      navigate: "orders",
    },
    {
      icon: IMAGES.shopping,
      name: "My Cart",
      navigate: "myCart",
    },

    {
      icon: IMAGES.user3,
      name: "Profile",
      navigate: "profile",
    },
    {
      icon: IMAGES.logout,
      name: "Logout",
      navigate: "logout",
    },
  ];

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Profile Header */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View className="flex-row  items-center gap-3  px-2 ">
          <Avatar width={30} height={30} className="rounded-full" />
          <View>
            <Text className="text-black text-[14px] font-inter-semibold">
              {data?.data.name}
            </Text>
            <Text className="text-black text-[12px] font-inter-regular">
              {data?.data.email}
            </Text>
          </View>
        </View>
      )}

      {/* Drawer Items */}
      <View className="flex-1  pt-4">
        {/* <DrawerItemList {...props} /> */}

        {drawerItems.map((item, idx) => (
          <Pressable
            key={idx}
            onPress={() => {
              navigation.closeDrawer();

              if (item.navigate === "logout") {
                router.replace("/(auth)/login");
                setSession(null!);
              }

              if (item.navigate === "home") {
                navigation.closeDrawer();
                router.replace("/(drawer)/(tabs)");
              }

              if (item.navigate === "wishlist") {
                router.push("/(drawer)/(tabs)/wishlist");
              }
              if (item.navigate === "orders") {
                router.push("/(order)/ongoingOrder");
              }
              if (item.navigate === "myCart") {
                router.push("/(drawer)/(tabs)/myCart");
              }
              if (item.navigate === "profile") {
                router.push("/(drawer)/(tabs)/profile");
              }
              if (item.navigate === "categories") {
                router.push("/(drawer)/(tabs)/category");
              }
              if (item.navigate === "products") {
                router.push("/(products)/products");
              }
            }}
            className="flex-row items-center justify-between px-2 py-4 "
          >
            <View className="flex-row items-center space-x-3">
              <Image
                source={item.icon}
                style={{
                  height: 18,
                  width: 18,
                  marginRight: 14,
                  resizeMode: "contain",
                }}
              />
              <Text className="text-black font-inter-regular text-base">
                {item.name}
              </Text>
            </View>
            <Arrow />
          </Pressable>
        ))}
      </View>

      {/* Logout */}
      <Pressable className="px-2 mt-10 border-t-[1px] border-[#ccc] pt-3">
        <Text className="text- text-base font-inter-medium">Kabils Grillz</Text>
        <Text className="text-[13px] font-inter-regular">App Version 1.0</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
}
