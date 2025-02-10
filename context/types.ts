import { ViewStyle } from "react-native";

export interface Pet {
  _id: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  image_url?: string;
  video?: string;
  created_at: number;
  species: string;
}

export type RenderSkeletonProps = {
  imageHeight?: number;
  itemWidth?: string;
  itemsCount?: number;
  containerStyle?: ViewStyle;
};