import { View, Text } from 'react-native';
import React, { useCallback } from 'react';
import { Slot, Stack, useFocusEffect, useRouter } from 'expo-router';

export default function HomeLayout() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      router.replace('/(appointments)/appointments');
    }, [])
  );

  return <Slot />;
}

// const AppointmentsLayout = () => {
//   // console.log('AppointmentsLayout component rendered');
//   return <Stack initialRouteName="appointments" screenOptions={{ headerShown: false }} />;
// };

// export default AppointmentsLayout;
