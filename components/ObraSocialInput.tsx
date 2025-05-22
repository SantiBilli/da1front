import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Fontisto'
import ModalObraSocial from './ModalObraSocial';


interface props {
  title: string;
  actualValue: string;
  value?: string;
  handleChangeText?: (text: string) => void;
  otherStyles?: string;
  textInputStyle?: string;
  maxLength?: number;
}

const ObraSocialInput = ({
  title,
  actualValue,
  value,
  handleChangeText=() => {},
  otherStyles,
  textInputStyle,
  maxLength,
}: props) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [obraSocial, setObraSocial] = useState('');
  const [plan, setPlan] = useState('');
  const [nroAfiliado, setNroAfiliado] = useState('');

  return (
    <>
          <View className="w-full px-7">
        <Text className={`text-[15px] text-primary ${textInputStyle}`}>{title}</Text>
        <View className="flex-row items-center justify-between border-b-[1px] border-secondary py-1">
          <Text className='text-[15px] py-1'>{actualValue}</Text>
          <TouchableOpacity onPress={() => setModalOpen(!modalOpen)}>
            <Icon name="credit-card" size={19} color="#b2b2b2"/>
          </TouchableOpacity>
        </View>
      </View>
      <ModalObraSocial modalOpen={modalOpen} nroAfiliado={nroAfiliado} obraSocial={obraSocial} plan={plan} setNroAfiliado={setNroAfiliado} setObraSocial={setObraSocial} setPlan={setPlan}/>
    </>

      
  );
};

export default ObraSocialInput;
