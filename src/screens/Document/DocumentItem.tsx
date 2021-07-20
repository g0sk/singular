import React from 'react';
import {Text, View} from 'components';
import {TouchableOpacity} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
//import {useTheme} from 'ui/Theme';
import {DocumentItemProps} from 'types';
import IonIcon from 'react-native-vector-icons/Ionicons';

export const DocumentItem: React.FC<DocumentItemProps> = ({
  navigation,
  item,
}: DocumentItemProps) => {
  //const theme = useTheme();
  const entryDate = new Date(item.entryDate);
  const itemEntryDate =
    entryDate.getDate() +
    '/' +
    entryDate.getMonth() +
    '/' +
    entryDate.getFullYear();
  return (
    <View
      marginHorizontal="s"
      flexDirection="row"
      marginBottom="l"
      alignItems="center">
      <TouchableOpacity
        onPress={() =>
          navigation.push('Document', {
            activeId: item.id,
            title: item.reference,
          })
        }>
        <View
          borderColor="primary"
          borderWidth={3}
          borderRadius={13}
          marginRight="m"
          width={310}
          flexDirection="row"
          paddingHorizontal="m"
          height={47}
          justifyContent="space-between">
          <View alignContent="center" justifyContent="center">
            <Text variant="listItemPrimary">{item.reference}</Text>
          </View>
          <View justifyContent="center">
            <Text variant="listItemData">{item.type}</Text>
          </View>
          <View justifyContent="center">
            <Text variant="listItemData">{item.measurementData}</Text>
          </View>
          <View justifyContent="center">
            <Text variant="listItemData">{itemEntryDate}</Text>
          </View>
          {item.file !== null && (
            <View>
              <IonIcon name="images" size={20} />
            </View>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => null}>
        <View borderRadius={8} borderWidth={2} borderColor="dark">
          <FeatherIcon name="bar-chart-2" size={28} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
