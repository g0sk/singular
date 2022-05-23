import React from 'react';
import {View, Text, Button} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {WriteHomeScreenProps} from 'types';

export const WriteHome: React.FC<WriteHomeScreenProps> = ({navigation}) => {
  const theme = useTheme();

  const goToForm = async () => {
    navigation.navigate('WriteForm', {
      title: translate('screen.scan.title'),
    });
  };

  return (
    <View margin="m">
      <View marginTop="xl" marginHorizontal="m" height={507}>
        <View>
          <Text variant="scanHeader">
            {translate('screen.scan.write.header')}
          </Text>
        </View>
        <View
          alignItems="center"
          padding="l"
          marginTop="xl"
          marginBottom="l"
          height={200}>
          <Icon name="push-outline" color={theme.colors.primary} size={140} />
        </View>
        <View
          marginHorizontal="m"
          marginTop="xxl"
          marginBottom="m"
          alignItems="center">
          <Text variant="scanDescription" marginHorizontal="m">
            {translate('screen.scan.write.description')}
          </Text>
        </View>
      </View>
      <View marginTop="xl" marginHorizontal="xxl">
        <Button
          label={translate('button.scan.write')}
          variant="primary"
          onPress={goToForm}
        />
      </View>
    </View>
  );
};
