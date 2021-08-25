import React, {createRef} from 'react';
import {Screen} from 'components';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {Header, Text, View} from 'components';
import {DocumentItem} from './DocumentItem';
import {useAppDispatch, useAppSelector} from 'store/configureStore';
import {fetchActives} from 'store/slices/active/activeAsyncThunk';
import {DocumentStackProps} from 'types';
import {translate} from 'core';

//Screen dimension - tabbar height;
const HEIGHT = Dimensions.get('window').height - 150;

export const DocumentList: React.FC<DocumentStackProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const {actives, activesLength, loading} = useAppSelector(
    (state) => state.active,
  );
  const refreshActives = () => {
    dispatch(fetchActives());
  };

  const flatListRef = createRef<FlatList<any>>();
  const nActives = activesLength + ' ' + translate('active.actives');
  const emptyList = () =>
    !loading && activesLength > 0 ? (
      <Text variant="emptyHeader">No actives to display</Text>
    ) : null;
  const scrollToTop = () => {
    if (actives.length > 0) {
      flatListRef.current?.scrollToIndex({animated: true, index: 0});
    }
  };

  return (
    <Screen>
      <View height={HEIGHT}>
        <View margin="m">
          <Header
            disabled={false}
            defaultIcon="plus-circle"
            defaultAction={() =>
              navigation.navigate('Document', {
                active: undefined,
                title: 'New active',
              })
            }
            hasExtraIcon={true}
            extraIcon="search"
            label={translate('screen.documents.title')}
            labelAction={() => scrollToTop()}
          />
        </View>
        <View marginHorizontal="m" width={70}>
          <TouchableOpacity onPress={() => scrollToTop()}>
            <Text>{nActives}</Text>
          </TouchableOpacity>
        </View>
        <View marginHorizontal="s" marginTop="m" marginBottom="l">
          <FlatList
            ref={flatListRef}
            renderItem={({item}) => (
              <DocumentItem {...{navigation, route, item}} />
            )}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={() => refreshActives()}
            refreshing={loading}
            ListEmptyComponent={() => emptyList()}
            data={actives}
            scrollToOverflowEnabled={true}
          />
        </View>
      </View>
    </Screen>
  );
};
