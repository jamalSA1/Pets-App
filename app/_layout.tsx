import { ConvexProvider, ConvexReactClient } from 'convex/react';
import '../global.css';

import { Stack } from 'expo-router';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

export default function Layout() {
  return (
    <ConvexProvider client={convex}>
      <Stack screenOptions={{headerShown: false}}/>
    </ConvexProvider>
  );
}
