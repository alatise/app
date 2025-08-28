import { IMAGES } from "@/constants/Images";
import { GlobalClasses } from "@/constants/Stylesheet";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type Props = {
  state: any;
  navigation: any;
  descriptors: any;
};

const BottomMenu = ({ state, navigation, descriptors }: Props) => {
  const theme = useTheme();

  const [tabWidth, setWidth] = useState(wp("100%"));

  const tabWD = tabWidth < 800 ? tabWidth / 5 : 800 / 5;

  const circlePosition = useRef(new Animated.Value(0)).current;

  Dimensions.addEventListener("change", (val) => {
    setWidth(val.window.width);
  });

  useEffect(() => {
    Animated.spring(circlePosition, {
      toValue: state.index * tabWD,
      useNativeDriver: true,
    }).start();
  }, [state.index, tabWidth]);

  const onTabPress = (index: any) => {
    const tabW = tabWidth < 800 ? tabWidth / 5 : 800 / 5;

    Animated.spring(circlePosition, {
      toValue: index * tabW,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className={`${theme.dark ? "bg-white" : "bg-card"}`}>
      <View
        className={`h-[80px] border-t ${theme.dark ? "border-dark-border" : "border-border-color"}`}
      >
        <View className={`${GlobalClasses.container} flex-row  px-0 pt-2`}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({ name: route.name, merge: true });
                onTabPress(index);
              }
            };

            const getIcon = () => {
              switch (label) {
                case "Home":
                  return isFocused ? IMAGES.HomeActive : IMAGES.Home;
                case "Wishlist":
                  return isFocused ? IMAGES.wishList : IMAGES.heart;
                case "MyCart":
                  return isFocused ? IMAGES.cartActive : IMAGES.mycart;
                case "Category":
                  return isFocused ? IMAGES.CategoryActive : IMAGES.Category;
                case "Profile":
                  return isFocused ? IMAGES.profileActive : IMAGES.user2;
                default:
                  return isFocused ? IMAGES.HomeActive : IMAGES.Home;
              }
            };

            const getTextLabel = () => {
              switch (label) {
                case "MyCart":
                  return "Cart";
                default:
                  return label;
              }
            };

            return (
              <View key={index} className="flex-1">
                <View className="items-center justify-center pt-1">
                  <TouchableOpacity onPress={onPress} className="items-center">
                    <Image
                      className="h-7 w-7"
                      style={{
                        resizeMode: "contain",
                      }}
                      source={getIcon()}
                    />
                    <Text
                      className={`mt-2  ${
                        isFocused ? "text-secondary font-bold" : "text-primary"
                      }`}
                      style={{ fontSize: 10 }}
                    >
                      {getTextLabel()}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default BottomMenu;
