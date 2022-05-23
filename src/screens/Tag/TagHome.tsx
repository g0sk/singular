export const a = 0;
/* import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SimpleHeader, Segment, Screen, View} from 'components';
import {ActivityIndicator, Dimensions, ToastAndroid} from 'react-native';
import {translate} from 'core';
import {WriteHome} from './Write';
import {ScanHome} from './Scan';
import {TagHomeStackProps} from 'types';
import {NfcNotEnabled, NfcNotSupported} from './TechnologySupport';
import {isEnabled, isSupported} from 'utils/nfc_scanner';

const {height} = Dimensions.get('window');
type Mode = 'read' | 'write';

export const TagHome: React.FC = () => {
  const [mode, setMode] = useState<Mode>('read');
  const [reset, setReset] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [supported, setSupported] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      setSupported(await isSupported());
      setEnabled(await isEnabled());
    };
    init();
  }, []);

  useLayoutEffect(() => {
    const spinner = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    spinner();
  }, [reset]);

  const retry = async () => {
    setReset(!reset);
    const _enabled = await isEnabled();
    setEnabled(_enabled);
    if (!_enabled) {
      ToastAndroid.showWithGravity(
        translate('error.scan.nfcNotEnabled'),
        ToastAndroid.CENTER,
        ToastAndroid.SHORT,
      );
    }
  };

  const TagOperations: React.FC = () => {
    return (
      <View>
        {mode === 'read' && (
          <View margin="m" height={450}>
            <ScanHome {...{navigation, route, setEnabled: setEnabled}} />
          </View>
        )}
        {mode === 'write' && (
          <View margin="m" height={450}>
            <WriteHome
              {...{
                navigation,
                route,
                setEnabled: setEnabled,
              }}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <Screen>
      <View height={height - 60}>
        <View margin="m">
          <SimpleHeader
            label={translate('screen.scan.title')}
            labelAction={() => setReset(true)}
          />
        </View>
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
        </View>
        {loading ? (
          <View margin="dxxl" paddingTop="dxxl">
            <ActivityIndicator
              size="large"
              color="purple"
              animating={loading}
            />
          </View>
        ) : (
          <View>
           {  {supported && enabled && <TagOperations />}
            {supported && !enabled && <NfcNotEnabled retry={retry} />}
            {!supported && <NfcNotSupported />} }
          </View>
        )}
      </View>
    </Screen>
  );
};
 */
