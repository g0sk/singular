import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  VariantProps,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';
import {ButtonProps} from 'types';
import {Text} from 'components/Text';
import {View} from 'components/View';
import {Theme} from 'ui/Theme';

//Same name as variable in theme object
const buttonVariant = createVariant({themeKey: 'buttonVariants'});
const ButtonContainer = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof View>,
  Theme
>([buttonVariant], View);

const restyleFunctions = [
  buttonVariant as any,
  spacing,
  border,
  backgroundColor,
];

export const Button: React.FC<ButtonProps> = ({
  onPress,
  label,
  loading = false,
  variant = 'primary',
  ...rest
}) => {
  const props = useRestyle(restyleFunctions, {...rest, variant});
  const textVariant = 'button_' + variant;
  return (
    <TouchableOpacity onPress={onPress}>
      <ButtonContainer
        borderRadius={50}
        flexDirection="row"
        padding="s"
        justifyContent="center"
        {...props}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text variant={textVariant as Partial<keyof Theme['textVariants']>}>
            {label}
          </Text>
        )}
      </ButtonContainer>
    </TouchableOpacity>
  );
};
