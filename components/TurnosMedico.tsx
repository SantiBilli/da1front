import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFetch } from 'hooks/Fetch';
import HorariosMedico from './HorariosMedico';

interface propsMedico {
  id_usuario: string;
}

const TurnosMedico = ({ id_usuario }: propsMedico) => {
  const [trigger, setTrigger] = useState(true);
  const [dias, setDias] = useState<[] | null>(null);

  const { data, error, isLoading } = useFetch({
    endpoint: `/fechas/${id_usuario}`,
    method: 'GET',
    trigger: trigger,
    sendToken: true,
  });

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (isLoading || !data) return;
    setDias(data.data);
  }, [data, isLoading]);

  return (
    <View className="flex-1 gap-3">
      {dias ? (
        dias.length == 0 ? (
          <Text>No hay turnos disponibles.</Text>
        ) : (
          dias.map(({ fecha }) => <HorariosMedico key={fecha} dia={fecha} id_medico={id_usuario} />)
        )
      ) : (
        <ActivityIndicator size="small" color="#3AB4E5" className="p-5" />
      )}
    </View>
  );
};

export default TurnosMedico;
