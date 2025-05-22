import { Stack } from 'expo-router';

const RecoveryLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="changePassword" options={{ headerShown: false }} />
            <Stack.Screen name="insertToken" options={{ headerShown: false }} />
            <Stack.Screen name="olvidasteContrasenia" options={{ headerShown: false }} />
        </Stack>
    );
}

export default RecoveryLayout;