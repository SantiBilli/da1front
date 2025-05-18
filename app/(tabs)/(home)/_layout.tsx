import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const HomeLayout = () => {
  console.log('HomeLayout component rendered');
  return <Stack initialRouteName="home" screenOptions={{ headerShown: false }} />;
};

export default HomeLayout;
