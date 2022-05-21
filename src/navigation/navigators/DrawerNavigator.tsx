import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Profile} from 'screens';
import {DrawerNavigatorParamList} from 'types';
import TabNavigator from './TabNavigator';
import CustomDrawerContent from 'navigation/DrawerContent';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'ui/theme';

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();

const DrawerNavigator = () => {
  const theme = useTheme();
  return (
    <Drawer.Navigator
      defaultStatus="closed"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'back',
        headerShown: false,
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
        drawerActiveBackgroundColor: theme.colors.darkPurple,
        drawerActiveTintColor: theme.colors.white,
        drawerInactiveTintColor: theme.colors.darkText,
        drawerItemStyle: {
          marginTop: 20,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({color}) => <Icon name="home" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="person" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
