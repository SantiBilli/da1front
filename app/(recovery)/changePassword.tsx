import { View, Text, KeyboardAvoidingView } from 'react-native';
import ConfirmButton from '../../components/ConfirmButton';
import FormTextInput from '../../components/FormTextInput';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFetch } from 'hooks/Fetch';
import PopUpModal from 'components/PopUpModal';

const ChangePassword = () => {
  const { token } = useLocalSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const [trigger, setTrigger] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { data, error, isLoading } = useFetch({
    endpoint: `/reset-password/${token}`,
    method: 'POST',
    trigger: trigger,
    sendToken: false,
    body: {
      contrasenia: newPassword,
    },
  });

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (isLoading || !data) return;
    if (data.status === 200) return setShowModal(true);
  }, [data, isLoading]);

  useEffect(() => {
    if (error) {
      if (error.status === 498) return router.replace('/(recovery)/olvidasteContrasenia');
      if (error.status === 500) return router.replace('/oops');
    }
  }, [error]);

  const handlePress = () => {
    setPasswordMatch(false);
    if (newPassword !== confirmPassword) {
      setPasswordMatch(true);
      return;
    }
    setTrigger(true);
  };

  useEffect(() => {
    if (showModal){
      const timer = setTimeout(() => {
        setShowModal(false);
        router.replace('/(auth)/login');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showModal]);

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
            maxLength={49}
          />
        </View>
        <View className="my-2 flex w-full gap-[60px]">
          <FormTextInput 
            title='Confirmar nueva contraseña'
            value={confirmPassword}
            handleChangeText={setConfirmPassword}
            isPassword={true}
            maxLength={49}
          />
        </View>
         {passwordMatch && (
            <Text className="mt-3 text-[12px] text-red-500">Las contraseñas no coinciden.</Text>
          )}
        <View className='my-3' style={{ width: 300 }}>
          <ConfirmButton title='Cambiar contraseña' onPress={handlePress} disabled={(newPassword == '' || confirmPassword == '' || isLoading)}></ConfirmButton>
        </View>
      </View>
      <View className="absolute left-[-52px] bottom-[-180px] h-[300px] w-[300px] rounded-full bg-secondary" />
      <View className="absolute right-[-50px] bottom-[-135px] h-[250px] w-[250px] rounded-full bg-primary" />
    <PopUpModal title='Su contraseña se ha cambiado exitosamente.' closable={false} modalOpen={showModal} setModalOpen={setShowModal} />
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
