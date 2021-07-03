import React, {createRef} from 'react';
import {Screen} from 'components';
import {StyleSheet} from 'react-native';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {Text, View} from 'components';
import {DocumentItem} from './DocumentItem';
import {useAppDispatch, useAppSelector} from 'store/configureStore';
import {fetchActives} from 'store/slices/active/activeAsyncThunk';
import {DocumentStackProps} from 'types';

//Screen dimension - tabbar height;
const HEIGHT = Dimensions.get('window').height - 75;

export const DocumentList: React.FC<DocumentStackProps> = ({
  navigation,
  route,
}) => {
  const {actives, activesLength, loading} = useAppSelector(
    (state) => state.active,
  );
  const refreshActives = () => {
    dispatch(fetchActives());
  };

  const flatListRef = createRef<FlatList<any>>();
  const dispatch = useAppDispatch();
  const nActives = activesLength + ' actives';
  const emptyList = () =>
    !loading && activesLength > 0 ? (
      <Text style={styles.noActives} variant="header1">
        No actives to display
      </Text>
    ) : null;
  return (
    <Screen>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.itemNumber}
          onPress={() =>
            flatListRef.current?.scrollToIndex({animated: true, index: 0})
          }>
          <Text>{nActives}</Text>
        </TouchableOpacity>
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
          style={styles.itemList}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
  },
  itemList: {
    marginBottom: 50,
    marginHorizontal: 10,
  },
  itemNumber: {
    paddingHorizontal: 10,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  noActives: {
    margin: 10,
  },
});
