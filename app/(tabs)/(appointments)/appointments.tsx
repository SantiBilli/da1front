import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import CardTurno from 'components/CardTurno';

const Appointments = () => {
  console.log('Appointments component rendered');

  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4">
        <View className="absolute -top-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-[#00BFFF]" />
        <Text className="mb-4 mt-[70px] px-4 text-[20px] font-semibold text-primary">
            Mis Turnos
        </Text>
        <View className="mt-4 flex-1 items-center gap-5">
          {/*cambiar esto*/}
          <CardTurno />
          <CardTurno />
          <CardTurno />
          <CardTurno />
          <CardTurno />
          <CardTurno />
        </View>
      </ScrollView>
    </View>
    
  );
};

export default Appointments;
