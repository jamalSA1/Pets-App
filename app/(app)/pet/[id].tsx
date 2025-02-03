import { useEffect, useState, useRef } from 'react';
import { View, Text, Image, Dimensions, Modal, TouchableOpacity, Linking, Alert, Clipboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, Stack } from 'expo-router';
// @ts-ignore
// import Carousel from 'react-native-snap-carousel';
import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import { Button } from '~/components/Button';

type Pet = {
  _id: string;
  name: string;
  species: string;
  gender: string;
  color: string;
  age: number;
  price: number;
  description: string;
  images: string[];
  contact_number: string;
};

export default function PetDetails() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const carouselRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;

  const pet = useQuery(api.pets.getById, { id: id.toString() });

  useEffect(() => {
    if (pet) {
      setLoading(false);
    }
  }, [pet]);

  const handleWhatsApp = () => {
    if (pet && 'contact_number' in pet && pet.contact_number) {
      // Format phone number: remove spaces, dashes, and ensure it starts with country code
      const formattedNumber = pet.contact_number.replace(/[\s-]/g, '');
      const phoneNumberWithCountry = formattedNumber.startsWith('+966') ? formattedNumber : `+${"966" + formattedNumber}`;
      Linking.openURL(`whatsapp://send?phone=${phoneNumberWithCountry}`);
    }
  };

  const renderCarouselItem = ({ item }: { item: string }) => (
    <Image
      source={{ uri: item }}
      className="h-64 w-full rounded-lg"
      resizeMode="cover"
    />
  );

  if (loading || !pet) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading pet details...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-row items-center justify-between px-4 pt-16 bg-white">
        <TouchableOpacity onPress={() => {}}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        </View>
      <View className="flex-1 bg-white">
        {/* <Carousel
          ref={carouselRef}
          data={'images' in pet ? pet.images : []}
          renderItem={renderCarouselItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          loop={true}
          autoplay={true}
          autoplayInterval={3000}
        /> */}

        <View className="flex-1 p-4">
          <Text className="text-2xl font-bold">{'name' in pet ? pet.name : 'Unknown'}</Text>
          <Text className="mt-2 text-lg text-gray-600">{'species' in pet ? pet.species : 'Unknown'}</Text>
          
          <View className="mt-4 flex-row flex-wrap">
            <View className="mr-4 mb-2">
              <Text className="font-semibold">Gender</Text>
              <Text className="text-gray-600">{'gender' in pet ? pet.gender : 'Unknown'}</Text>
            </View>
            <View className="mr-4 mb-2">
              <Text className="font-semibold">Color</Text>
              <Text className="text-gray-600">{'color' in pet ? pet.color: "Unknown"}</Text>
            </View>
            <View className="mr-4 mb-2">
              <Text className="font-semibold">Age</Text>
              <Text className="text-gray-600">{'age' in pet ? pet.age: "Unknown"} years</Text>
            </View>
          </View>

          <Text className="mt-4 text-lg font-bold text-indigo-600">
            ${"price" in pet? pet.price: "Unknown"}
          </Text>

          <Text className="mt-4 text-gray-700">{'description' in pet ? pet.description: "Unknown"}</Text>

          <Button
            title="Contact Seller"
            onPress={() => setShowContact(true)}
            className="mt-6"
          />
        </View>

        <Modal
          visible={showContact}
          transparent
          animationType="fade"
          onRequestClose={() => setShowContact(false)}
        >
          <View className="flex-1 items-center justify-center bg-black/50">
            <View className="w-[80%] rounded-lg bg-white p-4">
              <Text className="text-lg font-semibold">Contact Information</Text>
              <View className="flex-row items-center">
                <Text className="mt-2 flex-1">{"contact_number" in pet ? pet.contact_number: "Unknown"}</Text>
                <TouchableOpacity 
                  onPress={() => {
                    if (pet && "contact_number" in pet) {
                      Clipboard.setString(pet.contact_number);
                      Alert.alert("Success", "Phone number copied to clipboard");
                    }
                  }}
                  className="mt-2 ml-2 p-2"
                >
                  <MaterialIcons name="content-copy" size={24} color="#4F46E5" />
                </TouchableOpacity>
              </View>
              
              <View className="mt-4 flex-row justify-end space-x-2">
                <TouchableOpacity
                  onPress={handleWhatsApp}
                  className="rounded-lg bg-green-500 px-4 py-2"
                >
                  <Text className="text-white">WhatsApp</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowContact(false)}
                  className="rounded-lg bg-gray-300 px-4 py-2"
                >
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}