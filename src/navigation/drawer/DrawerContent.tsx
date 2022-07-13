import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import {VERSION} from '@env';
import {Alert, ImageBackground} from 'react-native';
import {SmallAvatar} from 'components/SmallAvatar';
import {Text, View} from 'components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {translate, useAuth} from 'core';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const insets = useSafeAreaInsets();
  const {signOut} = useAuth();
  const {colors} = useTheme();
  const logOut = () => {
    Alert.alert(
      translate('action.login.logOut.title'),
      translate('action.login.logOut.message'),
      [
        {
          text: translate('button.general.cancel'),
          onPress: () => null,
        },
        {
          text: translate('button.login.logOut'),
          onPress: () => signOut(),
        },
      ],
    );
  };

  return (
    <View flex={1}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{paddingTop: insets.top}}>
        <ImageBackground
          source={require('../../../assets/images/purple-gradient.jpg')}
          style={{padding: 20}}>
          <View flexDirection="column" marginTop="xxl" marginHorizontal="m">
            <SmallAvatar {...props} />
          </View>
        </ImageBackground>
        <View marginVertical="m">
          <DrawerItemList {...props} />
          <View marginTop="xxl">
            <DrawerItem
              label={() => (
                <Text variant="drawerItem">
                  {translate('action.login.logOut.title')}
                </Text>
              )}
              icon={() => (
                <Icon name="log-out-outline" size={30} color={colors.primary} />
              )}
              onPress={() => logOut()}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View>
        <View
          alignItems="center"
          flexDirection="row"
          marginHorizontal="l"
          marginBottom="m"
          justifyContent="flex-start">
          <Text variant="version">
            {translate('app.data.version') + ' ' + VERSION}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawerContent;
