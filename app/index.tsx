// app/index.tsx
import { Redirect, router } from 'expo-router';
import { useFetch } from 'hooks/Fetch';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Splash from './splash';

export default function Index() {
  // console.log('Index page loaded');

  const { data, error, isLoading } = useFetch({
    endpoint: '/authentications',
    method: 'POST',
    trigger: true,
    sendToken: true,
    wait: true,
  });

  const [minimumTimePassed, setMinimumTimePassed] = useState(false);

  useEffect(() => {
    if (!isLoading && data && minimumTimePassed) {
      router.replace('/verify-os?from=index');
    }
  }, [data, isLoading, minimumTimePassed]);

  useEffect(() => {
    if (error && minimumTimePassed) return router.replace('/(auth)/login');
  }, [error, minimumTimePassed]);

  useEffect(() => {
    const timer = setTimeout(() => setMinimumTimePassed(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return <Splash />;
}
