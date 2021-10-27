import React, {useState} from 'react';
import {View, Text, Modal} from 'components';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {translate} from 'core';
import {RecordState, RecordModalProps, RecordActive} from 'types';
import {useAppSelector} from 'store/configureStore';
import {useTheme} from 'ui/theme';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/Ionicons';

export const RecordModal: React.FC<RecordModalProps> = ({
  activeRecord,
  navigation,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const {loading}: RecordState = useAppSelector((state) => state.record);
  const theme = useTheme();
  const lastItem = activeRecord?.dateRecord[activeRecord.dateRecord.length - 1];
  const update = dayjs(lastItem).format('DD/MM/YYYY');

  const onItemPress = (item: RecordActive, index: number) => {
    const title =
      translate('action.general.updatedOn') +
      ' ' +
      dayjs(activeRecord?.dateRecord[index]).format('DD/MM/YYYY');
    navigation.navigate('RecordDetails', {
      active: {...item},
      title: title,
    });
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

  const renderListItem: ListRenderItem<RecordActive> = ({item, index}) => {
    return (
      <View marginHorizontal="l">
        <View alignItems="center" marginBottom="m">
          <Pressable
            onPress={() => onItemPress(item, index)}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? theme.colors.primary : 'white',
                opacity: pressed ? 0.4 : 1,
                borderRadius: pressed ? 10 : 0,
              },
            ]}>
            <View
              height={46}
              flexDirection="row"
              alignItems="center"
              borderRadius={10}
              borderWidth={2}
              borderColor="primary"
              justifyContent="space-between"
              paddingHorizontal="s">
              <View marginRight="s">
                <View flexDirection="row">
                  <View marginRight="s">
                    <Icon name="calendar" size={20} color={theme.colors.dark} />
                  </View>
                  <View>
                    <Text>
                      {dayjs(activeRecord?.dateRecord[index]).format(
                        'DD/MM/YYYY',
                      )}
                    </Text>
                  </View>
                </View>
              </View>
              <View flexDirection="row" marginRight="s">
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
      </View>
    );
  };

  const RecordList = () => {
    return (
      <View
        margin="m"
        maxHeight={380}
        minHeight={380}
        paddingBottom="l"
        paddingHorizontal="s"
        backgroundColor="white"
        borderRadius={15}>
        <ListHeaderComponent />
        <FlatList
          data={activeRecord?.activeObject}
          renderItem={renderListItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<EmptyComponent />}
          refreshing={loading}
          initialNumToRender={5}
        />
      </View>
    );
  };

  const FormField = () => {
    return (
      <TouchableOpacity onPress={() => setShow(!show)}>
        <View flexDirection="column" marginRight="m">
          <View marginBottom="s">
            <Text variant="updated">{translate('active.lastUpdate')}</Text>
          </View>
          <View flexDirection="row" alignItems="center">
            <View marginRight="l">
              <Text>{update}</Text>
            </View>
            <View marginRight="m">
              <Icon name="file-tray-full" size={34} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FormField />
      <Modal children={<RecordList />} show={show} setVisibility={setShow} />
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
