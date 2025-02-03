import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
// import { Image } from 'expo-image';
import { Link, Stack } from 'expo-router';
import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";

type Pet = {
  _id: string;
  name: string;
  species: string;
  image: string;
  price: number;
};

export default function Marketplace() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
setLoading(false);
  }, []);

  const pets = useQuery(api.pets.list) || [];

  const renderPet = ({ item }: { item: Pet }) => (
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

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading pets...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Pets Marketplace' }} />
      <View className="flex-1 bg-gray-50 p-4">
        <FlatList
          data={pets?.map(pet => ({
            ...pet,
            image: pet.images?.[0] || pet.image_url,
            _id: pet._id.toString(),
          }))}
          renderItem={renderPet}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}