import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface props {
  title: string;
  onPress: () => void;
  otherStyles?: string;
}

const ConfirmButton = ({ title, onPress, otherStyles }: props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full items-center rounded-[10px] border-[1px] border-secondary bg-[#DDF2FD] px-[55px] py-3 shadow-md shadow-secondary ${otherStyles}`}>
      <Text className="text-[14px] text-primary">{title}</Text>
    </TouchableOpacity>
  );
};

export default ConfirmButton;
