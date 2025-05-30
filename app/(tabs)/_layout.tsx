import { Stack, Tabs, useRouter } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TabsLayout() {
  // console.log('TabsLayout component rendered');

  const router = useRouter();

  return (
    <Tabs
      initialRouteName="(home)"
      screenOptions={{
        tabBarActiveTintColor: '#3AB4E5',
        tabBarInactiveTintColor: '#B2B2B2',
        headerShown: false,
        tabBarIconStyle: {
          marginTop: 7,
        },
        tabBarStyle: {
          backgroundColor: '#F0F0FF',
          height: 65,
          borderTopWidth: 1,
          borderTopColor: '#B2B2B2',
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color }) => <Icon size={28} name="search" color={color} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace('/(home)/home'); // Reemplaza por la ruta inicial
          },
        }}
      />
      <Tabs.Screen
        name="(appointments)"
        options={{
          title: 'Turnos',
          tabBarIcon: ({ color }) => <Icon size={28} name="calendar-month" color={color} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace('/(appointments)/appointments'); // Reemplaza por la ruta inicial
          },
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Icon size={28} name="person" color={color} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace('/(profile)/profile'); // Reemplaza por la ruta inicial
          },
        }}
      />
    </Tabs>
  );
}
