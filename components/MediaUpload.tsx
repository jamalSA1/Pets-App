import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from './Button';

type MediaUploadProps = {
  images: string[];
  video: string;
  onImagesChange: (images: string[]) => void;
  onVideoChange: (video: string) => void;
};

export default function MediaUpload({ 
  images, 
  video, 
  onImagesChange, 
  onVideoChange 
}: MediaUploadProps) {
  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newImages = result.assets.map(asset => asset.uri);
      onImagesChange([...images, ...newImages]);
    }
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onVideoChange(result.assets[0].uri);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <View className="space-y-4">
      <View>
        <Text className="mb-2 font-semibold">الصور</Text>
        <ScrollView horizontal className="mb-4">
          {images.map((uri, index) => (
            <View key={index} className="relative mr-2">
              <Image 
                source={{ uri }} 
                className="h-20 w-20 rounded-lg" 
              />
              <TouchableOpacity
                onPress={() => removeImage(index)}
                className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1"
              >
                <MaterialIcons name="close" size={16} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <Button
          title="إضافة صور"
          onPress={pickImage}
          className="mb-2"
        />
      </View>

      <View>
        <Text className="mb-2 font-semibold">الفيديو</Text>
        {video ? (
          <View className="mb-2 flex-row items-center">
            <MaterialIcons name="video-library" size={24} color="green" />
            <Text className="ml-2">تم اختيار الفيديو</Text>
            <TouchableOpacity
              onPress={() => onVideoChange('')}
              className="ml-auto"
            >
              <MaterialIcons name="close" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ) : null}
        <Button
          title="إضافة فيديو"
          onPress={pickVideo}
          className="mb-2"
        />
      </View>
    </View>
  );
}