import React from 'react';
import {Text, View} from 'components';
import {DocumentStackProps} from 'types';

export const Document: React.FC<DocumentStackProps> = ({route}) => {
  return (
    <View>
      <Text>Document form</Text>
      <Text>{route.params?.activeId}</Text>
    </View>
  );
};
