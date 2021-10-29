import React, {
  useState,
  useEffect,
  createRef,
  RefObject,
  useCallback,
} from 'react';
import {Segment} from 'components';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
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
  const _handleActivesOnEndReached = () => {
    if (!activeState.filtered) {
      dispatch(
        fetchActives({
          page: activeState.page,
          itemsPerPage: activeState.itemsPerPage,
        }),
      );
    } else {
      dispatch(
        fetchFilteredActives({
          pagination: {
            page: activeState.page,
            itemsPerPage: activeState.itemsPerPage,
          },
          filters: [],
        }),
      );
    }
  };

  const _handleActiveTypesOnEndReached = () => {
    if (!activeTypeState.filtered) {
      dispatch(
        fetchActiveTypes({
          page: activeTypeState.page,
          itemsPerPage: activeTypeState.itemsPerPage,
        }),
      );
    } else {
      dispatch(
        fetchFilteredActiveTypes({
          pagination: {
            page: activeTypeState.page,
            itemsPerPage: activeTypeState.itemsPerPage,
          },
          filters: [],
        }),
      );
    }
  };

  const refreshActives = () => {
    dispatch(resetActiveState());
    dispatch(
      fetchActives({
        page: 1,
        itemsPerPage: activeState.itemsPerPage,
      }),
    );
  };
  const refreshTypes = () => {
    dispatch(resetActiveTypeState());
    dispatch(
      fetchActiveTypes({
        page: 1,
        itemsPerPage: activeTypeState.itemsPerPage,
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
        page: 1,
        itemsPerPage: 7,
      }),
    );
    store.dispatch(fetchActiveTypes({page: 1, itemsPerPage: 9}));
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
        <View style={styles.segment}>
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
      <View height={590} marginHorizontal="m" marginTop="m">
        {segmentMode === 'active' ? (
          <FlatList
            ref={flatListRef}
            data={activeState.actives}
            initialNumToRender={7}
            scrollEnabled={true}
            renderItem={({item}) => (
              <ActiveListItem {...{navigation, route, active: {...item}}} />
            )}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={() => refreshActives()}
            refreshing={activeState.loading}
            ListEmptyComponent={<EmptyList />}
            onEndReached={_handleActivesOnEndReached}
            onEndReachedThreshold={7}
          />
        ) : (
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
            initialNumToRender={9}
            onEndReached={_handleActiveTypesOnEndReached}
            onEndReachedThreshold={0.1}
          />
        )}
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
