import { Link } from 'expo-router';
import { useOAuth, useUser} from '@clerk/clerk-expo';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import logo from '~/assets/images/sheep.png';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { api } from '~/convex/_generated/api';

const ADMIN_EMAIL = process.env.EXPO_PUBLIC_ADMIN_EMAIL;

export default function Home() {
  const { user } = useUser();
  const data = useQuery(api.users.getUser, {
    email: user?.emailAddresses[0]?.emailAddress ?? ''
  });

  console.log(data);
  

  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: 'oauth_google',
  });
  const { startOAuthFlow: appleAuth } = useOAuth({
    strategy: 'oauth_apple',
  });

  const handelGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await googleAuth();

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
      } else {
        Alert.alert(
          "تنبيه",
          "لم يتم اكتمال عملية تسجيل الدخول، هل تريد المحاولة مرة أخرى؟",
          [
            {
              text: "إلغاء",
              style: "cancel"
            },
            {
              text: "محاولة مرة أخرى",
              onPress: () => handelGoogleLogin()
            }
          ]
        );
      }
    } catch (err: any) {
      console.error("Login error:", err);
      Alert.alert(
        "خطأ في التسجيل",
        "يرجى التأكد من اتصال الإنترنت والمحاولة مرة أخرى"
      );
    }
  };
  const handelAppleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await appleAuth();

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
      } else {
        Alert.alert(
          "تنبيه",
          "لم يتم اكتمال عملية تسجيل الدخول، هل تريد المحاولة مرة أخرى؟",
          [
            {
              text: "إلغاء",
              style: "cancel"
            },
            {
              text: "محاولة مرة أخرى",
              onPress: () => handelAppleLogin()
            }
          ]
        );
      }
    } catch (err: any) {
      console.error("Login error:", err);
      Alert.alert(
        "خطأ في التسجيل",
        "يرجى التأكد من اتصال الإنترنت والمحاولة مرة أخرى"
      );
    }
  };

  return (
    <View className="mt-20 w-full flex-1 items-center gap-20">
      <Image source={logo} style={{ width: 270, height: 270 }} className="" resizeMode="cover" />
      <ScrollView>
        <Text className="text-xl font-bold">مرحبا بك في تطبيق ابو خالد للمواشي</Text>
        <View className="mt-10">
          <TouchableOpacity
            className="mb-5 flex-row items-center justify-center gap-3 rounded-lg bg-slate-900 py-3"
            onPress={handelGoogleLogin}>
            <Ionicons name="logo-google" size={32} color="#fff" />
            <Text className="text-lg font-medium text-white">التسجيل من خلال قوقل</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mb-5 flex-row items-center justify-center gap-3 rounded-lg bg-gray-300 py-3"
            onPress={handelAppleLogin}>
            <Ionicons name="logo-apple" size={32} color="#000" />
            <Text className="text-lg font-medium text-black">التسجيل من خلال ابل</Text>
          </TouchableOpacity>
          <Link href="/(tabs)" asChild>
            <Text className="text-center underline">الاستمرار بدون حساب</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}
