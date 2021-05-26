import React, {useState} from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {View} from './View';
import {theme} from 'ui/Theme';

interface TextInputProps extends RNTextInputProps {
  placeholder: string;
  icon: string;
  validator: (input: string) => boolean;
}

type InputState = true | false | null;
export const TextInput: React.FC<TextInputProps> = ({
  icon,
  validator,
  ...props
}) => {
  const [valid, setValid] = useState<InputState>(null);
  const [input, setInput] = useState<string>('');

  const validate = () => {
    const isValid = validator(input);
    setValid(isValid);
  };
  const color: keyof typeof theme.colors =
    valid === null ? 'default' : valid === true ? 'primary' : 'error';

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
      <View padding="s">
        <Icon name={icon} color={iconColor} />
      </View>
      <View flex={1}>
        <RNTextInput
          underlineColorAndroid="transparent"
          selectionColor={theme.colors.primary}
          onBlur={validate}
          onChangeText={(value) => setInput(value)}
          placeholderTextColor={iconColor}
          {...props}
        />
      </View>
      {(valid === true || valid === false) && (
        <View
          borderRadius={theme.borderRadius.l}
          justifyContent="center"
          alignItems="center"
          height={18}
          width={18}
          backgroundColor={valid === true ? 'primary' : 'error'}>
          <Icon name={valid ? 'check' : 'x'} color="white" size={10} />
        </View>
      )}
    </View>
  );
};
