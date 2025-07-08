import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

interface Props {
  direccion: string;
}
const Mapa = ({ direccion }: Props) => {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const fetchCoords = async () => {
      if (!direccion) return;
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Location permission not granted');
          return;
        }
        const result = await Location.geocodeAsync(direccion);
        if (result.length > 0) {
          setCoords({
            latitude: result[0].latitude,
            longitude: result[0].longitude,
          });
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    };

    fetchCoords();
  }, [direccion]);

  return (
    <View className="h-[150px] w-[250px]">
      {coords && (
        <MapView
          testID="map-view"
          style={{ flex: 1 }}
          initialRegion={{ ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 }}>
          <Marker testID="map-marker" coordinate={coords} />
        </MapView>
      )}
    </View>
  );
};

export default Mapa;
