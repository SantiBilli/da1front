import { View, Text } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Oops = () => {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text>Oops algo salio mal!</Text>
      <Text className="text-[12px] text-primary" onPress={() => router.push('/(auth)/login')}>
        Iniciar Sesion
      </Text>
    </View>
  );
};

export default Oops;
