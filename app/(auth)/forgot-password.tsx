/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { IMAGES } from "@/constants/Images";
import { GlobalClasses } from "@/constants/Stylesheet";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthValidation } from "@/hooks/useAuthValidation";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ForgotPassword = () => {
  const router = useRouter();
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const { errors, validateEmail, clearErrors } = useAuthValidation();

  const [email, setEmail] = useState("");

  useEffect(() => {
    clearError();
    clearErrors();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ text: "OK", onPress: clearError }]);
    }
  }, [error]);

  const handleSendMail = async () => {
    clearError();
    clearErrors();

    if (!validateEmail(email)) {
      return;
    }

    try {
      await forgotPassword({ email: email.toLowerCase().trim() });

      Alert.alert(
        "Code Sent",
        "A verification code has been sent to your email address.",
        [
          {
            text: "OK",
            onPress: () => router.push("/(auth)/otp-authentication"),
          },
        ]
      );
    } catch (forgotError) {}
  };

  const handleBackToSignIn = () => {
    router.push("/(auth)/login");
  };

  const handleGoBack = () => {
    router.back();
  };

  const isFormValid = email.trim();

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

        <View className="flex-1 bg-white pt-20">
          <View className={`${GlobalClasses.container} px-5`}>
            <View>
              <Text className="text-h3 text-title font-inter-semibold">
                Forgot Password
              </Text>
              <Text className="text-[15px] text-black font-inter-regular mt-[5px]">
                Enter the email associated with your account and we&apos;ll send
                an email to reset your password
              </Text>
            </View>

            <View className="mt-5">
              <View>
                <Input
                  backround
                  inputLg
                  placeholder="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon={<Feather name="mail" size={20} color="#000" />}
                />
                {errors.email && (
                  <Text className="text-[12px] text-red-500 font-inter-regular mt-[5px]">
                    {errors.email}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>

        <View className={`${GlobalClasses.container} px-5 pb-[30px]`}>
          <View className="relative mb-[10px]">
            <Button
              title={isLoading ? "Sending..." : "Send Mail"}
              onPress={handleSendMail}
            />
            {isLoading && (
              <View className="absolute right-5 top-1/2 -translate-y-[10px]">
                <ActivityIndicator size="small" color="#fff" />
              </View>
            )}
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
    </View>
  );
};

export default ForgotPassword;
