import React, {useEffect, useState} from 'react';
import {View, Text} from 'components';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {translate} from 'core/i18n';
import {Active, RecordProps, RecordState} from 'types';
import {useAppSelector} from 'store/configureStore';
import {useTheme} from 'ui/theme';

export const RecordList: React.FC<RecordProps> = ({activeRecord}) => {
  const [dateRecord, setDateRecord] = useState<string[]>([]);
  const [activeObject, setActiveObject] = useState<Active[]>([]);
  const {loading}: RecordState = useAppSelector((state) => state.record);
  const theme = useTheme();

  useEffect(() => {
    setActiveObject([...activeRecord.activeObject]);
    setDateRecord([...activeRecord.dateRecord]);
  }, [activeRecord]);

  const styles = StyleSheet.create({
    container: {},
    title: {},
    list: {
      backgroundColor: 'white',
      borderRadius: 20,
      minHeight: 300,
    },
    item: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.secondary,
    },
    empty: {},
  });

  const EmptyComponent = () => {
    return (
      <View style={styles.empty} margin="m">
        {loading ? (
          <ActivityIndicator animating={loading} size="large" color="purple" />
        ) : (
          <Text>{translate('record.empty')}</Text>
        )}
      </View>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View margin="m" justifyContent="space-between">
        <Text variant="formLabel">{translate('record.title')}</Text>
        <Text>{dateRecord}</Text>
      </View>
    );
  };

  //Create new entry on nav stack for active inside actives.
  const renderListItem: ListRenderItem<Active> = ({item}) => {
    return (
      <TouchableOpacity>
        <View style={styles.item} marginHorizontal="m" marginVertical="s">
          <Text>{item.reference}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.list} margin="m">
      <FlatList
        data={activeObject}
        renderItem={renderListItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyComponent />}
        ListHeaderComponent={<ListHeaderComponent />}
        refreshing={loading}
      />
    </View>
  );
};
