import React, {useState, useEffect} from 'react';
import {Button, SimpleHeader, Segment, Screen, View} from 'components';
import {Dimensions, ToastAndroid} from 'react-native';
import {initNfc, readNdefTag, isEnabled, isSupported} from 'utils/nfc_scanner';
import {translate} from 'core';
import {useNavigation} from '@react-navigation/native';
import {ErrorScan} from './Scan/ErrorScan';
import {TagScan} from './Scan/TagScan';
import {SuccessScan} from './Scan/SuccesScan';
import {TagWrite} from './Write/TagWrite';
import {NfcNotEnabled, NfcNotSupported} from './TechnologyRequest';
import {Active, ActiveTagEvent} from 'types';
import {ErrorWrite} from './Write';

const {height} = Dimensions.get('window');
type Mode = 'read' | 'write';

export const TagHome = () => {
  const navigation = useNavigation();
  const [mode, setMode] = useState<Mode>('read');
  const [reading, setReading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [active, setActive] = useState<Active | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tag, setTag] = useState<ActiveTagEvent | undefined>(undefined);
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

  /* const fetchExistingTag = (reference: string) => {
    dispatch(clearActive());
    dispatch(
      fetchTag({
        pagination: {
          page: 1,
          itemsPerPage: 1,
        },
        filters: [{key: 'reference', value: reference}],
      }),
    ).then(() => {
      const activeState: ActiveState = store.getState().active;
      if (activeState.active !== null) {
        setActive(activeState.active);
      }
    });
  }; */

  const goToDetails = () => {
    if (tag !== undefined) {
      if (active !== null && active !== undefined) {
        navigation.navigate('ActiveDetails', {
          title: active.reference,
          activeId: active.id,
        });
      } else {
        navigation.navigate('NewTag', {title: tag?.id, tag: tag});
      }
      resetState();
    }
  };

  const resetState = () => {
    setError(false);
    setReading(false);
    setTag(undefined);
    setActive(null);
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
      if (!reading) {
        initNfc().then(() =>
          readNdefTag().then(() => {
            /* if (res !== null) {
              setTag(res);
              setReading(false);
              if (res.id) {
                fetchExistingTag(res.id.toString());
              }
            } */
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
          <SimpleHeader
            label={translate('screen.scan.title')}
            labelAction={resetState}
          />
        </View>
        {!supported && <NfcNotSupported />}
        {supported && !enabled && (
          <NfcNotEnabled retry={retry} loading={loading} />
        )}
        {enabled && supported && (
          <View>
            <View
              flexDirection="row"
              justifyContent="flex-end"
              marginHorizontal="m"
              marginBottom="m">
              <Segment
                labels={[
                  {name: translate('action.scan.read'), id: 'read'},
                  {name: translate('action.scan.write'), id: 'write'},
                ]}
                segmentHandler={setMode}
                mode={mode}
              />
            </View>
            <View>
              {mode === 'read' && (
                <View margin="m" height={450}>
                  {tag && !error && <SuccessScan />}
                  {!error && !tag ? (
                    <TagScan />
                  ) : (
                    <ErrorScan supported={supported} enabled={enabled} />
                  )}
                </View>
              )}
              {mode === 'write' && (
                <View margin="m" height={450}>
                  {!error && !tag ? <TagWrite /> : <ErrorWrite />}
                </View>
              )}
              {!error && !tag && !mode && (
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
              {!error && !tag && mode && (
                <View marginVertical="l" marginHorizontal="xxl">
                  <Button
                    label={
                      mode === 'read'
                        ? translate('button.scan.scan')
                        : translate('button.scan.write')
                    }
                    variant="primary"
                    onPress={() => discoverTags()}
                  />
                </View>
              )}
              {!error && tag && (
                <View marginVertical="l" marginHorizontal="xxl">
                  <Button
                    label={translate('button.scan.goToDetails')}
                    variant="primary"
                    onPress={goToDetails}
                  />
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </Screen>
  );
};
