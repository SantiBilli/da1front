import { View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import ConfirmButton from '../../components/ConfirmButton';
import FormTextInput from '../../components/FormTextInput';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useFetch } from 'hooks/Fetch';

const OlvidasteContrasenia = () => {
  const [mail, setMail] = useState('');
  const router = useRouter();
  const [trigger, setTrigger] = useState(false);

  const { data, error, isLoading } = useFetch({
    endpoint: '/forgot-password',
    method: 'POST',
    trigger: trigger,
    sendToken: false,
    body: {
      mail: mail,
    },
  });

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (isLoading || !data) return;
    if (data.status === 200) router.push('/(recovery)/insertToken');
  }, [data, isLoading]);

  useEffect(() => {
    if (error) {
      if (error.status === 500) return router.replace('/oops');
    }
  }, [error]);

  const handlePress = () => {
    setTrigger(true);
  }

  return (
    <KeyboardAvoidingView behavior='padding' className="flex-1 bg-background">
      <View className="absolute left-[-52px] top-[-180px] h-[300px] w-[300px] rounded-full bg-secondary" />
      <View className="absolute right-[-50px] top-[-160px] h-[250px] w-[250px] rounded-full bg-primary" />
      <View className="flex-1 items-center justify-center">
        <Text className="mb-[20px] text-[25px] text-primary font-bold">¿Olvidaste tu contraseña?</Text>
        <Text className="text-[16px] text-primary text-center w-[277px]">
          Ingrese el correo electronico asociado{'\n'} a su cuenta para cambiar su{'\n'} contraseña.
        </Text>
        <View className="my-9 flex w-full gap-[60px]">
          <FormTextInput 
            title='Mail'
            value={mail}
            handleChangeText={setMail}
          />
        </View>
        <View className='my-9' style={{ width: 300 }}>
          <ConfirmButton title='Enviar correo' onPress={handlePress} disabled={(mail == '')}/>
        </View>
        <TouchableOpacity>
          <Text 
            className="text-[14px] text-primary" 
            onPress={() => router.push('/(recovery)/insertToken')}>
              Ingresar token
          </Text>
        </TouchableOpacity>
      </View>
      <View className="absolute left-[-52px] bottom-[-180px] h-[300px] w-[300px] rounded-full bg-secondary" />
      <View className="absolute right-[-50px] bottom-[-135px] h-[250px] w-[250px] rounded-full bg-primary" />
    </KeyboardAvoidingView>
  );
};

export default OlvidasteContrasenia;
