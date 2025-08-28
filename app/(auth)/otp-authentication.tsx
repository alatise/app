/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import OTPInput from "@/components/Input/OTPInput";
import { Button } from "@/components/Shared/Button";
import { IMAGES } from "@/constants/Images";
import { GlobalClasses } from "@/constants/Stylesheet";
// import { useAuth } from "@/contexts/AuthContext";
import { useSession } from "@/lib/authCtx";
import { useOtpConfirmMutation, useSendOtpMutation } from "@/services/auth";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const OTPAuthentication = () => {
  const { alertVisible, showAlert, requestResponse, setRequestResponse } =
    useSession();
  const router = useRouter();
  const [otpStr, setOtpStr] = useState("");

  const [performSendOtp, { isLoading: sendingOtp }] = useSendOtpMutation();

  const [performOtpConfirmation, { isLoading }] = useOtpConfirmMutation();

  const { email } = useLocalSearchParams<{
    email: string;
  }>();

  const handleBackToSignIn = () => {
    router.push("/(auth)/login");
  };

  const handleGoBack = () => {
    router.back();
  };

  const onSubmit = async () => {
    try {
      const response = await performOtpConfirmation({
        email,
        otp: otpStr,
        otp_type: "password_reset",
      }).unwrap();
      if (response.status === 200) {
        router.push({
          pathname: "/(auth)/reset-password",
          params: {
            otpStr,
            email,
          },
        });
        return Promise.resolve();
      }
    } catch (error: any) {
      setRequestResponse({
        status: error.data.status,
        title: error.data.message,
        type: "error",
      });
      showAlert();
      return Promise.reject(error);
    }
  };

  const resend = async () => {
    const response = await performSendOtp({
      email,
      otp_type: "password_reset",
    }).unwrap();
    if (response.status === 200) {
      setRequestResponse({
        status: response.status,
        title: response.message,
        message: response.data.message,
        type: "success",
      });
      showAlert();
      return Promise.resolve();
    }
  };

  return (
    <View className="bg-white flex-1">
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full aspect-[1/0.5] bg-[#EFE7DC] rounded-b-[40px] relative overflow-hidden">
          <View className="absolute -top-[5px] left-[5px] w-3/5 h-[120%] z-[1]">
            <Image
              className="w-full h-full opacity-50"
              source={IMAGES.authLayer}
              resizeMode="contain"
            />
          </View>

          <View
            className={`absolute z-[15] left-padding ${Platform.OS === "ios" ? "top-[50px]" : "top-[30px]"}`}
          >
            <TouchableOpacity
              onPress={handleGoBack}
              className={`${GlobalClasses.backbtn} bg-white`}
            >
              <Ionicons size={24} color="#000" name="chevron-back" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="absolute -top-[45px] right-0 w-4/5 h-[350px] z-10 rounded-bl-[25px] overflow-hidden">
          <Image
            className="w-full h-full"
            source={IMAGES.enterCode}
            resizeMode="contain"
          />
        </View>

        <View className="flex-1 bg-white pt-20">
          <View className={`${GlobalClasses.container} px-5`}>
            <View>
              <Text className="text-h3 text-title font-inter-semibold">
                Enter Code
              </Text>
              <Text className="text-[15px] text-black font-inter-regular mt-[5px]">
                An Authentication Code Has Been Sent To{"\n"}
                <Text className="underline text-primary">{email}</Text>
              </Text>
            </View>

            <View className="mt-5">
              <OTPInput setOtpStr={setOtpStr} length={6} />

              <View className="items-center flex-row justify-center mt-5">
                <Text className="text-[15px] text-text font-inter-regular">
                  If you don&apos;t receive code!{" "}
                </Text>
                <TouchableOpacity onPress={resend} disabled={isLoading}>
                  <Text className="text-[15px] text-title font-inter-medium underline">
                    Resend
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className={`${GlobalClasses.container} px-5 mb-[30px]`}>
          <View className="relative mb-[10px]">
            <Button
              loading={isLoading || sendingOtp}
              textClassName="text-white items-center text-[20px] font-inter-medium "
              className="mt-3 h-[54px]  bg-secondary"
              children="Send Mail"
              onPress={onSubmit}
            />
          </View>

          <View className="items-center flex-row justify-center pt-[10px]">
            <Text className="text-[15px] text-text font-inter-regular">
              Back To{" "}
            </Text>
            <TouchableOpacity onPress={handleBackToSignIn} disabled={isLoading}>
              <Text className="text-[15px] text-title font-inter-medium underline">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* <CustomAlert
        visible={alertVisible}
        title={requestResponse.title}
        message={requestResponse.message}
        type={requestResponse.type!}
      /> */}
    </View>
  );
};

export default OTPAuthentication;
