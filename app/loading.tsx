import { View, ActivityIndicator, Text } from 'react-native';

const LoadingPage = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color="#3AB4E5" />
      <Text className="mt-4 text-lg font-semibold text-primary">Cargando...</Text>
    </View>
  );
};

export default LoadingPage;
