import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Alert, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import * as Clipboard from 'expo-clipboard';

export default function ItemPage() {
  const [isCopied, setIsCopied] = useState(false);
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  const pet = useQuery(api.pets.getById, { 
    id: typeof id === 'string' ? id : id[0] 
  });



  useEffect(() => {
    if (pet) setLoading(false);
  }, [pet]);

  const handleWhatsApp = () => {
    const adminNumber = process.env.EXPO_PUBLIC_ADMIN_NUMBER;
    if (adminNumber) {
      const formattedNumber = adminNumber.replace(/[\s-]/g, '');
      const phoneNumber = formattedNumber.startsWith('+966') ? formattedNumber : `+966${formattedNumber}`;
      Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
    }
  };

  if (loading || !pet) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white mt-16">
      <StatusBar barStyle={'dark-content'} />
      <View className="flex-row items-center justify-between p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: (pet as any)?.images?.[0] || (pet as any).image_url }}
        className="h-64 w-full"
        resizeMode="cover"
      />

      <View className="p-4">
        <Text className="text-2xl font-bold">{(pet as any)?.name}</Text>
        <Text className="mt-2 text-lg text-gray-600">{(pet as any)?.species}</Text>

        <View className="mt-4 flex-row flex-wrap">
          <View className="mr-4 mb-2">
            <Text className="font-semibold">الجنس</Text>
            <Text className="text-gray-600">{(pet as any)?.gender}</Text>
          </View>
          <View className="mr-4 mb-2">
            <Text className="font-semibold">اللون</Text>
            <Text className="text-gray-600">{(pet as any)?.color}</Text>
          </View>
          <View className="mr-4 mb-2">
            <Text className="font-semibold">العمر</Text>
            <Text className="text-gray-600">{(pet as any)?.age} سنة</Text>
          </View>
        </View>

        <Text className="mt-4 text-xl font-bold text-indigo-600">
          {(pet as any)?.price} ريال
        </Text>

        <Text className="mt-4 text-gray-700">{(pet as any)?.description}</Text>

        <View className="mt-6 flex-row gap-2">
          <TouchableOpacity
            onPress={handleWhatsApp}
            className="flex-1 flex-row items-center justify-center rounded-lg bg-green-500 p-3"
          >
            <Ionicons name="logo-whatsapp" size={24} color="white" />
            <Text className="ml-2 text-lg font-medium text-white">تواصل مع البائع</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              const adminNumber = process.env.EXPO_PUBLIC_ADMIN_NUMBER;
              if (adminNumber && !isCopied) {
                await Clipboard.setStringAsync(adminNumber);
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 3000);
              }
            }}
            className="flex-row items-center justify-center rounded-lg bg-gray-200 px-4"
          >
            {isCopied ? (
              <MaterialIcons name="check" size={24} color="green" />
            ) : (
              <MaterialIcons name="content-copy" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        </View>
    </ScrollView>
  );
}