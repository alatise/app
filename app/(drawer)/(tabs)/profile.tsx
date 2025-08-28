import ArrowRight from "@/assets/images/iconsvg/arrowright.svg";
import Back from "@/assets/images/iconsvg/back.svg";
import Message from "@/assets/images/iconsvg/msg.svg";
import Profile from "@/assets/images/iconsvg/profile.svg";
import Search from "@/assets/images/iconsvg/search.svg";
import Star from "@/assets/images/iconsvg/star1.svg";

import MainHeader from "@/components/Shared/MainHeader";
import TabWrapper from "@/components/Shared/TabWrapper";
import { useGetProfileQuery } from "@/services/auth";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
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

  const stuff = ["Your Orders", "WishList", "Coupons", "Track Order"];
  return (
    <TabWrapper>
      <MainHeader
        left={<Back onPress={() => router.back()} width={35} height={35} />}
        header={"Settings"}
        right={
          <Search
            onPress={() => router.push("/search")}
            width={35}
            height={35}
          />
        }
      />

      <View className={"flex-row items-center gap-3 py-6"}>
        <View className={"bg-[#999999] h-[40px] w-[41px] rounded-full"}></View>
        <Text className="text-xl font-inter-regular ">
          Hello,{" "}
          {isLoading ? (
            <ActivityIndicator  />
          ) : (
            <Text className="font-inter-semibold">{data?.data.name}</Text>
          )}
        </Text>
      </View>

      <FlatList
        data={stuff}
        numColumns={2}
        renderItem={({ item }) => (
          <View className="flex-row items-center  justify-center bg-[#F6F6F6] w-[48%] px-4 py-3 rounded-[8px] mb-4">
            <Text className="text-base font-inter-regular text-center">
              {item}
            </Text>
          </View>
        )}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 0,
        }}
      />

      <View>
        <Text className="font-inter-semibold text-lg ">Account Settings</Text>
        <View className="mt-4">
          <SettingsCard
            onPress={() => router.push("/(products)/editProfile")}
            left={<Profile />}
            title="Edit Profile"
          />
          <SettingsCard
            onPress={() => router.push("/(payment)/payment")}
            left={<Profile />}
            title="Saved Cards & Wallet"
          />
          <SettingsCard
            onPress={() => router.push("/(deliveryAddress)/deliveryAddress")}
            left={<Profile />}
            title="Saved Addresses"
          />
          <SettingsCard
            onPress={() => router.push("/notifications")}
            left={<Profile />}
            title="Notifications Settings"
          />
          <SettingsCard left={<Profile />} title="Notifications Settings" />
        </View>
      </View>

      <View className="mt-6">
        <Text className="font-inter-semibold text-lg ">My Activity</Text>
        <View className="mt-4">
          <SettingsCard left={<Star />} title="Reviews" />
          <SettingsCard
            left={<Message width={20} />}
            title="Questions & Answers"
          />
        </View>
      </View>
    </TabWrapper>
  );
}
