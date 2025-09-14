import HomeIcon from "@/assets/images/icons/home-active.svg";
import ArrowRight from "@/assets/images/iconsvg/arrowright.svg";
import Avatar from "@/assets/images/iconsvg/avatar.svg";
import Back from "@/assets/images/iconsvg/back.svg";
import Profile from "@/assets/images/iconsvg/profile.svg";
import MainHeader from "@/components/Shared/MainHeader";
import TabWrapper from "@/components/Shared/TabWrapper";
import { useGetProfileQuery } from "@/services/auth";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SettingsCardProps = {
  left?: React.ReactNode;
  title: string;
  onPress?: () => void;
};

const SettingsCard = ({ left, title, onPress }: SettingsCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-1 rounded-[8px] mb-4"
    >
      <View className="flex-row items-center gap-3">
        {left}
        <Text className="text-base font-inter-regular">{title}</Text>
      </View>

      <ArrowRight width={20} height={20} />
    </TouchableOpacity>
  );
};
export default function ProfileScreen() {
  const { data, isLoading } = useGetProfileQuery();

  const stuff = [
    {
      name: "Your Orders",
      path: "/(order)/ongoingOrder",
    },
    {
      name: "wishList",
      path: "/(drawer)/wishlist",
    },
    {
      name: "Change Password",
      path: "/(products)/changePassword",
    },
  ];
  return (
    <TabWrapper>
      <MainHeader
        left={<Back onPress={() => router.back()} width={35} height={35} />}
        header={"Settings"}
        right={<View />}
      />

      <View className={"flex-row items-center gap-3 py-6"}>
        <Avatar width={40} height={40} className="rounded-full" />
        <Text className="text-xl font-inter-regular ">
          Hello,{" "}
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text className="font-inter-semibold">{data?.data.name}</Text>
          )}
        </Text>
      </View>

      <View>
        <FlatList
          data={stuff}
          numColumns={2}
          renderItem={({ item }: any) => (
            <Pressable
              onPress={() => router.push(item.path)}
              className="flex-row items-center  justify-center bg-[#F6F6F6] w-[48%] px-4 py-3 rounded-[8px] mb-4"
            >
              <Text className="text-base font-inter-regular text-center">
                {item.name}
              </Text>
            </Pressable>
          )}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 0,
          }}
        />
      </View>

      <View>
        <Text className="font-inter-semibold text-lg ">Account Settings</Text>
        <View className="mt-4">
          <SettingsCard
            onPress={() => router.push("/(products)/editProfile")}
            left={<Profile />}
            title="Edit Profile"
          />

          <SettingsCard
            onPress={() => router.push("/(deliveryAddress)/deliveryAddress")}
            left={<HomeIcon />}
            title=" Saved Addresses"
          />
        </View>
      </View>
    </TabWrapper>
  );
}
