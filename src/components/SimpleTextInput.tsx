import React, {forwardRef} from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import {View} from './View';
import {useTheme} from 'ui/theme';

interface SimpleTextInputProps extends RNTextInputProps {
  touched?: boolean;
  error?: string;
}

export const SimpleTextInput = forwardRef<RNTextInput, SimpleTextInputProps>(
  ({value, ...props}: SimpleTextInputProps, ref) => {
    const theme = useTheme();
    const color: keyof typeof theme.colors = 'primary';
    const textColor = theme.colors[color];
    const styles = StyleSheet.create({
      input: {
        color: theme.colors.darkText,
        fontSize: 10,
      },
    });
    return (
      <View
        flexDirection="row"
        height={40}
        width={150}
        justifyContent="flex-start">
        <View borderRadius={0} borderBottomWidth={1} borderColor={color}>
          <RNTextInput
            value={value}
            style={styles.input}
            underlineColorAndroid="transparent"
            selectionColor={theme.colors.primary}
            placeholderTextColor={textColor}
            {...{ref}}
            {...props}
          />
        </View>
      </View>
    );
  },
);
