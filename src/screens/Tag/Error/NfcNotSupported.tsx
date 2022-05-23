import React from 'react';
import {View, Text} from 'components';
import {translate} from 'core';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'ui/theme';

export const NfcNotSupported: React.FC = () => {
  const {colors} = useTheme();
  return (
    <View marginHorizontal="l" marginVertical="xxl">
      <View alignItems="center" marginBottom="xxl">
        <Text variant="scanErrorHeader">
          {translate('error.scan.nfcNotSupported')}
        </Text>
      </View>
      <View alignItems="center">
        <Icon name="warning-outline" size={100} color={colors.error} />
      </View>
      <View
        marginTop="xl"
        marginHorizontal="m"
        justifyContent="center"
        flexDirection="row">
        <Text variant="scanErrorDescription">
          {translate('error.scan.deviceNotCompatible')}
        </Text>
      </View>
    </View>
  );
};
