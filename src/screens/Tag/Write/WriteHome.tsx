import React from 'react';
import {View, Text, Button, SimpleHeader} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {WriteHomeScreenProps} from 'types';
import {DrawerActions} from '@react-navigation/native';

export const WriteHome: React.FC<WriteHomeScreenProps> = ({navigation}) => {
  const theme = useTheme();

  const goToForm = async () => {
    navigation.navigate('WriteForm', {
      title: translate('screen.scan.title'),
    });
  };

  return (
    <View>
      <View marginTop="m" marginLeft="m">
        <SimpleHeader
          label={translate('screen.scan.write.header')}
          labelAction={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      </View>
      <View margin="m" height={507}>
        <View alignItems="center" padding="l" marginTop="xl">
          <Icon name="push-outline" color={theme.colors.primary} size={150} />
        </View>
        <View marginHorizontal="m" marginTop="xxl" alignItems="center">
          <Text variant="scanDescription" marginHorizontal="m">
            {translate('screen.scan.write.description')}
          </Text>
        </View>
      </View>
      <View marginTop="m" marginHorizontal="xxl">
        <Button
          label={translate('button.scan.write')}
          variant="primary"
          onPress={goToForm}
        />
      </View>
    </View>
  );
};
