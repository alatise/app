import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider, useSession } from "@/lib/ctx";
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
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const { session, isAuthenticated, isSessionLoading, isLoading } =
    useSession();
  const segments = useSegments();

  useEffect(() => {
    if (isSessionLoading) return; // still checking storage, do nothing yet

    const inAuth = segments[0] === "(auth)";
    const inMain = segments[0] === "(drawer)"; // adjust if you have other protected groups

    // Case 1: User is not logged in
    if (!isAuthenticated) {
      if (!inAuth) {
        // they’re outside auth, force them into login
        router.replace("/(auth)/login");
      }
      return;
    }

    // Case 2: User is logged in
    if (isAuthenticated) {
      if (inAuth) {
        // don’t let logged-in users stay in login/register
        router.replace("/(drawer)/(tabs)");
      }
      return;
    }
  }, [isAuthenticated, isSessionLoading, segments, router, session]);

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

  if (isSessionLoading) {
    return null;
  }

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SessionProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(drawers)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </SessionProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
