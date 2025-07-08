import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CardListaDoctores from '../components/CardListaDoctores';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('CardListamedicoes', () => {
  const mockData = {
    id_medico: 'bc187ce5-8101-4a5e-9a3c-8b002d96f47d',
    nombre: 'Juan',
    apellido: 'Pérez',
    direccion: 'Castex 3360, Capital Federal',
    disponibilidad: 'Lunes a Viernes',
    pfp: '1.png',
  };

  it('renderiza los datos del médico correctamente', async () => {
    const { getByText } = render(<CardListaDoctores {...mockData} />);

    await waitFor(() => {
      expect(getByText('Dr/a. Juan Pérez')).toBeTruthy();
      expect(getByText('Castex 3360, Capital Federal')).toBeTruthy();
      expect(getByText('Lunes a Viernes')).toBeTruthy();
    });
  });

  it('navega a la ruta correcta al presionar la tarjeta', async () => {
    const mockPush = jest.fn();
    jest.spyOn(require('expo-router'), 'useRouter').mockReturnValue({ push: mockPush });

    const { getByTestId } = render(<CardListaDoctores {...mockData} />);

    await waitFor(() => {
      const touchable = getByTestId('card-touchable');
      fireEvent.press(touchable);
      expect(mockPush).toHaveBeenCalledWith(
        '(home)/doctors-list/doctors-details/bc187ce5-8101-4a5e-9a3c-8b002d96f47d'
      );
    });
  });
});
