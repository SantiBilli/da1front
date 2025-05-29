import { View, Text, KeyboardAvoidingView } from 'react-native';
import ConfirmButton from '../../components/ConfirmButton';
import FormTextInput from '../../components/FormTextInput';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useFetch } from '../../hooks/Fetch';

const InsertToken = () => {
  const [token, setToken] = useState('');
  const [invalidToken, setInvalidToken] = useState(false);
  const router = useRouter();
  const [trigger, setTrigger] = useState(false);

  const { data, error, isLoading } = useFetch({
    endpoint: `/validate-token/${token}`,
    method: 'POST',
    trigger: trigger,
    sendToken: false,
  });

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (isLoading || !data) return;
    if (data.status === 200 && data.msg === 'Token valido') {
      router.push({
        pathname: '/(recovery)/changePassword',
        params: { token: token },
      });
    }
    if (data.status === 200 && data.msg === 'Token no valido') {
      setInvalidToken(true);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (error) {
      if (error.status === 498) return router.replace('/(recovery)/olvidasteContrasenia');
      if (error.status === 500) return router.replace('/oops');
    }
  }, [error]);

  const handlePress = async () => {
    setTrigger(true);
  };

  return (
    <KeyboardAvoidingView behavior='padding' className="flex-1 bg-background">
      <View className="absolute left-[-52px] top-[-180px] h-[300px] w-[300px] rounded-full bg-secondary" />
      <View className="absolute right-[-50px] top-[-160px] h-[250px] w-[250px] rounded-full bg-primary" />
      <View className="flex-1 items-center justify-center">
        <Text className="mb-[20px] text-[25px] text-primary font-bold">Ingrese token de recuperacion</Text>
        <View className="my-9 flex w-full gap-[60px]">
          <FormTextInput 
            title='Token'
            value={token}
            handleChangeText={setToken} 
          />
        </View>
        <View className='my-9 gap-3' style={{ width: 300 }}>
          {invalidToken && (
            <Text className='text-red-500 text-center'>
              El token no es valido
            </Text>
          )}
          <ConfirmButton title='Validar token' onPress={handlePress} disabled={(token == '')}></ConfirmButton>
        </View>
      </View>
      <View className="absolute left-[-52px] bottom-[-180px] h-[300px] w-[300px] rounded-full bg-secondary" />
      <View className="absolute right-[-50px] bottom-[-135px] h-[250px] w-[250px] rounded-full bg-primary" />
    </KeyboardAvoidingView>
  );
};

export default InsertToken;
