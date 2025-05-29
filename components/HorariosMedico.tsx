import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFetch } from 'hooks/Fetch';
import { Pressable } from 'react-native';
import { useTurnoStore } from 'hooks/TurnoSeleccionado';

interface propsMedico {
  dia: string;
}

type Turno = {
  hora: string;
  id_turno: string;
};

const HorariosMedico = ({ dia }: propsMedico) => {
  const [open, setOpen] = useState(false);

  const [horarios, setHorarios] = useState<Turno[] | []>([]);

  const { setDia, setHora, setIdTurno, idTurnoSeleccionado, resetTurno } = useTurnoStore();

  //Formatear Fecha
  // const fecha = new Date(dia);
  const [anio, mes, dia1] = dia.split('-').map(Number);
  const fecha = new Date(anio, mes - 1, dia1); // Mes 0
  const fechaFormateada = fecha.toLocaleDateString('es-ES', {
    timeZone: 'America/Argentina/Buenos_Aires',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const [trigger, setTrigger] = useState(false);

  const { data, error, isLoading } = useFetch({
    endpoint: `/horarios/${dia}`,
    method: 'GET',
    trigger: trigger,
    sendToken: true,
  });

  useEffect(() => {
    resetTurno();
  }, []);

  useEffect(() => {
    setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (!open) return;
    setTrigger(true);
  }, [open]);

  useEffect(() => {
    if (isLoading || !data) return;

    setHorarios(data.data);
  }, [data, isLoading]);

  return (
    <View className="rounded-[10px] border-[1px] border-primary">
      <View className="flex h-[40px] flex-row items-center justify-between px-4">
        <Text className="text-[15px] text-primary">{fechaFormateada}</Text>
        {open ? (
          <Icon name="keyboard-arrow-up" size={20} color="#45cade" onPress={() => setOpen(!open)} />
        ) : (
          <Icon
            name="keyboard-arrow-down"
            size={20}
            color="#45cade"
            onPress={() => setOpen(!open)}
          />
        )}
      </View>
      {open &&
        (!isLoading ? (
          <View className="flex-row flex-wrap gap-2 p-5">
            {horarios.map(({ hora, id_turno }) => (
              <TouchableOpacity
                key={id_turno}
                className={`flex h-[25px] w-[45px] items-center justify-center rounded-md px-1 py-2 ${idTurnoSeleccionado === id_turno ? 'bg-primary' : 'bg-[#84D7A3A6]'}`}
                onPress={() => {
                  setDia(dia);
                  setHora(hora);
                  setIdTurno(id_turno);
                }}>
                <Text className="flex text-[10px] text-black">{hora.slice(0, 5)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <ActivityIndicator size="small" color="#3AB4E5" className="p-5" />
        ))}
    </View>
  );
};

export default HorariosMedico;
