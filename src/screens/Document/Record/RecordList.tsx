import React, {createRef, useEffect, useLayoutEffect, useState} from 'react';
import {DatePicker, Screen, Text, View} from 'components';
import {ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import {RecordListProps, RecordState, RecordActive} from 'types';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {
  fetchActiveRecord,
  fetchFilteredActiveRecord,
} from 'store/slices/record/recordAsyncThunk';
import {RecordListItem} from './RecordListItem';
import {translate} from 'core';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'ui/theme';
import {resetRecordState} from 'store/slices/record/recordSlice';
import {formatDisplayDate} from 'utils/dates';

type Order = 'oldest' | 'latest';
type FilterIcon = 'trending-up-outline' | 'trending-down-outline';

export const RecordList: React.FC<RecordListProps> = ({route, navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const [order, setOrder] = useState<Order>('oldest');
  const [records, setRecords] = useState<Array<RecordActive>>([]);
  const [iconName, setIconName] = useState<FilterIcon>('trending-up-outline');
  const [open, setOpen] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [filterEnabled, setFilterEnabled] = useState<boolean>(false);

  const flatListRef = createRef<FlatList>();
  const recordState: RecordState = useAppSelector((state) => state.record);

  useLayoutEffect(() => {
    store.dispatch(fetchActiveRecord(route.params.recordId));
  }, [route.params.recordId]);

  useEffect(() => {
    if (order === 'oldest') {
      setRecords([...recordState.filteredRecords]);
    } else {
      setRecords([...recordState.filteredRecords].reverse());
    }
  }, [recordState.filteredRecords, order]);

  useEffect(() => {
    return () => {
      store.dispatch(resetRecordState());
    };
  }, []);

  const selectedDate = (_date: Date) => {
    const _formattedDate = formatDisplayDate(_date, false);
    setFilterEnabled(true);
    setDateFilter(_date);
    setFormattedDate(_formattedDate);
    store.dispatch(
      fetchFilteredActiveRecord({
        activeId: route.params.recordId,
        filters: [{key: 'date', value: formatDisplayDate(_date, false)}],
      }),
    );
  };

  const refreshRecords = () => {
    if (filterEnabled && dateFilter) {
      dispatch(
        fetchFilteredActiveRecord({
          activeId: route.params.recordId,
          filters: [{key: 'date', value: formatDisplayDate(dateFilter, false)}],
        }),
      );
    } else {
      dispatch(fetchActiveRecord(route.params.recordId));
    }
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

  const onFilterCancel = () => {
    setOpen(false);
    if (filterEnabled) {
      dispatch(fetchActiveRecord(route.params.recordId)).then(() => {
        setFilterEnabled(false);
        setDateFilter(null);
      });
    }
  };

  const changeIcon = () => {
    if (order === 'oldest') {
      setOrder('latest');
      setIconName('trending-down-outline');
    } else {
      setOrder('oldest');
      setIconName('trending-up-outline');
    }
  };

  const DateFilter = () => {
    return (
      <View>
        {!filterEnabled ? (
          <View>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <View flexDirection="row" alignItems="center">
                <View marginRight="s">
                  <Icon name="calendar" size={20} color={colors.primary} />
                </View>
                <View>
                  <Text variant="recordFilter">
                    {translate('filter.record.date.name')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View flexDirection="row" alignItems="center">
            <View marginRight="m">
              <TouchableOpacity onPress={() => setOpen(true)}>
                <View borderBottomColor="primary" borderBottomWidth={1}>
                  <Text variant="recordFilter">{formattedDate}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={onFilterCancel}>
                <View>
                  <Icon name="close-circle" size={25} color={colors.error} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <Screen>
      <View margin="m">
        <View flexDirection="column">
          <View
            marginBottom="l"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <View>
              <TouchableOpacity onPress={() => scrollToTop()}>
                <ItemsLabel />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={goToRecordStats}>
                <View
                  flexDirection="row"
                  alignItems="center"
                  padding="s"
                  backgroundColor="primary"
                  borderRadius={8}>
                  <View marginRight="s">
                    <Icon
                      name="stats-chart"
                      size={20}
                      color={colors.lightBackground}
                    />
                  </View>
                  <View>
                    <Text variant="recordStats">
                      {translate('record.chart')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginHorizontal="s">
            <DateFilter />
            <View width={140}>
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
      <DatePicker
        open={open}
        onCancel={onFilterCancel}
        entryDate={dateFilter ? dateFilter : new Date()}
        setShowCalendar={setOpen}
        setParentDate={selectedDate}
      />
      <View>
        {recordState.loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            animating={recordState.loading}
          />
        ) : (
          <FlatList
            data={records}
            scrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={refreshRecords}
            refreshing={recordState.loading}
            ref={flatListRef}
            ListEmptyComponent={<EmptyList />}
            renderItem={({item}) => (
              <RecordListItem
                {...{
                  navigation,
                  route,
                }}
                recordActive={item}
              />
            )}
          />
        )}
      </View>
    </Screen>
  );
};
