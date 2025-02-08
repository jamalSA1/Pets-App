import { ConvexReactClient } from 'convex/react';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import '../global.css';
import { tokenCache } from '~/utils/cache';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}



const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isLoaded) return;
    const isAuthGroup = segments[0] === '(auth)';
    if (isSignedIn && !isAuthGroup) {
        router.replace('/(auth)/(tabs)/home');
      } else{
        router.replace('/(public)/sign-in');
      }
  }, [isSignedIn]);

  return <Slot />
};



export default function Layout() {

  
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <InitialLayout />
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
