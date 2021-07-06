import React, {useState, useEffect} from 'react';
import {Button, Header, Screen, View} from 'components';
import {Dimensions} from 'react-native';
import {initNfc, readNdef, isEnabled, isSupported} from 'utils/nfc_scanner';
import {TagEvent} from 'react-native-nfc-manager';
import {Vibration} from 'react-native';
import {translate} from 'core';
import ErrorScan from './ErrorScan';
import ScanScreen from './Scan';
import {ToastAndroid} from 'react-native';

const {height} = Dimensions.get('window');

export const Scan = () => {
  const [reading, setReading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tag, setTag] = useState<TagEvent | null>();
  const [enabled, setEnabled] = useState<boolean>(false);
  const [supported, setSupported] = useState<boolean>(false);

  useEffect(() => {
    async function init(): Promise<void> {
      const nfc_supported = await isSupported();
      const nfc_enabled = await isEnabled();
      setSupported(nfc_supported);
      setEnabled(nfc_enabled);
    }
    init();
  }, []);

  const showToast = async () => {
    const nfc_enabled = await isEnabled();
    if (nfc_enabled) {
      setError(false);
      setEnabled(true);
    } else {
      ToastAndroid.showWithGravity(
        translate('error.scan.nfcNotEnabled'),
        ToastAndroid.CENTER,
        ToastAndroid.SHORT,
      );
    }
  };

  const retry = () => {
    setLoading(true);
    setTimeout(async () => {
      showToast();
      setLoading(false);
    }, 3000);
  };
  const discoverTags = () => {
    if (enabled && supported) {
      setReading(!reading);
      if (reading) {
        Vibration.vibrate(500);
        initNfc().then(() => {
          readNdef().then((res) => {
            if (res !== null) {
              setTag(res);
              console.log(tag);
            }
          });
        });
      }
    } else {
      setError(true);
    }
  };

  return (
    <Screen>
      <View height={height - 60}>
        <View margin="m">
          <Header label={translate('screen.scan.title')} disabled={true} />
        </View>
        <View margin="m" height={450}>
          {!error ? (
            <ScanScreen reading={reading} />
          ) : (
            <ErrorScan supported={supported} enabled={enabled} retry={retry} />
          )}
        </View>
        {!error && (
          <View marginVertical="l" marginHorizontal="xxl">
            <Button
              label={translate(
                reading ? 'button.scan.cancel' : 'button.scan.scan',
              )}
              variant="primary"
              onPress={() => discoverTags()}
            />
          </View>
        )}
        {error && supported && (
          <View marginVertical="l" marginHorizontal="xxl">
            <Button
              label={translate('button.scan.retry')}
              variant="primary"
              onPress={() => retry()}
              loading={loading}
              disabled={loading}
            />
          </View>
        )}
      </View>
    </Screen>
  );
};
