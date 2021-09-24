import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {RectButton} from 'react-native-gesture-handler';
import {View, Text} from 'components';
import {useTheme} from 'ui/theme';

interface CheckBoxProps {
  label?: string;
  checked: boolean;
  onChange: () => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  checked,
  onChange,
}) => {
  const theme = useTheme();
  return (
    <RectButton onPress={() => onChange()}>
      <View flexDirection="row" alignItems="center" height={30} width={100}>
        <View
          height={20}
          width={20}
          marginRight="m"
          borderRadius={theme.borderRadius.s}
          justifyContent="center"
          alignItems="center"
          borderWidth={1}
          borderColor="primary"
          backgroundColor={checked ? 'primary' : 'white'}>
          <Icon name="check" color="white" />
        </View>
        <Text variant="checkBox">{label}</Text>
      </View>
    </RectButton>
  );
};
