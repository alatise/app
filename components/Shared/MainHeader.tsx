import React from "react";
import { Text, View } from "react-native";

type MainHeaderProps = {
  left?: React.ReactNode;
  header?: string | React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
};

const MainHeader: React.FC<MainHeaderProps> = ({
  left,
  header,
  center,
  right,
}) => {
  return (
    <View className="flex-row items-center justify-between bg-white">
      {left}
      {header ? (
        <Text className="text-xl font-inter-medium">{header}</Text>
      ) : (
        center
      )}
      {right}
    </View>
  );
};

export default MainHeader;
