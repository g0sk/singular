import {Text, View} from 'components';
import {translate} from 'core';
import React, {forwardRef, useEffect} from 'react';
import {Dimensions, FlatList} from 'react-native';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {
  fetchActiveTypes,
  fetchFilteredActiveTypes,
} from 'store/slices/activeType/activeTypeAsyncThunk';
import {resetActiveTypeState} from 'store/slices/activeType/activeTypeSlice';
import {ActiveTypeListProps} from 'types';
import {ActiveTypeListItem} from './ActiveTypeListItem';

const height = Dimensions.get('window').height;

export const ActiveTypeList = forwardRef<FlatList, ActiveTypeListProps>(
  ({visible, navigation, route}, ref) => {
    const dispatch = useAppDispatch();
    const activeTypeState = useAppSelector((state) => state.activeType);

    useEffect(() => {
      store.dispatch(
        fetchActiveTypes({
          pagination: {page: 1, itemsPerPage: 9},
          filters: [{key: 'order[id]', value: 'desc'}],
        }),
      );
    }, []);

    const onActiveTypesOnEndReached = () => {
      if (!activeTypeState.filtered) {
        dispatch(
          fetchActiveTypes({
            pagination: {
              page: activeTypeState.nextPage,
              itemsPerPage: activeTypeState.itemsPerPage,
            },
            filters: [{key: 'order[id]', value: 'desc'}],
          }),
        );
      } else {
        dispatch(
          fetchFilteredActiveTypes({
            pagination: {
              page: activeTypeState.nextPage,
              itemsPerPage: activeTypeState.itemsPerPage,
            },
            filters: [{key: 'order[id]', value: 'desc'}],
          }),
        );
      }
    };

    const refreshTypes = () => {
      dispatch(resetActiveTypeState());
      dispatch(
        fetchActiveTypes({
          pagination: {
            page: 1,
            itemsPerPage: activeTypeState.itemsPerPage,
          },
          filters: [{key: 'order[id]', value: 'desc'}],
        }),
      );
    };

    const EmptyList = () => {
      return (
        <View margin="l">
          <Text variant="emptyHeader">{translate('activeType.empty')}</Text>
        </View>
      );
    };
    return (
      <View
        height={height - 70}
        marginTop="m"
        marginHorizontal="m"
        paddingBottom="dxxl"
        visible={visible}>
        <FlatList
          scrollEnabled={true}
          ref={ref}
          data={activeTypeState.activeTypes}
          renderItem={({item}) => (
            <ActiveTypeListItem {...{navigation, route, type: {...item}}} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => refreshTypes()}
          refreshing={activeTypeState.loading}
          ListEmptyComponent={<EmptyList />}
          initialNumToRender={9}
          onEndReachedThreshold={0}
          onEndReached={
            activeTypeState.activesLength >= 9
              ? onActiveTypesOnEndReached
              : null
          }
        />
      </View>
    );
  },
);
