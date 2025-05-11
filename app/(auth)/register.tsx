import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import FormTextInput from 'components/FormTextInput';
import { useRouter } from 'expo-router';
import images from 'constants/images';

const Register = () => {
  console.log('Register component rendered');

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mail, setMail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const router = useRouter();

  // +20 SIN EL SAFE AREA VIEW EN LAS PELOTAS

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 bg-background"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <View className="absolute left-[-52px] top-[-180px] h-[300px] w-[300px] rounded-full bg-secondary" />
      <View className="absolute right-[-50px] top-[-160px] h-[250px] w-[250px] rounded-full bg-primary" />
      <View className="flex-1 items-center justify-center">
        <Image source={images.logo} className="mb-[50px] mt-[60px] h-[70px] w-[70px]" />
        <Text className="mb-[50px] text-[32px] text-primary">¡Registrate ahora!</Text>
        <View className="flex w-full gap-[17px]">
          <FormTextInput title="Nombre" value={nombre} handleChangeText={setNombre} />
          <FormTextInput title="Apellido" value={apellido} handleChangeText={setApellido} />
          <FormTextInput title="Email" value={mail} handleChangeText={setMail} />
          <FormTextInput
            title="Contraseña"
            value={contrasena}
            handleChangeText={setContrasena}
            isPassword
          />
          <FormTextInput
            title="Confirmar Contraseña"
            value={confirmarContrasena}
            handleChangeText={setConfirmarContrasena}
            isPassword
          />
        </View>

        <View className="mt-10 flex items-center justify-center gap-5">
          <Text className="">Boton Crear Cuenta</Text>

          <Text className="text-[12px] text-primary" onPress={() => router.push('/(auth)/login')}>
            Iniciar Sesion
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
