import { View, Text, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useFetch } from 'hooks/Fetch';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Splash from 'app/splash';
import Mapa from 'components/Mapa';
import LoadingPage from 'app/loading';

interface DrInfo {
  nombre: string;
  apellido: string;
  especialidad: string;
  direccion: string;
  pfp: string;
}

interface Turno {
  id_turno: string;
  fecha: string;
  hora: string;
  estado: string;
  info_medico: DrInfo;
}

interface Imagen {
  id_imagen: string;
  imagen: string;
}

interface Notas {
  id_nota: string;
  nota: string;
  fecha: string;
  imagenes: Imagen[];
}

const AppointmentDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const id_turno = Array.isArray(id) ? id[0] : id;
  const [trigger, setTrigger] = useState(false);
  const [infoTurno, setInfoTurno] = useState<Turno>({
    estado: '',
    fecha: '',
    hora: '',
    id_turno: '',
    info_medico: { apellido: '', direccion: '', especialidad: '', nombre: '', pfp: '' },
  });
  const [notas, setNotas] = useState<Notas[]>([]);

  const { data, error, isLoading } = useFetch({
    endpoint: `/turnos-cancelar/${id_turno}`,
    method: 'PUT',
    trigger: trigger,
    sendToken: true,
  });

  useEffect(() => {
    if (isLoading || !data) return;
    if (data.status === 200) {
      router.replace('/(tabs)/(appointments)/appointments');
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (error != null) {
      if (error.status === 500) return router.replace('/oops');
    }
  }, [error]);

  const handlePress = () => {
    setTrigger(true);
  };

  const [trigger2, setTrigger2] = useState(true);

  const {
    data: data2,
    error: error2,
    isLoading: isLoading2,
  } = useFetch({
    endpoint: `/turnos-info/${id_turno}`,
    method: 'GET',
    trigger: trigger2,
    sendToken: true,
  });

  useEffect(() => {
    if (trigger2) return setTrigger2(false);
  }, [trigger2]);

  useEffect(() => {
    if (isLoading2 || !data2) return;
    setInfoTurno(data2.data.turno);
    setNotas(data2.data.notas);
  }, [data2, isLoading2]);

  if (isLoading) return <LoadingPage />;
  return (
    <View className="flex-1 bg-background">
      <View className="absolute -top-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-secondary" />
      <Text className="mb-4 mt-[70px] px-4 text-[20px] font-semibold text-primary">Detalle</Text>
      <ScrollView className="flex-1">
        <View className="mt-[10px] items-center justify-center">
          <Image
            source={{
              uri: `${process.env.EXPO_PUBLIC_API_URL}/imagen-medico/${infoTurno.info_medico.pfp}`,
            }}
            className="mb-[15px] h-[80px] w-[80px] rounded-full border-[1px] border-primary"
          />
          <Text className="text-[15px]  text-primary">
            Dr/a.{' '}
            <Text className="text-black">
              {infoTurno.info_medico.nombre} {infoTurno.info_medico.apellido}
            </Text>
          </Text>
        </View>
        <View className="my-[40px] w-[80%] self-center border-b-[1px] border-secondary"></View>
        <View className="flex gap-[40px] px-[40px]">
          <View className="flex-row items-center gap-2">
            <Icons name="local-hospital" color={'#3AB4E5'} size={23} />
            <Text className="text-[17px]">{infoTurno.info_medico.especialidad}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Icons name="calendar-month" color={'#3AB4E5'} size={23} />
            <Text className="text-[17px]">
              {infoTurno.fecha.slice(0, 10)} {infoTurno.hora.slice(11, 16)}hs
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Icons name="rotate-left" color={'#3AB4E5'} size={23} />
            <Text className="text-[17px]">
              {infoTurno.estado.charAt(0).toUpperCase() + infoTurno.estado.slice(1)}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Icons name="location-pin" color={'#3AB4E5'} size={23} />
            <Text className="text-[17px]">{infoTurno.info_medico.direccion}</Text>
          </View>
        </View>
        <Text className="mb-[20px] mt-[30px] px-[20px] text-[20px] font-semibold text-primary">
          Notas:
        </Text>
        {notas.length > 0 ? (
          notas.map((nota) => (
            <View key={nota.id_nota}>
              <View className="mb-[25px]">
                <View className="mx-[20px] items-center justify-center rounded-[10px] border-[1.5px] border-secondary pb-[40px]">
                  <Text className="mt-[10px] px-[20px] text-justify text-[15px]">{nota.nota}</Text>
                  {nota.imagenes.length > 0 && (
                    <View className="mt-[10px] flex w-full items-start gap-[5px] px-[20px]">
                      {nota.imagenes.map((imagen) => (
                        <TouchableOpacity
                          key={imagen.id_imagen}
                          onPress={() =>
                            Linking.openURL(
                              `${process.env.EXPO_PUBLIC_API_URL}/imagen-notas/${imagen.imagen}`
                            )
                          }>
                          <Text className="text-[12px] text-primary underline">
                            Ver imagen {nota.imagenes.indexOf(imagen) + 1}{' '}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
                <Text className="mt-[5px] px-[20px] text-[15px]">
                  {nota.fecha.slice(0, 10)} {nota.fecha.slice(11, 16)}hs
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text className="px-[20px] text-[15px]">No hay notas disponibles.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default AppointmentDetails;
