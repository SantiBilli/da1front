import { Stack, Tabs } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TabsLayout() {
  // console.log('TabsLayout component rendered');

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
      />
      <Tabs.Screen
        name="(appointments)"
        options={{
          title: 'Turnos',
          tabBarIcon: ({ color }) => <Icon size={28} name="calendar-month" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Icon size={28} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
