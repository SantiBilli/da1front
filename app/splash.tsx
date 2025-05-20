import { View, Text, Image } from 'react-native';
import React from 'react';
import images from '../constants/images';

const Splash = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <View className="absolute -top-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-[#00BFFF]" />
      <Image source={images.logo} className="mb-[50px] h-[70px] w-[70px]" />
      <View className="absolute -bottom-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-[#00BFFF]" />
    </View>
  );
};

export default Splash;
