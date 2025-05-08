// app/index.tsx
import { router } from 'expo-router';
import { useFetch } from 'hooks/Fetch';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function Index() {
  console.log('Index page loaded');

  const { data, error, isLoading } = useFetch({
    endpoint: '/authentications',
    method: 'POST',
    trigger: true,
    sendToken: true,
  });

  console.log('');
  console.log('Data:', data);
  console.log('Error:', error);
  console.log('Is Loading:', isLoading);

  useEffect(() => {
    if (isLoading || !data) return;

    return router.replace('/(tabs)/home');
  }, [data, isLoading]);

  useEffect(() => {
    if (error) return router.replace('/(auth)/login');
  }, [error]);
}
