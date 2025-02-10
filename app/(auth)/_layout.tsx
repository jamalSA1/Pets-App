import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-react";

export default function Layout() {
  const { user } = useUser();
  const isAdmin = user?.emailAddresses[0]?.emailAddress === process.env.EXPO_PUBLIC_ADMIN_EMAIL;
  return (
    <Stack
      screenOptions={{ contentStyle: { backgroundColor: 'white' }, headerShadowVisible: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      <Stack.Screen name="(modal)" options={{ headerShown: false, presentation: 'modal'}} />
      <Stack.Screen name="(pet)" options={{ headerShown: false}} />
    </Stack>
  );
}
