import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const medicoDetail = () => {
  const { id } = useLocalSearchParams();

  console.log('medicoDetail component rendered');
  console.log('medico ID:', id);

  return (
    <View>
      <Text>Medico Detail: {id}</Text>
    </View>
  );
};

export default medicoDetail;
