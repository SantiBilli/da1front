import { View, Text, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import ConfirmButton from '../../components/ConfirmButton';
import FormTextInput from '../../components/FormTextInput';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handlePress = () => {
    console.log('Cambiar contraseña');
    router.replace('/(auth)/login');
  };

  return (
    <KeyboardAvoidingView behavior='padding' className="flex-1 bg-background">
      <View className="absolute left-[-52px] top-[-180px] h-[300px] w-[300px] rounded-full bg-secondary" />
      <View className="absolute right-[-50px] top-[-160px] h-[250px] w-[250px] rounded-full bg-primary" />
      <View className="flex-1 items-center justify-center">
        <Text className="mb-[20px] text-[25px] text-primary font-bold">Cambiar contraseña</Text>
        <View className="my-9 flex w-full gap-[60px]">
          <FormTextInput 
            title='Contraseña'
            value={newPassword}
            handleChangeText={setNewPassword}
            isPassword={true}
          />
        </View>
        <View className="my-2 flex w-full gap-[60px]">
          <FormTextInput 
            title='Confirmar nueva contraseña'
            value={confirmPassword}
            handleChangeText={setConfirmPassword}
            isPassword={true}
          />
        </View>
        <View className='my-9' style={{ width: 300 }}>
          <ConfirmButton title='Cambiar contraseña' onPress={handlePress} disabled={(newPassword == '' || confirmPassword == '')}></ConfirmButton>
        </View>
      </View>
      <View className="absolute left-[-52px] bottom-[-180px] h-[300px] w-[300px] rounded-full bg-secondary" />
      <View className="absolute right-[-50px] bottom-[-135px] h-[250px] w-[250px] rounded-full bg-primary" />
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
