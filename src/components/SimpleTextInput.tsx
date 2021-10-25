import React, {forwardRef} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {useTheme} from 'ui/theme';

interface SimpleTextInputProps extends TextInputProps {
  error?: boolean;
}

export const SimpleTextInput = forwardRef<TextInput, SimpleTextInputProps>(
  ({error, ...props}: SimpleTextInputProps, ref) => {
    const theme = useTheme();
    const color: string = !error ? theme.colors.primary : theme.colors.error;

    return (
      <TextInput
        {...{ref}}
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1,
          color: 'black',
          margin: 0,
          padding: 0,
        }}
        underlineColorAndroid="transparent"
        selectionColor={theme.colors.primary}
        placeholderTextColor={theme.colors.default}
        {...props}
      />
    );
  },
);
