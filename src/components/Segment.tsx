import React from 'react';
import {Text, View} from 'components';
import {TouchableOpacity} from 'react-native';
import {SegmentProps} from 'types';

export const Segment = <T extends unknown>({
  labels,
  segmentHandler,
  mode,
}: SegmentProps<T>) => {
  return (
    <View flexDirection="row">
      {labels.map((item, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => segmentHandler(item.id)}>
            <View
              marginHorizontal="m"
              padding="s"
              justifyContent="center"
              alignItems="center"
              borderRadius={25}
              minWidth={60}
              minHeight={40}
              backgroundColor={mode === item.id ? 'dark' : 'lightBackground'}
              borderWidth={0}>
              <Text
                variant={
                  mode === item.id ? 'segmentLabelLight' : 'segmentLabelDark'
                }>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
