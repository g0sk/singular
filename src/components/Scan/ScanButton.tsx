import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScanIcon} from 'ui/icons';
import {IconProps} from 'ui/icons/icon-constants';

export const ScanButton: React.FC<IconProps> = (props) => {
  return (
    <View style={styles.button}>
      <ScanIcon height={props.height} width={props.width} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 46,
    borderWidth: 3,
    borderColor: '#ffc107',
  },
});
