import React from 'react';
import {Header, SearchBox, View} from 'components';
import {SafeAreaView} from 'react-native-safe-area-context';

interface ItemType {
  id: number;
  name: string;
}

export const DocumentList = () => {
  return (
    <View>
      <Header iconName="plus-circle" />
      <SafeAreaView>
        <SearchBox />
      </SafeAreaView>
    </View>
  );
};
