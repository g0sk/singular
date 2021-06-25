import React, {useEffect} from 'react';
import {View, Header} from 'components';
import store, {useAppSelector} from 'store/configureStore';
import {fetchActives} from 'store/slices/active/activeAsyncThunk';
import {DocumentList} from './DocumentList';

export const Document = () => {
  const {user} = useAppSelector((state) => state.users);
  const userName = user !== null ? user.name + ' ' + user.lastName : '';
  useEffect(() => {
    store.dispatch(fetchActives());
  });
  return (
    <View>
      <Header
        contentUrl={user?.image?.contentUrl}
        defaultIcon="plus-circle"
        hasExtraIcon={true}
        extraIcon="search"
        label={userName}
      />
      <DocumentList user={user} />
    </View>
  );
};
