import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

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
  isPassword,
}: props) => {
  return (
    <View className="w-full px-7">
      <Text className={`text-[14px] text-primary ${textInputStyle}`}>{title}</Text>
      <TextInput
        className={`border-b-[1px] border-secondary py-2 text-[14px] ${otherStyles}`}
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => handleChangeText(text)}
        maxLength={maxLength}
        secureTextEntry={isPassword ? true : false}
      />
    </View>
  );
};

export default FormTextInput;
