// app/index.tsx
import { Redirect, router } from 'expo-router';
import { useFetch } from 'hooks/Fetch';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Splash from './splash';

export default function Index() {
  // console.log('Index page loaded');

  const { data, error, isLoading } = useFetch({
    endpoint: '/authentications',
    method: 'POST',
    trigger: true,
    sendToken: true,
  });

  useEffect(() => {
    if (isLoading || !data) return;

    return router.replace('/verify-os');
  }, [data, isLoading]);

  useEffect(() => {
    if (error) return router.replace('/(auth)/login');
  }, [error]);

  if (isLoading) {
    return <Splash />;
  }
}
