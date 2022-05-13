import React from 'react';
import {Button, Text, View} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootDocumentParamList, ScanTagSuccessScreenProps} from 'types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const ScanTagSuccess: React.FC<ScanTagSuccessScreenProps> = ({
  route,
}) => {
  const {colors} = useTheme();
  const globalNavigation = useNavigation<
    NativeStackNavigationProp<RootDocumentParamList>
  >();

  const goToDetails = () => {
    if (route.params.tag !== null) {
      globalNavigation.popToTop();
      globalNavigation.navigate('NewTag', {
        title: route.params.tag.activeInfo.reference,
        tag: route.params.tag.activeInfo,
      });
    }
  };

  return (
    <View margin="m">
      <View margin="m">
        <Text variant="scanSuccessHeader">
          {translate('success.scan.tagFound')}
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
          {translate('active.data.ref') +
            ' ' +
            route.params.tag?.activeInfo.reference}
        </Text>
      </View>
      <View
        marginTop="m"
        marginBottom="xxl"
        marginHorizontal="l"
        alignItems="center">
        <Text variant="scanDescription">
          {translate('screen.scan.successTagDescription')}
        </Text>
      </View>
      <View marginVertical="dxxl" marginHorizontal="xxl">
        <Button
          label={translate('button.scan.goToDetails')}
          variant="primary"
          onPress={goToDetails}
        />
      </View>
    </View>
  );
};
