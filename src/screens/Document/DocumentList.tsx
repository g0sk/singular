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
import {ActiveItem} from './ActiveItem';
import {ActiveTypeItem} from './ActiveTypeItem';
import {useAppDispatch, useAppSelector} from 'store/configureStore';
import {
  fetchActives,
  fetchActiveTypes,
} from 'store/slices/active/activeAsyncThunk';
import {Mode, DocumentStackProps, ActiveState} from 'types';
import {translate} from 'core';

export const DocumentList: React.FC<DocumentStackProps> = ({
  navigation,
  route,
}: DocumentStackProps) => {
  const [segmentMode, setSegmentMode] = useState<Mode>('active');
  const activeListRef = createRef<FlatList<any>>();
  const typeListRef = createRef<FlatList<any>>();
  const [flatListRef, setFlatListRef] = useState<RefObject<FlatList>>(
    activeListRef,
  );
  const dispatch = useAppDispatch();
  const {
    actives,
    activeTypes,
    activeTypesLength,
    activesLength,
    loading,
  }: ActiveState = useAppSelector((state) => state.active);

  const refreshActives = () => {
    dispatch(fetchActives());
  };
  const refreshTypes = () => {
    dispatch(fetchActiveTypes());
  };

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
  const emptyList = () =>
    !loading && activesLength > 0 ? (
      <View margin="l">
        <Text variant="emptyHeader">
          {translate(
            segmentMode === 'active' ? 'active.empty' : 'activeType.empty',
          )}
        </Text>
      </View>
    ) : null;
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

  useEffect(() => {
    _modeHandler;
  }, [_modeHandler]);

  const _createItem = () => {
    if (segmentMode === 'active') {
      navigation.navigate('Active', {
        active: null,
        title: 'New active',
      });
    } else {
      navigation.navigate('Type', {
        type: null,
        title: 'New type',
      });
    }
  };

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
                <ActiveItem {...{navigation, route, active: {...item}}} />
              )}
              keyExtractor={(item, index) => index.toString()}
              onRefresh={() => refreshActives()}
              refreshing={loading}
              ListEmptyComponent={() => emptyList()}
              scrollToOverflowEnabled={true}
            />
          ) : (
            <FlatList
              ref={flatListRef}
              data={activeTypes}
              renderItem={({item}) => (
                <ActiveTypeItem {...{navigation, route, type: {...item}}} />
              )}
              keyExtractor={(item, index) => index.toString()}
              onRefresh={() => refreshTypes()}
              refreshing={loading}
              ListEmptyComponent={() => emptyList()}
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
