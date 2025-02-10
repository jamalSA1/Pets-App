import { MaterialIcons } from '@expo/vector-icons';
import { Link, router, Stack } from 'expo-router';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';


export default function NotFoundScreen() {
  return (
    <View className='bg-white flex-1'>
    <View className="flex-row items-center justify-between ml-7 mt-14">
        <TouchableOpacity onPress={() => {
          router.back();
        }}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        </View>
        <View className='mt-40'>
        <View className='items-center justify-center'>
          <LottieView
      source={require('../assets/404.json')}
      loop
      autoPlay
      resizeMode='cover'
      style={{ width: 320, height: 320 }}
      />
        </View>
        <Text className={styles.title}>الصفحة غير موجودة.</Text>
      </View>
    </View>
  );
}

const styles = {
  title: `text-xl font-bold text-center`,
  link: `mt-4 pt-4`,
  linkText: `text-base text-[#2e78b7]`,
};
