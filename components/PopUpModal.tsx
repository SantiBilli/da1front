import { View, Text, Modal, TouchableOpacity } from 'react-native';
import Icon2 from 'react-native-vector-icons/Fontisto';
import React from 'react';

interface Props {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  title: string;
  pressable?: boolean;
  onPress?: () => void;
  closable?: boolean;
  isLoading?: boolean;
  pressableText?: string;
}

const PopUpModal = ({
  modalOpen,
  setModalOpen,
  title,
  pressable,
  onPress,
  closable = true,
  isLoading,
  pressableText,
}: Props) => {
  return (
    <Modal visible={modalOpen} transparent={true}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="relative w-[85%] rounded-[10px] border-[1px] border-secondary bg-background py-[60px]">
          {closable && (
            <TouchableOpacity
              onPress={() => setModalOpen(false)}
              className="absolute right-2 top-2">
              <Icon2 name="close-a" size={19} color="#3ab4e5" className="p-4" />
            </TouchableOpacity>
          )}
          <Text className="text-center text-[15px] text-primary">{title}</Text>
          {pressable && (
            <View className="mt-[20px] flex items-center justify-center">
              <TouchableOpacity
                disabled={isLoading}
                onPress={onPress}
                className={`w-[45%] items-center rounded-[10px] border-[1px] border-[#ff373a] bg-[rgba(255,55,58,0.1)] ${isLoading ? 'border-gray-500 bg-slate-300 opacity-50' : ''}`}>
                <Text className={`text-[15px] text-[#ff373a] ${isLoading ? 'text-gray-500' : ''}`}>
                  {pressableText}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default PopUpModal;
