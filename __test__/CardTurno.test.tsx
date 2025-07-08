import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CardTurno from '../components/CardTurno';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('CardTurno', () => {
  const mockOnPress = jest.fn();

  const mockData = {
    nombre: 'María',
    apellido: 'López',
    especialidad: 'Dermatología',
    dia: '2025-07-10T00:00:00.000Z',
    hora: '2025-07-10T14:30:00.000Z',
    id_turno: 't001',
    pfp: 'pfp123.jpg',
    onPress: mockOnPress,
  };

  it('renderiza los datos del turno correctamente', async () => {
    const { getByText } = render(<CardTurno {...mockData} />);

    await waitFor(() => {
      expect(getByText('Dr/a. María López')).toBeTruthy();
      expect(getByText('Dermatología')).toBeTruthy();
      expect(getByText('10/07/2025 14:30hs')).toBeTruthy();
    });
  });

  it('llama a la función onPress al tocar la tarjeta', async () => {
    const { getByText } = render(<CardTurno {...mockData} />);
    const touchable = getByText('Dr/a. María López').parent?.parent?.parent;

    await waitFor(() => {
      fireEvent.press(touchable!);
      expect(mockOnPress).toHaveBeenCalled();
    });
  });
});
