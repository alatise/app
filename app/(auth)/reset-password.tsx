/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { IMAGES } from "@/constants/Images";
import { GlobalClasses } from "@/constants/Stylesheet";
import { useAuthValidation } from "@/hooks/useAuthValidation";
import { useSession } from "@/lib/ctx";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ResetPassword = () => {
  const router = useRouter();
  // const { resetPassword, isLoading, error, clearError, getTempEmail } =
  //   useAuth();
  const { errors, validatePassword, validateConfirmPassword, clearErrors } =
    useAuthValidation();

  const { isLoading } = useSession();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [email, setEmail] = useState("");

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
  //     Alert.alert("Reset Failed", error, [{ text: "OK", onPress: clearError }]);
  //   }
  // }, [error]);

  const handleInputChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      clearErrors();
    };

  // const handleContinue = async () => {
  //   clearError();
  //   clearErrors();

  //   const isPasswordValid = validatePassword(formData.newPassword);
  //   const isConfirmPasswordValid = validateConfirmPassword(
  //     formData.newPassword,
  //     formData.confirmPassword
  //   );

  //   if (!isPasswordValid || !isConfirmPasswordValid) {
  //     return;
  //   }

  //   const mockOTP = "123456";

  //   try {
  //     await resetPassword({
  //       email: email,
  //       newPassword: formData.newPassword,
  //       confirmPassword: formData.confirmPassword,
  //       otpCode: mockOTP,
  //     });

  //     Alert.alert(
  //       "Password Reset Successful",
  //       "Your password has been reset successfully. Please login with your new password.",
  //       [
  //         {
  //           text: "OK",
  //           onPress: () => router.push("/(auth)/login"),
  //         },
  //       ]
  //     );
  //   } catch (resetError) {}
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
            source={IMAGES.newPassword}
            resizeMode="contain"
          />
        </View>

        <View className="flex-1 bg-white pt-20">
          <View className={`${GlobalClasses.container} px-5`}>
            <View>
              <Text className="text-h3 text-title font-inter-semibold">
                Enter New Password
              </Text>
              <Text className="text-[15px] text-black font-inter-regular mt-[5px]">
                Your new password must be different from previously used
                password.
              </Text>
            </View>

            <View className="mt-5">
              <View>
                <Input
                  backround
                  inputLg
                  type="password"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChangeText={handleInputChange("newPassword")}
                  icon={<Feather name="lock" size={20} color="#000" />}
                />
                {errors.password && (
                  <Text className="text-[12px] text-red-500 font-inter-regular mt-[5px]">
                    {errors.password}
                  </Text>
                )}
              </View>

              <View className="mt-[15px]">
                <Input
                  backround
                  inputLg
                  type="password"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChangeText={handleInputChange("confirmPassword")}
                  icon={<Feather name="lock" size={20} color="#000" />}
                />
                {errors.confirmPassword && (
                  <Text className="text-[12px] text-red-500 font-inter-regular mt-[5px]">
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>
            </View>

            <View className="mt-[30px] mb-5 relative">
              <Button
                title={isLoading ? "Updating..." : "Continue"}
                // onPress={handleContinue}
              />
              {isLoading && (
                <View className="absolute right-5 top-1/2 -translate-y-[10px]">
                  <ActivityIndicator size="small" color="#fff" />
                </View>
              )}
            </View>
          </View>
        </View>

        <View className="items-center flex-row justify-center pb-[30px] pt-5">
          <Text className="text-[15px] text-text font-inter-regular">
            Back To{" "}
          </Text>
          <TouchableOpacity onPress={handleBackToSignIn} disabled={isLoading}>
            <Text className="text-[15px] text-title font-inter-medium underline">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ResetPassword;
