import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';

export default function Layout() {
  console.log('Layout component rendered');

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-background flex-1">
        <Stack initialRouteName="index" screenOptions={{ headerShown: false }}></Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
