import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Text, View} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/Theme';
import IconF from 'react-native-vector-icons/Feather';
import IconI from 'react-native-vector-icons/Ionicons';
import {ScanProps} from 'types';

const Scanning: React.FC<ScanProps> = ({reading}) => {
  const theme = useTheme();
  return (
    <View>
      {!reading ? (
        <View margin="m">
          <View margin="m">
            <Text variant="scanHeader">{translate('screen.scan.header')}</Text>
          </View>
          <View height={175} alignItems="center" margin="m">
            <IconI
              name="radio-outline"
              color={theme.colors.primary}
              size={100}
            />
            <IconF name="smartphone" color={theme.colors.primary} size={60} />
          </View>
          <View marginVertical="s" marginHorizontal="l" alignItems="center">
            <Text variant="scanDescription">
              {translate('screen.scan.description')}
            </Text>
          </View>
        </View>
      ) : (
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
              <IconI
                name="information-circle-outline"
                size={30}
                color={theme.colors.primary}
              />
            </View>
            <Text variant="tip">{translate('screen.scan.tip')}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Scanning;
