import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import ConfirmButton from 'components/ConfirmButton';

const Popup = () => {
  const router = useRouter();

  const handlePress = () => {
    return router.replace('/(tabs)/home');
  };

  return (
    <View className="flex-1 bg-background">
      <View className="absolute left-[-52px] top-[-180px] h-[300px] w-[300px] rounded-full bg-secondary" />
      <View className="absolute right-[-50px] top-[-160px] h-[250px] w-[250px] rounded-full bg-primary" />
      <View className="flex-1 items-center justify-center">
        <Icons name="error" color={'#3AB4E5'} size={75} />
        <Text className="mb-[40px] text-[32px] font-bold text-primary">¡Atención!</Text>
        <Text className="w-[277px] text-center text-[16px] text-primary">
          Recordá completar tus credenciales{'\n'} antes de continuar.
        </Text>
        <View className="mt-[100px]" style={{ width: 300 }}>
          <ConfirmButton title="Completar credenciales" onPress={handlePress} />
        </View>
      </View>
      <View className="absolute bottom-[-180px] left-[-52px] h-[300px] w-[300px] rounded-full bg-secondary" />
      <View className="absolute bottom-[-135px] right-[-50px] h-[250px] w-[250px] rounded-full bg-primary" />
    </View>
  );
};

export default Popup;
