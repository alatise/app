/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Back from "@/assets/images/iconsvg/back.svg";
import Input from "@/components/Input/Input";
import { Button } from "@/components/Shared/Button";
import MainHeader from "@/components/Shared/MainHeader";
import { GlobalClasses } from "@/constants/Stylesheet";
import { CustomAlert } from "@/constants/toastConfig";
import { useSession } from "@/lib/authCtx";
import { ChangePasswordRequest } from "@/lib/type";
import { useChangePasswordMutation } from "@/services/auth";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { z } from "zod";

const ChangePassword = () => {
  const router = useRouter();
  const {
    hideAlert,
    alertVisible,
    requestResponse,
    setRequestResponse,
    showAlert,
  } = useSession();

  const [performChangePassword, { isLoading }] = useChangePasswordMutation();

  const schema = z.object({
    current_password: z.string().trim().min(6, "current password is required"),
    new_password: z.string().trim().min(6, "New Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Use Zod resolver
  });

  const onSubmit = async (data: ChangePasswordRequest) => {
    try {
      const response = await performChangePassword(data).unwrap();
      if (response.status === 200) {
        setRequestResponse({
          status: response.status,
          title: response.message,
          message: response.data.message,
          type: "success",
        });
        showAlert();
        router.push("/(drawer)/(tabs)/profile");
        return Promise.resolve();
      }
    } catch (error: any) {
      console.log(">>>>>>e", error.data);

      setRequestResponse({
        status: error.data.status,
        title: error.data.message,
        message: error.data.message,
        type: "error",
      });
      showAlert();
      return Promise.reject(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 bg-white pt-14 px-4">
        <ScrollView>
          <MainHeader
            left={<Back onPress={() => router.back()} width={35} height={35} />}
            header={"Change Password"}
            right={<View />}
          />

          <View className="flex-1 bg-white pt-20">
            <View className={`${GlobalClasses.container} `}>
              <Text className="text-h3 text-title font-inter-semibold">
                Change Password
              </Text>

              <View className="mt-5">
                <View>
                  <Input
                    control={control}
                    errors={errors.current_password}
                    name="current_password"
                    backround
                    inputLg
                    type="password"
                    placeholder="Current password"
                    icon={<Feather name="lock" size={20} color="#000" />}
                  />
                </View>

                <View className="mt-[15px]">
                  <Input
                    control={control}
                    errors={errors.new_password}
                    name="new_password"
                    backround
                    inputLg
                    type="password"
                    placeholder="New password"
                    icon={<Feather name="lock" size={20} color="#000" />}
                  />
                </View>
              </View>

              <View className="mt-[30px] mb-5 relative">
                <Button
                  loading={isLoading}
                  textClassName="text-white items-center text-[20px] font-inter-medium  "
                  className="mt-3 h-[54px]  bg-secondary"
                  children="Change Password"
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <CustomAlert
          visible={alertVisible}
          title={requestResponse.message!}
          message={requestResponse.message!}
          type={requestResponse.type!}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
