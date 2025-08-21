import { COLORS, FONTS } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller, FieldError } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  control?: any;
  errors?: FieldError;
  required?: boolean;
  name: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (e: any) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  type?: string;
  numberOfLines?: any;
  icon?: any;
  inputSm?: any;
  inputLg?: any;
  inputRounded?: any;
  style?: any;
  multiline?: boolean;
  backround?: any;
  keyboardType?: any;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

const Input = ({
  placeholder,
  value,
  defaultValue,
  onChangeText,
  onFocus,
  onBlur,
  type,
  numberOfLines,
  multiline,
  icon,
  inputSm,
  inputLg,
  inputRounded,
  style,
  backround,
  keyboardType,
  autoCapitalize = "sentences",
  control,
  required,
  name,
  errors
}: Props) => {
  const [showPass, setShowPass] = useState<boolean>(true);

  return (
    <>
      <View>
        {icon && (
          <View
            style={{
              position: "absolute",
              height: "100%",
              width: 58,
              alignItems: "center",
              justifyContent: "center",
              borderRightWidth: 1,
              borderRightColor: COLORS.borderColor,
              zIndex: 9,
            }}
          >
            {icon}
          </View>
        )}
        <Controller
          control={control}
          name={name!}
          rules={{
            required,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: backround ? COLORS.white : COLORS.input,
                  borderColor: COLORS.borderColor,
                  color: COLORS.title,
                  fontSize: backround ? 18 : 14,
                },
                numberOfLines && {
                  height: "auto",
                  paddingVertical: 14,
                  textAlignVertical: "top",
                },
                icon && {
                  paddingLeft: 70,
                },
                inputRounded && {
                  borderRadius: 45,
                },
                inputSm && {
                  height: 40,
                },
                inputLg && {
                  height: 60,
                },
                style && {
                  ...style,
                },
              ]}
              multiline={multiline ? multiline : false}
              secureTextEntry={type === "password" ? showPass : false}
              value={value}
              placeholder={placeholder}
              defaultValue={defaultValue}
              onChangeText={onChangeText ? onChangeText : onChange}
              onFocus={onFocus}
              keyboardType={keyboardType}
              onBlur={onBlur}
              numberOfLines={numberOfLines}
              autoCapitalize={autoCapitalize}
              placeholderTextColor={COLORS.label}
            />
          )}
        />
        {type === "password" && (
          <TouchableOpacity
            style={[styles.passBtn, { height: backround ? 60 : 48 }]}
            onPress={() => setShowPass(!showPass)}
          >
            <Feather
              size={18}
              color={COLORS.title}
              name={showPass ? "eye-off" : "eye"}
            />
          </TouchableOpacity>
        )}
      </View>
      {errors?.message && name !== "password1" && (
        <Text className="text-red-500 text-sm font-inter-regular pt-2">
          {errors.message}.
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    ...FONTS.font,
    height: 48,
    backgroundColor: COLORS.input,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    color: COLORS.title,
  },
  passBtn: {
    position: "absolute",
    right: 0,
    top: 0,
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
});

export default Input;
