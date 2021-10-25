import React, {useEffect, useState} from 'react';
import {View, Text} from 'components';
import {FlatList, ListRenderItem, Pressable, StyleSheet} from 'react-native';
import {translate} from 'core';
import {RecordState, RecordModalProps, RecordActive} from 'types';
import {useAppSelector} from 'store/configureStore';
import {useTheme} from 'ui/theme';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';

export const RecordModal: React.FC<RecordModalProps> = ({activeRecord}) => {
  const [activeObject, setActiveObject] = useState<RecordActive[]>([]);
  const {loading}: RecordState = useAppSelector((state) => state.record);
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    if (activeRecord !== null) {
      console.log('0 elementos, ', activeRecord.activeObject.length);
      setActiveObject([...activeRecord.activeObject]);
    }
  }, [activeRecord]);

  const _handleItemPress = (item: RecordActive) => {
    if (item) {
      navigation.navigate('RecordDetails', {
        active: {...item},
        title: item.reference,
      });
    }
  };

  const EmptyComponent = () => {
    return (
      <View style={styles.empty} margin="m">
        <Text>{translate('record.empty')}</Text>
      </View>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View margin="m">
        <Text variant="formLabel">{translate('record.title')}</Text>
      </View>
    );
  };

  //Create new entry on nav stack for active inside actives.
  const renderListItem: ListRenderItem<RecordActive> = ({item}) => {
    return (
      <View margin="m" justifyContent="flex-start" marginVertical="s">
        <Pressable
          onPress={() => _handleItemPress(item)}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? theme.colors.primary : 'white',
              opacity: pressed ? 0.4 : 1,
              borderRadius: pressed ? 10 : 0,
            },
          ]}>
          <View
            height={50}
            flexDirection="row"
            alignItems="center"
            paddingRight="m"
            justifyContent="space-between"
            borderRadius={10}
            borderBottomWidth={1}
            borderBottomColor="primary">
            <View>
              <View flexDirection="row">
                <View marginRight="s">
                  <Icon name="calendar" size={20} color={theme.colors.dark} />
                </View>
                <View>
                  <Text>{dayjs(item.entryDate).format('DD/MM/YYYY')}</Text>
                </View>
              </View>
            </View>
            <View flexDirection="row">
              <View marginRight="s">
                <Icon
                  name="document-text"
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <View>
                <Text>{item.reference}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View
      margin="m"
      maxHeight={350}
      paddingHorizontal="m"
      paddingBottom="l"
      backgroundColor="white"
      borderRadius={15}>
      <ListHeaderComponent />
      <FlatList
        data={activeObject}
        renderItem={renderListItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyComponent />}
        refreshing={loading}
        initialNumToRender={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    height: 200,
    textAlign: 'center',
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
