import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';
import Icon2 from 'react-native-vector-icons/Fontisto';
import ConfirmButton from './ConfirmButton';
import { Dropdown } from 'react-native-element-dropdown';
import { useFetch } from 'hooks/Fetch';

interface props {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  setShowModalSave: (trigger: boolean) => void;
}

const ModalObraSocial = ({ modalOpen, setModalOpen, setShowModalSave }: props) => {
  const [obrasSociales, setObrasSociales] = useState<
    [{ nombre: string; id_obra_social: string }] | []
  >([]);

  const [planes, setPlanes] = useState<[{ id_plan: string; nombre_plan: string }] | []>([]);

  const obrasSocialesAdaptadas = obrasSociales.map((os) => ({
    label: os.nombre,
    value: os.id_obra_social,
  }));

  const planesAdaptados = planes.map((plan) => ({
    label: plan.nombre_plan,
    value: plan.id_plan,
  }));

  const [obraSocial, setObraSocial] = useState('');
  const [plan, setPlan] = useState('');
  const [nroAfiliado, setNroAfiliado] = useState('');

  const [trigger, setTrigger] = useState(true);

  const { data, error, isLoading } = useFetch({
    endpoint: '/obras-sociales',
    method: 'GET',
    trigger: trigger,
    sendToken: true,
  });

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (isLoading || !data) return;
    setObrasSociales(data.data);
  }, [data, isLoading]);

  const [trigger2, setTrigger2] = useState(false);

  const {
    data: data2,
    error: error2,
    isLoading: isLoading2,
  } = useFetch({
    endpoint: `/obras-sociales/planes/${obraSocial}`,
    method: 'GET',
    trigger: trigger2,
    sendToken: true,
  });

  useEffect(() => {
    if (trigger2) return setTrigger2(false);
  }, [trigger2]);

  useEffect(() => {
    if (isLoading2 || !data2) return;
    setPlanes(data2.data);
  }, [data2, isLoading2]);

  useEffect(() => {
    if (obraSocial == '') return;
    setTrigger2(true);
  }, [obraSocial]);

  const handleClose = () => {
    setObraSocial('');
    setPlan('');
    setNroAfiliado('');
    setPlanes([]);
    setModalOpen(false);
  };

  const [trigger3, setTrigger3] = useState(false);

  const {
    data: data3,
    error: error3,
    isLoading: isLoading3,
  } = useFetch({
    endpoint: '/obras-sociales/registrar',
    method: 'POST',
    trigger: trigger3,
    sendToken: true,
    body: {
      id_obra_social: obraSocial,
      id_plan: plan,
      nro_credencial: nroAfiliado,
    },
  });

  useEffect(() => {
    if (trigger3) return setTrigger3(false);
  }, [trigger3]);

  useEffect(() => {
    if (isLoading3 || !data3) return;
    handleClose();
    setShowModalSave(true);
  }, [data3, isLoading3]);

  const handleConfirm = () => {
    if (obraSocial == '' || plan == '' || nroAfiliado == '') return;
    setTrigger3(true);
  };

  return (
    <View>
      <Modal visible={modalOpen} transparent={true}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="w-[85%] rounded-[10px] border-[1px] border-secondary bg-background">
            <TouchableOpacity onPress={handleClose} className="self-end ">
              <Icon2 name="close-a" size={19} color="#3ab4e5" className="p-4" />
            </TouchableOpacity>
            <View className="flex gap-5">
              <View className="px-8">
                <Text className="mb-1 text-[15px] text-primary">Obra Social</Text>
                <Dropdown
                  data={obrasSocialesAdaptadas}
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
                  data={planesAdaptados}
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
                  disable={planesAdaptados.length == 0}
                />
              </View>
              <View className="mb-4 px-8">
                <Text className="text-[15px] text-primary">Nro Afiliado</Text>
                <TextInput
                  className="flex h-[40px] border-b-[1px] border-secondary px-[10px] text-[14px]"
                  value={nroAfiliado}
                  onChangeText={(text) => setNroAfiliado(text)}
                  maxLength={8}
                  keyboardType="numeric"
                />
              </View>
              <View className="my-5 px-[70px]">
                <ConfirmButton
                  title="Confirmar"
                  onPress={handleConfirm}
                  disabled={obraSocial == '' || plan == '' || nroAfiliado == '' || isLoading3}
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
