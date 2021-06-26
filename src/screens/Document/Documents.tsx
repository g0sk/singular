import React, {useEffect} from 'react';
import {View, Header} from 'components';
import store, {useAppSelector} from 'store/configureStore';
import {fetchActives} from 'store/slices/active/activeAsyncThunk';
import {DocumentList} from './DocumentList';
import {DocumentStackProps} from 'types';

export const Documents: React.FC<DocumentStackProps> = ({
  navigation,
  route,
}) => {
  const {user} = useAppSelector((state) => state.users);
  const userName = user !== null ? user.name + ' ' + user.lastName : '';
  useEffect(() => {
    store.dispatch(fetchActives());
  });
  const navigateDocumentScreen = () =>
    navigation.navigate('Document', {activeId: undefined, title: 'New active'});
  return (
    <View>
      <Header
        contentUrl={user?.image?.contentUrl}
        defaultIcon="plus-circle"
        defaultAction={navigateDocumentScreen}
        hasExtraIcon={true}
        extraIcon="search"
        label={userName}
      />
      <DocumentList {...{navigation, route}} />
    </View>
  );
};
