import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {VERSION} from '@env';
import {ImageBackground} from 'react-native';
import {SmallAvatar} from 'components/SmallAvatar';
import {Button, Text, View} from 'components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {translate} from 'core';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View flex={1}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{paddingTop: insets.top}}>
        <ImageBackground
          source={require('../../assets/images/purple-gradient.jpg')}
          style={{padding: 20}}>
          <View flexDirection="column" marginTop="xxl" marginHorizontal="m">
            <SmallAvatar />
          </View>
        </ImageBackground>
        <View marginVertical="m">
          <DrawerItemList {...props} />
        </View>
        <View alignItems="center" marginVertical="xxl">
          <Button
            variant="logOutDrawer"
            label={translate('button.login.logOut')}
            onPress={() => null}
          />
        </View>
        <View alignItems="center">
          <Text variant="version">
            {translate('app.data.version') + ' ' + VERSION}
          </Text>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerContent;
