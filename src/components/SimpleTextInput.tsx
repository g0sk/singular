import React from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import {View} from './View';
import {useTheme} from 'ui/Theme';

interface TextInputProps extends RNTextInputProps {
  touched?: boolean;
  error?: string;
}

export const SimpleTextInput = ({touched, error, ...props}: TextInputProps) => {
  const theme = useTheme();
  const color: keyof typeof theme.colors = !touched
    ? 'default'
    : error
    ? 'error'
    : 'primary';
  const iconColor = theme.colors[color];
  const styles = StyleSheet.create({
    input: {
      color: theme.colors.darkText,
    },
  });
  return (
    <View
      flexDirection="row"
      height={48}
      alignItems="center"
      borderRadius={theme.borderRadius.m}
      borderWidth={1}
      borderColor={color}
      paddingRight="m">
      <View flex={1}>
        <RNTextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          selectionColor={theme.colors.primary}
          placeholderTextColor={iconColor}
          {...props}
        />
      </View>
    </View>
  );
};
