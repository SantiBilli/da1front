import { View, Text, ScrollView, Image } from 'react-native';
import { useEffect, useState } from 'react';
import images from '../../constants/images';
import FormTextInput from 'components/FormTextInput';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  console.log('Login component rendered');
  const [mail, setMail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const router = useRouter();

  useEffect(() => {
    console.log(mail);
  }, [mail]);

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="absolute left-[-52px] top-[-180px] h-[300px] w-[300px] rounded-full bg-secondary " />
      <View className="absolute right-[-50px] top-[-160px] h-[250px] w-[250px] rounded-full bg-primary " />
      <View className="flex-1 items-center justify-center">
        <Image source={images.logo} className="mb-[50px] h-[70px] w-[70px]" />
        <Text className="mb-[50px] text-[32px] text-primary">Iniciar Sesión</Text>
        <View className="flex w-full gap-[60px]">
          <FormTextInput title="Email" value={mail} handleChangeText={setMail} />
          <FormTextInput title="Password" value={contrasena} handleChangeText={setContrasena} />
        </View>

        <Text className="my-[30px]">Recordarme</Text>

        <View className="flex items-center justify-center gap-5">
          <Text className="">Boton Iniciar Sesion</Text>
          <Text className="text-[14px] text-primary">Olvidaste tu contraseña?</Text>
          {/* <Link className="text-[12px] text-primary" href="/register">
            Crear Cuenta
          </Link> */}
          <Text
            className="text-[12px] text-primary"
            onPress={() => router.push('/(auth)/register')}>
            Crear Cuenta
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
