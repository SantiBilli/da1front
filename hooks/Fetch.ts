import { useEffect, useState } from 'react';
import { useAuthStore } from './AuthStore';
import { router, useRouter } from 'expo-router';

interface UseFetchParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  trigger: boolean;
  sendToken?: boolean;
  contentType?: string;
  formData?: boolean;
  body?: any;
  login?: boolean;
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
  login = false,
}: UseFetchParams) => {
  const [data, setData] = useState<FetchData | null>(null);
  const [error, setError] = useState<FetchError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchCompleted, setFetchCompleted] = useState<boolean>(false);
  const { setToken, token } = useAuthStore();

  const router = useRouter();

  const executeFetch = async () => {
    setData(null);
    setError(null);

    if (!trigger) return;

    setIsLoading(true);

    const headers: Record<string, string> = {};

    if (!formData) {
      headers['Content-Type'] = contentType;
    }

    if (sendToken) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${endpoint}`, {
        method,
        mode: 'cors',
        headers,
        body: body ? (formData ? body : JSON.stringify(body)) : null,
      });

      console.log(method, endpoint, response.status);

      if (!response.ok) {
        const res = await response.json();

        if (!login && response.status === 401) return router.replace('/(auth)/login');

        setError({ status: response.status, msg: res.message });
        return;
      }

      const res = await response.json();
      setData({ status: response.status, msg: res.message, data: res.data });
    } catch (err) {
      console.log(err);
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
