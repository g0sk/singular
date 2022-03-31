import React, {useState, useEffect} from 'react';
import {Button, SimpleHeader, Screen, View, Text} from 'components';
import {Dimensions, ToastAndroid, Switch} from 'react-native';
import {initNfc, readNdef, isEnabled, isSupported} from 'utils/nfc_scanner';
import {translate} from 'core';
import {useNavigation} from '@react-navigation/native';
import ErrorScan from './ErrorScan';
import Scanning from './Scanning';
import SuccessScan from './SuccesScan';
import Writing from './Writing';
import {Active, ActiveState, ActiveTagEvent} from 'types';
import {fetchTag} from 'store/slices/active/activeAsyncThunk';
import store, {useAppDispatch} from 'store/configureStore';
import {useTheme} from 'ui/theme';
import {clearActive} from 'store/slices/active/activeSlice';

const {height} = Dimensions.get('window');
type Mode = 'read' | 'write';

export const Scan = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [mode, setMode] = useState<boolean>(false);
  const [reading, setReading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [active, setActive] = useState<Active | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tag, setTag] = useState<ActiveTagEvent | undefined>(undefined);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [supported, setSupported] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function init(): Promise<void> {
      const nfc_supported = await isSupported();
      const nfc_enabled = await isEnabled();
      setSupported(nfc_supported);
      setEnabled(nfc_enabled);
    }
    init();
  }, []);

  const fetchExistingTag = (reference: string) => {
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
  };

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
          readNdef().then((res) => {
            if (res !== null) {
              setTag(res);
              setReading(false);
              if (res.id) {
                fetchExistingTag(res.id.toString());
              }
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
          <SimpleHeader label={translate('screen.scan.title')} />
        </View>
        {!error && !tag && (
          <View marginRight="xl" flexDirection="row" justifyContent="flex-end">
            <View marginHorizontal="s">
              <Text variant="scanMode">
                {translate(!mode ? 'action.scan.read' : 'action.scan.write')}
              </Text>
            </View>
            <View>
              <Switch
                thumbColor={theme.colors.primary}
                trackColor={{
                  true: theme.colors.primaryLight,
                  false: theme.colors.lightGray,
                }}
                value={mode}
                onValueChange={(value) => setMode(value)}
              />
            </View>
          </View>
        )}
        {!mode && (
          <View margin="m" height={450}>
            {tag && !error && <SuccessScan tag={tag} />}
            {!error && !tag ? (
              <Scanning reading={reading} />
            ) : (
              <ErrorScan supported={supported} enabled={enabled} />
            )}
          </View>
        )}
        {mode && (
          <View margin="m" height={450}>
            {!error && !tag ? (
              <Writing />
            ) : (
              <ErrorScan supported={supported} enabled={enabled} />
            )}
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
              label={translate('button.scan.write')}
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
              label={translate('button.scan.goToDetails')}
              variant="primary"
              onPress={goToDetails}
            />
          </View>
        )}
      </View>
    </Screen>
  );
};
