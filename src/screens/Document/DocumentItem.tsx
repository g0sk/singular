import React from 'react';
import {Text, View} from 'components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useTheme} from 'ui/Theme';
import {DocumentItemProps} from 'types';
import IonIcon from 'react-native-vector-icons/Ionicons';

export const DocumentItem: React.FC<DocumentItemProps> = ({
  navigation,
  item,
}: DocumentItemProps) => {
  const theme = useTheme();
  const entryDate = new Date(item.entryDate);
  const itemEntryDate =
    entryDate.getDate() +
    '/' +
    entryDate.getMonth() +
    '/' +
    entryDate.getFullYear();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      //marginHorizontal: 5,
      marginBottom: 10,
    },
    itemContainer: {
      height: 45,
      width: 300,
      marginBottom: 8,
      borderColor: theme.colors.primary,
      borderWidth: 2,
      borderRadius: 13,
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      borderRadius: 8,
      borderWidth: 2,
      borderColor: theme.colors.secondary,
    },
    infoContainer: {
      flexDirection: 'row',
      paddingHorizontal: 10,
    },
    infoReference: {
      width: 100,
    },
    info: {
      paddingRight: 20,
      justifyContent: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.push('Document', {
            activeId: item.id,
            title: item.reference,
          })
        }>
        <View style={styles.infoContainer}>
          <View style={styles.infoReference}>
            <Text variant="listItemPrimary">{item.reference}</Text>
          </View>
          <View style={styles.info}>
            <Text variant="listItemData">{item.type}</Text>
          </View>
          <View style={styles.info}>
            <Text variant="listItemData">{item.measurementData}</Text>
          </View>
          <View style={styles.info}>
            <Text variant="listItemData">{itemEntryDate}</Text>
          </View>
          {item.file !== null && (
            <View style={styles.info}>
              <IonIcon name="images" size={20} />
            </View>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => null} style={styles.icon}>
        <FeatherIcon name="bar-chart-2" size={32} />
      </TouchableOpacity>
    </View>
  );
};
