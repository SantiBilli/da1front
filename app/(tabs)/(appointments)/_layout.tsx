import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const AppointmentsLayout = () => {
  // console.log('AppointmentsLayout component rendered');
  return <Stack initialRouteName="appointments" screenOptions={{ headerShown: false }} />;
};

export default AppointmentsLayout;
