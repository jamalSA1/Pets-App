import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import { Skeleton } from '~/components/ui/skeleton';
import RenderItems from '~/components/RenderItems';
import RenderSkeleton from '~/components/RenderSkeleton';

export default function Marketplace() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
setLoading(false);
  }, []);

  const pets = useQuery(api.pets.list) || [];

  if (loading) {
    return <RenderSkeleton 
  imageHeight={128}
  itemWidth="45%"
  itemsCount={4}
/>
  }

  return (
    <>
      <SafeAreaView className="flex-1 bg-gray-50 p-4">
        <FlatList
          data={pets?.map(pet => ({
            ...pet,
            image: pet.images?.[0] || pet.image_url,
            _id: pet._id.toString(),
          }))}
          renderItem={({ item }) => <RenderItems item={item} />}
          keyExtractor={(item) => item._id}
          numColumns={2}
          refreshControl={
            <RenderSkeleton itemWidth='200px'/>
          }
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
        />
        {/* احذفيه */}
        <Link href="/+not-found" asChild>
          <TouchableOpacity className="mt-4 p-2 bg-indigo-600 rounded-lg">
            <Text className="text-white text-center">Not found</Text>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    </>
  );
}