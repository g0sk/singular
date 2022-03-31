import React from 'react';
import {View, Text} from 'components';
import {translate} from 'core';
//import {ActivityIndicator} from 'react-native';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const Writing: React.FC = () => {
  const theme = useTheme();

  return (
    <View margin="m">
      <View margin="m">
        <Text variant="scanHeader">
          {translate('screen.scan.write.header')}
        </Text>
      </View>
      <View height={175} alignItems="center" margin="m">
        <Icon name="push-outline" color={theme.colors.primary} size={100} />
      </View>
      <View marginVertical="s" marginHorizontal="l" alignItems="center">
        <Text variant="scanDescription">
          {translate('screen.scan.write.description')}
        </Text>
      </View>
    </View>
  );
};

export default Writing;
