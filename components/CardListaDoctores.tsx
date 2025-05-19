import { View, Text, Image, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

interface props {
  id_medico: string;
  nombre: string;
  apellido: string;
  direccion: string;
  disponibilidad: string;
  pfp: string;
  otherStyles?: string;
}

const CardListamedicoes = ({
  id_medico,
  nombre,
  apellido,
  direccion,
  disponibilidad,
  pfp,
  otherStyles,
}: props) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`(home)/doctors-list/doctors-details/${id_medico}`)}>
      <LinearGradient
        colors={['#45CADE4D', '#A0E8EB4D', '#FFFFFF4D']}
        locations={[0.0, 0.5, 1.0]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: 125,
          width: 340,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#3AB4E5', //Uso styles porque la libreria no soporta tailwind
        }}>
        <View className="flex w-[100px] items-center justify-center ">
          <Image
            source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/imagen-medico/${pfp}` }}
            className="h-[60px] w-[60px] rounded-full border-[1px] border-primary"
          />
        </View>
        <View className="flex-1 gap-4 ">
          <Text className="text-[15px]  text-primary">
            Dr/a.{' '}
            <Text className="text-black">
              {nombre} {apellido}
            </Text>
          </Text>
          <View className="justi flex-row items-center gap-2">
            <Icons name="location-pin" color={'#3AB4E5'} size={20} />
            <Text className="text-[15px] text-black">{direccion}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Icons name="calendar-month" color={'#3AB4E5'} size={20} />
            <Text className="text-[15px] text-black">{disponibilidad}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CardListamedicoes;
