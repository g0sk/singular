import React from 'react';
import {Header, View} from 'components';
//import {SafeAreaView} from 'react-native-safe-area-context';

interface ItemType {
  id: number;
  name: string;
}

export const DocumentList = () => {
  return (
    <View>
      <Header
        defaultIcon="plus-circle"
        hasExtraIcon={true}
        extraIcon="search"
        //get username from store
        label="Óscar Santana"
      />
    </View>
  );
};
