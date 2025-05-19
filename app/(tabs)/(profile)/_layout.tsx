import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const ProfileLayuout = () => {
  // console.log('ProfileLayuout component rendered');
  return <Stack initialRouteName="profile" screenOptions={{ headerShown: false }} />;
};

export default ProfileLayuout;
