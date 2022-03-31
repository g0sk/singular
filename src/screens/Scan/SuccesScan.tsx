import React, {useEffect, useState} from 'react';
import {Text, View} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import {ScanSuccessProps} from 'types';
import Icon from 'react-native-vector-icons/Ionicons';

const SuccessScan: React.FC<ScanSuccessProps> = ({tag}) => {
  const {colors} = useTheme();
  const [title, setTitle] = useState<string>('');
  useEffect(() => {
    if (tag) {
      if (tag.activeInfo?.id) {
        setTitle(tag.activeInfo.id);
      } else {
        if (tag.tag && tag.tag.id) {
          setTitle(tag.tag.id.toString());
        }
      }
    }
  }, [tag]);
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
          {translate('active.data.id') + ' ' + title}
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
