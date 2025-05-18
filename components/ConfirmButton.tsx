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
      onPress={disabled ? undefined : onPress}
      className={`w-full items-center rounded-[10px] border-[1px] border-secondary bg-[#DDF2FD] px-[55px] py-3 ${otherStyles} ${disabled ? 'opacity-50' : ''}`}>
      <Text className="text-[14px] text-primary">{title}</Text>
    </TouchableOpacity>
  );
};

export default ConfirmButton;

// shadow-md shadow-secondary
