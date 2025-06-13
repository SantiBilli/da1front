import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useFetch } from 'hooks/Fetch';
import { router, useLocalSearchParams } from 'expo-router';
import Splash from './splash';
import { useObraSocialStore } from 'hooks/ObraSocial';
import LoadingPage from './loading';

const verifyOs = () => {
  const params = useLocalSearchParams();

  const { setTieneObraSocial } = useObraSocialStore();
  const { data, error, isLoading } = useFetch({
    endpoint: '/validar-obra-social',
    method: 'GET',
    trigger: true,
    sendToken: true,
  });

  useEffect(() => {
    if (isLoading || !data) return;
    setTieneObraSocial(data.data.tieneObra);
    if (data.data.tieneObra) {
      return router.replace('/(tabs)/home');
    }
    return router.replace('/popup');
  }, [data, isLoading]);

  if (params.from === 'login' && isLoading) {
    return <LoadingPage />;
  } else if (params.from === 'index' && isLoading) {
    return <Splash />;
  }
};

export default verifyOs;
