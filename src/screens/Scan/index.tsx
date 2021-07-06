import React, {useState, useEffect} from 'react';
import {Button, Header, Screen, View} from 'components';
import {Dimensions, ToastAndroid} from 'react-native';
import {initNfc, readNdef, isEnabled, isSupported} from 'utils/nfc_scanner';
import {TagEvent} from 'react-native-nfc-manager';
import {translate} from 'core';
import {useNavigation} from '@react-navigation/native';
import ErrorScan from './ErrorScan';
import Scanning from './Scanning';
import SuccessScan from './SuccesScan';

const {height} = Dimensions.get('window');

export const Scan = () => {
  const {navigate} = useNavigation();
  const [reading, setReading] = useState(false);
  const [rest, setRest] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
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

  const goToDetails = () => {
    setReset(true);
    navigate('Document', {
      activeId: tag?.id,
      title: tag?.id,
      tag: tag,
    });
  };

  const resetState = () => {
    setError(false);
    setReset(false);
    setReading(false);
    setTag(null);
  };

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
    }, 2000);
  };

  const discoverTags = async () => {
    if (enabled && supported) {
      const enabledRes = await isEnabled();
      setEnabled(enabledRes);
      setReading(!reading);
      setRest(!rest);
      if (!rest) {
        console.log('estoy dentro');
        initNfc().then(() =>
          readNdef().then((res) => {
            if (res !== null) {
              setTag(res);
              setReading(false);
              setRest(false);
            }
          }),
        );
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
          {tag && !error && <SuccessScan tag={tag} />}
          {!error && !tag ? (
            <Scanning reading={reading} />
          ) : (
            <ErrorScan supported={supported} enabled={enabled} />
          )}
        </View>
        {!error && !tag && (
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
        {error && supported && !tag && (
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
        {!error && tag && (
          <View marginVertical="l" marginHorizontal="xxl">
            <Button
              label={translate(
                !reset ? 'button.scan.goToDetails' : 'button.scan.scanAgain',
              )}
              variant="primary"
              onPress={() => (!reset ? goToDetails() : resetState())}
            />
          </View>
        )}
      </View>
    </Screen>
  );
};
