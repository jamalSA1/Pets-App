import { useAuth } from "@clerk/clerk-react";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function _layout() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isLoaded) return;
    const isAuthGroup = segments[0] === '(auth)';
    if (isSignedIn && !isAuthGroup) {
        router.replace('/(auth)/(tabs)');
      } else{
        router.replace('/(public)/sign-in');
      }
  }, [isSignedIn]);
  return (
    <Slot />
  );
}
