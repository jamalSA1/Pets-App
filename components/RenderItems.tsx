import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Pet } from "~/context/types";
import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";

const RenderItems = ({ item }: { item: Pet }) => {
  const storageId = item.images?.[0];
  const imageUrl = useQuery(api.files.getUrl, { 
    storageId: storageId || "" 
  });

  return (
    <Link href={`/(auth)/(pet)/${item._id}`} asChild>
      <TouchableOpacity className="m-2 w-[45%] overflow-hidden rounded-lg bg-white shadow-md">
        <Image
          source={{ 
            uri: imageUrl || item.image_url || item.image || "https://placehold.co/600x400?text=No+Image"
          }}
          className="h-32 w-full"
          resizeMode="cover"
        />
        <View className="p-2">
          <Text className="text-lg font-semibold">{item.name}</Text>
          <Text className="mt-1 font-bold text-indigo-600">ريال {""}{item.price}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default RenderItems;
