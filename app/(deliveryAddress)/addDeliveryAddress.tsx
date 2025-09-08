import Back from "@/assets/images/iconsvg/back.svg";
import Input from "@/components/Input/Input";
import { Button } from "@/components/Shared/Button";
import MainHeader from "@/components/Shared/MainHeader";
import { CustomAlert } from "@/constants/toastConfig";
import { useSession } from "@/lib/authCtx";
import { DeliveryAddressRequest } from "@/lib/type";
import { useAddDeliveryAddressMutation } from "@/services/deliveryAddress";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const AddDeliveryAddress = () => {
const { showAlert, requestResponse, alertVisible, setRequestResponse } = useSession();

  const schema = z.object({
    zip: z.string().min(6, "Zip code is require"),
    street: z.string().min(3, "Street is require"),
    city: z.string().min(3, "City is required"),
    state: z.string().min(3, "State is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Use Zod resolver
  });

  const [performAddDeliveryAddress, { isLoading }] =
    useAddDeliveryAddressMutation();

  const onSubmit = async (data: DeliveryAddressRequest) => {
    const { type: name, ...item } = data;
    try {
      const response = await performAddDeliveryAddress({
        type: 'Home',
        ...item,
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
            header={"Add Delivery Address"}
            right={<View />}
          />

          <View className="flex-row items-center justify-between pt-4">
            <Text className="font-montserrat-Semibold text-base ">
              Contact Details
            </Text>
          </View>

          <View className="flex-row items-center justify-between pt-4">
            <Text className="font-montserrat-Semibold text-base ">Address</Text>
          </View>

          <View>
            <View className="mt-4">
              <Text className="font-montserrat-Regular pb-4">Zip</Text>
              <Input
                control={control}
                errors={errors.zip}
                name="zip"
                backround
                inputLg
                placeholder="Zip"
                autoCapitalize="none"
              />
            </View>

            <View className="mt-4">
              <Text className="font-montserrat-Regular pb-4">Street</Text>
              <Input
                control={control}
                errors={errors.street}
                name="street"
                backround
                inputLg
                placeholder="Street"
                autoCapitalize="none"
              />
            </View>

            <View className="mt-4">
              <Text className="font-montserrat-Regular pb-4">
                City/District
              </Text>
              <Input
                control={control}
                errors={errors.city}
                name="city"
                backround
                inputLg
                placeholder="City"
                autoCapitalize="none"
              />
            </View>

            <View className="my-4">
              <Text className="font-montserrat-Regular pb-4">State</Text>
              <Input
                control={control}
                errors={errors.state}
                name="state"
                backround
                inputLg
                placeholder="State"
                autoCapitalize="none"
              />
            </View>

            {/* <Text className="font-montserrat-Semibold text-base ">
              Save Address As{" "}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="my-4 mb-10"
            >
              {categories.map((c, i) => (
                <Pressable
                  onPress={() => setType(c)}
                  key={i}
                  className={`rounded-[8px] h-[38px] items-center flex-row px-8 mr-5 ${
                    c === type ? "bg-black" : "bg-[#F2F2F2]"
                  }`}
                >
                  <Text
                    className={`text-[13px] font-montserrat-Regular ${
                      c === type ? "text-white" : "text-[#222]"
                    }`}
                  >
                    {c}
                  </Text>
                </Pressable>
              ))}
            </ScrollView> */}
          </View>
        </ScrollView>

        <View className="flex-row items-center gap-3 border-[#D9D9D9] border-t py-4">
          <Button
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
            children="Save Address"
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

export default AddDeliveryAddress;
