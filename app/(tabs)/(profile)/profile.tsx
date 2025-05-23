import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfilePicture from 'components/PfpEdit';
import EditFormTextInput from 'components/EditFormTextInput';
import ObraSocialInput from 'components/ObraSocialInput';
import { useRouter } from 'expo-router';
import ConfirmButton from 'components/ConfirmButton';
import { useFetch } from 'hooks/Fetch';
import PopUpModal from 'components/PopUpModal';

const Profile = () => {
  const [nombreOpen, setNombreOpen] = useState(false);
  const [apellidoOpen, setApellidoOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mail, setMail] = useState('');
  const [userdata, setUserdata] = useState({
  id_usuario: '', nombre: '', apellido: '', mail: '', pfp: '', afiliaciones: null});
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const [trigger, setTrigger] = useState(true);
  const { data, error, isLoading } = useFetch({
    endpoint: '/profiles',
    method: 'GET',
    trigger: trigger,
    sendToken: true,
  })

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (isLoading || !data) return;
    setUserdata(data.data);
  }, [data, isLoading]);

  const disabled = nombre === '' && apellido === '';

  const [trigger2, setTrigger2] = useState(false);
  const { data: data2, error: error2, isLoading: isLoading2 } = useFetch({
    endpoint: '/profiles',
    method: 'PATCH',
    trigger: trigger2,
    sendToken: true,
    body: {
      nombre: nombre,
      apellido: apellido,
    }
  })

  useEffect(() => {
    if (trigger2) return setTrigger2(false);
  }, [trigger2]);

  useEffect(() => {
    if (isLoading2 || !data2) return;
    setTrigger(true);
    setShowModal(true);
    setNombreOpen(false);
    setApellidoOpen(false);
  }, [data2, isLoading2]);

  useEffect(() => {
  if (showModal) {
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 5000); 
    return () => clearTimeout(timer);
  }
}, [showModal]);


  return (
    <View className="flex-1 bg-background">
      <View className="absolute -top-[140px] h-[200px] w-[500px] self-center rounded-[50%] bg-secondary" />
      <View className="mb-4 mt-[70px] flex-row justify-between">
        <Text className="px-8 text-[20px] font-semibold text-primary">Mi Perfil</Text>
        <TouchableOpacity
          className="flex-row items-center gap-2 px-8"
          onPress={() => router.replace('(auth)/login')}>
          <Text className="text-[13px] text-[#b2b2b2]">Salir</Text>
          <Icon name="logout" size={17} color="#b2b2b2" />
        </TouchableOpacity>
      </View>
      <ProfilePicture pfp={userdata.pfp} />
      <View className="mt-[30px] gap-5">
        <EditFormTextInput
          title="Nombre"
          actualValue={userdata.nombre}
          value={nombre}
          handleChangeText={setNombre}
          maxLength={20}
          editing={nombreOpen}
          setEditing={setNombreOpen}
        />
        <EditFormTextInput
          title="Apellido"
          actualValue={userdata.apellido}
          value={apellido}
          handleChangeText={setApellido}
          maxLength={20}
          editing={apellidoOpen}
          setEditing={setApellidoOpen}
        />
        <EditFormTextInput title="Mail" actualValue={userdata.mail} editable={false} />
        <ObraSocialInput title="Obra Social" actualValue="OSDE 310" />

        <View className='flex gap-4 px-[50px]'>
         {!disabled && <ConfirmButton title='Guardar cambios' onPress={() => setTrigger2(true)} />}
          <ConfirmButton title='Historial' onPress={() => {router.push('/(tabs)/(profile)/historial')}} />
        </View>
        <View className="px-[50px] gap-3 mt-2">
          <TouchableOpacity>
            <Text className="text-[15px] text-primary"  onPress={() => {router.push('/(tabs)/(profile)/changePasswordProfile')}}>Cambiar contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-[15px] text-[#ff373a]">Eliminar cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
      <PopUpModal modalOpen={showModal} setModalOpen={setShowModal} title="¡Los cambios se han guardado exitosamente!"/>
    </View>
  );
};

export default Profile;
