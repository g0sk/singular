import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'components';
import IconF from 'react-native-vector-icons/Feather';
import IconI from 'react-native-vector-icons/Ionicons';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import store, {useAppDispatch} from 'store/configureStore';
import {readNdefTag, isEnabled, cancelRequest} from 'utils/nfc_scanner';
import {fetchTag} from 'store/slices/active/activeAsyncThunk';
import {clearActive} from 'store/slices/active/activeSlice';
import Scanning from './Scanning';
import {ScanHomeScreenProps, ActiveState, TagInfo} from 'types';

export const ScanHome: React.FC<ScanHomeScreenProps> = ({
  navigation,
  setEnabled,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [reading, setReading] = useState<boolean>(false);

  useEffect(() => {
    const ready = async () => {
      setEnabled(await isEnabled());
    };
    ready();
  });

  const scanTag = async () => {
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
        })
        .finally(() => cancelRequest());
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
        {!reading ? (
          <View marginHorizontal="m">
            <View margin="m">
              <Text variant="scanHeader">
                {translate('screen.scan.header')}
              </Text>
            </View>
            <View height={175} alignItems="center" marginVertical="m">
              <IconI
                name="radio-outline"
                color={theme.colors.primary}
                size={100}
              />
              <IconF name="smartphone" color={theme.colors.primary} size={60} />
            </View>
            <View
              marginHorizontal="l"
              marginTop="l"
              marginBottom="m"
              alignItems="center"
              height={120}>
              <Text variant="scanDescription">
                {translate('screen.scan.description')}
              </Text>
            </View>
          </View>
        ) : (
          <Scanning />
        )}
        <View marginTop="xl" marginHorizontal="xxl">
          <Button
            label={
              !reading
                ? translate('button.scan.scan')
                : translate('button.scan.cancel')
            }
            variant="primary"
            onPress={() => scanTag()}
          />
        </View>
      </View>
    </View>
  );
};
