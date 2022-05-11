import React from 'react';
import {View, Screen, Button, Text} from 'components';
import Icon from 'react-native-vector-icons/Ionicons';
import {translate} from 'core';
import {useTheme} from 'ui/theme';

export function ErrorFallback({resetErrorBoundary}: any) {
  return (
    <Screen>
      <View justifyContent="center" flexDirection="column">
        <View margin="xl" height={385}>
          <View>
            <Text variant="errorHeader">{translate('error.general.oops')}</Text>
          </View>
          <View alignItems="center" marginVertical="dxxl">
            <Icon
              name="thumbs-down-outline"
              size={100}
              color={useTheme().colors.error}
            />
          </View>
        </View>
        <View marginVertical="dxxl" marginHorizontal="xxl">
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
