import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EditFormTextInput from '../components/EditFormTextInput';

describe('EditFormTextInput', () => {
  const defaultProps = {
    title: 'Nombre',
    actualValue: 'Juan',
    value: '',
    handleChangeText: jest.fn(),
    setEditing: jest.fn(),
    editing: false,
    editable: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente el título y el valor actual', async () => {
    const { getByText } = render(<EditFormTextInput {...defaultProps} />);
    await waitFor(() => {
      expect(getByText('Nombre')).toBeTruthy();
      expect(getByText('Juan')).toBeTruthy();
    });
  });

  it('muestra el input cuando editing es true', async () => {
    const { getByPlaceholderText } = render(
      <EditFormTextInput {...defaultProps} editing={true} value="Pedro" />
    );
    await waitFor(() => {
      expect(getByPlaceholderText('Nuevo nombre...')).toBeTruthy();
    });
  });

  it('llama a setEditing al tocar el ícono', async () => {
    const { getByTestId } = render(<EditFormTextInput {...defaultProps} />);
    const button = getByTestId('edit-icon');
    fireEvent.press(button);

    await waitFor(() => {
      expect(defaultProps.setEditing).toHaveBeenCalledWith(true);
    });
  });

  it('no muestra ícono si editable es false', async () => {
    const { queryByTestId } = render(<EditFormTextInput {...defaultProps} editable={false} />);
    await waitFor(() => {
      expect(queryByTestId('edit-icon')).toBeNull();
    });
  });

  it('llama a handleChangeText al escribir en el input', async () => {
    const { getByPlaceholderText } = render(
      <EditFormTextInput {...defaultProps} editing={true} value="" />
    );
    const input = getByPlaceholderText('Nuevo nombre...');
    fireEvent.changeText(input, 'Nuevo valor');

    await waitFor(() => {
      expect(defaultProps.handleChangeText).toHaveBeenCalledWith('Nuevo valor');
    });
  });

  it('no lanza error si no se pasa setEditing y se toca el icono', async () => {
    const propsSinSetEditing = {
      ...defaultProps,
      setEditing: undefined,
    };

    const { getByTestId } = render(<EditFormTextInput {...propsSinSetEditing} />);
    const button = getByTestId('edit-icon');

    fireEvent.press(button);

    await waitFor(() => {
      expect(button).toBeTruthy();
    });
  });

  it('no lanza error si no se pasa handleChangeText y editing cambia', async () => {
    const { rerender } = render(
      <EditFormTextInput {...defaultProps} handleChangeText={undefined} editing={false} />
    );

    rerender(<EditFormTextInput {...defaultProps} handleChangeText={undefined} editing={true} />);

    await waitFor(() => {
      expect(true).toBe(true);
    });
  });

  it('usa editable = true por defecto cuando no se pasa la prop', async () => {
    const { getByTestId } = render(
      <EditFormTextInput
        title="Nombre"
        actualValue="Juan"
        value=""
        handleChangeText={jest.fn()}
        setEditing={jest.fn()}
        editing={false}
      />
    );

    await waitFor(() => {
      expect(getByTestId('edit-icon')).toBeTruthy();
    });
  });
});
