import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {VERSION} from '@env';
import {Alert, ImageBackground, TouchableOpacity} from 'react-native';
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
            <SmallAvatar />
          </View>
        </ImageBackground>
        <View marginVertical="m">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        alignItems="center"
        flexDirection="row"
        marginHorizontal="l"
        marginBottom="m"
        justifyContent="space-between">
        <View>
          <Text variant="version">
            {translate('app.data.version') + ' ' + VERSION}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={logOut}>
            <Icon name="log-out-outline" size={30} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawerContent;
