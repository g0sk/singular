import React from 'react';
import {API_URL} from '@env';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useAuth} from 'core/auth';

export interface AvatarProps {
  hasBorder?: boolean;
  placeholderImg?: Image;
  uri?: string | undefined;
  isContentUrl?: boolean;
  height?: number;
  width?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  isContentUrl,
  hasBorder,
  height,
  width,
}) => {
  const mediaUrl = isContentUrl ? API_URL + uri : uri;
  const {signOut} = useAuth();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => signOut()}>
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
    borderRadius: 30,
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
