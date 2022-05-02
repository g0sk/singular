import React from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import {View, Text, Button} from 'components';
import {translate} from 'core';
import NfcManager from 'react-native-nfc-manager';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'ui/theme';

type Props = {
  retry: () => void;
};

export const NfcNotEnabled: React.FC<Props> = ({retry}) => {
  const {colors} = useTheme();

  return (
    <View>
      <View margin="m" marginTop="xxl">
        <Text variant="scanWarningHeader">
          {translate('error.scan.nfcNotEnabled')}
        </Text>
      </View>
      <View
        height={295}
        marginHorizontal="m"
        marginTop="l"
        marginBottom="m"
        alignItems="center">
        <View alignItems="center" justifyContent="center">
          <TouchableOpacity onPress={() => NfcManager.goToNfcSetting()}>
            <View
              flexDirection="row"
              margin="xl"
              justifyContent="center"
              alignItems="center">
              <View marginRight="m">
                <Icon
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
            marginTop="s"
            marginBottom="s"
            marginHorizontal="xl"
            alignItems="center"
            justifyContent="center"
            flexDirection="row">
            <View marginRight="m">
              <Icon name="settings-outline" size={20} color={colors.gray} />
            </View>
            <Text variant="scanWarningDescription">
              {translate('error.scan.appSettings')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View marginTop="xxl" marginHorizontal="xxl">
        <Button
          label={translate('button.scan.retry')}
          variant="primary"
          onPress={() => retry()}
        />
      </View>
    </View>
  );
};
