import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text} from 'components';
import Icon from 'react-native-vector-icons/Feather';
import {HeaderProps} from 'types';
//import {useNavigation} from '@react-navigation/native';

export const Header: React.FC<HeaderProps> = ({
  disabled,
  label,
  labelAction = () => null,
  defaultIcon,
  defaultAction = () => null,
  hasExtraIcon = false,
  extraIcon,
}) => {
  //const {navigate} = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.userInfo}
        onPress={labelAction}
        disabled={disabled}>
        <Text variant="headerTitle">{label}</Text>
      </TouchableOpacity>
      <View style={!hasExtraIcon ? styles.icon : styles.icons}>
        {hasExtraIcon && extraIcon && (
          <View style={styles.extraIcon}>
            <TouchableOpacity onPress={() => null}>
              <Icon name={extraIcon} size={25} />
            </TouchableOpacity>
          </View>
        )}
        {defaultIcon && (
          <View style={styles.defaultIcon}>
            <TouchableOpacity onPress={() => defaultAction()}>
              <Icon name={defaultIcon} size={25} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 200,
    width: 250,
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
