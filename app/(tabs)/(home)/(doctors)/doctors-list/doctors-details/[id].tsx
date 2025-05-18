import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const DoctorDetail = () => {
  const { id } = useLocalSearchParams();

  console.log('DoctorDetail component rendered');
  console.log('Doctor ID:', id);

  return (
    <View>
      <Text>Doctor Detail: {id}</Text>
    </View>
  );
};

export default DoctorDetail;
