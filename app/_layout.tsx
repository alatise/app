import { GestureHandlerRootView } from "react-native-gesture-handler";
import { toastConfig } from "@/constants/toastConfig";
import "@/global.css";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider } from "@/lib/authCtx";
import { ProductProvider } from "@/lib/productsCtx";
import { WishlistProvider } from "@/lib/wishlistCtx";
import { store } from "@/services/store";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useAuthGuard();

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(drawers)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}

export default function RootLayoutNav() {
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    "Inter-Thin": Inter_100Thin,
    "Inter-ExtraLight": Inter_200ExtraLight,
    "Inter-Light": Inter_300Light,
    "Inter-Regular": Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
    "Inter-SemiBold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold,
    "Inter-ExtraBold": Inter_800ExtraBold,
    "Inter-Black": Inter_900Black,
    "Montserrat-Medium": require("../assets/fonts/montserrat/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/montserrat/Montserrat-Regular.ttf"),
    "Montserrat-Semibold": require("../assets/fonts/montserrat/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("../assets/fonts/montserrat/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("../assets/fonts/montserrat/Montserrat-Light.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setAppReady(true);
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SessionProvider>
          <ProductProvider>
            <WishlistProvider>
              <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
                <RootLayout />
              </View>
            </WishlistProvider>
          </ProductProvider>
        </SessionProvider>
        <Toast topOffset={40} position="top" config={toastConfig} />
      </Provider>
    </GestureHandlerRootView>
  );
}
