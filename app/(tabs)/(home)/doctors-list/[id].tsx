import { View, Text, ScrollView, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardListamedicoes from 'components/CardListaDoctores';
import { useFetch } from 'hooks/Fetch';

interface propsMedico {
  id_usuario: string;
  nombre: string;
  apellido: string;
  direccion: string;
  disponibilidad: string;
  pfp: string;
}

const medicosList = () => {
  console.log('medicosList component rendered');

  const [searchText, setSearchText] = useState('');
  const [filteredSpecialties, setFilteredSpecialties] = useState([]);
  const { id } = useLocalSearchParams();

  const [trigger, setTrigger] = useState(true);

  const router = useRouter();

  const { data, error, isLoading } = useFetch({
    endpoint: `/medicos/${id}`,
    method: 'GET',
    trigger: trigger,
    sendToken: true,
  });

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (isLoading || !data) return;
    setFilteredSpecialties(data.data);
  }, [data, isLoading]);

  useEffect(() => {
    if (error != null) {
      if (error.status === 500) return router.replace('/oops');
    }
  }, [error]);

  useEffect(() => {
    if (!data?.data) return;

    const lowerSearch = searchText.toLowerCase();

    const filtered = data.data.filter((medico: propsMedico) =>
      `${medico.nombre} ${medico.apellido}`.toLowerCase().includes(lowerSearch)
    );

    setFilteredSpecialties(filtered);
  }, [searchText, data]);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4">
        <View className="absolute -top-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-[#00BFFF]" />
        <Text className="mb-4 mt-[70px] px-4 text-[20px] font-semibold text-primary">{id}</Text>
        <View className="flex-1 items-center justify-center ">
          <View className=" h-[50px] w-[340px] flex-row items-center rounded-[10px] border-[1px] border-[#B2B2B2] py-2 pl-4 pr-[30px] ">
            <TextInput
              className="h-full w-full py-2 text-[16px] font-semibold text-primary"
              placeholder="Buscar especialidad..."
              placeholderTextColor="#B2B2B2"
              onChangeText={setSearchText}
            />
            <Icon name="search" size={25} color="#3AB4E5" />
          </View>
        </View>
        <View className="mt-4 flex-1 items-center gap-5">
          {filteredSpecialties.map((medico: propsMedico) => (
            <CardListamedicoes
              key={medico.id_usuario}
              nombre={medico.nombre}
              apellido={medico.apellido}
              disponibilidad={medico.disponibilidad}
              direccion={medico.direccion}
              id_medico={medico.id_usuario}
              pfp={medico.pfp}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default medicosList;
