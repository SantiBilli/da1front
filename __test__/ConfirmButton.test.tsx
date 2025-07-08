import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ConfirmButton from '../components/ConfirmButton';

describe('ConfirmButton', () => {
  it('muestra el título correctamente', () => {
    const { getByText } = render(<ConfirmButton title="Confirmar" onPress={() => {}} />);
    expect(getByText('Confirmar')).toBeTruthy();
  });

  it('llama a onPress cuando se presiona y está habilitado', () => {
    const mockPress = jest.fn();
    const { getByText } = render(<ConfirmButton title="Confirmar" onPress={mockPress} />);
    fireEvent.press(getByText('Confirmar'));
    expect(mockPress).toHaveBeenCalled();
  });

  it('no llama a onPress cuando está deshabilitado', () => {
    const mockPress = jest.fn();
    const { getByText } = render(<ConfirmButton title="Confirmar" onPress={mockPress} disabled />);
    fireEvent.press(getByText('Confirmar'));
    expect(mockPress).not.toHaveBeenCalled();
  });

  it('aplica estilos de deshabilitado correctamente', () => {
    const { getByTestId } = render(<ConfirmButton title="Confirmar" onPress={() => {}} disabled />);
    const button = getByTestId('confirm-button');
    expect(button).toBeDisabled();
  });
});
