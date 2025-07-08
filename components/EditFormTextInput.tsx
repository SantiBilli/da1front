import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface props {
  title: string;
  actualValue: string;
  value?: string;
  handleChangeText?: (text: string) => void;
  otherStyles?: string;
  textInputStyle?: string;
  maxLength?: number;
  editable?: boolean;
  editing?: boolean;
  setEditing?: (editing: boolean) => void;
}

const EditFormTextInput = ({
  title,
  actualValue,
  value,
  handleChangeText = () => {},
  otherStyles,
  textInputStyle,
  maxLength,
  editable = true,
  editing,
  setEditing = () => {},
}: props) => {
  useEffect(() => {
    handleChangeText('');
  }, [editing]);

  return (
    <View className="w-full px-7">
      <Text className={`text-[15px] text-primary ${textInputStyle}`}>{title}</Text>
      <View className="flex-row items-center justify-between border-b-[1px] border-secondary py-1">
        <Text className="py-1 text-[15px]">{actualValue}</Text>
        {editable && (
          <TouchableOpacity testID="edit-icon" onPress={() => setEditing(!editing)}>
            <Icon name="pencil" size={19} color="#b2b2b2" />
          </TouchableOpacity>
        )}
      </View>
      {editing && (
        <View className="flex-row items-center justify-between border-b-[1px] border-secondary py-1">
          <TextInput
            className={`flex-1 py-2 text-[14px] ${otherStyles}`}
            value={value}
            onChangeText={(text) => handleChangeText(text)}
            maxLength={maxLength}
            placeholder={`Nuevo ${title.toLowerCase()}...`}
          />
        </View>
      )}
    </View>
  );
};

export default EditFormTextInput;
