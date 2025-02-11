import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-react";

export default function Layout() {

  return (
    <Stack
      screenOptions={{ contentStyle: { backgroundColor: 'white' }, headerShadowVisible: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      <Stack.Screen name="(modal)" options={{ headerShown: false, presentation: 'modal'}} />
      <Stack.Screen name="(pet)" options={{ headerShown: false}} />
    </Stack>
  );
}
