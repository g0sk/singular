import React from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import {Text, View} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import IconI from 'react-native-vector-icons/Ionicons';
import nfcManager from 'react-native-nfc-manager';
import {ScanErrorProps} from 'types';

export const ErrorScan: React.FC<ScanErrorProps> = ({supported, enabled}) => {
  const {colors} = useTheme();
  return (
    <View margin="m">
      <View margin="m">
        {!enabled && supported && (
          <Text variant="scanWarningHeader">
            {translate('error.scan.nfcNotEnabled')}
          </Text>
        )}
      </View>
      <View height={175} alignItems="center" margin="m" justifyContent="center">
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
    </View>
  );
};
