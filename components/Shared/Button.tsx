import Cart from "@/assets/images/iconsvg/cart1.svg";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  cart?: boolean;
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  className = "",
  textClassName = "",
  disabled = false,
  cart,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row justify-center gap-2  py-3 px-6 rounded-lg items-center ${className} ${disabled ? "opacity-50" : ""}`}
      activeOpacity={0.7}
      disabled={disabled}
    >
      {cart && <Cart width={20} height={20} className="mr-2" />}
      {loading ? (
        <ActivityIndicator size="small" color={"white"} />
      ) : (
        <Text className={` font-semibold  text-center ${textClassName}`}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};
