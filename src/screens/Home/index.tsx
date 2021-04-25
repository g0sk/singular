import React from 'react';
import {useAuth} from 'core/auth';
import {View, Button} from 'react-native';
import Screen from 'components/Screen';

export const Home = () => {
  const {signOut} = useAuth();
  return (
    <Screen>
      <View>
        <Button title="Logout" onPress={() => signOut()} />
      </View>
    </Screen>
  );
};
