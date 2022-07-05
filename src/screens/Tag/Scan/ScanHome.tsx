import React, {useState} from 'react';
import {Button, SimpleHeader, Text, View} from 'components';
import IconI from 'react-native-vector-icons/Ionicons';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import store, {useAppDispatch} from 'store/configureStore';
import {readNdefTag, cancelRequest} from 'core/nfc/nfc_scanner';
import {fetchTag} from 'store/slices/active/activeAsyncThunk';
import {clearActive} from 'store/slices/active/activeSlice';
import {ScanHomeScreenProps, ActiveState, TagInfo} from 'types';
import {useNfc} from 'core/nfc';
import {ActivityIndicator, Alert} from 'react-native';
import {isEnabled} from 'core/nfc/nfc_scanner';
import {DrawerActions} from '@react-navigation/native';

export const ScanHome: React.FC<ScanHomeScreenProps> = ({navigation}) => {
  const theme = useTheme();
  const {checkNfcEnabled} = useNfc();
  const dispatch = useAppDispatch();
  const [reading, setReading] = useState<boolean>(false);

  const nfcAlert = () =>
    Alert.alert(
      translate('error.scan.nfcNotEnabled'),
      translate('error.scan.enableNfc'),
      [{text: 'OK', onPress: () => null}],
    );

  const scanTag = async () => {
    const _enabled: boolean = await isEnabled();
    if (_enabled) {
      setReading(!reading);
      if (!reading) {
        readNdefTag()
          .then((res) => {
            if (res !== null && res.activeInfo !== null) {
              fetchExistingTag(res);
            }
          })
          .catch(() => {
            console.log('Scan aborted in screen');
          });
      } else {
        cancelRequest();
      }
    } else {
      checkNfcEnabled();
      nfcAlert();
    }
  };

  const fetchExistingTag = (tag: TagInfo) => {
    dispatch(clearActive());
    if (tag) {
      dispatch(
        fetchTag({
          pagination: {
            page: 1,
            itemsPerPage: 1,
          },
          filters: [
            {
              key: 'reference',
              value: tag.activeInfo.reference ? tag.activeInfo.reference : '',
            },
          ],
        }),
      ).then(() => {
        const {active}: ActiveState = store.getState().active;
        if (active === null) {
          navigation.navigate('ScanTagSuccess', {
            tag: tag,
            title: translate('screen.scan.home'),
          });
        } else {
          navigation.navigate('ScanActiveSuccess', {
            title: active.reference,
            active,
          });
        }
      });
    }
    setReading(false);
  };

  return (
    <View>
      <View>
        <View marginTop="m" marginLeft="m">
          <SimpleHeader
            label={
              !reading
                ? translate('screen.scan.header')
                : translate('screen.scan.headerScanning')
            }
            labelAction={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        </View>
        {!reading ? (
          <View margin="m" height={507}>
            <View alignItems="center" marginTop="xl" padding="l">
              <IconI
                name="radio-outline"
                color={theme.colors.primary}
                size={150}
              />
            </View>
            <View marginHorizontal="xl" marginTop="xxl" alignItems="center">
              <Text variant="scanDescription">
                {translate('screen.scan.description')}
              </Text>
            </View>
          </View>
        ) : (
          <View margin="m" height={507}>
            <View marginVertical="dxxl">
              <View marginTop="l">
                <ActivityIndicator size="large" color={theme.colors.primary} />
              </View>
              <View
                flexDirection="row"
                marginHorizontal="xxl"
                marginTop="dxxl"
                marginBottom="m"
                alignItems="center"
                justifyContent="center">
                <View marginRight="s">
                  <IconI
                    name="information-circle-outline"
                    size={30}
                    color={theme.colors.primary}
                  />
                </View>
                <View>
                  <Text variant="tip">{translate('screen.scan.tip')}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        <View marginTop="m" marginHorizontal="xxl">
          <Button
            label={
              !reading
                ? translate('button.scan.scan')
                : translate('button.scan.cancel')
            }
            variant="primary"
            onPress={scanTag}
          />
        </View>
      </View>
    </View>
  );
};
