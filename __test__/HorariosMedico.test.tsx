import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HorariosMedico from '../components/HorariosMedico';
import * as TurnoSeleccionado from 'hooks/TurnoSeleccionado';

const mockUseFetch = jest.fn();
jest.mock('hooks/Fetch', () => ({
  useFetch: () => mockUseFetch(),
}));

let mockedIdTurnoSeleccionado = '';

jest.mock('hooks/TurnoSeleccionado', () => {
  const mockFns = {
    setDia: jest.fn(),
    setHora: jest.fn(),
    setIdTurno: jest.fn(),
    resetTurno: jest.fn(),
  };

  return {
    useTurnoStore: () => ({
      ...mockFns,
      idTurnoSeleccionado: mockedIdTurnoSeleccionado,
    }),
    __esModule: true,
    __mockedFns: mockFns,
  };
});

const { __mockedFns } = TurnoSeleccionado as any;

describe('HorariosMedico', () => {
  const defaultProps = {
    dia: '2025-07-10',
    id_medico: '8eaab00c-c382-4a07-b2ec-26078b311408',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra la fecha formateada', async () => {
    mockUseFetch.mockReturnValue({ data: null, error: null, isLoading: false });

    const { getByText } = render(<HorariosMedico {...defaultProps} />);
    await waitFor(() => {
      expect(getByText(/jueves, 10 de julio/i)).toBeTruthy();
    });
  });

  it('abre los horarios al presionar el ícono y renderiza horarios', async () => {
    mockUseFetch.mockReturnValue({
      data: { data: [{ hora: '14:00:00', id_turno: 't1' }] },
      error: null,
      isLoading: false,
    });

    const { getByTestId, getByText } = render(<HorariosMedico {...defaultProps} />);
    fireEvent.press(getByTestId('expand-icon'));

    await waitFor(() => {
      expect(getByText('14:00')).toBeTruthy();
    });
  });

  it('muestra el indicador de carga cuando isLoading es true', async () => {
    mockUseFetch.mockReturnValue({ data: null, error: null, isLoading: true });

    const { getByTestId } = render(<HorariosMedico {...defaultProps} />);
    fireEvent.press(getByTestId('expand-icon'));

    await waitFor(() => {
      expect(getByTestId('loading-indicator')).toBeTruthy();
    });
  });

  it('setea el turno al presionar una hora', async () => {
    mockUseFetch.mockReturnValue({
      data: { data: [{ hora: '14:00:00', id_turno: 't1' }] },
      error: null,
      isLoading: false,
    });

    const { getByTestId } = render(<HorariosMedico {...defaultProps} />);
    fireEvent.press(getByTestId('expand-icon'));

    await waitFor(() => {
      const hourButton = getByTestId('hour-button-t1');
      fireEvent.press(hourButton);

      expect(__mockedFns.setDia).toHaveBeenCalledWith('2025-07-10');
      expect(__mockedFns.setHora).toHaveBeenCalledWith('14:00:00');
      expect(__mockedFns.setIdTurno).toHaveBeenCalledWith('t1');
    });
  });

  it('colapsa los horarios al presionar el ícono nuevamente', async () => {
    mockUseFetch.mockReturnValue({
      data: { data: [{ hora: '15:00:00', id_turno: 't2' }] },
      error: null,
      isLoading: false,
    });

    const { getByTestId, queryByText } = render(<HorariosMedico {...defaultProps} />);

    fireEvent.press(getByTestId('expand-icon'));
    await waitFor(() => {
      expect(getByTestId('hour-button-t2')).toBeTruthy();
    });

    fireEvent.press(getByTestId('collapse-icon'));

    await waitFor(() => {
      expect(queryByText('15:00')).toBeNull();
    });
  });

  it('resalta el botón si el turno está seleccionado', async () => {
    mockedIdTurnoSeleccionado = 't3';

    mockUseFetch.mockReturnValue({
      data: { data: [{ hora: '16:00:00', id_turno: 't3' }] },
      error: null,
      isLoading: false,
    });

    const { getByTestId } = render(<HorariosMedico {...defaultProps} />);
    fireEvent.press(getByTestId('expand-icon'));

    await waitFor(() => {
      const button = getByTestId('hour-button-t3');
      expect(button).toBeTruthy();
    });
  });
});
