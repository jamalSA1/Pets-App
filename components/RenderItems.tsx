import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Pet } from "~/context/types";

const RenderItems = ({ item }: { item: Pet }) => {
  return (
    <Link href={`/pet/${item._id}`} asChild>
      <TouchableOpacity className="m-2 w-[45%] overflow-hidden rounded-lg bg-white shadow-md">
        <Image
          source={{ uri: item.image }}
          className="h-32 w-full"
          resizeMode="cover"
        />
        <View className="p-2">
          <Text className="text-lg font-semibold">{item.name}</Text>
          <Text className="text-gray-600">{item.species}</Text>
          <Text className="mt-1 font-bold text-indigo-600">${item.price}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default RenderItems;
