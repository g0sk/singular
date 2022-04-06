import React from 'react';
import {Button, Text, View} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {WriteSuccessStackProps} from 'types';

export const WriteSuccess: React.FC<WriteSuccessStackProps> = ({
  navigation,
}) => {
  const {colors} = useTheme();

  const goBackTagHome = () => {
    navigation.pop();
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
          {translate('active.data.ref') + ' '}
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
          onPress={goBackTagHome}
        />
      </View>
    </View>
  );
};
