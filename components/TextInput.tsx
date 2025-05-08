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

const CustomTextInput = ({
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
      <Text className={`text-primary text-[14px] ${textInputStyle}`}>{title}</Text>
      <TextInput
        className={`border-secondary border-b-[1px] text-[14px] ${otherStyles}`}
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => handleChangeText(text)}
        maxLength={maxLength}
        secureTextEntry={isPassword ? true : false}
      />
    </View>
  );
};

export default CustomTextInput;
