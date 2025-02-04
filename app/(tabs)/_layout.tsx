import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const {Navigator} = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout() {
  const {top} = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, marginTop: top - 5 }}>
      <MaterialTopTabs 
        screenOptions={{
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#9AA6B2',
          tabBarIndicatorStyle: {
            backgroundColor: '#000',
            width: '25%',
            height: 2,
            marginLeft: '12.5%',
            borderRadius: 50,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            textTransform: 'capitalize',
          },
        }}
      >
        <MaterialTopTabs.Screen 
          name="index" 
          options={{
            title: 'المعرض'
          }} 
        />
        <MaterialTopTabs.Screen 
          name="feed-video" 
          options={{
            title: 'News'
          }} 
          />
      </MaterialTopTabs>
    </View>
  );
}
