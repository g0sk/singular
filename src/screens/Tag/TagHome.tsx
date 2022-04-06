import React, {useState, useEffect} from 'react';
import {SimpleHeader, Segment, Screen, View} from 'components';
import {Dimensions, ToastAndroid} from 'react-native';
import {isEnabled, isSupported} from 'utils/nfc_scanner';
import {translate} from 'core';
import {WriteHome} from './Write';
import {ScanHome} from './Scan';
import {NfcNotEnabled, NfcNotSupported} from './TechnologyRequest';
import {TagHomeStackProps} from 'types';

const {height} = Dimensions.get('window');
type Mode = 'read' | 'write';

export const TagHome: React.FC<TagHomeStackProps> = ({route, navigation}) => {
  const [error, setError] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>('read');
  const [enabled, setEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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

  const resetState = () => {
    setError(false);
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
                  {!error && enabled && supported && (
                    <ScanHome {...{navigation, route}} />
                  )}
                </View>
              )}
              {mode === 'write' && (
                <View margin="m" height={450}>
                  {!error && enabled && supported && (
                    <WriteHome {...{navigation, route}} />
                  )}
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </Screen>
  );
};
