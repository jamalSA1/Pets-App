import { View, Text, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { RenderSkeletonProps } from "~/context/types";

const RenderSkeleton = ({
  imageHeight = 128, // Default height 32 * 4 = 128
  itemWidth = "45%", // Default width
  itemsCount = 1,    // Default count
  containerStyle,
}: RenderSkeletonProps) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4" style={containerStyle}>
      <FlatList
        data={Array(itemsCount).fill(0)}
        renderItem={() => (
          <View 
            style={{ width: typeof itemWidth === 'string' ? Number.parseInt(itemWidth) : itemWidth }}
            className="m-2 overflow-hidden rounded-lg bg-gray-100 shadow-md"
          >
            <Skeleton className={`w-full h-[${imageHeight}px]`} />
            <View className="p-2">
              <Skeleton className="h-24 w-[80%]" />
              <Skeleton className="mt-1 h-20 w-[60%]" />
              <Skeleton className="mt-1 h-20 w-[40%]" />
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default RenderSkeleton;
