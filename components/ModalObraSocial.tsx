import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { useState } from 'react';
import Icon2 from 'react-native-vector-icons/Fontisto';
import RNPickerSelect from 'react-native-picker-select';
import ConfirmButton from './ConfirmButton';
import { Dropdown } from 'react-native-element-dropdown';

interface props {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
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
const ModalObraSocial = ({
  modalOpen,
  setModalOpen,
  obraSocial,
  plan,
  nroAfiliado,
  setObraSocial,
  setPlan,
  setNroAfiliado,
}: props) => {
  return (
    <View>
      <Modal visible={modalOpen} transparent={true}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="w-[85%] rounded-[10px] border-[1px] border-secondary bg-background">
            <TouchableOpacity onPress={() => setModalOpen(false)} className="self-end ">
              <Icon2 name="close-a" size={19} color="#3ab4e5" className="p-4" />
            </TouchableOpacity>
            <View className="flex gap-5">
              <View className="px-8">
                <Text className="mb-1 text-[15px] text-primary">Obra Social</Text>
                <Dropdown
                  data={obrasSociales}
                  labelField="label"
                  valueField="value"
                  placeholder="Seleccioná obra social"
                  value={obraSocial}
                  onChange={(item) => setObraSocial(item.value)}
                  style={{
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: '#45CADE',
                    paddingHorizontal: 10,
                  }}
                  placeholderStyle={{ color: '#B2B2B2', fontSize: 14 }}
                  selectedTextStyle={{ color: '#000', fontSize: 14 }}
                  containerStyle={{ borderRadius: 6 }}
                />
              </View>
              <View className="px-8">
                <Text className="text-[15px] text-primary">Plan</Text>
                <Dropdown
                  data={planes}
                  labelField="label"
                  valueField="value"
                  placeholder="Seleccioná plan de obra social"
                  value={plan}
                  onChange={(item) => setPlan(item.value)}
                  style={{
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: '#45CADE',
                    paddingHorizontal: 10,
                  }}
                  placeholderStyle={{ color: '#B2B2B2', fontSize: 14 }}
                  selectedTextStyle={{ color: '#000', fontSize: 14 }}
                  containerStyle={{ borderRadius: 6 }}
                />
              </View>
              <View className="mb-4 px-8">
                <Text className="text-[15px] text-primary">Nro Afiliado</Text>
                <TextInput
                  className="flex h-[40px] border-b-[1px] border-secondary px-[10px] text-[14px]"
                  value={nroAfiliado}
                  onChangeText={(text) => setNroAfiliado(text)}
                />
              </View>
              <View className="my-5 px-[70px]">
                <ConfirmButton
                  title="Confirmar"
                  onPress={() => {}}
                  disabled={obraSocial == '' || plan == '' || nroAfiliado == ''}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalObraSocial;
