import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, View, Text} from 'components';
import Icon from 'react-native-vector-icons/Feather';
import {HeaderProps} from 'types';

export const Header: React.FC<HeaderProps> = ({
  contentUrl,
  label = undefined,
  defaultIcon,
  defaultAction,
  hasExtraIcon = false,
  extraIcon,
  navigationTab,
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
            navigationTab={navigationTab}
          />
        </View>
        <View style={styles.label}>
          <Text variant="headerUsername">{label}</Text>
        </View>
      </View>
      <View style={!hasExtraIcon ? styles.icon : styles.icons}>
        {hasExtraIcon && extraIcon && (
          <View style={styles.extraIcon}>
            <TouchableOpacity onPress={() => null}>
              <Icon name={extraIcon} size={25} />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.defaultIcon}>
          <TouchableOpacity onPress={() => defaultAction()}>
            <Icon name={defaultIcon} size={25} />
          </TouchableOpacity>
        </View>
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
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 200,
    width: 250,
  },
  avatar: {
    paddingRight: 7,
  },
  label: {
    paddingTop: 5,
  },
  icon: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: 100,
    justifyContent: 'center',
  },
  icons: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  defaultIcon: {
    alignItems: 'center',
  },
  extraIcon: {
    alignItems: 'center',
  },
});
