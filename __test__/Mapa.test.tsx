import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Mapa from '../components/Mapa';
import * as Location from 'expo-location';

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  geocodeAsync: jest.fn(),
}));

describe('Mapa', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('solicita permisos y muestra el mapa cuando se otorgan y hay coordenadas', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    (Location.geocodeAsync as jest.Mock).mockResolvedValue([
      { latitude: -34.6037, longitude: -58.3816 },
    ]);

    const { getByTestId } = render(<Mapa direccion="Buenos Aires" />);

    await waitFor(() => {
      expect(getByTestId('map-view')).toBeTruthy();
      expect(getByTestId('map-marker')).toBeTruthy();
    });
  });

  it('no muestra el mapa si no se otorgan permisos', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });

    const { queryByTestId } = render(<Mapa direccion="Buenos Aires" />);

    await waitFor(() => {
      expect(queryByTestId('map-view')).toBeNull();
    });
  });

  it('no muestra el mapa si la geocodificación falla', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });
    (Location.geocodeAsync as jest.Mock).mockRejectedValue(new Error('Failed'));

    const { queryByTestId } = render(<Mapa direccion="Buenos Aires" />);

    await waitFor(() => {
      expect(queryByTestId('map-view')).toBeNull();
    });
  });

  it('no hace nada si no se pasa una dirección', async () => {
    const { queryByTestId } = render(<Mapa direccion="" />);

    await waitFor(() => {
      expect(queryByTestId('map-view')).toBeNull();
    });
  });

  it('no muestra el mapa si geocodeAsync devuelve un array vacío', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });
    (Location.geocodeAsync as jest.Mock).mockResolvedValue([]);

    const { queryByTestId } = render(<Mapa direccion="Calle Falsa 123" />);

    await waitFor(() => {
      expect(queryByTestId('map-view')).toBeNull();
    });
  });
});
