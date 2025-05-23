import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFetch } from 'hooks/Fetch';
import CardTurno from 'components/CardTurno';

interface Medico {
    nombre: string;
    apellido: string;
    especialidad: string;
    pfp: string
}

interface Turno {
    id_turno: string;
    fecha: string;
    hora: string;
    info_medico: Medico;
}

const Historial = () => {

    const [turnos, setTurnos] = useState([]);


    const [trigger, setTrigger] = useState(true);
    const {data, error, isLoading} = useFetch({
        endpoint: '/turnos/finalizado',
        method: 'GET',
        trigger: trigger,
        sendToken: true,
    })

    useEffect(() => {
        if (trigger) return setTrigger(false);
    }, [trigger]);

    useEffect(() => {
        if (isLoading || !data) return;
        console.log(data.data);
        setTurnos(data.data);
    }, [data, isLoading]);


  return (
    <View className="flex-1 bg-background ">
        <View className="absolute -top-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-[#00BFFF]" />
      <Text className="mb-4 mt-[70px] px-8 text-[20px] font-semibold text-primary">
        Historial
      </Text>
      <ScrollView className="flex-1 px-4">
        <View className="mt-4 flex-1 items-center gap-5">
            {turnos.map((turno: Turno) => (
              <CardTurno
                key={turno.id_turno}
                dia={turno.fecha}
                especialidad={turno.info_medico.especialidad}
                hora={turno.hora}
                id_turno={turno.id_turno}
                nombre={turno.info_medico.nombre}
                apellido={turno.info_medico.apellido}
                pfp={turno.info_medico.pfp}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default Historial