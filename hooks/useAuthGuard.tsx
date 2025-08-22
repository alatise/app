import { useSession } from "@/lib/ctx";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const { session, isSessionLoading } = useSession();
  const router = useRouter();
  const segments = useSegments();

  const isAuthenticated = !!session;

  const rootSegment = segments[0] as string | undefined;

  const MAIN_PATH = "/(drawer)/(tabs)" as any;

  useEffect(() => {
    // SecureStore.deleteItemAsync("session");
    // SecureStore.deleteItemAsync("selectedInterest");
    if (isSessionLoading) return;

    const inRoot = !rootSegment;
    const inOnboarding = rootSegment === "(auth)";
    const inPublic = inRoot || inOnboarding 
    const inMain = rootSegment === "(drawer)" || rootSegment === "(home)";

    // 🚪 Case 1: No session
    if (!isAuthenticated) {
      if (!inPublic) router.replace("/(auth)/login");
      return;
    }

    // 🚪 Case 3: Session exists + interest selected
    if (isAuthenticated) {
      if (!inMain) router.replace(MAIN_PATH);
      return;
    }
  }, [isAuthenticated, isSessionLoading, rootSegment, router, session]);
};
