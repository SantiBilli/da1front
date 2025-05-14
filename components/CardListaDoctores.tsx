import { View, Text } from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';

interface props {
  id_doctor: string;
  nombre: string;
  direccion: string;
  disponibilidad: string;
  pfp: string;
  otherStyles?: string;
}

const CardListaDoctores = ({
  id_doctor,
  nombre,
  direccion,
  disponibilidad,
  pfp,
  otherStyles,
}: props) => {
  return (
    <View className="h-[125px] w-[340px] flex-row  items-center rounded-[10px] border-[1px] border-primary bg-gradient-to-r from-blue-500 to-white">
      <View className="flex w-[100px] items-center justify-center ">
        <Text>PFP</Text>
      </View>
      <View className="flex-1 gap-4 ">
        <Text className="text-[15px]  text-primary">
          Dra. <Text className="text-black">{nombre}</Text>
        </Text>
        <View className="justi flex-row items-center gap-2">
          <Icons name="location-pin" color={'#3AB4E5'} size={20} />
          <Text className="text-[15px] text-black">{direccion}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Icons name="calendar-month" color={'#3AB4E5'} size={20} />
          <Text className="text-[15px]  text-black">{disponibilidad}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardListaDoctores;
