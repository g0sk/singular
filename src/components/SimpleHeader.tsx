import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text} from './';
import {SimpleHeaderProps} from 'types';

export const SimpleHeader: React.FC<SimpleHeaderProps> = ({
  label,
  labelAction = () => null,
}) => {
  return (
    <View>
      <View flexDirection="row" justifyContent="space-between" height={45}>
        <View>
          <TouchableOpacity onPress={() => labelAction()}>
            <Text variant="headerTitle">{label}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
