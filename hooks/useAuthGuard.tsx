import { useSession } from "@/lib/ctx";
import { useRouter, useSegments, useRootNavigationState } from "expo-router";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const { session, isSessionLoading } = useSession();
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  const isAuthenticated = !!session;

  useEffect(() => {
    // ⛔ Don’t run until navigation state is ready
    if (!navigationState?.key) return;

    if (isSessionLoading) return;

    const rootSegment = segments[0] as string | undefined;
    const inAuth = rootSegment === "(auth)";
    const inMain = rootSegment === "(drawer)";

    if (!isAuthenticated && !inAuth) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated && !inMain) {
      router.replace("/(drawer)/(tabs)");
    }
  }, [isAuthenticated, isSessionLoading, segments, navigationState]);
};
