import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FormTextInput from '../components/FormTextInput';

describe('FormTextInput', () => {
  const defaultProps = {
    title: 'Contraseña',
    value: '',
    placeholder: 'Ingresá tu contraseña',
    handleChangeText: jest.fn(),
    isPassword: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente el título y el placeholder', async () => {
    const { getByText, getByPlaceholderText } = render(<FormTextInput {...defaultProps} />);

    await waitFor(() => {
      expect(getByText('Contraseña')).toBeTruthy();
      expect(getByPlaceholderText('Ingresá tu contraseña')).toBeTruthy();
    });
  });

  it('llama a handleChangeText al escribir', async () => {
    const { getByPlaceholderText } = render(<FormTextInput {...defaultProps} />);
    const input = getByPlaceholderText('Ingresá tu contraseña');

    fireEvent.changeText(input, 'nueva contraseña');

    await waitFor(() => {
      expect(defaultProps.handleChangeText).toHaveBeenCalledWith('nueva contraseña');
    });
  });

  it('muestra ícono de ojo y alterna visibilidad de contraseña', async () => {
    const { getByTestId, getByPlaceholderText, rerender } = render(
      <FormTextInput {...defaultProps} />
    );

    const input = getByPlaceholderText('Ingresá tu contraseña');
    const toggle = getByTestId('toggle-password');

    await waitFor(() => {
      expect(input.props.secureTextEntry).toBe(true);
    });

    fireEvent.press(toggle);

    rerender(<FormTextInput {...defaultProps} />);

    await waitFor(() => {
      expect(input.props.secureTextEntry).toBe(false);
    });
  });

  it('no muestra ícono si isPassword es false', async () => {
    const { queryByTestId } = render(<FormTextInput {...defaultProps} isPassword={false} />);

    await waitFor(() => {
      expect(queryByTestId('toggle-password')).toBeNull();
    });
  });

  it('usa isPassword = false por defecto si no se pasa', async () => {
    const props = {
      title: 'Email',
      value: '',
      handleChangeText: jest.fn(),
    };

    const { getByPlaceholderText } = render(
      <FormTextInput {...props} placeholder="Ingresá tu email" />
    );

    const input = getByPlaceholderText('Ingresá tu email');

    await waitFor(() => {
      expect(input.props.secureTextEntry).toBe(false);
    });
  });
});
