import React from 'react';
import {Button, Text, View} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {WriteSuccessScreenProps} from 'types';

export const WriteSuccess: React.FC<WriteSuccessScreenProps> = ({
  navigation,
  route,
}) => {
  const {colors} = useTheme();

  //Añadir #scan no write
  const goBackWriteHome = () => {
    navigation.navigate('WriteHome', {});
  };

  return (
    <View margin="m">
      <View marginTop="xl" marginHorizontal="m" height={507}>
        <View>
          <Text variant="scanSuccessHeader">{translate('success.write')}</Text>
        </View>
        <View alignItems="center" marginTop="xl" marginBottom="l" height={200}>
          <View marginBottom="m">
            <Icon
              name="checkmark-circle-outline"
              color={colors.primary}
              size={100}
            />
          </View>
          <View flexDirection="column" marginTop="m" marginBottom="s">
            <View flexDirection="row">
              <View marginBottom="s" marginRight="m">
                <Text variant="scanSuccessId">
                  {translate('active.data.ref') + ':' + ' '}
                </Text>
              </View>
              <View marginBottom="s">
                <Text variant="scanSuccessData">{route.params.reference}</Text>
              </View>
            </View>
            <View flexDirection="row">
              <View marginBottom="s" marginRight="m">
                <Text variant="scanSuccessId">
                  {translate('active.data.type') + ':' + ' '}
                </Text>
              </View>
              <View>
                <Text variant="scanSuccessData">{route.params.type}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          marginHorizontal="xl"
          marginTop="xl"
          marginBottom="m"
          alignItems="center">
          <Text variant="scanDescription">
            {translate('screen.scan.write.successDescription')}
          </Text>
        </View>
      </View>
      <View marginVertical="xl" marginHorizontal="xxl">
        <Button
          label={translate('button.scan.goBack')}
          variant="primary"
          onPress={goBackWriteHome}
        />
      </View>
    </View>
  );
};
