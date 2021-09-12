import React, {useEffect} from 'react';
import {Screen} from 'components';
import store from 'store/configureStore';
import {
  fetchActives,
  fetchActiveTypes,
} from 'store/slices/active/activeAsyncThunk';
import {DocumentList} from './DocumentList';
import {DocumentStackProps} from 'types';

export const Documents: React.FC<DocumentStackProps> = ({
  navigation,
  route,
}) => {
  useEffect(() => {
    store.dispatch(fetchActives());
    store.dispatch(fetchActiveTypes());
  });
  return (
    <Screen>
      <DocumentList {...{navigation, route}} />
    </Screen>
  );
};
