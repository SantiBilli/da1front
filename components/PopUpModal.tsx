import { View, Text, Modal, TouchableOpacity } from 'react-native'
import Icon2 from 'react-native-vector-icons/Fontisto';
import React from 'react'

interface Props {
    modalOpen: boolean,
    setModalOpen: (modalOpen: boolean) => void,
    title: string,
    pressable?: boolean,
    onPress?: () => void,
    closable?: boolean
}

const PopUpModal = ( {modalOpen, setModalOpen, title, pressable, onPress, closable=true}: Props) => {
  return (
    <Modal visible={modalOpen} transparent={true}>
        <View className='flex-1 items-center justify-center bg-black/50'>
        <View className='relative w-[85%] rounded-[10px] border-[1px] border-secondary bg-background py-[60px]'>
            {closable &&<TouchableOpacity onPress={() => setModalOpen(false)} className="absolute top-2 right-2">
                <Icon2 name="close-a" size={19} color="#3ab4e5" className="p-4" />
            </TouchableOpacity>}
            <Text className='text-[15px] text-primary text-center'>{title}</Text>
        </View>
        </View>
    </Modal>
  )
}

export default PopUpModal