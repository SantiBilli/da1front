import { View, Text, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Props {
    pfp: string;    
}
const ProfilePicture = ({pfp}: Props) => {
  return (
    <View className='flex items-center justify-center mt-[30px]'>
        <View className='relative'>
            <Image source={{uri:`${process.env.EXPO_PUBLIC_API_URL}/imagen-medico/${pfp}`}} className="h-[90px] w-[90px] rounded-full border-[1px] border-primary"/>
            <Icon name="pencil" size={26} color="#b2b2b2" className='absolute bottom-[-10px] right-[-10px]'/>
        </View>
    </View>
  )
}

export default ProfilePicture