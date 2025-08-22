import Button from "@/components/Button/Button";
import { IMAGES } from "@/constants/Images";
import "@/global.css";
import { useGetWelcomeQuery } from "@/services/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const DATA = [
  {
    title: "Best Selling",
    desc: "Grillz",
    subtitle: "Elevate your smile with our bespoke Gold and Silver Grillz",
  },
  {
    title: "Premium",
    desc: "Crafted",
    subtitle: "Each piece is meticulously designed to fit your unique style",
  },
  {
    title: "Shine Bright",
    desc: "Divine",
    subtitle: "Join thousands who trust us for their smile transformation",
  },
];

const OnBoarding = () => {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [sliderIndex, setSliderIndex] = useState<number>(1);

  const { data, isLoading } = useGetWelcomeQuery();

  const onScroll = (val: any) => {
    setSliderIndex(Math.round(val.nativeEvent.contentOffset.x / width) + 1);
  };

  const handleGetStarted = () => {
    console.log("Get Started pressed");
    try {
      router.push("/(auth)/login");
    } catch (error) {
      console.log("Navigation error:", error);
    }
  };

  return (
    <View style={{ flex: 1 }} className="flex-1">
      <StatusBar style="light" />

      <LinearGradient
        colors={["#B29954", "#000000"]}
        locations={[0.3935, 1.1065]}
        style={{ flex: 1 }}
      >
        <View className="flex-1 relative items-center justify-center">
          <Image
            className="w-full h-[85%]"
            style={{ borderRadius: 21 }}
            source={IMAGES.Onboarding1}
            resizeMode="contain"
          />
        </View>

        <View className="absolute left-[30px]" style={{ bottom: 380 }}>
          <View
            className="bg-primary items-center justify-center border-2"
            style={{
              borderRadius: 100,
              width: 110,
              height: 110,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Image
              source={IMAGES.bestsellerIcon}
              className="mb-0.5"
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="flex-[0.35] justify-start" style={{ paddingTop: 10 }}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size={"large"} />
            ) : (
              <>
                {data?.data?.slides.map((data) => (
                  <View
                    key={data.id}
                    className="justify-start flex-1"
                    style={{
                      width: width,
                      paddingHorizontal: 30,
                    }}
                  >
                    <View className="items-start flex-1 justify-start">
                      <Text
                        className="font-inter-light text-white"
                        style={{
                          fontSize: 52,
                          lineHeight: 60,
                          marginBottom: -5,
                        }}
                      >
                        {data.title}
                      </Text>
                      <Text
                        className="font-inter-bold text-white"
                        style={{
                          fontSize: 58,
                          lineHeight: 60,
                          marginBottom: 5,
                        }}
                      >
                        {data.title}
                      </Text>
                      <Text
                        className="font-inter-regular"
                        style={{
                          fontSize: 18,
                          color: "rgba(255, 255, 255, 0.8)",
                          lineHeight: 24,
                          flexWrap: "wrap",
                        }}
                      >
                        {data.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </>
            )}
          </ScrollView>
        </View>

        <View
          className="flex-[0.15] justify-center"
          style={{
            paddingHorizontal: 25,
            paddingBottom: Platform.OS === "ios" ? 40 : 50,
          }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1" style={{ marginRight: 83 }}>
              <Button
                title="Get Started"
                color="#B29954"
                onPress={handleGetStarted}
                style={{
                  shadowColor: "#B29954",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              />
            </View>
            <View className="items-end">
              <Text
                className="font-inter-semibold text-white"
                style={{ fontSize: 18 }}
              >
                {sliderIndex}/{DATA.length}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default OnBoarding;
