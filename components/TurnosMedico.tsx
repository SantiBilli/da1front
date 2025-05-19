import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFetch } from 'hooks/Fetch';
import HorariosMedico from './HorariosMedico';

interface propsMedico {
  id_usuario: string;
}

const TurnosMedico = ({ id_usuario }: propsMedico) => {
  const [trigger, setTrigger] = useState(true);
  const [dias, setDias] = useState([]);

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
      {dias.map(({ fecha }) => (
        <HorariosMedico key={fecha} dia={fecha} />
      ))}
    </View>
  );
};

export default TurnosMedico;
