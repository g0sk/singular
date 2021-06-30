import React from 'react';
import {API_URL} from '@env';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {AvatarProps} from 'types';

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  isContentUrl,
  hasBorder,
  height = 45,
  width = 45,
  longPress,
  press,
}) => {
  const mediaUrl = isContentUrl ? API_URL + uri : uri;
  return (
    <View style={styles.container}>
      <TouchableOpacity onLongPress={() => longPress()} onPress={() => press()}>
        <Image
          style={hasBorder ? styles.avatarWithBorder : styles.avatarNoBorder}
          height={height}
          width={width}
          source={
            uri ? {uri: mediaUrl} : require('../../assets/images/user.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //padding: 5,
  },
  avatarWithBorder: {
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#593ac1',
  },
  avatarNoBorder: {
    borderRadius: 70,
    //borderWidth: 3,
  },
  iconBorder: {
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#593ac1',
  },
  iconNoBorder: {
    borderRadius: 70,
  },
});
