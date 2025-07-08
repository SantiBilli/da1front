import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ConfirmarTurno from '../components/ConfirmarTurno';

const mockReplace = jest.fn();
const mockUseTurnoStore = jest.fn();
const mockUseObraSocialStore = jest.fn();
const mockUseFetch = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

jest.mock('hooks/TurnoSeleccionado', () => ({
  useTurnoStore: () => mockUseTurnoStore(),
}));

jest.mock('hooks/ObraSocial', () => ({
  useObraSocialStore: () => mockUseObraSocialStore(),
}));

jest.mock('hooks/Fetch', () => ({
  useFetch: () => mockUseFetch(),
}));

jest.mock('components/ConfirmButton', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return ({ title, onPress, disabled }: any) => (
    <TouchableOpacity onPress={onPress} disabled={disabled} testID="confirm-button">
      <Text>{title}</Text>
    </TouchableOpacity>
  );
});

describe('ConfirmarTurno', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseTurnoStore.mockReturnValue({
      diaSeleccionado: '2025-07-15',
      horaSeleccionada: '14:30:00',
      idTurnoSeleccionado: 'abc123',
    });

    mockUseObraSocialStore.mockReturnValue({
      tieneObraSocial: true,
    });

    mockUseFetch.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });
  });

  it('muestra el texto del turno seleccionado', async () => {
    const { getByText } = render(<ConfirmarTurno />);

    await waitFor(() => {
      expect(getByText(/Turno seleccionado:/)).toBeTruthy();
      expect(getByText(/2025-07-15.*14:30.*hs/)).toBeTruthy();
    });
  });

  it('redirige al popup si no tiene obra social', async () => {
    mockUseObraSocialStore.mockReturnValue({
      tieneObraSocial: false,
    });

    const { getByTestId } = render(<ConfirmarTurno />);
    const button = getByTestId('confirm-button');

    fireEvent.press(button);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/popup');
    });
  });

  it('deshabilita el botón si no hay turno seleccionado', async () => {
    mockUseTurnoStore.mockReturnValue({
      diaSeleccionado: '',
      horaSeleccionada: '',
      idTurnoSeleccionado: '',
    });

    const { getByTestId } = render(<ConfirmarTurno />);
    const button = getByTestId('confirm-button');

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });

  it('no muestra información del turno cuando no hay turno seleccionado', async () => {
    mockUseTurnoStore.mockReturnValue({
      diaSeleccionado: '',
      horaSeleccionada: '',
      idTurnoSeleccionado: '',
    });

    const { queryByText } = render(<ConfirmarTurno />);

    expect(queryByText(/Turno seleccionado:/)).toBeNull();
  });

  it('confirma turno cuando tiene obra social', async () => {
    const { getByTestId } = render(<ConfirmarTurno />);
    const button = getByTestId('confirm-button');

    fireEvent.press(button);

    expect(mockReplace).not.toHaveBeenCalledWith('/popup');
  });

  it('desactiva el botón si fetch devuelve status distinto de 200', async () => {
    mockUseFetch.mockReturnValueOnce({
      data: null,
      error: null,
      isLoading: true,
    });

    const { getByTestId, rerender } = render(<ConfirmarTurno />);
    const button = getByTestId('confirm-button');

    fireEvent.press(button);

    mockUseFetch.mockReturnValueOnce({
      data: { status: 400 },
      error: null,
      isLoading: false,
    });

    rerender(<ConfirmarTurno />);

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });

  it('redirige a (tabs)/(appointments) cuando la reserva es exitosa', async () => {
    mockUseFetch.mockReturnValue({
      data: { status: 200 },
      error: null,
      isLoading: false,
    });

    render(<ConfirmarTurno />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('(tabs)/(appointments)');
    });
  });
});
