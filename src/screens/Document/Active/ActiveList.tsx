import React, {createRef, useEffect} from 'react';
import {Header, Screen, Text, View} from 'components';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {resetActiveState} from 'store/slices/active/activeSlice';
import {
  fetchActives,
  fetchFilteredActives,
} from 'store/slices/active/activeAsyncThunk';
import {ActiveListScreenProps, ActiveState} from 'types';
import {translate} from 'core';
import {ActiveListItem} from './ActiveListItem';
import {DrawerActions} from '@react-navigation/native';

const height = Dimensions.get('window').height;

export const ActiveList: React.FC<ActiveListScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const activeListRef = createRef<FlatList<any>>();
  const {
    actives,
    filtered,
    activesLength,
    nextPage,
    itemsPerPage,
    loading,
  }: ActiveState = useAppSelector((state) => state.active);

  useEffect(() => {
    store.dispatch(fetchActives(route.params.filters));
  }, [route.params.filters]);

  const scrollToTop = () => {
    if (activesLength > 0) {
      activeListRef.current?.scrollToIndex({animated: true, index: 0});
    }
  };

  const _createItem = () => {
    navigation.navigate('NewActive', {
      title: translate('screen.active.newActive'),
    });
  };

  const onActivesOnEndReached = () => {
    if (!filtered) {
      dispatch(
        fetchActives({
          pagination: {
            page: nextPage,
            itemsPerPage: itemsPerPage,
          },
          filters: [{key: 'order[entryDate]', value: 'desc'}],
        }),
      );
    } else {
      dispatch(
        fetchFilteredActives({
          pagination: {
            page: nextPage,
            itemsPerPage: itemsPerPage,
          },
          filters: [{key: 'order[entryDate]', value: 'desc'}],
        }),
      );
    }
  };

  const refreshActives = () => {
    dispatch(resetActiveState());
    dispatch(
      fetchActives({
        pagination: {
          page: 1,
          itemsPerPage: itemsPerPage,
        },
        filters: [{key: 'order[entryDate]', value: 'desc'}],
      }),
    );
  };

  const ActivesLabel = () => {
    return (
      <Text>
        {activesLength +
          ' ' +
          (activesLength > 1
            ? translate('active.actives')
            : translate('active.active'))}
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

  return (
    <Screen>
      <View margin="m">
        <Header
          defaultIcon="plus-circle"
          defaultAction={_createItem}
          hasExtraIcon={true}
          extraIcon="search"
          label={translate('screen.active.title')}
          labelAction={() => navigation.dispatch(DrawerActions.openDrawer())}
          segment={'active'}
        />
      </View>
      <View marginHorizontal="m">
        <TouchableOpacity onPress={() => scrollToTop()}>
          <ActivesLabel />
        </TouchableOpacity>
      </View>
      <View
        height={height - 60}
        marginTop="m"
        marginRight="s"
        paddingBottom="dxxl">
        <FlatList
          ref={activeListRef}
          data={actives}
          scrollEnabled={true}
          renderItem={({item}) => (
            <ActiveListItem {...{navigation, route, active: {...item}}} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => refreshActives()}
          refreshing={loading}
          ListEmptyComponent={<EmptyList />}
          initialNumToRender={7}
          onEndReachedThreshold={0}
          onEndReached={activesLength >= 7 ? onActivesOnEndReached : null}
        />
      </View>
    </Screen>
  );
};
