import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface props {
  title: string;
  onPress: () => void;
  otherStyles?: string;
  disabled?: boolean;
}

const ConfirmButton = ({ title, onPress, otherStyles, disabled }: props) => {
  return (
    <TouchableOpacity
      testID="confirm-button"
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      className={`w-full items-center rounded-[10px] border-[1px] px-[50px] py-3 ${otherStyles} ${disabled ? 'border-gray-500 bg-slate-300 opacity-50' : 'border-secondary bg-[#DDF2FD]'}`}>
      <Text className={`text-[14px] ${disabled ? 'text-gray-500' : 'text-primary'}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ConfirmButton;

// shadow-md shadow-secondary
