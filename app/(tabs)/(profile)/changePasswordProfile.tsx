import { View, Text, KeyboardAvoidingView } from 'react-native';
import React, { use } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import ConfirmButton from 'components/ConfirmButton';
import FormTextInput from 'components/FormTextInput';
import { useFetch } from 'hooks/Fetch';
import PopUpModal from 'components/PopUpModal';

const ChangePasswordProfile = () => {
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  
  
  const router = useRouter();
  
  const [trigger, setTrigger] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  
  const { data, error, isLoading } = useFetch({
      endpoint: '/change-password',
      method: 'POST',
      trigger: trigger,
      sendToken: true,
      body: { contrasenia: newPassword, contraseniaActual: actualPassword },
    });
    
    const validateSafePassword = (password: string) => {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      return re.test(password);
    }

    const disabled = actualPassword === '' || newPassword === '' || confirmPassword === '' || isLoading || 
    !validateSafePassword(newPassword) || newPassword !== confirmPassword;

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (isLoading || !data) return;
    setShowModal(true);
  }, [data, isLoading]);

  useEffect(() => {
    if (error != null) {
        if (error.status == 409) return setInvalidCredentials(true);
    }
  }, [error]);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        router.replace('/(auth)/login');
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [showModal]);
  

  const handlePress = () => {
    setPasswordsDontMatch(false);
    setInvalidCredentials(false);
    if (newPassword !== confirmPassword) return setPasswordsDontMatch(true);
    setTrigger(true);
  };

  return (
    <KeyboardAvoidingView behavior='padding' className="flex-1 bg-background">
      <View className="absolute left-[-52px] top-[-180px] h-[300px] w-[300px] rounded-full bg-secondary" />
      <View className="absolute right-[-50px] top-[-160px] h-[250px] w-[250px] rounded-full bg-primary" />
      <View className="flex-1 items-center justify-center">
        <Text className="mb-[20px] text-[25px] text-primary font-bold">Cambiar contraseña</Text>
        <View className="my-2 flex w-full gap-[60px]">
          <FormTextInput 
            title='Contraseña actual'
            value={actualPassword}
            handleChangeText={setActualPassword}
            isPassword={true}
          />
        </View>
        <View className="my-2 flex w-full gap-[60px]">
          <FormTextInput 
            title='Nueva contraseña'
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
          <ConfirmButton title='Cambiar contraseña' onPress={handlePress} disabled={disabled}></ConfirmButton>
        </View>
        {invalidCredentials && (
            <Text className="text-[12px] text-red-500">Credenciales invalidas.</Text>
          )}
        {passwordsDontMatch && (
            <Text className="text-[12px] text-red-500">Las contraseñas no coinciden.</Text>
          )}
      </View>
      <View className="absolute left-[-52px] bottom-[-180px] h-[300px] w-[300px] rounded-full bg-secondary" />
      <View className="absolute right-[-50px] bottom-[-135px] h-[250px] w-[250px] rounded-full bg-primary" />
      <PopUpModal closable={false} modalOpen={showModal} setModalOpen={setShowModal} title='¡Su contraseña se ha cambiado exitosamente!'/>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordProfile;
