import React from 'react';
import {Button, Text, View} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScanActiveSuccessStackProps} from 'types';
import {useNavigation} from '@react-navigation/native';

export const ScanActiveSuccess: React.FC<ScanActiveSuccessStackProps> = ({
  route,
}) => {
  const {colors} = useTheme();
  const globalNavigation = useNavigation();

  const goToDetails = () => {
    if (route.params.active !== null) {
      globalNavigation.navigate('ActiveDetails', {
        title: route.params.active.reference,
        active: route.params.active,
        recordId: route.params.active.activeRecord.id,
      });
    }
    route.params.resetState();
  };

  return (
    <View margin="m">
      <View margin="m">
        <Text variant="scanSuccessHeader">
          {translate('success.scan.activeFound')}
        </Text>
      </View>
      <View height={175} alignItems="center" margin="m">
        <View marginBottom="m">
          <Icon
            name="checkmark-circle-outline"
            color={colors.primary}
            size={100}
          />
        </View>
        <Text variant="scanSuccessId">
          {translate('active.data.ref') + ' ' + route.params.active.reference}
        </Text>
      </View>
      <View marginVertical="ss" marginHorizontal="l" alignItems="center">
        <Text variant="scanDescription">
          {translate('screen.scan.successActiveDescription')}
        </Text>
      </View>
      <View marginVertical="l" marginHorizontal="xxl">
        <Button
          label={translate('button.scan.goToDetails')}
          variant="primary"
          onPress={goToDetails}
        />
      </View>
    </View>
  );
};
