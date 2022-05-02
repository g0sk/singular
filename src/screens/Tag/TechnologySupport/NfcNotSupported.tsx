import React from 'react';
import {View, Text} from 'components';
import {translate} from 'core';
import IconI from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';
import {useTheme} from 'ui/theme';

export const NfcNotSupported: React.FC = () => {
  const {colors} = useTheme();
  return (
    <View margin="m">
      <View margin="m">
        <View flexDirection="row">
          <View marginRight="m">
            <IconI name="alert-circle-outline" size={40} color={colors.error} />
          </View>
          <Text variant={'scanErrorHeader'}>
            {translate('error.scan.nfcNotSupported')}
          </Text>
        </View>
        <View
          height={175}
          alignItems="center"
          margin="m"
          justifyContent="center">
          <View height={175} alignItems="center" margin="m">
            <IconI name="radio-outline" color={colors.dark} size={100} />
            <IconF name="smartphone" color={colors.dark} size={70} />
          </View>
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
    </View>
  );
};
