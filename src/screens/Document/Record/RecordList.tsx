import React, {createRef, useEffect, useLayoutEffect, useState} from 'react';
import {Screen, Text, View} from 'components';
import {FlatList, TouchableOpacity} from 'react-native';
import {RecordListProps, RecordState, RecordActive} from 'types';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {fetchActiveRecord} from 'store/slices/record/recordAsyncThunk';
import {RecordListItem} from './RecordListItem';
import {translate} from 'core';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'ui/theme';

type Order = 'latest' | 'oldest';
type FilterIcon = 'trending-up-outline' | 'trending-down-outline';

export const RecordList: React.FC<RecordListProps> = ({route, navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const [order, setOrder] = useState<Order>('latest');
  const [records, setRecords] = useState<Array<RecordActive>>([]);
  const [iconName, setIconName] = useState<FilterIcon>('trending-up-outline');
  const flatListRef = createRef<FlatList>();
  const {loading}: RecordState = useAppSelector((state) => state.record);

  useLayoutEffect(() => {
    store.dispatch(fetchActiveRecord(route.params.recordId)).then(() => {
      const recordState: RecordState = store.getState().record;
      if (recordState.activeRecord) {
        setRecords([...recordState.activeRecord.activeObject]);
      }
    });
  }, [route.params.recordId]);

  useEffect(() => {}, [order]);

  const refreshRecords = () => {
    dispatch(fetchActiveRecord(route.params.recordId)).then(() => {
      const recordState: RecordState = store.getState().record;
      if (recordState.activeRecord) {
        setRecords([...recordState.activeRecord.activeObject]);
      }
    });
  };

  const goToRecordStats = () => {
    navigation.navigate('RecordStats', {recordId: route.params.recordId});
  };

  const scrollToTop = () => {
    if (records.length > 0) {
      flatListRef.current?.scrollToIndex({animated: true, index: 0});
    }
  };

  const ItemsLabel = () => {
    return (
      <Text variant="headerTitle">
        {records.length +
          ' ' +
          translate(records.length !== 1 ? 'record.records' : 'record.record')}
      </Text>
    );
  };

  const EmptyList = () => {
    return (
      <View margin="l">
        <Text variant="emptyHeader">{translate('active.empty')}</Text>
      </View>
    );
  };

  const changeIcon = () => {
    setRecords(records.reverse());
    if (order === 'latest') {
      setOrder('oldest');
      setIconName('trending-down-outline');
    } else {
      setOrder('latest');
      setIconName('trending-up-outline');
    }
  };

  return (
    <Screen>
      <View margin="m">
        <View flexDirection="column">
          <View marginBottom="l">
            <TouchableOpacity onPress={() => scrollToTop()}>
              <ItemsLabel />
            </TouchableOpacity>
          </View>
          <View
            flexDirection="row"
            justifyContent="space-between"
            marginHorizontal="s">
            <View>
              <TouchableOpacity onPress={goToRecordStats}>
                <View flexDirection="row" alignItems="center">
                  <View marginRight="s">
                    <Icon name="stats-chart" size={20} color={colors.primary} />
                  </View>
                  <View>
                    <Text variant="recordFilter">
                      {translate('record.chart')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={changeIcon}>
                <View flexDirection="row" alignItems="center">
                  <View marginRight="s">
                    <Icon name={iconName} size={30} color={colors.primary} />
                  </View>
                  <View>
                    <Text variant="recordFilter">
                      {translate(
                        order === 'latest'
                          ? 'filter.record.latest'
                          : 'filter.record.oldest',
                      )}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View>
        <FlatList
          data={records}
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={refreshRecords}
          refreshing={loading}
          ref={flatListRef}
          ListEmptyComponent={<EmptyList />}
          renderItem={({item}) => (
            <RecordListItem {...{navigation, route, record: {...item}}} />
          )}
        />
      </View>
    </Screen>
  );
};
