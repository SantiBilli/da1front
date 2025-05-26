import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfilePicture from 'components/PfpEdit';
import EditFormTextInput from 'components/EditFormTextInput';
import ObraSocialInput from 'components/ObraSocialInput';
import { useRouter } from 'expo-router';
import ConfirmButton from 'components/ConfirmButton';
import { useFetch } from 'hooks/Fetch';
import PopUpModal from 'components/PopUpModal';
import Splash from 'app/splash';
import * as ImagePicker from 'expo-image-picker';

interface UserData {
  id_usuario: string;
  nombre: string;
  apellido: string;
  mail: string;
  pfp: string;
  afiliaciones: null | {
    nro_credencial: string;
    obras_sociales: {
      id_obra_social: string;
      nombre: string;
    };
    planes_obras_sociales: {
      id_plan: string;
      nombre_plan: string;
    };
  };
}

const Profile = () => {
  const [primeraCarga, setPrimeraCarga] = useState(true);

  const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const [pfp, setPfp] = useState<string | null>(null);

  const [nombreOpen, setNombreOpen] = useState(false);
  const [apellidoOpen, setApellidoOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [userdata, setUserdata] = useState<UserData>({
    id_usuario: '',
    nombre: '',
    apellido: '',
    mail: '',
    pfp: '',
    afiliaciones: null,
  });
  const [showModalSave, setShowModalSave] = useState(false);

  const router = useRouter();

  const [trigger, setTrigger] = useState(true);
  const { data, error, isLoading } = useFetch({
    endpoint: '/profiles',
    method: 'GET',
    trigger: trigger,
    sendToken: true,
  });

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (isLoading || !data) return;

    setPfp(data.data.pfp);
    setUserdata(data.data);
    setPrimeraCarga(false);
  }, [data, isLoading]);

  const disabled = nombre === '' && apellido === '';

  const [trigger2, setTrigger2] = useState(false);
  const {
    data: data2,
    error: error2,
    isLoading: isLoading2,
  } = useFetch({
    endpoint: '/profiles',
    method: 'PATCH',
    trigger: trigger2,
    sendToken: true,
    body: {
      nombre: nombre,
      apellido: apellido,
    },
  });

  useEffect(() => {
    if (trigger2) return setTrigger2(false);
  }, [trigger2]);

  useEffect(() => {
    if (isLoading2 || !data2) return;
    setShowModalSave(true);
    setNombreOpen(false);
    setApellidoOpen(false);
  }, [data2, isLoading2]);

  useEffect(() => {
    if (showModalSave) {
      setTrigger(true);
      const timer = setTimeout(() => {
        setShowModalSave(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showModalSave]);

  if (isLoading && primeraCarga) {
    return <Splash />;
  } else
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
        <ScrollView className="flex-1">
          <ProfilePicture pfp={pfp} setPfp={setPfp} />
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
            <ObraSocialInput
              title="Obra Social"
              userObraSocial={userdata.afiliaciones?.obras_sociales?.nombre ?? null}
              userPlan={userdata.afiliaciones?.planes_obras_sociales?.nombre_plan ?? null}
              userNroAfiliado={userdata.afiliaciones?.nro_credencial ?? null}
              setShowModalSave={setShowModalSave}
            />

            <View className="flex gap-4 px-[50px]">
              {!disabled && (
                <ConfirmButton
                  title="Guardar cambios"
                  onPress={() => setTrigger2(true)}
                  disabled={isLoading2}
                />
              )}
              <ConfirmButton
                title="Historial"
                onPress={() => {
                  router.push('/(tabs)/(profile)/historial');
                }}
              />
            </View>
            <View className="mt-2 gap-3 px-[50px]">
              <TouchableOpacity>
                <Text
                  className="text-[15px] text-primary"
                  onPress={() => {
                    router.push('/(tabs)/(profile)/changePasswordProfile');
                  }}>
                  Cambiar contraseña
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-[15px] text-[#ff373a]">Eliminar cuenta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <PopUpModal
          modalOpen={showModalSave}
          setModalOpen={setShowModalSave}
          title="¡Los cambios se han guardado exitosamente!"
        />
      </View>
    );
};

export default Profile;
