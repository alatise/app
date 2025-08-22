/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default */
import Input from "@/components/Input/Input";
import { Button } from "@/components/Shared/Button";
import { IMAGES } from "@/constants/Images";
import { GlobalClasses } from "@/constants/Stylesheet";
import { CustomAlert } from "@/constants/toastConfig";
// import { useAuth } from "@/contexts/AuthContext";
import { useSession } from "@/lib/ctx";
import { RegisterRequest } from "@/lib/type";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

const Register = () => {
  const router = useRouter();
  const { isLoading, signUp, alertVisible, hideAlert, requestResponse } =
    useSession();

  // const {
  //   errors,
  //   validateEmail,
  //   validatePassword,
  //   validateConfirmPassword,
  //   validateName,
  //   clearErrors,
  // } = useAuthValidation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isChecked, setChecked] = useState(false);

  // useEffect(() => {
  //   clearError();
  //   clearErrors();
  // }, []);

  // useEffect(() => {
  //   if (error) {
  //     Alert.alert("Registration Failed", error, [
  //       { text: "OK", onPress: clearError },
  //     ]);
  //   }
  // }, [error]);

  // const handleInputChange =
  //   (field: keyof typeof formData) => (value: string) => {
  //     setFormData((prev) => ({ ...prev, [field]: value }));
  //     clearErrors();
  //   };

  // const handleSignUp = async () => {
  //   clearError();
  //   clearErrors();

  //   const isNameValid = validateName(formData.name);
  //   const isEmailValid = validateEmail(formData.email);
  //   const isPasswordValid = validatePassword(formData.password);
  //   const isConfirmPasswordValid = validateConfirmPassword(
  //     formData.password,
  //     formData.confirmPassword
  //   );

  //   if (
  //     !isNameValid ||
  //     !isEmailValid ||
  //     !isPasswordValid ||
  //     !isConfirmPasswordValid
  //   ) {
  //     return;
  //   }

  //   if (!isChecked) {
  //     Alert.alert(
  //       "Terms Required",
  //       "You must accept the terms and conditions to continue."
  //     );
  //     return;
  //   }

  //   try {
  //     await register({
  //       name: formData.name.trim(),
  //       email: formData.email.toLowerCase().trim(),
  //       password: formData.password,
  //       confirmPassword: formData.confirmPassword,
  //       acceptedTerms: isChecked,
  //     });
  //   } catch (registerError) {}
  // };

  const handleSignIn = () => {
    router.push("/(auth)/login");
  };

  const handleGoBack = () => {
    router.back();
  };

  const schema = z.object({
    name: z.string().trim().min(2, "Full name is required"),
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

  const onSubmit = (data: RegisterRequest) => {
    signUp(data);
    console.log(data);
  };

  return (
    <View className="bg-white flex-1 pb-16">
      <StatusBar style="light" />
      <ScrollView
        // contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
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
            source={IMAGES.signup}
            resizeMode="contain"
          />
        </View>

        <View className="flex-1 bg-white pt-24">
          <View className={`${GlobalClasses.container} px-5`}>
            <View>
              <Text className="text-h3 text-title font-inter-semibold">
                Create Your Account
              </Text>
              <Text className="text-[15px] text-black font-inter-regular mt-[5px]">
                Welcome! Please enter your details
              </Text>
            </View>

            <View className="mt-5">
              <View>
                <Input
                  control={control}
                  errors={errors.name}
                  required
                  name="name"
                  backround
                  inputLg
                  placeholder="Full Name"
                  icon={<Feather name="user" size={20} color="#000" />}
                />
              </View>

              <View className="mt-[15px]">
                <Input
                  control={control}
                  errors={errors.email}
                  required
                  backround
                  name="email"
                  inputLg
                  placeholder="Email Address"
                  value={formData.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon={<Feather name="mail" size={20} color="#000" />}
                />
              </View>

              <View className="mt-[15px]">
                <Input
                  control={control}
                  errors={errors.password}
                  required
                  name="password"
                  backround
                  inputLg
                  type="password"
                  placeholder="Password"
                  icon={<Feather name="lock" size={20} color="#000" />}
                />
              </View>

              <View className="flex-row items-center mt-[10px]">
                <Checkbox
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? "#000" : undefined}
                  disabled={isLoading}
                />
                <Text className="text-[15px] text-title font-inter-regular ml-[10px]">
                  I agree to all Terms, Privacy and Fees
                </Text>
              </View>
            </View>

            <View className="mt-[15px] mb-5 relative">
              <Button
                textClassName="text-white items-center  text-[20px] font-inter-medium  "
                className="mt-3 h-[54px]  bg-secondary"
                children="Sign Up"
                loading={isLoading}
                onPress={handleSubmit(onSubmit)}
              />
              {/* {isLoading && (
                <View className="absolute right-5 top-1/2 -translate-y-[10px]">
                  <ActivityIndicator size="small" color="#fff" />
                </View>
              )} */}
            </View>

            <View className="flex-row items-center mb-5">
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

        <View className="items-center flex-row justify-center pt-6">
          <Text className="text-[15px] text-text font-inter-regular">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={handleSignIn} disabled={isLoading}>
            <Text className="text-[15px] text-title font-inter-medium underline">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CustomAlert
        visible={alertVisible}
        title={requestResponse.message!}
        type="error"
      />
    </View>
  );
};

export default Register;
