import { View, Text } from "react-native";
import React from "react";
import CreateNewProduct from "~/components/CreateNewProduct";

const index = () => {
  return (
    <View className="flex-1">
      <CreateNewProduct />
    </View>
  );
};

export default index;
