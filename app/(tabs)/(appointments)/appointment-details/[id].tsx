import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { useFetch } from 'hooks/Fetch';

const AppointmentDetails = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const id_turno = Array.isArray(id) ? id[0] : id;
    const [trigger, setTrigger] = useState(false);

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

    return (
        <View className="flex-1 bg-background">
            <View className="absolute -top-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-[#00BFFF]" />
            <Text className="mb-4 mt-[70px] px-4 text-[20px] font-semibold text-primary">
                Detalles
            </Text>
            <TouchableOpacity onPress={handlePress}>
                <Text>Cancelar Turno</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AppointmentDetails;