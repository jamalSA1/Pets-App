import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Stack
      screenOptions={{ contentStyle: { backgroundColor: 'white' }, headerShadowVisible: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modal)/create"
        options={{
          presentation: 'modal',
          title: 'New thread',
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name="arrow-back" size={24} color="#000" onPress={() => {
                router.back();
              }} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
