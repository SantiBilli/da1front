import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import FormTextInput from 'components/FormTextInput';
import { useRouter } from 'expo-router';
import images from 'constants/images';
import ConfirmButton from 'components/ConfirmButton';
import { useFetch } from 'hooks/Fetch';

const Register = () => {
  // console.log('Register component rendered');

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mail, setMail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [trigger, setTrigger] = useState(false);

  const router = useRouter();

  const { data, error, isLoading } = useFetch({
    endpoint: '/registers',
    method: 'POST',
    trigger: trigger,
    sendToken: false,
    login: true,
    body: {
      mail: mail,
      contrasenia: contrasena,
      nombre: nombre,
      apellido: apellido,
    },
  });

  const handlePress = async () => {
    setInvalidCredentials(false);
    setPasswordMatch(false);
    if (contrasena !== confirmarContrasena) {
      setPasswordMatch(true);
      return;
    }
    setTrigger(true);
  };

  const validateMail = (mail: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(mail).toLowerCase());
  };

  const validateSafePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return re.test(password);
  };

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (isLoading || !data) return;

    if (data.status === 201) {
      router.push('/(auth)/login');
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (error != null) {
      if (error.status === 409) return setInvalidCredentials(true);
      if (error.status === 500) return router.replace('/oops');
    }
  }, [error]);

  const disableButton =
    nombre === '' ||
    apellido === '' ||
    mail === '' ||
    contrasena === '' ||
    confirmarContrasena === '' ||
    isLoading ||
    !validateMail(mail) ||
    !validateSafePassword(contrasena) ||
    contrasena !== confirmarContrasena;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 bg-background"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <View className="absolute left-[-52px] top-[-180px] h-[300px] w-[300px] rounded-full bg-secondary" />
      <View className="absolute right-[-50px] top-[-160px] h-[250px] w-[250px] rounded-full bg-primary" />
      <View className="flex-1 items-center justify-center">
        <Image source={images.logo} className="mb-[30px] mt-[60px] h-[70px] w-[70px]" />
        <Text className="mb-[30px] text-[32px] text-primary">¡Registrate ahora!</Text>
        <View className="flex w-full gap-[17px]">
          <FormTextInput
            title="Nombre"
            value={nombre}
            handleChangeText={setNombre}
            maxLength={49}
          />
          <FormTextInput
            title="Apellido"
            value={apellido}
            handleChangeText={setApellido}
            maxLength={49}
          />
          <FormTextInput title="Email" value={mail} handleChangeText={setMail} maxLength={49} />
          {!validateMail(mail) && mail != '' && (
            <Text className="px-7 text-[12px] text-red-500">Email no válido.</Text>
          )}
          <FormTextInput
            title="Contraseña"
            value={contrasena}
            handleChangeText={setContrasena}
            isPassword
          />
          {!validateSafePassword(contrasena) && contrasena != '' && (
            <Text className="px-7 text-[12px] text-red-500">
              Al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.
            </Text>
          )}
          <FormTextInput
            title="Confirmar Contraseña"
            value={confirmarContrasena}
            handleChangeText={setConfirmarContrasena}
            isPassword
          />
          {!validateSafePassword(confirmarContrasena) && confirmarContrasena != '' && (
            <Text className="px-7 text-[12px] text-red-500">
              Al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.
            </Text>
          )}
        </View>

        <View className="mt-10 flex items-center justify-center gap-5">
          {invalidCredentials && (
            <Text className="text-[12px] text-red-500">Email ya registrado.</Text>
          )}
          {passwordMatch && (
            <Text className="text-[12px] text-red-500">Las contraseñas no coinciden.</Text>
          )}
          <ConfirmButton title={'Crear Cuenta'} onPress={handlePress} disabled={disableButton} />

          <Text className="text-[12px] text-primary" onPress={() => router.push('/(auth)/login')}>
            Iniciar Sesion
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
