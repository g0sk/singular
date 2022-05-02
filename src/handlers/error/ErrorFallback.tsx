import React from 'react';
import {View, Screen, Button, Text} from 'components';

export function ErrorFallback({resetErrorBoundary}: any) {
  return (
    <Screen>
      <View justifyContent="center" flexDirection="row">
        <View margin="l">
          <Text variant="header1">Something went wrong: </Text>
        </View>
        <View>
          <Button
            variant="delete"
            label="Try Again"
            onPress={resetErrorBoundary}
          />
        </View>
      </View>
    </Screen>
  );
}
