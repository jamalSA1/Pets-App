import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from './Button';
import { useMutation, useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";

type MediaUploadProps = {
  images: string[];
  video: string;
  onImagesChange: (images: string[]) => void;
  onVideoChange: (video: string) => void;
};

export default function MediaUpload({ images, video, onImagesChange, onVideoChange }: MediaUploadProps) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.7,
        allowsMultipleSelection: true,
      });
  
      if (!result.canceled) {
        const uploadPromises = result.assets.map(async (asset) => {
          const uploadUrl = await generateUploadUrl({ contentType: "image/jpeg" });
          
          // Get the base64 data
          const base64 = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: FileSystem.EncodingType.Base64
          });
          
          // Upload to Convex storage
          await fetch(uploadUrl, {
            method: 'POST',
            body: base64,
            headers: {
              'Content-Type': 'image/jpeg',
            },
          });
          
          return uploadUrl;
        });
  
        const newStorageIds = await Promise.all(uploadPromises);
        onImagesChange([...images, ...newStorageIds]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const pickVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        const uploadUrl = await generateUploadUrl({ contentType: "video/mp4" });
        
        const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64
        });
        
        const response = await fetch(uploadUrl, {
          method: 'POST',
          body: base64,
          headers: {
            'Content-Type': 'video/mp4',
          },
        });
        
        if (!response.ok) throw new Error('Upload failed');
        onVideoChange(uploadUrl);
      }
    } catch (error) {
      console.error('Error picking/uploading video:', error);
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