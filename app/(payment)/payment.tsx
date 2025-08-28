import Back from "@/assets/images/iconsvg/back.svg";
import Bank from "@/assets/images/iconsvg/bank.svg";
import Dollar from "@/assets/images/iconsvg/dollar.svg";
import File from "@/assets/images/iconsvg/file.svg";
import GooglePay from "@/assets/images/iconsvg/googlepay.svg";
import Add from "@/assets/images/iconsvg/plusaddress.svg";
import Ups from "@/assets/images/iconsvg/ups.svg";

import { Button } from "@/components/Shared/Button";
import Card from "@/components/Shared/card";

import MainHeader from "@/components/Shared/MainHeader";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Payment = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 bg-white  px-4 pt-6">
        <ScrollView>
          <MainHeader
            left={<Back onPress={() => router.back()} width={35} height={35} />}
            header={"Payment"}
            right={<View />}
          />

          <View className="flex-row items-center justify-between pt-4">
            <Text className="font-montserrat-Medium text-base ">
              Payment Method
            </Text>
            <Pressable
              onPress={() => router.push("/(payment)/addCard")}
              className="flex-row items-center gap-3"
            >
              <Add width={14} height={14} />
              <Text className="font-montserrat-Medium text-[13px]">
                Add Card
              </Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4 "
          >
            <Card className="bg-black w-[300px] " />
            <Card className="bg-[#5E5D5D] w-[300px] " />
          </ScrollView>

          {/* Cash on Delivery(Cash/UPI) */}
          <View className="bg-[#F6F6F6]   flex-row items-center justify-between p-4 rounded-[8px] mt-4">
            <View className="flex-row items-center gap-3">
              <Dollar width={20} height={20} className="" />
              <Text className="font-montserrat-Medium text-sm ">
                Cash on Delivery(Cash/UPI)
              </Text>
            </View>

            <View className="flex-row h-5 w-5 items-center gap-3 justify-center border-[1px] border-black p-1 rounded-full">
              <View className="bg-black h-3 w-3 rounded-full" />
            </View>
          </View>

          {/* Google Pay/Phone Pay/BHIM UPI*/}
          <View className="bg-[#F6F6F6] p-4 rounded-[8px] mt-4">
            <View className="  flex-row items-center justify-between border-b-[0.5px] border-[#D9D9D9] pb-4">
              <View className="flex-row items-center gap-3">
                <GooglePay width={20} height={20} className="" />
                <Text className="font-montserrat-Medium text-sm ">
                  Google Pay/Phone Pay/BHIM UPI
                </Text>
              </View>

              <View className="flex-row h-5 w-5 items-center gap-3 justify-center border-[1px] border-black p-1 rounded-full">
                <View className="bg-white h-3 w-3 rounded-full" />
              </View>
            </View>

            <Text className="text-sm font-montserrat-Medium pt-4">
              Link via UPI
            </Text>
            <TextInput
              placeholder="Enter your UPI ID"
              className="bg-white border-[0.5px] px-4 font-montserrat-Regular border-[#ccc] rounded-[8px] mt-2"
            />

            <Button
              onPress={() => {}}
              children="Continue"
              className="bg-black rounded-[8px] px-4 py-4 mt-3 w-full"
              textClassName="text-white font-montserrat-Medium text-base"
            />

            <View className="flex-row items-center gap-2 mt-4">
              <Ups />
              <Text className="font-montserrat-Regular text-[13px] w-[85%]">
                Your UPI ID Will be encrypted and is 100% safe with us.
              </Text>
            </View>
          </View>

          {/* Payments/Wallet*/}
          <View className="bg-[#F6F6F6] p-4 rounded-[8px] mt-4">
            <View className="  flex-row items-center justify-between border-b-[0.5px] border-[#D9D9D9] pb-4">
              <View className="flex-row items-center gap-3">
                <File width={20} height={20} className="" />
                <Text className="font-montserrat-Medium text-sm ">
                  Payments/Wallet
                </Text>
              </View>

              <View className="flex-row h-5 w-5 items-center gap-3 justify-center border-[1px] border-black p-1 rounded-full">
                <View className="bg-white h-3 w-3 rounded-full" />
              </View>
            </View>

            <Text className="text-sm font-montserrat-Medium pt-4">
              Link Your Wallet
            </Text>
            <TextInput
              placeholder="+91"
              className="bg-white border-[0.5px] px-4 font-montserrat-Regular border-[#ccc] rounded-[8px] mt-2"
            />

            <Button
              onPress={() => {}}
              children="Continue"
              className="bg-black rounded-[8px] px-4 py-4 mt-3 w-full"
              textClassName="text-white font-montserrat-Medium text-base"
            />
          </View>

          {/* Netbanking*/}
          <View className="bg-[#F6F6F6]   flex-row items-center justify-between p-4 rounded-[8px] my-4">
            <View className="flex-row items-center gap-3">
              <Bank width={20} height={20} className="" />
              <Text className="font-montserrat-Medium text-sm ">
                Netbanking
              </Text>
            </View>

            <View className="flex-row h-5 w-5 items-center gap-3 justify-center border-[1px] border-black p-1 rounded-full">
              <View className="bg-white h-3 w-3 rounded-full" />
            </View>
          </View>
        </ScrollView>

        <View className="flex-row items-center gap-3 border-[#D9D9D9] border-t py-4">
          <Button
            onPress={() => {
              router.push("/(payment)/addCard");
            }}
            children="Continue"
            className="bg-black rounded-[8px] px-4 py-4  w-full"
            textClassName="text-white font-montserrat-Medium text-base"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Payment;
