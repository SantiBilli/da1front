import { Slot, useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function HomeLayout() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      router.replace('/(home)/home');
    }, [])
  );

  return <Slot />;
}

// const HomeLayout = () => {
//   // console.log('HomeLayout component rendered');
//   return <Stack initialRouteName="home" screenOptions={{ headerShown: false }} />;
// };

// export default HomeLayout;
