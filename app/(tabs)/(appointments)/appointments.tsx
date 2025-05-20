import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useAuthStore } from 'hooks/AuthStore';

const Appointments = () => {
  console.log('Appointments component rendered');

  return (
    <View>
      <Text>Appointments</Text>
    </View>
  );
};

export default Appointments;
