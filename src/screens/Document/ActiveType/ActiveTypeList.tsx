import {Header, Screen, Text, View} from 'components';
import {translate} from 'core';
import React, {createRef, useEffect} from 'react';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {
  fetchActiveTypes,
  fetchFilteredActiveTypes,
} from 'store/slices/activeType/activeTypeAsyncThunk';
import {resetActiveTypeState} from 'store/slices/activeType/activeTypeSlice';
import {ActiveTypeListsScreenProps, ActiveTypeState} from 'types';
import {ActiveTypeListItem} from './ActiveTypeListItem';
import {DrawerActions} from '@react-navigation/native';

const height = Dimensions.get('window').height;

export const ActiveTypeList: React.FC<ActiveTypeListsScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const activeTypeListRef = createRef<FlatList<any>>();
  const {
    activeTypes,
    activeTypesLength,
    loading,
    filtered,
    nextPage,
    itemsPerPage,
  }: ActiveTypeState = useAppSelector((state) => state.activeType);

  useEffect(() => {
    store.dispatch(
      fetchActiveTypes({
        pagination: {page: 1, itemsPerPage: 12},
        filters: [{key: 'order[id]', value: 'desc'}],
      }),
    );
  }, []);

  //Components
  const ActiveTypesLabel = () => {
    return (
      <Text>
        {activeTypesLength +
          ' ' +
          (activeTypesLength > 1
            ? translate('activeType.activeTypes')
            : translate('activeType.activeType'))}
      </Text>
    );
  };

  const _createItem = () => {
    navigation.navigate('NewActiveType', {
      title: translate('screen.activeType.newActiveType'),
    });
  };

  const scrollToTop = () => {
    if (activeTypesLength > 0) {
      activeTypeListRef.current?.scrollToIndex({animated: true, index: 0});
    }
  };

  const onActiveTypesOnEndReached = () => {
    if (!filtered) {
      dispatch(
        fetchActiveTypes({
          pagination: {
            page: nextPage,
            itemsPerPage: itemsPerPage,
          },
          filters: [{key: 'order[id]', value: 'desc'}],
        }),
      );
    } else {
      dispatch(
        fetchFilteredActiveTypes({
          pagination: {
            page: nextPage,
            itemsPerPage: itemsPerPage,
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
          itemsPerPage: itemsPerPage,
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
    <Screen>
      <View margin="m">
        <Header
          defaultIcon="plus-circle"
          defaultAction={_createItem}
          hasExtraIcon={true}
          extraIcon="search"
          label={translate('screen.activeType.title')}
          labelAction={() => navigation.dispatch(DrawerActions.openDrawer())}
          segment={'activeType'}
        />
      </View>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <View marginHorizontal="m">
          <TouchableOpacity onPress={() => scrollToTop()}>
            <ActiveTypesLabel />
          </TouchableOpacity>
        </View>
      </View>
      <View
        height={height - 60}
        marginTop="m"
        marginRight="s"
        paddingBottom="dxxl">
        <FlatList
          scrollEnabled={true}
          ref={activeTypeListRef}
          data={activeTypes}
          renderItem={({item}) => (
            <ActiveTypeListItem {...{navigation, route, type: {...item}}} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => refreshTypes()}
          refreshing={loading}
          ListEmptyComponent={<EmptyList />}
          initialNumToRender={9}
          onEndReachedThreshold={0}
          onEndReached={
            activeTypesLength >= 9 ? onActiveTypesOnEndReached : null
          }
        />
      </View>
    </Screen>
  );
};
