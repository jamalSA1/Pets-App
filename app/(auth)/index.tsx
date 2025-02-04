import { Stack, Link, Redirect } from 'expo-router';
import { api } from "~/convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";
import { useConvexAuth } from "convex/react";
import { useQuery } from "convex/react";

const ADMIN_EMAIL = process.env.EXPO_PUBLIC_ADMIN_EMAIL;

export default function Home() {
  // const { isAuthenticated, isLoading } = useConvexAuth();
  // const { getToken, user} = useAuth();
  // const userData = useQuery(api.users.getUser, { 
  //   email: user?.emailAddresses[0]?.emailAddress 
  // });

  // if (isLoading) {
  //   return null;
  // }

  // if (!isAuthenticated) {
  //   return <Redirect href="/sign-in" />;
  // }

  // if (user?.emailAddresses[0]?.emailAddress === ADMIN_EMAIL) {
  //   // return <Redirect href="/admin" />;
  // }

  return <Redirect href="/(tabs)" />;
}
