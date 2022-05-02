import React from 'react';
import {View, Text} from 'components';
import {translate} from 'core';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const Writting = () => {
  const theme = useTheme();
  return (
    <View height={538}>
      <View marginHorizontal="m">
        <View margin="m">
          <Text variant="scanHeader">{translate('action.scan.write')}</Text>
        </View>
        <View
          height={175}
          alignItems="center"
          marginVertical="m"
          justifyContent="center">
          <ActivityIndicator size="large" color="purple" />
        </View>
        <View
          flexDirection="row"
          marginVertical="l"
          marginHorizontal="l"
          alignItems="center"
          height={112}>
          <View marginRight="ss">
            <Icon
              name="information-circle-outline"
              size={30}
              color={theme.colors.primary}
            />
          </View>
          <View>
            <Text variant="tip">{translate('screen.scan.tip')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Writting;
