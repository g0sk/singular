import React from 'react';
import {Text, View, Button} from 'react-native';
import Screen from 'components/Screen';

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
