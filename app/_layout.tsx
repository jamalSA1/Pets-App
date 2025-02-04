import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { Slot, Stack } from 'expo-router';
import '../global.css';
import { tokenCache } from '~/utils/cache';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

const InitialLayout = () => {
  return <Slot />
};

export default function Layout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ConvexProvider client={convex}>
          <InitialLayout />
        </ConvexProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
