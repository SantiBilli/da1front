import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import images from '../../constants/images';
import FormTextInput from 'components/FormTextInput';
import { useRouter } from 'expo-router';
import ConfirmButton from 'components/ConfirmButton';
import { useAuthStore } from 'hooks/AuthStore';
import { useFetch } from 'hooks/Fetch';

const Login = () => {
  console.log('Login component rendered');
  const [mail, setMail] = useState('');
  const [contrasenia, setContrasena] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const router = useRouter();

  const [trigger, setTrigger] = useState(false);

  const { data, error, isLoading } = useFetch({
    endpoint: '/logins',
    method: 'POST',
    trigger: trigger,
    sendToken: false,
    body: {
      mail: mail,
      contrasenia: contrasenia,
      recordar: rememberMe,
    },
  });

  const { setToken, token, clearToken } = useAuthStore();

  useEffect(() => {
    clearToken();
  }, []);

  const handlePress = async () => {
    setInvalidCredentials(false);
    setTrigger(true);
  };

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (isLoading || !data) return;

    const content = data.data;
    console.log('Token:', content.token);

    setToken(content.token);

    router.replace('/(home)/home');
  }, [data, isLoading]);

  useEffect(() => {
    if (error != null) {
      if (error.status === 401) return setInvalidCredentials(true);
      if (error.status === 500) return router.replace('/oops');
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 bg-background"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 25 : 0}>
      <View className="absolute left-[-52px] top-[-180px] h-[300px] w-[300px] rounded-full bg-secondary " />
      <View className="absolute right-[-50px] top-[-160px] h-[250px] w-[250px] rounded-full bg-primary " />
      <View className="flex-1 items-center justify-center">
        <Image source={images.logo} className="mb-[50px] h-[70px] w-[70px]" />
        <Text className="mb-[50px] text-[32px] text-primary">Iniciar Sesión</Text>
        <View className="flex w-full gap-[60px]">
          <FormTextInput title="Email" value={mail} handleChangeText={setMail} />
          <FormTextInput
            title="Password"
            value={contrasenia}
            handleChangeText={setContrasena}
            isPassword={true}
          />
        </View>

        <View className="my-9 w-full flex-row items-center px-7">
          <Pressable
            onPress={() => setRememberMe(!rememberMe)}
            className={`mr-2 h-5 w-5 rounded border-[1px] border-primary ${
              rememberMe ? 'bg-primary' : 'bg-transparent'
            }`}
          />
          <Text className="text-[12px] text-primary">Recordarme</Text>
        </View>

        <View className="flex items-center justify-center gap-6">
          {invalidCredentials && (
            <Text className="text-[12px] text-red-500">Credenciales invalidas.</Text>
          )}
          <ConfirmButton
            title={'Iniciar Sesion'}
            onPress={handlePress}
            disabled={(mail == '' && contrasenia == '') || isLoading}
          />
          <TouchableOpacity>
            <Text className="text-[14px] text-primary">Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <Text
            className="text-[12px] text-primary"
            onPress={() => router.push('/(auth)/register')}>
            Crear Cuenta
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
