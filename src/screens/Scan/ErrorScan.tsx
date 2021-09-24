import React from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import {Text, View} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import IconI from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';
import nfcManager from 'react-native-nfc-manager';
import {ScanErrorProps} from 'types';

const ErrorScan: React.FC<ScanErrorProps> = ({supported, enabled}) => {
  const {colors} = useTheme();
  return (
    <View margin="m">
      <View margin="m">
        {!supported && (
          <View flexDirection="row">
            <View marginRight="m">
              <IconI
                name="alert-circle-outline"
                size={40}
                color={colors.error}
              />
            </View>
            <Text
              variant={!supported ? 'scanErrorHeader' : 'scanWarningHeader'}>
              {translate(
                !supported
                  ? 'error.scan.nfcNotSupported'
                  : 'error.scan.nfcNotEnabled',
              )}
            </Text>
          </View>
        )}
        {!enabled && supported && (
          <Text variant="scanWarningHeader">
            {translate('error.scan.nfcNotEnabled')}
          </Text>
        )}
      </View>
      <View height={175} alignItems="center" margin="m" justifyContent="center">
        {!supported && (
          <View height={175} alignItems="center" margin="m">
            <IconI name="radio-outline" color={colors.dark} size={80} />
            <IconF name="smartphone" color={colors.dark} size={50} />
          </View>
        )}
        {!enabled && supported && (
          <TouchableOpacity onPress={() => nfcManager.goToNfcSetting()}>
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
        )}
      </View>
      {!enabled && supported && (
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
      )}
      {!supported && (
        <View
          marginVertical="s"
          marginHorizontal="xl"
          alignItems="center"
          justifyContent="center"
          flexDirection="row">
          <Text variant="scanErrorDescription">
            {translate('error.scan.deviceNotCompatible')}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ErrorScan;
