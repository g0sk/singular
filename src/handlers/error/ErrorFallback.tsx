import React from 'react';
import {Text, Button} from 'react-native';
import {View, Screen} from 'components';

export function ErrorFallback({resetErrorBoundary}: any) {
  return (
    <Screen>
      <View>
        <Text>Something went wrong: </Text>
        <Button title="Try Again" onPress={resetErrorBoundary} />
      </View>
    </Screen>
  );
}
