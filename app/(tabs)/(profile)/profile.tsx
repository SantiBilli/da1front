import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfilePicture from 'components/PfpEdit';
import EditFormTextInput from 'components/EditFormTextInput';
import ObraSocialInput from 'components/ObraSocialInput';

const Profile = () => {

 const [nombre, setNombre] = useState('');
 const [apellido, setApellido] = useState('');



  return (
    <View className='flex-1 bg-background'>
      <View className="absolute -top-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-secondary" />
      <View className="flex-row justify-between mt-[70px] mb-4">
        <Text className="px-8 text-[20px] font-semibold text-primary">
          Mi Perfil
        </Text>
        <TouchableOpacity className="flex-row items-center gap-2 px-8">
          <Text className="text-[#b2b2b2] text-[13px]">Salir</Text>
          <Icon name="logout" size={17} color="#b2b2b2"/>
        </TouchableOpacity>
      </View>
      <ProfilePicture pfp="1.png"/>
      <View className="mt-[30px] gap-5">
        <EditFormTextInput title='Nombre' actualValue='Luis' value={nombre} handleChangeText={setNombre} maxLength={20}/>
        <EditFormTextInput title='Apellido' actualValue='Lopez' value={apellido} handleChangeText={setApellido} maxLength={20}/>
        <EditFormTextInput title='Mail' actualValue='luis@gmail' editable={false}/>
        <ObraSocialInput title='Obra Social' actualValue='OSDE 310'/>
      </View>
    </View>  );
};

export default Profile;
