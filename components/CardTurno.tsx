import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';

const CardTurno = () => {
    return(
        <TouchableOpacity>
            <LinearGradient
            colors={['#45CADE4D', '#A0E8EB4D', '#FFFFFF4D']}
            locations={[0.0, 0.5, 1.0]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
            height: 125,
            width: 340,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#3AB4E5',
            }}>
                <View className="flex w-[100px] items-center justify-center ">
                    <Image
                        source={require('../assets/images/logo.png')} //cambiar por la imagen del doctor
                        className="h-[60px] w-[60px] rounded-full border-[1px] border-primary"
                    />
                </View>
                <View className='flex-1 gap-4'>
                    <Text className="text-[15px]  text-primary">
                        Dr/a.{' '}
                        <Text className="text-black">
                            Nombre Apellido
                        </Text>
                    </Text>
                    <View className="justi flex-row items-center gap-2">
                        <Icons name="local-hospital" color={'#3AB4E5'} size={20} />
                        <Text className="text-[15px] text-black">Especialidad</Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                        <Icons name='calendar-month' color={'#3AB4E5'} size={20} />
                        <Text className="text-[15px] text-black">Fecha y Hora</Text>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

export default CardTurno;