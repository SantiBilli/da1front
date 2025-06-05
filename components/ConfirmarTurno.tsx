import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTurnoStore } from 'hooks/TurnoSeleccionado';
import ConfirmButton from './ConfirmButton';
import { useFetch } from 'hooks/Fetch';
import { useRouter } from 'expo-router';
import { useObraSocialStore } from 'hooks/ObraSocial';

const ConfirmarTurno = () => {
  const { diaSeleccionado, horaSeleccionada, idTurnoSeleccionado } = useTurnoStore();
  const { tieneObraSocial } = useObraSocialStore();

  const router = useRouter();

  const [trigger, setTrigger] = useState(false);

  const { data, error, isLoading } = useFetch({
    endpoint: `/turnos-reservar/${idTurnoSeleccionado}`,
    method: 'PUT',
    trigger: trigger,
    sendToken: true,
  });

  const handlePress = () => {
    if (!tieneObraSocial) return router.replace('/popup');
    setTrigger(true);
  };

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (isLoading || !data) return;
    if (data.status === 200) return router.replace('(tabs)/(appointments)');
  }, [data, isLoading]);

  return (
    <View className="flex items-center justify-center gap-5 py-5">
      {idTurnoSeleccionado != '' && (
        <Text className="text-[15px] text-primary">
          Turno seleccionado:{' '}
          <Text className="text-[15px] text-black">
            {diaSeleccionado} a las {horaSeleccionada.slice(0, 5)} hs
          </Text>
        </Text>
      )}
      <ConfirmButton
        onPress={handlePress}
        title="Confirmar Turno"
        disabled={idTurnoSeleccionado == '' ? true : false || isLoading}
      />
    </View>
  );
};

export default ConfirmarTurno;
