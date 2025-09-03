import Back from "@/assets/images/iconsvg/back.svg";
import Call from "@/assets/images/iconsvg/call.svg";
import Input from "@/components/Input/Input";
import { Button } from "@/components/Shared/Button";

import MainHeader from "@/components/Shared/MainHeader";
import { CustomAlert } from "@/constants/toastConfig";
import { useSession } from "@/lib/authCtx";
import { useEditProfileMutation, useGetProfileQuery } from "@/services/auth";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const EditProfile = () => {
  const { data, isLoading } = useGetProfileQuery();

  const [performEditProfile, { isLoading: editingProfile }] =
    useEditProfileMutation();

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().trim().min(6, "Phone is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Use Zod resolver
    defaultValues: {
      name: data?.data.name!,
      phone: data?.data.phone!,
    },
  });

  const { setRequestResponse, alertVisible, requestResponse, showAlert } = useSession();

  const onSubmit = async ({ phone, name }: any) => {
    try {
      const response = await performEditProfile({
        phone,
        name,
      }).unwrap();
      if (response.status === 200) {
        setRequestResponse({
          status: response.status,
          title: response.message,
          message: response.message,
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
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 bg-white  px-4 pt-6">
        <ScrollView>
          <MainHeader
            left={<Back onPress={() => router.back()} width={35} height={35} />}
            header={"Edit Profile"}
            right={<View />}
          />

          {/* <View className="flex-row items-center justify-center gap-3 py-6">
            <View className="w-[150px] relative h-[150px] p-1 bg-white border-black border-[1px] rounded-full mb-6">
              <View className="bg-[#999999] h-full w-full rounded-full"></View>
              <View className="absolute right-0 bottom-2 ">
                <Edit width={40} height={40} />
              </View>
            </View>
          </View> */}

          <View className="space-y-4 gap-4 mt-10">
            <Input
              control={control}
              errors={errors.name}
              defaultValue={data?.data.name}
              name="name"
              backround
              inputLg
              placeholder="Full Name"
              icon={<Feather name="user" size={20} color="#000" />}
            />
            <Input
              control={control}
              name="email"
              disable={true}
              defaultValue={isLoading ? "loading.." : data?.data.email}
              backround
              inputLg
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<Feather name="mail" size={20} color="#000" />}
            />
            <Input
              control={control}
              errors={errors.phone}
              defaultValue={data?.data.phone}
              name="phone"
              backround
              inputLg
              placeholder="Mobile Number"
              keyboardType="number-pad"
              autoCapitalize="none"
              icon={<Call />}
            />
          </View>
        </ScrollView>

        <View className="flex-row items-center gap-3 border-[#D9D9D9] border-t py-4">
          <Button
            loading={editingProfile}
            onPress={handleSubmit(onSubmit)}
            children="Update Profile"
            className="bg-black rounded-[8px] px-4 py-4  w-full"
            textClassName="text-white font-montserrat-Medium text-base"
          />
        </View>
      </View>

      <CustomAlert
        visible={alertVisible}
        title={requestResponse.message!}
        message={requestResponse.message!}
        type={requestResponse.type!}
      />
    </SafeAreaView>
  );
};

export default EditProfile;
