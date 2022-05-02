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
  const goBackTagHome = () => {
    navigation.navigate('TagHome', {});
  };

  return (
    <View margin="m">
      <View margin="m">
        <Text variant="scanSuccessHeader">{translate('success.write')}</Text>
      </View>
      <View height={175} alignItems="center" margin="m">
        <View marginBottom="m">
          <Icon
            name="checkmark-circle-outline"
            color={colors.primary}
            size={100}
          />
        </View>
        <View flexDirection="column" marginTop="l">
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
      <View marginTop="xxl" marginHorizontal="l" alignItems="center">
        <Text variant="scanDescription">
          {translate('screen.scan.write.successDescription')}
        </Text>
      </View>
      <View marginVertical="dxxl" marginHorizontal="xxl">
        <Button
          label={translate('button.scan.goBack')}
          variant="primary"
          onPress={goBackTagHome}
        />
      </View>
    </View>
  );
};
