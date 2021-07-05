import React, {useState, useEffect} from 'react';
import {Button, Header, Screen, View, Text} from 'components';
import {ActivityIndicator} from 'react-native';
import {initNfc, readNdef} from 'utils/nfc_scanner';
import {StyleSheet, Vibration} from 'react-native';
import {translate} from 'core';
import {useTheme} from 'ui/Theme';
import Icon from 'react-native-vector-icons/Feather';
//import {TagEvent} from 'react-native-nfc-manager';

export const Scan = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  //const [error, setError] = useState<boolean>(false);
  //const [enabled, setEnabled] = useState<boolean>(false);
  //const [supported, setSupported] = useState<boolean>(false);
  //const [tag, setTag] = useState<TagEvent | null>();

  //Reset state on unMount
  useEffect(() => {
    /*
    isSupported()
      .then(() => setSupported(true))
      .catch(() => setSupported(false));

    isEnabled()
      .then(() => setEnabled(true))
      .catch(() => setEnabled(false));

    function unMount() {
      setError(false);
      setEnabled(false);
      setSupported(false);
    }
    return unMount();
    */
  }, []);

  const discoverTags = () => {
    setLoading(!loading);
    if (loading) {
      Vibration.vibrate(500);
      initNfc().then(() => {
        setLoading(!loading);
        readNdef();
      });
    }
  };

  return (
    <Screen>
      <View>
        <View margin="m">
          <Header label={translate('screen.scan.title')} />
        </View>
        <View>
          {loading ? (
            <View>
              <View margin="s">
                <Text variant="scanHeader">Searching tags</Text>
              </View>
              <View margin="l">
                <ActivityIndicator size="large" color="purple" />
              </View>
              <View margin="s">
                <Text variant="description">
                  Bring the back of the device close to the card
                </Text>
              </View>
            </View>
          ) : (
            <View>
              <View margin="s">
                <Text variant="scanHeader">Start searching tags</Text>
              </View>
              <View alignItems="center" margin="l">
                <Icon name="cpu" color={theme.colors.primary} size={30} />
              </View>
              <View margin="s" alignItems="center">
                <Text variant="description">
                  To begin searching tags, press de the scan button and bring
                  the device close to the tag
                </Text>
              </View>
            </View>
          )}
        </View>
        <View padding="xl">
          <Button
            margin="xl"
            label={loading ? 'Cancel' : 'Scan'}
            variant="primary"
            onPress={() => discoverTags()}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  scanButton: {},
  scanImage: {
    alignItems: 'center',
    textAlign: 'center',
    //backgroundColor: 'gray',
    //height: 400,
    //width: 400,
  },
});
