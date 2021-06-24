import React from 'react';
import {Text, View} from 'components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {DocumentItemProps} from 'types';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from 'ui/Theme';

export const DocumentItem: React.FC<DocumentItemProps> = ({item}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginHorizontal: 5,
      marginBottom: 10,
    },
    itemContainer: {
      height: 45,
      width: 300,
      borderColor: theme.colors.secondary,
      borderWidth: 2,
      borderRadius: 13,
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      borderRadius: 8,
      borderWidth: 2,
      borderColor: theme.colors.default,
    },
    infoContainer: {
      flexDirection: 'row',
      paddingHorizontal: 10,
    },
    info: {
      paddingRight: 10,
      justifyContent: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.itemContainer} onPress={() => null}>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text variant="listItemPrimary">{item.reference}</Text>
          </View>
          <View style={styles.info}>
            <Text variant="listItemData">{item.type}</Text>
          </View>
          <View style={styles.info}>
            <Text variant="listItemData">{item.measurementData}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => null} style={styles.icon}>
        <Icon name="bar-chart-2" size={32} />
      </TouchableOpacity>
    </View>
  );
};
