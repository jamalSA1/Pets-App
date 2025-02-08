import { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import RenderItems from '~/components/RenderItems';
import RenderSkeleton from '~/components/RenderSkeleton';
import { useUser } from '@clerk/clerk-react';
import CreateNewProduct from '~/components/CreateNewProduct';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const pets = useQuery(api.pets.list) || [];
const ADMIN_EMAIL = process.env.EXPO_PUBLIC_ADMIN_EMAIL;
const {user} = useUser();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    <ActivityIndicator size="large" color="#000" />
  }

  return (
    <View style={{ backgroundColor: '#fff' }} className="flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView className="flex-1">
        <View className="flex-1 bg-gray-50 p-4">
            <FlatList
              data={pets?.map(pet => ({
                ...pet,
                image: pet.images?.[0] || pet.image_url,
                _id: pet._id.toString(),
              }))}
              renderItem={({ item }) => <RenderItems item={item} />}
              keyExtractor={(item) => item._id}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              showsVerticalScrollIndicator={false}
            />
        </View>
      </SafeAreaView>

      {user?.emailAddresses[0]?.emailAddress === ADMIN_EMAIL && (
        <TouchableOpacity 
          onPress={() => router.push('/(modal)')}
          className="absolute bottom-8 right-8 h-14 w-14 items-center justify-center rounded-full bg-black shadow-lg"
        >
          <MaterialIcons name="add" size={30} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}