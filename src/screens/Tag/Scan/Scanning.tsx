import React from 'react';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text} from 'components';
import {useTheme} from 'ui/theme';
import {translate} from 'core';

export const Scanning: React.FC = () => {
  const theme = useTheme();
  return (
    <View>
      <View margin="m">
        <View margin="m">
          <Text variant="scanHeader">{translate('action.scan.scan')}</Text>
        </View>
        <View
          height={215}
          alignItems="center"
          margin="m"
          justifyContent="center">
          <ActivityIndicator size="large" color="purple" />
        </View>
        <View flexDirection="row" marginVertical="s" marginHorizontal="xl">
          <View marginRight="ss">
            <Icon
              name="information-circle-outline"
              size={30}
              color={theme.colors.primary}
            />
          </View>
          <Text variant="tip">{translate('screen.scan.tip')}</Text>
        </View>
      </View>
    </View>
  );
};
