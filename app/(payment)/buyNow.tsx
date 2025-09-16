import Back from "@/assets/images/iconsvg/back.svg";
import MainHeader from "@/components/Shared/MainHeader";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function BuyNowScreen() {
  const { url } = useLocalSearchParams<{ url?: string }>();

  const handleMessage = useCallback((event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.action === "cancelPayment") {
        router.back();
      } else if (data.action === "paymentSuccess") {
        Alert.alert(
          "Payment Successful!",
          "Your order has been placed successfully.",
          [
            {
              text: "View Orders",
              onPress: () => router.replace("/(drawer)/orders"),
            },
          ]
        );
      }
    } catch {
      // non-JSON messages can be ignored
    }
  }, []);

  return (
    <SafeAreaView
      edges={["left", "top"]}
      style={{ backgroundColor: "white" }}
      className="flex-1 pt-4"
    >
      <MainHeader
        left={<Back onPress={() => router.back()} width={35} height={35} />}
        header={"Buy Now"}
      />
      <View className="flex-1">
        <WebView
          source={{ uri: String(url) }}
          startInLoadingState
          onMessage={handleMessage}
          injectedJavaScript={`
            window.parent = window.parent || window; // ensure parent reference
            window.parent.cancelPayment = function () {
              window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'cancelPayment' }));
            };
            window.parent.paymentSuccess = function () {
              window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'paymentSuccess' }));
            };
            true;
          `}
          renderLoading={() => (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="small" color="#000" />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
