import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  VariantProps,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';
import {Text} from 'components/Text';
import {View} from 'components/View';
import {Theme} from 'ui/Theme';

type ButtonProps = SpacingProps<Theme> &
  VariantProps<Theme, 'buttonVariants'> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress: () => void;
    label?: string;
    outline?: boolean;
    loading?: boolean;
  };

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
          <ActivityIndicator size="small" />
        ) : (
          <Text variant={textVariant as Partial<keyof Theme['textVariants']>}>
            {label}
          </Text>
        )}
      </ButtonContainer>
    </TouchableOpacity>
  );
};