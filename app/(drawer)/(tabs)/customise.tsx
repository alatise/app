import Back from "@/assets/images/iconsvg/back.svg";
import MainHeader from "@/components/Shared/MainHeader";
import { api } from "@/services/base";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useDispatch } from "react-redux";

const CUSTOMISE_URL =
  "https://kabilsgrillz.com/wp-content/plugins/custom-grill/?source=external";

export default function CustomiseScreen() {
  const webViewRef = useRef<WebView>(null);
  const [resetKey, setResetKey] = useState(0);
  const dispatch = useDispatch();

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.action === 'goToCart') {
        console.log('Website called goToCart - refreshing cart and navigating');
        // Invalidate cart cache to refresh data
        dispatch(api.util.invalidateTags(['Carts']));
        router.push('/myCart');
      }
    } catch (error) {
      console.log('Error parsing WebView message:', error);
    }
  };

  return (
    <SafeAreaView
      edges={["left", "top"]}
      style={{ backgroundColor: "white" }}
      className="flex-1 pt-4"
    >
      <MainHeader
        left={<Back onPress={() => router.back()} width={35} height={35} />}
        header={"Customise"}
        right={
          <Pressable
            onPress={() => setResetKey((k) => k + 1)}
            className="px-3 py-1 rounded-[6px] bg-[#F2F2F2]"
          >
            <Text className="text-[12px] font-inter-semibold text-[#222]">
              Reload
            </Text>
          </Pressable>
        }
      />
      <View className="flex-1">
        <WebView
          ref={webViewRef}
          key={resetKey}
          source={{ uri: CUSTOMISE_URL }}
          startInLoadingState
          pullToRefreshEnabled
          onMessage={handleWebViewMessage}
          injectedJavaScript={`
            window.parent.goToCart = function() {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                action: 'goToCart'
              }));
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
