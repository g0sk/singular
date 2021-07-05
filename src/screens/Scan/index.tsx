import React, {useState, useEffect} from 'react';
import {Button, Header, Screen, View, Text} from 'components';
import {ActivityIndicator, Dimensions} from 'react-native';
import {isEnabled, isSupported} from 'utils/nfc_scanner';
//import {StyleSheet, ToastAndroid, Vibration} from 'react-native';
import {translate} from 'core';
import {useTheme} from 'ui/Theme';
import IconF from 'react-native-vector-icons/Feather';
import IconI from 'react-native-vector-icons/Ionicons';

const {height} = Dimensions.get('window');
//Add ripple effect when pressing button
export const Scan = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<Promise<boolean>>();
  const [supported, setSupported] = useState<Promise<boolean>>();

  useEffect(() => {
    setSupported(isSupported());
    setEnabled(isEnabled());
  }, []);

  const discoverTags = () => {
    setLoading(!loading);
    console.log(supported);
    /*if (loading) {
      Vibration.vibrate(500);
      initNfc().then(() => {
        setLoading(!loading);
        readNdef();
      });
    } */
  };

  return (
    <Screen>
      <View height={height - 60}>
        <View margin="m">
          <Header label={translate('screen.scan.title')} disabled={true} />
        </View>
        <View margin="m" height={400}>
          {!loading ? (
            <View margin="m">
              <View margin="m">
                <Text variant="scanHeader">
                  {translate('screen.scan.header')}
                </Text>
              </View>
              <View height={175} alignItems="center" margin="m">
                <IconI
                  name="radio-outline"
                  color={theme.colors.primary}
                  size={100}
                />
                <IconF
                  name="smartphone"
                  color={theme.colors.primary}
                  size={60}
                />
              </View>
              <View
                marginVertical="s"
                marginHorizontal="xl"
                alignItems="center">
                <Text variant="description">
                  {translate('screen.scan.description')}
                </Text>
              </View>
            </View>
          ) : (
            <View margin="m">
              <View margin="m">
                <Text variant="scanHeader">
                  {translate('action.scan.scan')}
                </Text>
              </View>
              <View
                height={175}
                alignItems="center"
                margin="m"
                justifyContent="center">
                <ActivityIndicator size="large" color="purple" />
              </View>
              <View
                flexDirection="row"
                marginVertical="s"
                marginHorizontal="xl"
                //alignItems="center"
                //justifyContent="center"
              >
                <View marginRight="ss">
                  <IconI
                    name="information-circle-outline"
                    size={30}
                    color={theme.colors.primary}
                  />
                </View>
                <Text variant="tip">{translate('screen.scan.tip')}</Text>
              </View>
            </View>
          )}
        </View>
        <View marginVertical="l" marginHorizontal="xxl">
          <Button
            label={translate(
              loading ? 'button.scan.cancel' : 'button.scan.scan',
            )}
            variant="primary"
            disabled={!enabled}
            onPress={() => discoverTags()}
          />
        </View>
      </View>
    </Screen>
  );
};
