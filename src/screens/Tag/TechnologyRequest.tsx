import React from 'react';
import {View, Text, Button} from 'components';
import {TouchableOpacity, Linking} from 'react-native';
import {translate} from 'core';
import NfcManager from 'react-native-nfc-manager';
import IconI from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';
import {useTheme} from 'ui/theme';

interface Reset {
  retry: () => void;
  loading: boolean;
}

export const NfcNotEnabled = ({retry, loading}: Reset) => {
  const {colors} = useTheme();
  return (
    <View marginBottom="m">
      <View margin="m">
        <View margin="m">
          <Text variant="scanWarningHeader">
            {translate('error.scan.nfcNotEnabled')}
          </Text>
        </View>
        <View
          height={175}
          alignItems="center"
          margin="m"
          justifyContent="center">
          <TouchableOpacity onPress={() => NfcManager.goToNfcSetting()}>
            <View
              flexDirection="row"
              margin="xl"
              justifyContent="center"
              alignItems="center">
              <View marginRight="m">
                <IconI
                  name="warning-outline"
                  color={colors.secondary}
                  size={30}
                />
              </View>
              <Text variant="scanWarningDescription">
                {translate('error.scan.enableNfc')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => Linking.openSettings()}>
          <View
            marginVertical="s"
            marginHorizontal="xl"
            alignItems="center"
            justifyContent="center"
            flexDirection="row">
            <View marginRight="m">
              <IconI name="settings-outline" size={20} color={colors.gray} />
            </View>
            <Text variant="scanWarningDescription">
              {translate('error.scan.appSettings')}
            </Text>
          </View>
        </TouchableOpacity>
        <View marginVertical="dxxl" marginHorizontal="xxl">
          <Button
            label={translate('button.scan.retry')}
            variant="primary"
            onPress={() => retry()}
            loading={loading}
            disabled={loading}
          />
        </View>
      </View>
    </View>
  );
};

export const NfcNotSupported = () => {
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
