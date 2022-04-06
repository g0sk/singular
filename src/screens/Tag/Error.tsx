import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, View} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import IconI from 'react-native-vector-icons/Ionicons';
import nfcManager from 'react-native-nfc-manager';
import {ScanErrorProps} from 'types';

export const Error: React.FC<ScanErrorProps> = ({error}) => {
  const {colors} = useTheme();
  return (
    <View margin="m">
      {error === 'read' && (
        <View>
          <View margin="m">
            <Text variant="scanWarningHeader">
              {translate('error.scan.scan')}
            </Text>
          </View>
          <View
            height={175}
            alignItems="center"
            margin="m"
            justifyContent="center">
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
          </View>
        </View>
      )}
      {error === 'write' && (
        <View>
          <View margin="m">
            <Text variant="scanWarningHeader">
              {translate('error.scan.write')}
            </Text>
          </View>
          <View
            height={175}
            alignItems="center"
            margin="m"
            justifyContent="center">
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
          </View>
        </View>
      )}
    </View>
  );
};
