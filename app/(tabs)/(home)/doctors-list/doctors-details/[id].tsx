import { View, Text, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFetch } from 'hooks/Fetch';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icons2 from 'react-native-vector-icons/MaterialCommunityIcons';
import TurnosMedico from 'components/TurnosMedico';
import ConfirmButton from 'components/ConfirmButton';
import { useTurnoStore } from 'hooks/TurnoSeleccionado';
import ConfirmarTurno from 'components/ConfirmarTurno';
import Splash from 'app/splash';
import LoadingPage from 'app/loading';

const medicoDetail = () => {
  const { id } = useLocalSearchParams();
  const id_usuario = Array.isArray(id) ? id[0] : id;

  const [trigger, setTrigger] = useState(true);
  const [doctorInfo, setDoctorInfo] = useState({
    id_usuario: '',
    nombre: '',
    apellido: '',
    direccion: '',
    disponibilidad: '',
    especialidad: '',
  });

  const router = useRouter();

  const { data, error, isLoading } = useFetch({
    endpoint: `/detalle-medico/${id}`,
    method: 'GET',
    trigger: trigger,
    sendToken: true,
  });

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (isLoading || !data) return;

    setDoctorInfo(data.data);
  }, [data, isLoading]);

  useEffect(() => {
    if (error != null) {
      if (error.status === 500) return router.replace('/oops');
    }
  }, [error]);

  if (isLoading) return <LoadingPage />;
  return (
    <View className="flex-1 bg-background px-4">
      <View className="absolute -top-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-secondary" />
      <Text className="mb-7 mt-[70px] px-4 text-[20px] font-semibold text-primary">Detalle</Text>
      <View className="gap-4 px-4">
        <Text className="text-[17px] text-primary">
          Dr/a.{' '}
          <Text className="text-[17px] text-black">
            {doctorInfo.nombre} {doctorInfo.apellido}
          </Text>
        </Text>
        <View className="justi flex-row items-center gap-2">
          <Icons2 name="hospital-box" color={'#3AB4E5'} size={25} />
          <Text className="text-[17px] text-black">{doctorInfo.especialidad}</Text>
        </View>
        <View className="justi flex-row items-center gap-2">
          <Icons name="location-pin" color={'#3AB4E5'} size={25} />
          <Text className="text-[17px] text-black">{doctorInfo.direccion}</Text>
        </View>
      </View>

      <Text className="mb-5 mt-7 px-4 text-[15px] font-semibold text-primary">
        Reserva tu turno:
      </Text>
      <ScrollView className="flex-1 px-4">
        <TurnosMedico id_usuario={id_usuario} />
      </ScrollView>

      <ConfirmarTurno />
    </View>
  );
};

export default medicoDetail;
