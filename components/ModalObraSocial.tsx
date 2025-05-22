import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Icon2 from 'react-native-vector-icons/Fontisto'
import RNPickerSelect from 'react-native-picker-select';
import ConfirmButton from './ConfirmButton';

interface props {
  modalOpen: boolean;
  obraSocial: string;
  plan: string;
  nroAfiliado: string;
  setObraSocial: (obraSocial: string) => void;
  setPlan: (plan: string) => void;
  setNroAfiliado: (nroAfiliado: string) => void;
}

const obrasSociales = [
    { label: 'OSDE', value: 'OSDE' },
    { label: 'Swiss Medical', value: 'Swiss Medical' },
    { label: 'Galeno', value: 'Galeno' },
  ];

  const planes = [
    { label: 'Plan 210', value: 'Plan 210' },
    { label: 'Plan 310', value: 'Plan 310' },
    { label: 'Plan Premium', value: 'Plan Premium' },
  ];
const ModalObraSocial = ({modalOpen, obraSocial, plan, nroAfiliado, setObraSocial, setPlan, setNroAfiliado}: props) => {
    
  return (
    <View>
      <Modal visible={modalOpen} transparent={true}>
              <View className='flex-1 items-center justify-center bg-black/50'>
                <View className='bg-background w-[85%] rounded-[10px] border-[1px] border-secondary'>
                  <TouchableOpacity>
                    <Icon2 name='close-a' size={19} color='#3ab4e5'className='self-end p-4'/>
                  </TouchableOpacity>
                  <View className='px-4'>
                    <Text className='text-[15px] text-primary'>Obra Social</Text>
                    <RNPickerSelect onValueChange={setObraSocial} items={obrasSociales} placeholder={{label: obraSocial, value: obraSocial}} value={obraSocial}/>
                  </View>
                  <View className='px-4'>
                    <Text className='text-[15px] text-primary'>Plan</Text>
                    <RNPickerSelect onValueChange={setPlan} items={planes} placeholder={{label: plan, value: plan}} value={plan}/>
                  </View>
                  <View className='px-4 mb-4'>
                    <Text className='text-[15px] text-primary'>Nro Afiliado</Text>
                    <TextInput className='flex text-[14px] h-[35px] border-b-[1px] border-secondary' value={nroAfiliado} onChangeText={(text) => setNroAfiliado(text)}/>
                  </View>
                  <View className='px-[85px] my-5'>
                    <ConfirmButton title='Confirmar' onPress={() => {}} />
                  </View>
                </View>
              </View>
            </Modal>
    </View>
  )
}

export default ModalObraSocial