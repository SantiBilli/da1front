import { Stack } from 'expo-router';

const AuthLayout = () => {
  console.log('AuthLayout component rendered');

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
