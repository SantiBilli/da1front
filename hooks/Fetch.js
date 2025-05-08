import { useEffect, useState } from 'react';
import { useAuthStore } from './AuthStore';
import { router } from 'expo-router';

export const useFetch = ({
  endpoint,
  method,
  trigger,
  sendToken = true,
  contentType = 'application/json',
  formData = false,
  body = null,
}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchCompleted, setFetchCompleted] = useState(false);
  const { setToken, token } = useAuthStore();

  const executeFetch = async () => {
    setData(null);
    setError(null);

    if (trigger) {
      setIsLoading(true);

      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${endpoint}`, {
          method: method,
          mode: 'cors',
          headers: {
            'Content-Type': contentType,
            ...(sendToken ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: body ? (formData ? body : JSON.stringify(body)) : null,
        });

        if (!response.ok) {
          const res = await response.json();
          return setError({ status: response.status, msg: res.error });
        }

        if (response.status === 204) return setData([]);

        const data = await response.json();
        setData(data);

        if (sendToken) {
          const newToken = response.headers.get('Authorization');

          setToken(newToken.split(' ')[1]);
        }
      } catch (err) {
        return router.replace('/oops');
      } finally {
        setIsLoading(false);
        setFetchCompleted(true);
      }
    }
  };

  useEffect(() => {
    executeFetch();
    return;
  }, [trigger]);

  return { data, error, isLoading, fetchCompleted };
};
