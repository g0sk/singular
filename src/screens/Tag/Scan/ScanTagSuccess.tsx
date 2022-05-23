import React from 'react';
import {Button, Text, View} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScanTagSuccessScreenProps} from 'types';

export const ScanTagSuccess: React.FC<ScanTagSuccessScreenProps> = ({
  navigation,
  route,
}) => {
  const {colors} = useTheme();

  const goToDetails = () => {
    if (route.params.tag !== null) {
      navigation.navigate('NewTag', {
        title: route.params.tag.activeInfo.reference,
        tag: route.params.tag.activeInfo,
      });
    }
  };

  return (
    <View margin="m">
      <View marginTop="xl" marginHorizontal="m" height={507}>
        <View>
          <Text variant="scanSuccessHeader">
            {translate('success.scan.tagFound')}
          </Text>
        </View>
        <View height={200} alignItems="center" marginTop="xl" marginBottom="m">
          <View marginBottom="m">
            <Icon
              name="checkmark-circle-outline"
              color={colors.primary}
              size={100}
            />
          </View>
          <Text variant="scanSuccessId">
            {translate('active.data.ref') +
              ' ' +
              route.params.tag?.activeInfo.reference}
          </Text>
        </View>
        <View
          marginTop="xl"
          marginBottom="m"
          marginHorizontal="m"
          alignItems="center">
          <Text variant="scanDescription">
            {translate('screen.scan.successTagDescription')}
          </Text>
        </View>
      </View>
      <View marginVertical="xl" marginHorizontal="xxl">
        <Button
          label={translate('button.scan.goToDetails')}
          variant="primary"
          onPress={goToDetails}
        />
      </View>
    </View>
  );
};
