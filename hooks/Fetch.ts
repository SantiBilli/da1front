import { useEffect, useState } from 'react';
import { useAuthStore } from './AuthStore';
import { router } from 'expo-router';

interface UseFetchParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  trigger: boolean;
  sendToken?: boolean;
  contentType?: string;
  formData?: boolean;
  body?: any;
}

interface FetchError {
  status: number;
  msg: string;
}

interface FetchData {
  status: number;
  msg: string;
  data: any;
}

export const useFetch = ({
  endpoint,
  method,
  trigger,
  sendToken = true,
  contentType = 'application/json',
  formData = false,
  body = null,
}: UseFetchParams) => {
  const [data, setData] = useState<FetchData | null>(null);
  const [error, setError] = useState<FetchError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchCompleted, setFetchCompleted] = useState<boolean>(false);
  const { setToken, token } = useAuthStore();

  const executeFetch = async () => {
    setData(null);
    setError(null);

    if (!trigger) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${endpoint}`, {
        method,
        mode: 'cors',
        headers: {
          'Content-Type': contentType,
          ...(sendToken ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? (formData ? body : JSON.stringify(body)) : null,
      });

      if (!response.ok) {
        const res = await response.json();
        setError({ status: response.status, msg: res.message });
        return;
      }

      const res = await response.json();
      setData({ status: response.status, msg: res.message, data: res.data });

      if (sendToken) {
        console.log('Fetch Token:', token);

        const newToken = response.headers.get('Authorization');

        console.log('New Token:', newToken);

        if (newToken?.startsWith('Bearer ')) {
          setToken(newToken.split(' ')[1]);
        }
      }
    } catch (err) {
      router.replace('/oops');
    } finally {
      setIsLoading(false);
      setFetchCompleted(true);
    }
  };

  useEffect(() => {
    executeFetch();
  }, [trigger]);

  return { data, error, isLoading, fetchCompleted };
};
