import React, {forwardRef} from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {View} from './View';
import {useTheme} from 'ui/Theme';

interface TextInputProps extends RNTextInputProps {
  icon: string | null;
  touched?: boolean;
  error?: string;
}

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({icon, touched, error, ...props}: TextInputProps, ref) => {
    const theme = useTheme();
    const color: keyof typeof theme.colors = !touched
      ? 'default'
      : error
      ? 'error'
      : 'primary';
    const iconColor = theme.colors[color];
    return (
      <View
        flexDirection="row"
        height={48}
        alignItems="center"
        borderRadius={theme.borderRadius.m}
        borderWidth={1}
        borderColor={color}
        paddingRight="m">
        {icon !== null && (
          <View padding="s">
            <Icon name={icon} color={iconColor} />
          </View>
        )}
        <View flex={1}>
          <RNTextInput
            underlineColorAndroid="transparent"
            selectionColor={theme.colors.primary}
            placeholderTextColor={iconColor}
            {...{ref}}
            {...props}
          />
        </View>
        {touched && (
          <View
            borderRadius={theme.borderRadius.l}
            justifyContent="center"
            alignItems="center"
            height={18}
            width={18}
            backgroundColor={!error ? 'primary' : 'error'}>
            <Icon name={!error ? 'check' : 'x'} color="white" size={10} />
          </View>
        )}
      </View>
    );
  },
);
