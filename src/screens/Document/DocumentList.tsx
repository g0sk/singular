import React from 'react';
import {Screen, Header} from 'components';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native';
import {DocumentListProps} from 'types';
import {View} from 'components';
import {DocumentItem} from './DocumentItem';
import {useAppSelector} from 'store/configureStore';

export const DocumentList: React.FC<DocumentListProps> = ({user}) => {
  const activeState = useAppSelector((state) => state.active);
  const userName = user !== null ? user.name + ' ' + user.lastName : '';
  return (
    <Screen>
      <View style={styles.container}>
        <Header
          contentUrl={user?.image?.contentUrl}
          defaultIcon="plus-circle"
          hasExtraIcon={true}
          extraIcon="search"
          label={userName}
        />
        <FlatList
          renderItem={({item}) => <DocumentItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
          data={activeState.actives}
          style={styles.itemList}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: 500,
  },
  itemList: {
    marginVertical: 50,
    marginHorizontal: 10,
  },
});
