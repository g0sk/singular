import React from 'react';
import {View, Text, Button} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {WriteHomeScreenProps} from 'types';
import {isEnabled} from 'utils/nfc_scanner';

export const WriteHome: React.FC<WriteHomeScreenProps> = ({
  navigation,
  setEnabled,
}) => {
  const theme = useTheme();

  const goToForm = async () => {
    if (await isEnabled()) {
      navigation.navigate('Write', {});
    } else {
      setEnabled(false);
    }
  };

  return (
    <View>
      <View marginHorizontal="m">
        <View margin="m">
          <Text variant="scanHeader">
            {translate('screen.scan.write.header')}
          </Text>
        </View>
        <View height={175} alignItems="center" marginVertical="m" padding="l">
          <Icon name="push-outline" color={theme.colors.primary} size={120} />
        </View>
        <View
          marginHorizontal="m"
          marginTop="l"
          marginBottom="m"
          alignItems="center"
          height={120}>
          <Text variant="scanDescription">
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
