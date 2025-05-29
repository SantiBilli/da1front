import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { useFetch } from 'hooks/Fetch';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Splash from "app/splash";
import Mapa from "components/Mapa";

interface DrInfo {
    nombre: string;
    apellido: string;
    especialidad: string;
    direccion: string;
    pfp: string;
}

interface Turno {
    id_turno: string;
    fecha: string;
    hora: string;
    estado: string;
    info_medico: DrInfo;
}

interface Notas{
    id_nota: string;
    notas: string;
    fecha: string;
}

const AppointmentDetails = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const id_turno = Array.isArray(id) ? id[0] : id;
    const [trigger, setTrigger] = useState(false);
    const [infoTurno, setInfoTurno] = useState<Turno>({estado: '', fecha: '', hora: '', id_turno: '', info_medico: {apellido: '', direccion: '', especialidad: '', nombre: '', pfp: ''}});

    const { data, error, isLoading } = useFetch({
        endpoint: `/turnos-cancelar/${id_turno}`,
        method: 'PUT',
        trigger: trigger,
        sendToken: true,
    });

    useEffect(() => {
        if (isLoading || !data) return;
        if (data.status === 200) {
            router.replace('/(tabs)/(appointments)/appointments');
        }
    }, [data, isLoading]);

    useEffect(() => {
        if (trigger) return setTrigger(false);
    }, [trigger]);

    useEffect(() => {
        if (error != null) {
            if (error.status === 500) return router.replace('/oops');
        }
    }, [error]);

    const handlePress = () => {
        setTrigger(true);
    }

    const [trigger2, setTrigger2] = useState(true);

    const { data: data2, error: error2, isLoading: isLoading2 } = useFetch({
        endpoint: `/turnos-info/${id_turno}`,
        method: 'GET',
        trigger: trigger2,
        sendToken: true,
    });

    useEffect(() => {
        if (trigger2) return setTrigger2(false);
    }, [trigger2]);

    useEffect(() => {
        if (isLoading2 || !data2) return;
        setInfoTurno(data2.data.turno);
    }, [data2, isLoading2]);

    if (isLoading2) {
        return <Splash />;
    } else 
    return (
        <View className="flex-1 bg-background">
            <View className="absolute -top-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-secondary" />
            <Text className="mb-4 mt-[70px] px-4 text-[20px] font-semibold text-primary">
                Detalle
            </Text>
            <ScrollView className="flex-1">
                <View className="mt-[10px] items-center justify-center">
                    <Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/imagen-medico/${infoTurno.info_medico.pfp}`}}
                    className="h-[80px] w-[80px] rounded-full border-[1px] border-primary mb-[15px]"/>
                    <Text className="text-[15px]  text-primary">
                            Dr/a.{' '}
                            <Text className="text-black">
                                {infoTurno.info_medico.nombre} {infoTurno.info_medico.apellido}
                            </Text>
                    </Text>
                </View>
                <View className="border-b-[1px] border-secondary my-[40px] w-[80%] self-center"></View>
                <View className="flex gap-[40px] px-[40px]">
                    <View className="flex-row items-center gap-2">
                        <Icons name="local-hospital" color={'#3AB4E5'} size={23} />
                        <Text className="text-[17px]">{infoTurno.info_medico.especialidad}</Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                        <Icons name='calendar-month' color={'#3AB4E5'} size={23} />
                        <Text className="text-[17px]">{infoTurno.fecha.slice(0, 10)} {infoTurno.hora.slice(11, 16)}hs</Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                        <Icons name='rotate-left' color={'#3AB4E5'} size={23} />
                        <Text className="text-[17px]">{infoTurno.estado.charAt(0).toUpperCase() + infoTurno.estado.slice(1)}</Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                        <Icons name="location-pin" color={'#3AB4E5'} size={23} />
                        <Text className="text-[17px]">{infoTurno.info_medico.direccion}</Text>
                    </View>
                </View>
                <View className="flex justify-center items-center mt-[30px]">
                    <Mapa direccion={infoTurno.info_medico.direccion}/>
                </View>
                <View className="flex justify-center items-center mt-[30px]">
                    <TouchableOpacity onPress={handlePress} className=" h-[40px] w-[80%] justify-center items-center rounded-[10px] border-[1px] border-[#ff373a] bg-[rgba(255,55,58,0.1)] mb-[20px]">
                        <Text className="text-[15px] text-[#ff373a]">Cancelar Turno</Text>
                    </TouchableOpacity>
                </View>        
            </ScrollView>
        </View>
    );
};

export default AppointmentDetails;