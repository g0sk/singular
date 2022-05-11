import React, {
  useState,
  useEffect,
  createRef,
  RefObject,
  useCallback,
} from 'react';
import {Screen, Segment} from 'components';
import {FlatList, TouchableOpacity} from 'react-native';
import {Header, Text, View} from 'components';
import {ActiveList, ActiveTypeList} from 'screens';
import {useAppSelector} from 'store/configureStore';
import {
  ActiveState,
  ActiveTypeState,
  DocumentListStackProps,
  Mode,
} from 'types';
import {translate} from 'core';

export const DocumentList: React.FC<DocumentListStackProps> = ({
  navigation,
  route,
}) => {
  const [segmentMode, setSegmentMode] = useState<Mode>('active');
  const activeListRef = createRef<FlatList<any>>();
  const typeListRef = createRef<FlatList<any>>();
  const [flatListRef, setFlatListRef] = useState<RefObject<FlatList>>(
    activeListRef,
  );

  //States
  const {activesLength}: ActiveState = useAppSelector((state) => state.active);
  const {activeTypesLength}: ActiveTypeState = useAppSelector(
    (state) => state.activeType,
  );

  //Handlers

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
        title: translate('screen.active.newActive'),
      });
    } else {
      navigation.navigate('NewActiveType', {
        title: translate('screen.activeType.newActiveType'),
      });
    }
  };

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

  useEffect(() => {
    if (route.params.tab !== null) {
      setSegmentMode(route.params.tab);
    }
  }, [route.params.tab]);

  useEffect(() => {
    _modeHandler;
  }, [_modeHandler]);

  return (
    <Screen>
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
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <View marginHorizontal="m">
          <TouchableOpacity onPress={() => scrollToTop()}>
            {segmentMode === 'active' ? <ActivesLabel /> : <ActiveTypesLabel />}
          </TouchableOpacity>
        </View>
        <View flexDirection="row" marginRight="m">
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
      <ActiveList
        ref={activeListRef}
        visible={segmentMode === 'active'}
        {...{navigation, route}}
      />
      <ActiveTypeList
        ref={typeListRef}
        visible={segmentMode === 'activeType'}
        {...{navigation, route}}
      />
    </Screen>
  );
};
