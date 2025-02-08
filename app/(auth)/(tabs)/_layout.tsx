import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

const CreateTabIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={styles.createIconContainer}>
    <Ionicons name="add" size={size} color={color} />
  </View>
);

import { useUser } from '@clerk/clerk-expo';

const Layout = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  const { user } = useUser();
  const isAdmin = user?.emailAddresses[0]?.emailAddress === process.env.EXPO_PUBLIC_ADMIN_EMAIL;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000',
        tabBarStyle: {
          justifyContent: 'space-around',
        }
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => signOut()}>
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />

      {isAdmin ? (
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            tabBarIcon: ({ color, size }) => <CreateTabIcon color={color} size={size} />,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              Haptics.selectionAsync();
              router.push('/(auth)/(modal)/create');
            },
          }}
        />
      ) : null}

      <Tabs.Screen
        name="create"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="feed-video"
        options={{
          title: 'feed',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused? 'videocam' : 'videocam-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  logoutText: {
    marginRight: 10,
    color: 'blue',
  },
  createIconContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 6,
  },
});