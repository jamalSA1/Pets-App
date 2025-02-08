import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { useUser } from "@clerk/clerk-expo";
import { useMutation } from "convex/react";
import { api } from "~/convex/_generated/api";
import { Button } from './Button';
import MediaUpload from './MediaUpload';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';


export default function CreateNewProduct() {
  const { user } = useUser();
  const createPet = useMutation(api.pets.create);

  const [petData, setPetData] = useState({
    name: '',
    species: '',
    gender: '',
    color: '',
    age: '',
    price: '',
    description: '',
    images: [] as string[],
    video: '',
  });

  const handleSubmit = async () => {
    try {
      if (!user) return;

      await createPet({
        ...petData,
        userId: user.id,
        name: petData.name,
        description: petData.description,
        age: Number(petData.age),
        species: petData.species,
        gender: petData.gender,
        color: petData.color,
        price: Number(petData.price),
        images: petData.images,
        image_url: petData.images[0] || '',
        video: petData.video,
      });

      Alert.alert("نجاح", "تم إضافة الحيوان بنجاح");
      setPetData({
        name: '',
        description: '',
        age: '',
        species: '',
        gender: '',
        color: '',
        price: '',
        images: [],
        video: "",
      });
    } catch (error) {
      Alert.alert("خطأ", "حدث خطأ أثناء إضافة الحيوان");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Ionicons name="arrow-back" size={24} color="black" onPress={() => router.back()} />
      <Text className="mb-6 text-2xl font-bold">إضافة حيوان جديد</Text>
      
      <View className="space-y-4">
        <View>
          <Text className="mb-1 font-semibold">الاسم</Text>
          <TextInput
            className="rounded-lg border border-gray-300 p-2"
            value={petData.name}
            onChangeText={(text) => setPetData(prev => ({ ...prev, name: text }))}
          />
        </View>

        <View>
          <Text className="mb-1 font-semibold">النوع</Text>
          <TextInput
            className="rounded-lg border border-gray-300 p-2"
            value={petData.species}
            onChangeText={(text) => setPetData(prev => ({ ...prev, species: text }))}
          />
        </View>

        <View>
          <Text className="mb-1 font-semibold">الجنس</Text>
          <TextInput
            className="rounded-lg border border-gray-300 p-2"
            value={petData.gender}
            onChangeText={(text) => setPetData(prev => ({ ...prev, gender: text }))}
          />
        </View>

        <View>
          <Text className="mb-1 font-semibold">اللون</Text>
          <TextInput
            className="rounded-lg border border-gray-300 p-2"
            value={petData.color}
            onChangeText={(text) => setPetData(prev => ({ ...prev, color: text }))}
          />
        </View>

        <View>
          <Text className="mb-1 font-semibold">العمر</Text>
          <TextInput
            className="rounded-lg border border-gray-300 p-2"
            value={petData.age}
            onChangeText={(text) => setPetData(prev => ({ ...prev, age: text }))}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text className="mb-1 font-semibold">السعر</Text>
          <TextInput
            className="rounded-lg border border-gray-300 p-2"
            value={petData.price}
            onChangeText={(text) => setPetData(prev => ({ ...prev, price: text }))}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text className="mb-1 font-semibold">الوصف</Text>
          <TextInput
            className="rounded-lg border border-gray-300 p-2"
            value={petData.description}
            onChangeText={(text) => setPetData(prev => ({ ...prev, description: text }))}
            multiline
            numberOfLines={4}
          />
        </View>

        <MediaUpload
          images={petData.images}
          video={petData.video}
          onImagesChange={(images) => setPetData(prev => ({ ...prev, images, image_url: images[0] || '' }))}
          onVideoChange={(video) => setPetData(prev => ({ ...prev, video }))}
        />

        <Button
          title="إضافة الحيوان"
          onPress={handleSubmit}
          className="mt-6"
        />
      </View>
    </ScrollView>
  );
}