import React from 'react';
import {Text, View} from 'components';
import {ScanSuccessProps} from 'types';

export const ScanSuccess: React.FC<ScanSuccessProps> = () => {
  return (
    <View>
      <Text variant="headerTitle">Success</Text>
    </View>
  );
};
