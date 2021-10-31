import React, {
  useState,
  useEffect,
  createRef,
  RefObject,
  useCallback,
} from 'react';
import {Segment} from 'components';
import {Dimensions, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Header, Text, View} from 'components';
import {ActiveListItem, ActiveTypeListItem} from 'screens';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {
  fetchActives,
  fetchFilteredActives,
} from 'store/slices/active/activeAsyncThunk';
import {
  fetchActiveTypes,
  fetchFilteredActiveTypes,
} from 'store/slices/activeType/activeTypeAsyncThunk';
import {
  ActiveState,
  ActiveTypeState,
  Mode,
  DocumentListStackProps,
} from 'types';
import {translate} from 'core';
import {resetActiveState} from 'store/slices/active/activeSlice';
import {resetActiveTypeState} from 'store/slices/activeType/activeTypeSlice';

const {height} = Dimensions.get('window');
export const DocumentList: React.FC<DocumentListStackProps> = ({
  navigation,
  route,
}) => {
  const [segmentMode, setSegmentMode] = useState<Mode>('active');
  const activeListRef = createRef<FlatList<any>>();
  const typeListRef = createRef<FlatList<any>>();
  const dispatch = useAppDispatch();
  const [flatListRef, setFlatListRef] = useState<RefObject<FlatList>>(
    activeListRef,
  );

  //States
  const activeState: ActiveState = useAppSelector((state) => state.active);
  const activeTypeState: ActiveTypeState = useAppSelector(
    (state) => state.activeType,
  );

  //Handlers
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

  const refreshActives = () => {
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

  const scrollToTop = () => {
    if (activeState.activesLength > 0) {
      flatListRef.current?.scrollToIndex({animated: true, index: 0});
    }
  };

  const _modeHandler = useCallback(() => {
    const _flatListRef: RefObject<FlatList> =
      segmentMode === 'active' ? activeListRef : typeListRef;
    setFlatListRef(_flatListRef);
  }, [segmentMode, activeListRef, typeListRef]);

  const _createItem = () => {
    if (segmentMode === 'active') {
      navigation.navigate('NewActive', {
        title: translate('screen.active.newActive'),
      });
    } else {
      navigation.navigate('NewActiveType', {
        title: translate('screen.activeType.newActiveType'),
      });
    }
  };

  //Components
  const Items = () => {
    if (segmentMode === 'active') {
      return (
        <Text>
          {activeState.activesLength +
            ' ' +
            (activeState.activesLength > 1
              ? translate('active.actives')
              : translate('active.active'))}
        </Text>
      );
    } else {
      return (
        <Text>
          {activeTypeState.activeTypesLength +
            ' ' +
            (activeTypeState.activeTypesLength > 1
              ? translate('activeType.activeTypes')
              : translate('activeType.activeType'))}
        </Text>
      );
    }
  };
  const EmptyList = () => {
    return (
      <View margin="l">
        <Text variant="emptyHeader">
          {translate(
            segmentMode === 'active' ? 'active.empty' : 'activeType.empty',
          )}
        </Text>
      </View>
    );
  };

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
    store.dispatch(
      fetchActiveTypes({
        pagination: {page: 1, itemsPerPage: 9},
        filters: [{key: 'order[id]', value: 'desc'}],
      }),
    );
  }, []);

  useEffect(() => {
    if (route.params.tab !== null) {
      setSegmentMode(route.params.tab);
    }
  }, [route.params.tab]);

  useEffect(() => {
    _modeHandler;
  }, [_modeHandler]);

  return (
    <View>
      <View margin="m">
        <Header
          defaultIcon="plus-circle"
          defaultAction={_createItem}
          hasExtraIcon={true}
          extraIcon="search"
          label={translate(
            segmentMode === 'active'
              ? 'screen.active.title'
              : 'screen.activeType.title',
          )}
          labelAction={() => scrollToTop()}
          segment={segmentMode}
        />
      </View>
      <View style={styles.subHeader}>
        <View marginHorizontal="m">
          <TouchableOpacity onPress={() => scrollToTop()}>
            <Items />
          </TouchableOpacity>
        </View>
        <View style={styles.segment} marginRight="m">
          <Segment
            labels={[
              {name: translate('screen.active.title'), id: 'active'},
              {name: translate('screen.activeType.title'), id: 'activeType'},
            ]}
            mode={segmentMode}
            segmentHandler={setSegmentMode}
          />
        </View>
      </View>
      <View
        height={height - 70}
        marginTop="m"
        marginHorizontal="m"
        paddingBottom="dxxl"
        visible={segmentMode === 'active'}>
        <FlatList
          ref={flatListRef}
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
          onEndReached={
            activeState.activesLength >= 7 ? onActivesOnEndReached : null
          }
          onEndReachedThreshold={0}
        />
      </View>
      <View
        height={height - 70}
        marginTop="m"
        marginHorizontal="m"
        paddingBottom="dxxl"
        visible={segmentMode === 'activeType'}>
        <FlatList
          scrollEnabled={true}
          ref={flatListRef}
          data={activeTypeState.activeTypes}
          renderItem={({item}) => (
            <ActiveTypeListItem {...{navigation, route, type: {...item}}} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => refreshTypes()}
          refreshing={activeTypeState.loading}
          ListEmptyComponent={<EmptyList />}
          onEndReached={
            activeState.activesLength >= 9 ? onActiveTypesOnEndReached : null
          }
          initialNumToRender={9}
          onEndReachedThreshold={0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  segment: {
    flexDirection: 'row',
  },
});
