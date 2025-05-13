import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Home = () => {
  console.log('Home component rendered');

  const router = useRouter();

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => router.push('/(tabs)/(home)/(doctors)/doctors')}>
        <Text>Oftalmologo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
