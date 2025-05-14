import { View, Text, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardListaDoctores from 'components/CardListaDoctores';

const DoctorsList = () => {
  console.log('DoctorsList component rendered');

  const [searchText, setSearchText] = useState('');
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4">
        <View className="absolute -top-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-[#00BFFF]" />
        <Text className="mb-4 mt-[70px] px-4 text-[20px] font-semibold text-primary">{id}</Text>
        <View className="flex-1 items-center justify-center border-[1px]">
          <View className=" h-[50px] w-[340px] flex-row items-center rounded-[10px] border-[1px] border-[#B2B2B2] py-2 pl-4 pr-[30px] ">
            <TextInput
              className="h-full w-full py-2 text-[16px] font-semibold text-primary"
              placeholder="Buscar especialidad..."
              placeholderTextColor="#B2B2B2"
              onChangeText={setSearchText}
            />
            <Icon name="search" size={25} color="#3AB4E5" />
          </View>
        </View>
        <View className="mt-4 flex-1 items-center  border-[1px]">
          <CardListaDoctores
            disponibilidad="LU-MA-MI-JU-VI"
            direccion="Av. Scalabrini Ortiz 2624 12F"
            id_doctor="2d1eebdf-ed62-4400-a281-d9ae956fd0e9"
            nombre="Julia López"
            pfp="PFP.png"
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default DoctorsList;
