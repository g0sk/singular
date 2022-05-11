import React, {forwardRef, useEffect} from 'react';
import {Text, View} from 'components';
import {Dimensions, FlatList} from 'react-native';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {resetActiveState} from 'store/slices/active/activeSlice';
import {
  fetchActives,
  fetchFilteredActives,
} from 'store/slices/active/activeAsyncThunk';
import {ActiveListProps, ActiveState} from 'types';
import {translate} from 'core';
import {ActiveListItem} from './ActiveListItem';

const height = Dimensions.get('window').height;

export const ActiveList = forwardRef<FlatList, ActiveListProps>(
  ({visible, navigation, route}, ref) => {
    const dispatch = useAppDispatch();
    const activeState: ActiveState = useAppSelector((state) => state.active);

    useEffect(() => {
      store.dispatch(
        fetchActives({
          pagination: {
            page: 1,
            itemsPerPage: 7,
          },
          filters: [{key: 'order[entryDate]', value: 'desc'}],
        }),
      );
    }, []);

    const onActivesOnEndReached = () => {
      if (!activeState.filtered) {
        dispatch(
          fetchActives({
            pagination: {
              page: activeState.nextPage,
              itemsPerPage: activeState.itemsPerPage,
            },
            filters: [{key: 'order[entryDate]', value: 'desc'}],
          }),
        );
      } else {
        dispatch(
          fetchFilteredActives({
            pagination: {
              page: activeState.nextPage,
              itemsPerPage: activeState.itemsPerPage,
            },
            filters: [{key: 'order[entryDate]', value: 'desc'}],
          }),
        );
      }
    };

    const refreshActives = () => {
      console.log('update');
      dispatch(resetActiveState());
      dispatch(
        fetchActives({
          pagination: {
            page: 1,
            itemsPerPage: activeState.itemsPerPage,
          },
          filters: [{key: 'order[entryDate]', value: 'desc'}],
        }),
      );
    };

    const EmptyList = () => {
      return (
        <View margin="l">
          <Text variant="emptyHeader">{translate('active.empty')}</Text>
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
          ref={ref}
          data={activeState.actives}
          scrollEnabled={true}
          renderItem={({item}) => (
            <ActiveListItem {...{navigation, route, active: {...item}}} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => refreshActives()}
          refreshing={activeState.loading}
          ListEmptyComponent={<EmptyList />}
          initialNumToRender={7}
          onEndReachedThreshold={0}
          onEndReached={
            activeState.activesLength >= 7 ? onActivesOnEndReached : null
          }
        />
      </View>
    );
  },
);
