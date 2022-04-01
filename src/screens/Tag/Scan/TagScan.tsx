import React from 'react';
import {Text, View} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import IconF from 'react-native-vector-icons/Feather';
import IconI from 'react-native-vector-icons/Ionicons';

export const TagScan: React.FC = () => {
  const theme = useTheme();
  return (
    <View margin="m">
      <View margin="m">
        <Text variant="scanHeader">{translate('screen.scan.header')}</Text>
      </View>
      <View height={175} alignItems="center" margin="m">
        <IconI name="radio-outline" color={theme.colors.primary} size={100} />
        <IconF name="smartphone" color={theme.colors.primary} size={60} />
      </View>
      <View marginVertical="s" marginHorizontal="l" alignItems="center">
        <Text variant="scanDescription">
          {translate('screen.scan.description')}
        </Text>
      </View>
    </View>
  );
};
