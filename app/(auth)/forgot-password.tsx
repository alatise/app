/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Input from "@/components/Input/Input";
import { Button } from "@/components/Shared/Button";
import { IMAGES } from "@/constants/Images";
import { GlobalClasses } from "@/constants/Stylesheet";
import { useSession } from "@/lib/ctx";
// import { useAuth } from "@/contexts/AuthContext";
import { ForgotPasswordRequest } from "@/lib/type";
import { useSendOtpMutation } from "@/services/auth";
import { Feather, Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

const ForgotPassword = () => {
  const {
    signIn,
    alertVisible,
    showAlert,
    requestResponse,
    setRequestResponse,
  } = useSession();

  const [performSendOtp, { isLoading }] = useSendOtpMutation();

  const handleBackToSignIn = () => {
    router.push("/(auth)/login");
  };

  const handleGoBack = () => {
    router.back();
  };

  const schema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    otp_type: z.string().optional(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Use Zod resolver
  });

  const onSubmit = async (data: ForgotPasswordRequest) => {
    try {
      const response = await performSendOtp({
        email: data.email,
        otp_type: "password_reset",
      }).unwrap();
      if (response.status === 200) {
        router.push({
          pathname: "/(auth)/otp-authentication",
          params: {
            email: data.email,
          },
        });
        setRequestResponse({
          status: response.status,
          title: response.message,
          message: response.data.message,
          type: "success",
        });
        showAlert();
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
            source={IMAGES.forgotPassword}
            resizeMode="contain"
          />
        </View>

        <View className="flex-1 bg-white pt-28">
          <View className={`${GlobalClasses.container} px-5`}>
            <View>
              <Text className="text-h3 text-title font-inter-semibold">
                Forgot Password
              </Text>
              <Text className="text-[15px] text-black font-inter-regular mt-[10px]">
                Enter the email associated with your account and we&apos;ll send
                an email to reset your password
              </Text>
            </View>

            <View className="mt-10">
              <View>
                <Input
                  control={control}
                  errors={errors.email}
                  name="email"
                  backround
                  inputLg
                  placeholder="Email Address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon={<Feather name="mail" size={20} color="#000" />}
                />
              </View>
            </View>
          </View>
        </View>

        <View className={`${GlobalClasses.container} px-5 mb-10`}>
          <View className="relative mb-[10px]">
            <Button
              loading={isLoading}
              textClassName="text-white items-center text-[20px] font-inter-medium "
              className="mt-3 h-[54px]  bg-secondary"
              children="Send Mail"
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          <View className="items-center flex-row justify-center pt-[30px]">
            <Text className="text-[15px] text-text font-inter-regular">
              Back To{" "}
            </Text>
            <TouchableOpacity onPress={handleBackToSignIn}>
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

export default ForgotPassword;
