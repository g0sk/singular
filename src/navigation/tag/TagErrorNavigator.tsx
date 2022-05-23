import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TagErrorNavigatorParamList} from 'types';
import {useNfc} from 'core/nfc';
import {NfcNotEnabled, NfcNotSupported} from 'screens';

const Stack = createNativeStackNavigator<TagErrorNavigatorParamList>();

const TagErrorNavigator = () => {
  const {supported, enabled} = useNfc();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!supported && (
        <Stack.Screen name="NfcNotSupported" component={NfcNotSupported} />
      )}
      {supported && !enabled && (
        <Stack.Screen name="NfcNotEnabled" component={NfcNotEnabled} />
      )}
    </Stack.Navigator>
  );
};

export default TagErrorNavigator;
