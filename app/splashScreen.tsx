/* eslint-disable react-hooks/exhaustive-deps */
import { IMAGES } from "@/constants/Images";
import "@/global.css";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");

SplashScreen.preventAutoHideAsync();

export default function SplashScreenComponent() {
  const router = useRouter();
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const circleScale = useSharedValue(0);
  const versionOpacity = useSharedValue(0);

  const [fontsLoaded] = useFonts({});

  useEffect(() => {
    const initializeApp = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();

        startAnimations();

        const timer = setTimeout(() => {
          router.replace("/onboarding");
        }, 3000);

        return () => clearTimeout(timer);
      }
    };

    initializeApp();
  }, [fontsLoaded, router]);

  const startAnimations = () => {
    circleScale.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });

    setTimeout(() => {
      logoScale.value = withSequence(
        withTiming(1.2, {
          duration: 600,
          easing: Easing.out(Easing.back(1.2)),
        }),
        withTiming(1, { duration: 200, easing: Easing.inOut(Easing.quad) })
      );
      logoOpacity.value = withTiming(1, { duration: 600 });
    }, 500);

    setTimeout(() => {
      versionOpacity.value = withTiming(1, { duration: 800 });
    }, 1200);
  };

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }));

  const versionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: versionOpacity.value,
  }));

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1 bg-primary w-full h-full">
      <ImageBackground
        source={IMAGES.splashBg}
        className="flex-1 w-full h-full"
        resizeMode="contain"
      >
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50" />

        <Animated.View
          className="absolute border border-white/10"
          style={[
            {
              width: width * 0.8,
              height: width * 0.8,
              borderRadius: width * 0.4,
              backgroundColor: "rgba(255, 255, 255, 0.20)",
              top: -width * 0.4,
              left: -width * 0.4,
            },
            circleAnimatedStyle,
          ]}
        />

        <Animated.View
          className="absolute border border-white/10"
          style={[
            {
              width: width * 0.6,
              height: width * 0.6,
              borderRadius: width * 0.3,
              backgroundColor: "rgba(255, 255, 255, 0.20)",
              bottom: -width * 0.3,
              right: -width * 0.3,
            },
            circleAnimatedStyle,
          ]}
        />

        <View className="flex-1 justify-center items-center px-[30px]">
          <Animated.View
            className="items-center mb-10"
            style={logoAnimatedStyle}
          >
            <Image
              source={IMAGES.kgLogo}
              className="w-[250px] h-[150px]"
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        <Animated.View
          className={`absolute left-0 right-0 items-center ${Platform.OS === "ios" ? "bottom-[50px]" : "bottom-[30px]"}`}
          style={versionAnimatedStyle}
        >
          <Animated.Text className="text-font-sm text-white/70 tracking-[2px] font-inter-light">
            VERSION 1.0
          </Animated.Text>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}
