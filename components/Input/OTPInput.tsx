// app/otp.tsx
import React, { useRef, useState } from "react";
import {
  Keyboard,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type prop = {
  setOtpStr: any;
  length: number;
};

export default function OTPInput({ setOtpStr, length }: prop) {
  const [otp, setOtp] = useState("");
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const handleChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    if (numericText.length <= length) {
      setOtpStr(numericText);
      setOtp(numericText);
    }
  };

  const renderPinBoxes = () => {
    const boxes = [];
    for (let i = 0; i < length; i++) {
      const digit = otp[i] || "";
      const isCurrentInputBox = i === otp.length && otp.length < length;

      boxes.push(
        <View
          key={i}
          className={`w-16 h-[60px] border rounded-lg flex-row justify-center items-center m-1 bg-white
            ${isCurrentInputBox ? "border-[#a6a6a8]" : "border-gray-300"}
          `}
        >
          <Text className="text-3xl font-bold text-gray-800 mx-auto pt-2">
            {secureTextEntry && digit ? "*" : digit}
          </Text>
        </View>
      );
    }
    return boxes;
  };

  const secureTextEntry = true;

  return (
    // <TouchableWithoutFeedback  accessible={false}>
    //   <View className="justify-center items-center px-6 pt-10">
    //     <Pressable onPress={handlePress} className="flex-row space-x-2">
    //       {renderPinBoxes()}
    //     </Pressable>

    //     {/* Hidden input for capturing keystrokes */}
    //     <TextInput
    //       ref={inputRef}
    //       value={otp}
    //       onChangeText={handleChange}
    //       keyboardType="number-pad"
    //       maxLength={length}
    //       autoFocus
    //       style={{
    //         position: "absolute",
    //         opacity: 0, // Tiny opacity to avoid being skipped
    //         height: 1, // Non-zero height
    //         width: 1, // Non-zero width
    //       }}
    //       caretHidden={true}
    //     />
    //   </View>
    // </TouchableWithoutFeedback>

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="justify-center items-center px-6 pt-10">
        {/* Pin boxes that trigger focus when pressed */}
        <Pressable onPress={handlePress} className="flex-row">
          {renderPinBoxes()}
        </Pressable>

        {/* Hidden input to capture keyboard input */}
        <TextInput
          ref={inputRef}
          value={otp}
          onChangeText={handleChange}
          keyboardType="number-pad"
          maxLength={length}
          style={{
            position: "absolute",
            opacity: 0,
            // ✅ must have some size on iOS or keyboard won’t open
            height: Platform.OS === "ios" ? 40 : 0,
            width: Platform.OS === "ios" ? 40 : 0,
          }}
          caretHidden={true}
          autoFocus={false} // change to true if you want it to focus immediately
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
