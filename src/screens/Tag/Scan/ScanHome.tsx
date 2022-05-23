import React, {useState} from 'react';
import {Button, Text, View} from 'components';
import IconF from 'react-native-vector-icons/Feather';
import IconI from 'react-native-vector-icons/Ionicons';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import store, {useAppDispatch} from 'store/configureStore';
import {readNdefTag, cancelRequest} from 'core/nfc/nfc_scanner';
import {fetchTag} from 'store/slices/active/activeAsyncThunk';
import {clearActive} from 'store/slices/active/activeSlice';
import {ScanHomeScreenProps, ActiveState, TagInfo} from 'types';
import {useNfc} from 'core/nfc';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {isEnabled} from 'core/nfc/nfc_scanner';

export const ScanHome: React.FC<ScanHomeScreenProps> = ({navigation}) => {
  const theme = useTheme();
  const {checkNfcEnabled} = useNfc();
  const dispatch = useAppDispatch();
  const [reading, setReading] = useState<boolean>(false);

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
    <View margin="m">
      <View>
        {!reading ? (
          <View marginTop="xl" marginHorizontal="m" height={507}>
            <View>
              <Text variant="scanHeader">
                {translate('screen.scan.header')}
              </Text>
            </View>
            <View
              alignItems="center"
              marginTop="xl"
              marginBottom="l"
              height={200}>
              <IconI
                name="radio-outline"
                color={theme.colors.primary}
                size={100}
              />
              <IconF name="smartphone" color={theme.colors.primary} size={60} />
            </View>
            <View
              marginHorizontal="m"
              marginTop="xxl"
              marginBottom="m"
              alignItems="center">
              <Text variant="scanDescription">
                {translate('screen.scan.description')}
              </Text>
            </View>
          </View>
        ) : (
          <View marginTop="xl" marginHorizontal="m" height={507}>
            <View>
              <View>
                <Text variant="scanHeader">
                  {translate('action.scan.scan')}
                </Text>
              </View>
              <View marginVertical="xxl">
                <View marginTop="l">
                  <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                  />
                </View>
                <View
                  flexDirection="row"
                  marginHorizontal="m"
                  marginTop="dxxl"
                  marginBottom="m"
                  alignItems="center">
                  <View marginRight="s">
                    <Icon
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
          </View>
        )}
        <View marginTop="xl" marginHorizontal="xxl">
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
