import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const DoctorsLayout = () => {
  console.log('DoctorsLayout component rendered');
  return <Stack initialRouteName="doctors" screenOptions={{ headerShown: false }} />;
};

export default DoctorsLayout;
