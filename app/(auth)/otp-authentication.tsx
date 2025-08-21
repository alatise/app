/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from "@/components/Button/Button";
import OTPInput from "@/components/Input/OTPInput";
import { IMAGES } from "@/constants/Images";
import { GlobalClasses } from "@/constants/Stylesheet";
// import { useAuth } from "@/contexts/AuthContext";
import { useAuthValidation } from "@/hooks/useAuthValidation";
import { useSession } from "@/lib/ctx";
import { Ionicons } from "@expo/vector-icons";
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

const OTPAuthentication = () => {
  const router = useRouter();
  // const {
  //   verifyOTP,
  //   forgotPassword,
  //   isLoading,
  //   error,
  //   clearError,
  //   getTempEmail,
  // } = useAuth();
  const {isLoading} = useSession()
  const { errors, validateOTP, clearErrors } = useAuthValidation();

  const [otpCode, setOTPCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const [email, setEmail] = useState("");
  const maximumCodeLength = 6;

  // useEffect(() => {
  //   const loadEmail = async () => {
  //     const tempEmail = await getTempEmail();
  //     if (tempEmail) {
  //       setEmail(tempEmail);
  //     } else {
  //       router.replace("/(auth)/forgot-password");
  //     }
  //   };

  //   loadEmail();
  //   clearError();
  //   clearErrors();
  // }, []);

  // useEffect(() => {
  //   if (error) {
  //     Alert.alert("Verification Failed", error, [
  //       { text: "OK", onPress: clearError },
  //     ]);
  //   }
  // }, [error]);

  // const handleProceed = async () => {
  //   clearError();
  //   clearErrors();

  //   if (!validateOTP(otpCode, maximumCodeLength)) {
  //     return;
  //   }

  //   try {
  //     await verifyOTP(email, otpCode);

  //     router.push("/(auth)/reset-password");
  //   } catch (verifyError) {}
  // };

  // const handleResend = async () => {
  //   if (!email) return;

  //   try {
  //     await forgotPassword({ email });
  //     Alert.alert(
  //       "Code Sent",
  //       "A new verification code has been sent to your email."
  //     );
  //     setOTPCode("");
  //   } catch (resendError) {}
  // };

  const handleBackToSignIn = () => {
    router.push("/(auth)/login");
  };

  const handleGoBack = () => {
    router.back();
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
                <Text className="underline text-primary">
                  {email || "your email"}
                </Text>
              </Text>
            </View>

            <View className="mt-5">
              <OTPInput
                code={otpCode}
                setCode={setOTPCode}
                maximumLength={maximumCodeLength}
                setIsPinReady={setIsPinReady}
              />

              {errors.otp && (
                <Text className="text-[12px] text-red-500 font-inter-regular mt-[10px] text-center">
                  {errors.otp}
                </Text>
              )}

              <View className="items-center flex-row justify-center mt-5">
                <Text className="text-[15px] text-text font-inter-regular">
                  If you don&apos;t receive code!{" "}
                </Text>
                <TouchableOpacity disabled={isLoading}>
                  <Text className="text-[15px] text-title font-inter-medium underline">
                    Resend
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className={`${GlobalClasses.container} px-5 pb-[30px]`}>
          <View className="relative mb-[10px]">
            <Button
              title={isLoading ? "Verifying..." : "Proceed"}
              // onPress={handleProceed}
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

export default OTPAuthentication;
