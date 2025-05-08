import { View, Text, ScrollView, Image } from 'react-native';
import { useEffect, useState } from 'react';
import CustomTextInput from 'components/TextInput';
import images from '../../constants/images';

const Login = () => {
  console.log('Login component rendered');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log(email);
  }, [email]);

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 items-center justify-center">
        <Image source={images.logo} className="h-[70px] w-[70px]" />
        <Text className="text-primary text-[32px]">Iniciar Sesión</Text>
        <View className="flex w-full gap-[90px]">
          <CustomTextInput title="Email" value={email} handleChangeText={setEmail} />
          <CustomTextInput title="Password" value={password} handleChangeText={setPassword} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
