import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text} from 'components';
import Icon from 'react-native-vector-icons/Feather';
import {HeaderProps} from 'types';

export const Header: React.FC<HeaderProps> = ({
  disabled,
  label,
  labelAction = () => null,
  defaultIcon,
  defaultAction = () => null,
  hasExtraIcon = false,
  extraIcon,
}) => {
  return (
    <View flexDirection="row" justifyContent="space-between">
      <View>
        <TouchableOpacity onPress={labelAction} disabled={disabled}>
          <Text variant="headerTitle">{label}</Text>
        </TouchableOpacity>
      </View>
      <View flexDirection="row" alignItems="center">
        {hasExtraIcon && extraIcon && (
          <View marginRight="l">
            <TouchableOpacity onPress={() => null}>
              <Icon name={extraIcon} size={25} />
            </TouchableOpacity>
          </View>
        )}
        {defaultIcon && (
          <View>
            <TouchableOpacity onPress={() => defaultAction()}>
              <Icon name={defaultIcon} size={25} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
