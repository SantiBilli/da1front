import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCallback, useEffect, useState } from 'react';
import icons from 'constants/icons';
import { useAuthStore } from 'hooks/AuthStore';

const specialtiesData = [
  { name: 'Dermatólogo', icon: icons.dermatologo },
  { name: 'Ginecólogo', icon: icons.ginecologo },
  { name: 'Odontólogo', icon: icons.odontologo },
  { name: 'Pediatra', icon: icons.pediatra },
  { name: 'Psicólogo', icon: icons.psicologo },
  { name: 'Cardiólogo', icon: icons.cardiologo },
  { name: 'Oftalmólogo', icon: icons.oftalmologo },
  { name: 'Otorrino', icon: icons.otorrino },
];

const Home = () => {
  // console.log('Home component rendered');

  const [searchText, setSearchText] = useState('');
  const [filteredSpecialties, setFilteredSpecialties] = useState(specialtiesData);

  const router = useRouter();

  useEffect(() => {
    if (searchText === '') {
      setFilteredSpecialties(specialtiesData);
    } else {
      const filtered = specialtiesData.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredSpecialties(filtered);
    }
  }, [searchText]);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4">
        <View className="absolute -top-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-[#00BFFF]" />
        <Text className="mb-4 mt-[70px] px-4 text-[20px] font-semibold text-primary">
          Especialidades
        </Text>
        <View className="flex-1 items-center justify-center rounded-[20px]">
          <View className=" h-[50px] w-[340px] flex-row items-center rounded-[10px] border-[1px] border-[#B2B2B2] py-2 pl-4 pr-[30px] ">
            <TextInput
              className="h-full w-full py-2 text-[16px] font-semibold text-primary"
              placeholder="Buscar especialidad..."
              placeholderTextColor="#B2B2B2"
              onChangeText={setSearchText}
            />
            <Icon name="search" size={25} color="#3AB4E5" />
          </View>

          <View className="mt-6 flex-row flex-wrap justify-around  px-4">
            {filteredSpecialties.map((item, index) => (
              <TouchableOpacity
                onPress={() => router.push(`(home)/doctors-list/${item.name}`)}
                key={index}
                className="mb-5 h-[140px] w-[140px] items-center justify-center gap-5 rounded-[10px] border border-secondary">
                <Image source={item.icon} style={{ width: 40, height: 40 }} resizeMode="contain" />
                <Text className="mt-2 text-[16px] font-semibold text-primary">{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
