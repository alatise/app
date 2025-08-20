/* eslint-disable @typescript-eslint/no-unused-vars */
import { COLORS, FONTS } from "@/constants/theme";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  code: any;
  setCode: any;
  maximumLength: any;
  setIsPinReady: any;
};

const OTPInput = ({ code, setCode, maximumLength, setIsPinReady }: Props) => {
  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = useRef<TextInput | null>(null);
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const boxDigit = (_: any, index: any) => {
    const emptyInput = "";
    const digit = code[index] || emptyInput;

    return (
      <View key={index} style={styles.SplitBoxes}>
        <Text
          style={[
            FONTS.fontLight,
            styles.SplitBoxText,
            { color: COLORS.title },
          ]}
        >
          {digit}
        </Text>
      </View>
    );
  };

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current?.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  return (
    <View style={styles.OTPInputContainer}>
      <TouchableOpacity
        style={styles.SplitOTPBoxesContainer}
        onPress={handleOnPress}
      >
        {boxArray.map(boxDigit)}
      </TouchableOpacity>
      <TextInput
        style={styles.TextInputHidden}
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  OTPInputContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  TextInputHidden: {
    position: "absolute",
    opacity: 0,
  },
  SplitOTPBoxesContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 20,
    gap: 10,
  },
  SplitBoxes: {
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    minWidth: 45,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  SplitBoxText: {
    fontSize: 28,
    textAlign: "center",
    color: COLORS.title,
  },
});

export default OTPInput;
