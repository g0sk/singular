import React, {useEffect} from 'react';
import {View} from 'react-native';
import store, {useAppSelector} from 'store/configureStore';
import {fetchActives} from 'store/slices/active/activeAsyncThunk';
import {DocumentList} from './DocumentList';

export const Document = () => {
  const users = useAppSelector((state) => state.users);
  useEffect(() => {
    store.dispatch(fetchActives());
  });
  return (
    <View>
      <DocumentList user={users.user} />
    </View>
  );
};
