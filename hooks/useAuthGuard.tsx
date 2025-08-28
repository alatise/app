import { useSession } from "@/lib/authCtx";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";


export const useAuthGuard = () => {
  const { session, isSessionLoading } = useSession();
  const router = useRouter();
  const segments = useSegments();

  const isAuthenticated = !!session;
  const rootSegment = segments[0] as string | undefined;

  const MAIN_PATH = "/(drawer)/(tabs)" as any;
  const GUEST_SCREEN = "/guestScreen" as any;
  const LOGIN_SCREEN = "/(auth)/login" as any;

  // Helper function to check if user is first time user
  const isFirstTimeUser = () => {
    // You'll need to implement this logic based on your app's requirements
    // This could check AsyncStorage, SecureStore, or any other persistence method
    // For now, I'll assume you have a way to determine this
    // Example: return !SecureStore.getItem("hasVisitedBefore");
    return false; // Placeholder - replace with your actual logic
  };

  useEffect(() => {
    if (isSessionLoading) return;

    const inRoot = !rootSegment;
    const inAuth = rootSegment === "(auth)";
    const inGuest = segments.join("/") === "guestScreen";
    const inMain = rootSegment === "(drawer)";
    const inProtectedScreens = [
      "(products)",
      "(payment)",
      "(deliveryAddress)",
      "(order)",
    ].includes(rootSegment || "");

    // 🚪 Case 1: First time user
    if (isFirstTimeUser()) {
      // First time users should only access guest screen or auth screens
      if (!inGuest && !inAuth) {
        router.replace(GUEST_SCREEN);
        return;
      }
      // If they're already in guest or auth, let them stay
      return;
    }

    // 🚪 Case 2: Returning user but not authenticated
    if (!isAuthenticated) {
      // Should only have access to auth screens
      if (!inAuth) {
        router.replace(LOGIN_SCREEN);
        return;
      }
      // If they're already in auth, let them stay
      return;
    }

    // 🚪 Case 3: Authenticated user
    if (isAuthenticated) {
      // Authenticated users shouldn't be in guest or auth screens
      if (inGuest || inAuth || inRoot) {
        router.replace(MAIN_PATH);
        return;
      }

      // They can access main screens and all protected screens
      // No redirect needed if they're already in allowed areas
      if (inMain || inProtectedScreens) {
        return;
      }

      // Fallback: redirect to main if in unknown location
      router.replace(MAIN_PATH);
    }
  }, [
    isAuthenticated,
    isSessionLoading,
    rootSegment,
    router,
    session,
    segments,
  ]);

  // Optional: Return current state for debugging or component use
  return {
    isAuthenticated,
    isFirstTimeUser: isFirstTimeUser(),
    currentSegment: rootSegment,
    isLoading: isSessionLoading,
  };
};