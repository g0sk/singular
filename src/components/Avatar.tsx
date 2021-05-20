import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';

interface AvatarProps {
  hasBorder?: boolean;
  placeholderImg?: Image;
  uri: string | undefined;
  height?: number;
  width?: number;
  containerHeight?: number;
  containerWidth?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  hasBorder,
  height,
  width,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => null}>
        <Image
          style={hasBorder ? styles.avatarWithBorder : styles.avatarNoBorder}
          height={height}
          width={width}
          source={{uri}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: 90,
    padding: 10,
    //margin: 20,
  },
  avatarWithBorder: {
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#1f155e',
  },
  avatarNoBorder: {
    borderRadius: 70,
    borderWidth: 3,
  },
});
