/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { IMAGES } from "@/constants/Images";
import { GlobalClasses } from "@/constants/Stylesheet";
// import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/Shared/Button";
import { useSession } from "@/lib/authCtx";
import { LoginRequest } from "@/lib/type";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
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

const Login = () => {
  const router = useRouter();
  const { isLoading, signIn, alertVisible, hideAlert, requestResponse } =
    useSession();

  const handleCreateAccount = () => {
    router.push("/(auth)/register");
  };

  const handleForgotPassword = () => {
    router.push("/(auth)/forgot-password");
  };

  const handleGoBack = () => {
    router.back();
  };

  const schema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z.string().trim().min(6, "Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Use Zod resolver
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginRequest) => {
    signIn(data);
    console.log(data);
  };

  return (
    <View className="bg-white flex-1">
      <StatusBar style="light" />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View className="w-full aspect-[1/0.5] bg-[#EFE7DC] rounded-b-[40px] relative overflow-hidden">
          <View className="absolute -top-[5px] left-[5px] w-3/5 h-[120%] z-[1]">
            <Image
              className="w-full h-full opacity-50"
              source={IMAGES.authLayer}
              resizeMode="contain"
            />
          </View>

          {/* <View
            className={`absolute z-[15] left-padding ${Platform.OS === "ios" ? "top-[50px]" : "top-[30px]"}`}
          >
            <TouchableOpacity
              onPress={handleGoBack}
              className={`${GlobalClasses.backbtn} bg-white`}
            >
              <Ionicons size={24} color="#000" name="chevron-back" />
            </TouchableOpacity>
          </View> */}
        </View>

        <View className="absolute -top-[45px] right-0 w-4/5 h-[350px] z-10 rounded-bl-[25px] overflow-hidden">
          <Image
            className="w-full h-full"
            source={IMAGES.signin}
            resizeMode="contain"
          />
        </View>

        <View className="flex-1 bg-white pt-24">
          <View className={`${GlobalClasses.container} px-5`}>
            <View>
              <Text className="text-h3 text-title font-inter-semibold">
                Sign In To Your Account
              </Text>
              <Text className="text-[15px] text-black font-inter-regular mt-[5px]">
                Welcome Back You&apos;ve Been Missed!
              </Text>
            </View>

            <View className="mt-5">
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

              <View className="mt-[15px]">
                <Input
                  control={control}
                  errors={errors.password}
                  name="password"
                  backround
                  inputLg
                  type="password"
                  placeholder="Password"
                  icon={<Feather name="lock" size={20} color="#000" />}
                />
              </View>

              <TouchableOpacity
                onPress={handleForgotPassword}
                disabled={isLoading}
              >
                <Text className="text-[15px] text-title font-inter-regular underline text-right mt-[18px]">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-5 mb-5 relative">
              <Button
                loading={isLoading}
                textClassName="text-white items-center text-[20px] font-inter-medium  "
                className="mt-3 h-[54px]  bg-secondary"
                children="Sign In"
                onPress={handleSubmit(onSubmit)}
              />
            </View>

            <View className="flex-row items-center mb-[30px]">
              <View className="h-[1.5px] flex-1 bg-black" />
              <Text className="text-[13px] text-black font-inter-medium mx-[15px]">
                Or Continue With
              </Text>
              <View className="h-[1.5px] flex-1 bg-black" />
            </View>

            <View className="flex-row justify-between gap-[15px]">
              <TouchableOpacity
                className={`flex-1 flex-row items-center justify-center bg-white border border-border-color rounded-[12px] h-14 shadow-md ${isLoading ? "opacity-60" : ""}`}
                disabled={isLoading}
              >
                <Image className="h-5 w-5 mr-[10px]" source={IMAGES.google2} />
                <Text className="text-h6 text-title font-inter-medium">
                  Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 flex-row items-center justify-center bg-white border border-border-color rounded-[12px] h-14 shadow-md ${isLoading ? "opacity-60" : ""}`}
                disabled={isLoading}
              >
                <MaterialIcons name="apple" size={20} color="#000" />
                <Text className="text-h6 text-title font-inter-medium ml-[10px]">
                  Apple
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="items-center flex-row justify-center pb-[30px] pt-10">
          <Text className="text-[15px] text-text font-inter-regular">
            Not a member?{" "}
          </Text>
          <TouchableOpacity onPress={handleCreateAccount} disabled={isLoading}>
            <Text className="text-[15px] text-title font-inter-medium underline">
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* <CustomAlert
        visible={alertVisible}
        title={requestResponse.message!}
        type="error"
      /> */}
    </View>
  );
};

export default Login;
