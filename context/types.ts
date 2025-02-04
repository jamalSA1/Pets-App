import { ViewStyle } from "react-native";

export type Pet = {
  _id: string;
  name: string;
  species: string;
  image: string;
  price: number;
};

export type RenderSkeletonProps = {
  imageHeight?: number;
  itemWidth?: string;
  itemsCount?: number;
  containerStyle?: ViewStyle;
};