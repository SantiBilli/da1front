import { View, Text, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import CardTurno from 'components/CardTurno';
import { useEffect, useState, useCallback } from 'react';
import { useFetch } from 'hooks/Fetch';
import Splash from 'app/splash';

type Turno = {
  id_turno: string;
  fecha: string;
  hora: string;
  info_medico: {
    nombre: string;
    apellido: string;
    especialidad: string;
    pfp: string;
  };
};

const Appointments = () => {
  console.log('Appointments component rendered');

  const [appointments, setAppointments] = useState<Turno[]>([]);
  const [trigger, setTrigger] = useState(true);
  const router = useRouter();

  const { data, error, isLoading } = useFetch({
    endpoint: '/turnos/reservado',
    method: 'GET',
    trigger: trigger,
    sendToken: true,
  });

  useFocusEffect(
    useCallback(() => {
      setTrigger(true);
    }, [])
  );

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (isLoading || !data) return;
    const sortedAppointments = [...data.data].sort((a, b) => {
      const fechaA = new Date(`${a.fecha.split('T')[0]}`);
      const fechaB = new Date(`${b.fecha.split('T')[0]}`);
      if (fechaA < fechaB) return -1;
      if (fechaA > fechaB) return 1;
      const horaA = a.hora;
      const horaB = b.hora;
      if (horaA < horaB) return -1;
      if (horaA > horaB) return 1;
      return 0;
    });
    setAppointments(sortedAppointments);
  }, [data, isLoading]);

  useEffect(() => {
    if (error != null) {
      if (error.status === 500) return router.replace('/oops');
    }
  }, [error]);

  if(isLoading) return <Splash />;
  else return (
    <View className="flex-1 bg-background">
      <View className="absolute -top-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-[#00BFFF]" />
      <Text className="mb-4 mt-[70px] px-4 text-[20px] font-semibold text-primary">
          Mis Turnos
      </Text>
      <ScrollView className="flex-1 px-4">
        <View className="mt-4 flex-1 items-center gap-5">
          {appointments.map((turno: Turno) => (
            <CardTurno
              key={turno.id_turno}
              nombre= {turno.info_medico.nombre}
              apellido= {turno.info_medico.apellido}
              especialidad= {turno.info_medico.especialidad}
              dia= {turno.fecha}
              hora= {turno.hora}
              id_turno= {turno.id_turno}
              pfp= {turno.info_medico.pfp}
              onPress={() => router.push(`(appointments)/appointment-details/${turno.id_turno}`)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Appointments;
