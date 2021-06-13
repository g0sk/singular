import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, View, Text} from 'components';
import Icon from 'react-native-vector-icons/Feather';

interface HeaderProps {
  contentUrl?: string;
  uri?: string;
  label?: string;
  iconName: string;
}

export const Header: React.FC<HeaderProps> = ({
  contentUrl,
  label = undefined,
  iconName,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Avatar
            isContentUrl={true}
            uri={contentUrl}
            hasBorder={true}
            height={45}
            width={45}
          />
        </View>
        <View style={styles.label}>
          <Text>{label}</Text>
        </View>
      </View>
      <View style={styles.notification}>
        <TouchableOpacity onPress={() => null}>
          <Icon name={iconName} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 0,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    minWidth: 275,
  },
  avatar: {
    paddingRight: 7,
  },
  label: {
    paddingTop: 10,
  },
  notification: {
    width: 80,
    //marginLeft: 170,
  },
});
