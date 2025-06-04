import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useFetch } from 'hooks/Fetch';
import { router } from 'expo-router';
import Splash from './splash';

const verifyOs = () => {
  const { data, error, isLoading } = useFetch({
    endpoint: '/validar-obra-social',
    method: 'GET',
    trigger: true,
    sendToken: true,
  });

  useEffect(() => {
    if (isLoading || !data) return;

    if (data.data.tieneObra) {
      return router.replace('/(tabs)/home');
    }

    return router.replace('/popup');
  }, [data, isLoading]);

  if (isLoading) {
    return <Splash />;
  }
};

export default verifyOs;
