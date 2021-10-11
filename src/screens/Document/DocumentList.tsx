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
  const {
    actives,
    activesLength,
    loading: activeLoading,
  }: ActiveState = useAppSelector((state) => state.active);
  const {
    activeTypes,
    activeTypesLength,
    loading: activeTypeLoading,
  }: ActiveTypeState = useAppSelector((state) => state.activeType);

  //Handlers
  const refreshActives = () => {
    dispatch(fetchActives());
  };
  const refreshTypes = () => {
    dispatch(fetchActiveTypes());
  };

  const scrollToTop = () => {
    if (activesLength > 0) {
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
        title: 'Create new active',
      });
    } else {
      navigation.navigate('NewActiveType', {
        title: 'Create new type',
      });
    }
  };

  //Components
  const Items = () => {
    if (segmentMode === 'active') {
      return (
        <Text>
          {activesLength +
            ' ' +
            (activesLength > 1
              ? translate('active.actives')
              : translate('active.active'))}
        </Text>
      );
    } else {
      return (
        <Text>
          {activeTypesLength +
            ' ' +
            (activeTypesLength > 1
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
                {name: 'Actives', id: 'active'},
                {name: 'Types', id: 'activeType'},
              ]}
              mode={segmentMode}
              segmentHandler={setSegmentMode}
            />
          </View>
        </View>
        <View marginHorizontal="s" marginTop="m" marginBottom="l">
          {segmentMode === 'active' ? (
            <FlatList
              ref={flatListRef}
              data={actives}
              renderItem={({item}) => (
                <ActiveListItem {...{navigation, route, active: {...item}}} />
              )}
              keyExtractor={(item, index) => index.toString()}
              onRefresh={() => refreshActives()}
              refreshing={activeLoading}
              ListEmptyComponent={<EmptyList />}
              scrollToOverflowEnabled={true}
            />
          ) : (
            <FlatList
              ref={flatListRef}
              data={activeTypes}
              renderItem={({item}) => (
                <ActiveTypeListItem {...{navigation, route, type: {...item}}} />
              )}
              keyExtractor={(item, index) => index.toString()}
              onRefresh={() => refreshTypes()}
              refreshing={activeTypeLoading}
              ListEmptyComponent={<EmptyList />}
              scrollToOverflowEnabled={true}
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
