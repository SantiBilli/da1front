import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Octicons';

interface props {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  textInputStyle?: string;
  maxLength?: number;
  isPassword?: boolean;
}

const FormTextInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  textInputStyle,
  maxLength,
  isPassword = false,
}: props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="w-full px-7">
      <Text className={`text-[14px] text-primary ${textInputStyle}`}>{title}</Text>
      <View className="flex-row items-center justify-between border-b-[1px] border-secondary py-1">
        <TextInput
          className={`flex-1 text-[14px] ${otherStyles}`}
          value={value}
          placeholder={placeholder}
          onChangeText={(text) => handleChangeText(text)}
          maxLength={maxLength}
          secureTextEntry={!showPassword && isPassword ? true : false}
        />
        {isPassword == true ? (
          <TouchableOpacity className="" onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye' : 'eye-closed'} size={20} color={'#B2B2B2'} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default FormTextInput;
