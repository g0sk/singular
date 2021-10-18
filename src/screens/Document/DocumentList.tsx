import React, {
  useState,
  useEffect,
  createRef,
  RefObject,
  useCallback,
} from 'react';
import {Screen, Segment} from 'components';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Header, Text, View} from 'components';
import {ActiveListItem, ActiveTypeListItem} from 'screens';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {fetchActives} from 'store/slices/active/activeAsyncThunk';
import {fetchActiveTypes} from 'store/slices/activeType/activeTypeAsyncThunk';
import {
  ActiveState,
  ActiveTypeState,
  Mode,
  DocumentListStackProps,
} from 'types';
import {translate} from 'core';

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
  const refreshActives = () => {
    dispatch(fetchActives());
  };
  const refreshTypes = () => {
    dispatch(fetchActiveTypes());
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
    if (route.params.tab !== null) {
      setSegmentMode(route.params.tab);
    }
  }, [route.params.tab]);

  useEffect(() => {
    store.dispatch(fetchActives());
    store.dispatch(fetchActiveTypes());
  }, []);

  useEffect(() => {
    _modeHandler;
  }, [_modeHandler]);

  return (
    <Screen>
      <View>
        <View margin="m">
          <Header
            disabled={false}
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
        <View
          marginHorizontal="s"
          marginTop="m"
          marginBottom="l"
          paddingBottom="xxl"
          height={700}>
          {segmentMode === 'active' ? (
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
            />
          )}
        </View>
      </View>
    </Screen>
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
