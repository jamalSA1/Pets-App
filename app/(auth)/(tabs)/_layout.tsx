import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { Platform } from 'react-native';

const {Navigator} = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout() {
  return (
    <MaterialTopTabs screenOptions={{
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: '#9AA6B2',
      tabBarIndicatorStyle: {
        backgroundColor: '#000',
        width: '25%',
        height: 2,
        marginLeft: '12.5%',
      },
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'capitalize',
      },
      tabBarStyle: {
        backgroundColor: '#fff',
        height: 40,
        elevation: 0,
        marginTop: Platform.OS === 'ios' ? 45 : 25,
      },
    }}>
      <MaterialTopTabs.Screen name="index" options={{title: 'المعرض'}} />
      <MaterialTopTabs.Screen name="feed-video" options={{title: 'فيديو'}} />
    </MaterialTopTabs>
  );
}
