import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import ModalObraSocial from './ModalObraSocial';

interface props {
  title: string;
  textInputStyle?: string;
  userObraSocial: string | null;
  userPlan: string | null;
  userNroAfiliado: string | null;
  setShowModalSave: (trigger: boolean) => void;
}

const ObraSocialInput = ({
  title,
  textInputStyle,
  userObraSocial,
  userPlan,
  userNroAfiliado,
  setShowModalSave,
}: props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <View className="w-full px-7">
        <Text className={`text-[15px] text-primary ${textInputStyle}`}>{title}</Text>
        <View className="flex-row items-center justify-between border-b-[1px] border-secondary py-1">
          <Text className="py-1 text-[15px]">
            {userNroAfiliado} {userNroAfiliado && '|'} {userObraSocial} {userNroAfiliado && '|'}{' '}
            {userPlan}
          </Text>
          <TouchableOpacity onPress={() => setModalOpen(!modalOpen)}>
            <Icon name="credit-card" size={19} color="#b2b2b2" />
          </TouchableOpacity>
        </View>
      </View>
      <ModalObraSocial
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setShowModalSave={setShowModalSave}
      />
    </>
  );
};

export default ObraSocialInput;
