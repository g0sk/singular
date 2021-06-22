import React from 'react';
import {View} from 'react-native';
import {useAppSelector} from 'store/configureStore';
import {DocumentList} from './DocumentList';

export const Document = () => {
  const users = useAppSelector((state) => state.users);
  return (
    <View>
      <DocumentList user={users.user} />
    </View>
  );
};
