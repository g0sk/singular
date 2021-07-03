import React, {useState, useEffect} from 'react';
import {Button, Screen, View, Text} from 'components';
import {ActivityIndicator} from 'react-native';
import {initNfc, readNdef} from 'utils/nfc_scanner';
import {StyleSheet, Vibration} from 'react-native';
//import {TagEvent} from 'react-native-nfc-manager';

export const Scan = () => {
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

  /*
  const NotEnabledErrorMessage = () => {
    return (
      <View style={styles.container}>
        <View margin="s">
          <Text variant="scanError">Error</Text>
          <Text margin="m" variant="errorDescription">
            NFC is not enabled
          </Text>
        </View>
        <View margin="s">
          <Text variant="description">
            In order to start scanning you need to enable NFC on the device
            settings
          </Text>
        </View>
      </View>
    );
  };
  const NotSupportedErrorMessage = () => {
    return (
      <View style={styles.container}>
        <View margin="s">
          <Text variant="scanError">Error</Text>
          <Text margin="m" variant="errorDescription">
            NFC is not enabled
          </Text>
          <Text margin="m" variant="errorDescription">
            NFC technology is not supported by the device
          </Text>
        </View>
        <View margin="s">
          <Text variant="description">
            In order to start scanning you need to enable NFC on the device
            settings
          </Text>
          <Text variant="description">
            You can't use this function with the current device
          </Text>
        </View>
      </View>
    );
  };
*/
  return (
    <Screen>
      <View style={styles.container} paddingTop="xl">
        <View style={styles.scanImage} marginTop="xl" height={500}>
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
              <View margin="s">
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
  container: {
    //flex: 1,
    margin: 20,
    //backgroundColor: 'red',
  },
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
