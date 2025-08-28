import Back from "@/assets/images/iconsvg/back.svg";
import Input from "@/components/Input/Input";

import { Button } from "@/components/Shared/Button";

import MainHeader from "@/components/Shared/MainHeader";
import { useSession } from "@/lib/authCtx";
import { AddCardRequest } from "@/lib/type";
import { useAddCardMutation } from "@/services/deliveryAddress";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const AddCard = () => {
  const schema = z.object({
    card_number: z
      .string()
      .min(13, "Card number must be at least 13 digits")
      .max(19, "Card number must be at most 19 digits")
      .regex(/^\d+$/, "Card number must contain only digits")
      .refine((val) => {
        // Luhn algorithm for credit card validation
        const digits = val.split("").map(Number).reverse();
        const sum = digits.reduce((acc, digit, idx) => {
          if (idx % 2 === 1) {
            digit *= 2;
            if (digit > 9) digit -= 9;
          }
          return acc + digit;
        }, 0);
        return sum % 10 === 0;
      }, "Invalid card number"),

    expiry: z
      .string()
      .min(1, "Expiry date is required")
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format")
      .refine((val) => {
        const [month, year] = val.split("/");
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        const expYear = parseInt(year);
        const expMonth = parseInt(month);

        if (expYear < currentYear) return false;
        if (expYear === currentYear && expMonth < currentMonth) return false;

        return true;
      }, "Card has expired"),

    cvv: z
      .string()
      .min(3, "CVV must be at least 3 digits")
      .max(4, "CVV must be at most 4 digits")
      .regex(/^\d+$/, "CVV must contain only digits"),

    cardholder_name: z
      .string()
      .min(2, "Cardholder name is required")
      .max(50, "Name is too long")
      .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces")
      .trim(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Use Zod resolver
  });

  const { showAlert, requestResponse, setRequestResponse } = useSession();

  const [performAddCard, { isLoading }] = useAddCardMutation();

  const onSubmit = async (data: AddCardRequest) => {
    try {
      const response = await performAddCard(data).unwrap();
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
            header={"Add Card"}
            right={<View />}
          />

          <View className="flex-row items-center justify-between pt-4">
            <Text className="font-montserrat-Medium text-base ">
              Payment Method
            </Text>
          </View>

          {/* <Card className="bg-[#A11F3D]" /> */}

          <View>
            <View className="mt-4">
              <Text className="font-montserrat-Regular pb-4">Card Name</Text>

              <Input
                control={control}
                errors={errors.cardholder_name}
                name="cardholder_name"
                backround
                inputLg
                placeholder="Enter Card Name"
              />
            </View>

            <View className="mt-4">
              <Text className="font-montserrat-Regular pb-4">Card Number</Text>
              <Input
                control={control}
                errors={errors.card_number}
                name="card_number"
                backround
                inputLg
                placeholder="Enter Card Number"
              />
            </View>

            <View className="flex-row  mt-4 gap-4 pb-4">
              <View className="mt-4 w-[48%]">
                <Text className="font-montserrat-Regular pb-4">
                  Expiry Date
                </Text>
                <Input
                  control={control}
                  errors={errors.expiry}
                  name="expiry"
                  backround
                  inputLg
                  placeholder="MM/YY"
                />
              </View>
              <View className="mt-4 w-[48%]">
                <Text className="font-montserrat-Regular pb-4">CVV</Text>
                <Input
                  control={control}
                  errors={errors.cvv}
                  name="cvv"
                  backround
                  inputLg
                  placeholder="Enter CVV"
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View className="flex-row items-center gap-3 border-[#D9D9D9] border-t py-4">
          <Button
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
            children="Add Card"
            className="bg-black rounded-[8px] px-4 py-4  w-full"
            textClassName="text-white font-montserrat-Medium text-base"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddCard;
