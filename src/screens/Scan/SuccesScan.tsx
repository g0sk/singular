import React from 'react';
import {Text, View} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/Theme';
import {ScanSuccessProps} from 'types';
import Icon from 'react-native-vector-icons/Ionicons';

const SuccessScan: React.FC<ScanSuccessProps> = ({tag}) => {
  const {colors} = useTheme();
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
          {translate('active.data.id') + ' ' + tag.id}
        </Text>
      </View>
      <View marginVertical="ss" marginHorizontal="l" alignItems="center">
        <Text variant="scanDescription">
          {translate('screen.scan.successDescription')}
        </Text>
      </View>
    </View>
  );
};

export default SuccessScan;
