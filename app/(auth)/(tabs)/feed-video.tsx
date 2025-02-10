import { View, Text, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import { router } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { useState, useRef } from "react";
import { MaterialIcons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Page = () => {
  const isFocused = useIsFocused();
  const videoRefs = useRef<{ [key: string]: Video }>({});
  const [playingStates, setPlayingStates] = useState<{ [key: string]: boolean }>({});
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const pets = useQuery(api.pets.list) || [];
  const videoPets = pets
    .filter((pet: any) => pet.video)
    .sort((a, b) => b.created_at - a.created_at);
   if (videoPets.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <MaterialIcons name="videocam-off" size={80} color="#666" />
        <Text className="mt-4 text-lg text-gray-600">
          لم يقم البائع بنشر اي فديوهات
        </Text>
      </View>
    );
  }

    const togglePlay = async (id: string) => {
      if (videoRefs.current[id]) {
        const status = await videoRefs.current[id].getStatusAsync();
        if (status.isLoaded) {
          if (status.isPlaying) {
            await videoRefs.current[id].pauseAsync();
            setPlayingStates(prev => ({ ...prev, [id]: false }));
          } else {
            await videoRefs.current[id].playAsync();
            setPlayingStates(prev => ({ ...prev, [id]: true }));
          }
        }
      }
    };
  
    const renderItem = ({ item, index }: { item: any; index: number }) => {
       const videoUrl = item.video?.startsWith('http') 
    ? item.video 
    : `https://${item.video}`;

    return <View className="relative justify-center items-center" style={{ height: SCREEN_HEIGHT - 100 }}>
        <TouchableOpacity 
          activeOpacity={1}
          onPress={() => togglePlay(item._id)}
          className="w-full h-full"
        >
          <Video
            ref={(ref) => {
              if (ref) {
                videoRefs.current[item._id] = ref;
              }
            }}
            source={{ uri: item.video }}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={index === activeVideoIndex && isFocused && playingStates[item._id] !== false}
            isLooping
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 100 }}
          />
          {playingStates[item._id] === false && (
            <View className="absolute inset-0 items-center justify-center bg-black/30">
              <MaterialIcons name="play-arrow" size={80} color="white" />
            </View>
          )}
        </TouchableOpacity>

      <View className="absolute bottom-10 left-4 bg-black/50 p-4 rounded-lg">
        <Text className="text-white text-xl font-bold">
          {item.name}
        </Text>
        <Text className="text-white text-lg">
          {item.price} ريال
        </Text>
      </View>
      
      <TouchableOpacity
        onPress={() => router.push(`/(auth)/(pet)/${item._id}`)}
        className="absolute top-10 right-4 bg-red-500 px-4 py-2 rounded-lg"
      >
        <Text className="text-white">عرض التفاصيل</Text>
      </TouchableOpacity>
    </View>
    };

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setActiveVideoIndex(viewableItems[0].index);
      // Reset playing state for new video
      setIsPlaying(true);
    }
  };

  return (
    <View className="flex-1 bg-transparent">
      <FlatList
        data={videoPets}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </View>
  );
};

export default Page;
