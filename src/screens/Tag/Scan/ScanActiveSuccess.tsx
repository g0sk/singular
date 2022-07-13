import React from 'react';
import {Button, Text, View} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootDocumentParamList, ScanActiveSuccessScreenProps} from 'types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const ScanActiveSuccess: React.FC<ScanActiveSuccessScreenProps> = ({
  route,
}) => {
  const {colors} = useTheme();
  const globalNavigation = useNavigation<
    NativeStackNavigationProp<RootDocumentParamList>
  >();

  const goToDetails = () => {
    if (route.params.active !== null) {
      globalNavigation.popToTop();
      globalNavigation.navigate('ActiveDetails', {
        title: route.params.active.reference,
        activeId: route.params.active.id,
        recordId: route.params.active.activeRecord.id,
      });
    }
  };

  return (
    <View>
      <View marginTop="l" marginHorizontal="m" height={576}>
        <View>
          <Text variant="scanSuccessHeader">
            {translate('success.scan.activeFound')}
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
            {translate('active.data.ref') + ' ' + route.params.active.reference}
          </Text>
        </View>
        <View
          marginHorizontal="m"
          marginTop="xl"
          marginBottom="m"
          alignItems="center">
          <Text variant="scanDescription">
            {translate('screen.scan.successActiveDescription')}
          </Text>
        </View>
      </View>
      <View marginTop="m" marginHorizontal="xxl">
        <Button
          label={translate('button.scan.goToDetails')}
          variant="primary"
          onPress={goToDetails}
        />
      </View>
    </View>
  );
};
