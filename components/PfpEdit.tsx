import { View, Image, Alert, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { useFetch } from 'hooks/Fetch';
import images from 'constants/images';
import PopUpModal from './PopUpModal';

const ProfilePicture = ({ pfp, setPfp }: { pfp: string | null; setPfp: (pfp: string) => void }) => {
  const [localPfp, setLocalPfp] = useState<string>(
    `${process.env.EXPO_PUBLIC_API_URL}/imagen-pfp/${pfp}`
  );

  const [showModalSave, setShowModalSave] = useState(false);

  useEffect(() => {
    setLocalPfp(`${process.env.EXPO_PUBLIC_API_URL}/imagen-pfp/${pfp}`);
  }, [pfp]);

  const [pendingImage, setPendingImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPendingImage(result.assets[0]);
      setLocalPfp(result.assets[0].uri);
    }
  };

  const [trigger, setTrigger] = useState(false);
  const [formDataFetch, setFormDataFetch] = useState<FormData | null>(null);

  const { data, error, isLoading } = useFetch({
    endpoint: '/profiles',
    method: 'PATCH',
    trigger: trigger,
    sendToken: true,
    formData: true,
    body: formDataFetch,
  });

  useEffect(() => {
    if (formDataFetch != null) return setTrigger(true);
  }, [formDataFetch]);

  useEffect(() => {
    if (trigger) return setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    if (!data || isLoading) return;
    setPfp(data.data.pfp);
    setPendingImage(null);
    setShowModalSave(true);
  }, [data, isLoading]);

  const handleConfirm = async () => {
    if (!pendingImage) return;

    const formData = new FormData();
    formData.append('image', {
      uri: pendingImage.uri,
      name: 'pfp.jpg',
      type: 'image/jpeg',
    } as any);

    setFormDataFetch(formData);
  };

  const handleCancel = () => {
    setPendingImage(null);
    setLocalPfp(`${process.env.EXPO_PUBLIC_API_URL}/imagen-pfp/${pfp}`);
  };

  useEffect(() => {
    if (showModalSave) {
      setTrigger(true);
      const timer = setTimeout(() => {
        setShowModalSave(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showModalSave]);

  return (
    <View className="mt-[30px] items-center justify-center">
      <View className="relative">
        <Image
          source={pfp === null && !pendingImage ? images.defaultpfp : { uri: localPfp }}
          className="h-[90px] w-[90px] rounded-full border-[1px] border-primary"
        />
        <Icon
          name="pencil"
          size={26}
          color="#b2b2b2"
          className="absolute bottom-[-10px] right-[-10px]"
          onPress={handlePickImage}
        />
      </View>

      {pendingImage && (
        <View className="mt-4 flex-row gap-4">
          <TouchableOpacity
            onPress={handleConfirm}
            className={`rounded-md bg-primary px-4 py-2 ${isLoading && 'opacity-50'}`}
            disabled={isLoading}>
            <Text className="text-[14px] text-white">Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCancel}
            className={`rounded-md bg-[#ccc] px-4 py-2 ${isLoading && 'opacity-50'}`}
            disabled={isLoading}>
            <Text className="text-[14px] text-black">Descartar</Text>
          </TouchableOpacity>
        </View>
      )}
      <PopUpModal
        modalOpen={showModalSave}
        setModalOpen={setShowModalSave}
        title="¡Los cambios se han guardado exitosamente!"
      />
    </View>
  );
};

export default ProfilePicture;
