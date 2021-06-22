import React from 'react';
import {Header, View} from 'components';
import {DocumentListProps} from '../../../types';
//import {SafeAreaView} from 'react-native-safe-area-context';

export const DocumentList: React.FC<DocumentListProps> = ({user}) => {
  const userName = user !== null ? user.name + ' ' + user.lastName : '';
  return (
    <View>
      <Header
        contentUrl={user?.image?.contentUrl}
        defaultIcon="plus-circle"
        hasExtraIcon={true}
        extraIcon="search"
        label={userName}
      />
    </View>
  );
};
