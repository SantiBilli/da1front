import { View, Text } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import Icons from 'react-native-vector-icons/AntDesign';

const Oops = () => {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <View className="absolute -top-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-secondary" />
      <View className="flex-1 items-center justify-center gap-5">
        <Icons name="warning" size={80} color="#FF0000" />
        <View className="items-center gap-2">
          <Text className="text-[18px] font-bold">Oops!</Text>
          <Text className="text-[14px]">Algo salio mal...</Text>
        </View>
        <Text className="text-[14px] text-primary" onPress={() => router.push('/(auth)/login')}>
          Iniciar Sesion
        </Text>
      </View>
      <View className="absolute -bottom-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-secondary" />
    </View>
  );
};

export default Oops;
