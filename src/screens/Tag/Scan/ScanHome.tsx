import React, {useState} from 'react';
import {Button, Text, View} from 'components';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import IconF from 'react-native-vector-icons/Feather';
import IconI from 'react-native-vector-icons/Ionicons';
import {ActiveState, TagInfo, TagHomeStackProps} from 'types';
import {useAppDispatch, useAppSelector} from 'store/configureStore';
import {initNfc, isEnabled, readNdefTag} from 'utils/nfc_scanner';
import {fetchTag} from 'store/slices/active/activeAsyncThunk';
import {clearActive} from 'store/slices/active/activeSlice';
import {Scanning} from './Scanning';
import {Error} from '../Error';

export const ScanHome: React.FC<TagHomeStackProps> = ({navigation}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const activeState: ActiveState = useAppSelector((state) => state.active);
  const [tag, setTag] = useState<TagInfo>(null);
  //const [activeFound, setActiveFound] = useState<boolean>(false);
  const [reading, setReading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const resetState = () => {
    setTag(null);
    setReading(false);
    setError(false);
  };

  const scanTag = async () => {
    setReading(true);
    if (await isEnabled()) {
      initNfc().then(() => {
        readNdefTag()
          .then((res) => {
            if (res !== null) {
              setTag(res);
              if (res.activeInfo !== null) {
                fetchExistingTag(res.activeInfo.reference);
              }
            } else {
              //showNotif()
            }
          })
          .catch(() => {
            setError(true);
          });
      });
    }
    setReading(false);
  };

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
      if (activeState.active !== null) {
        const existingActive = activeState.active;
        navigation.push('ScanActiveSuccess', {
          active: existingActive,
          resetState,
        });
      } else {
        if (tag !== null) {
          navigation.push('ScanTagSuccess', {tag: tag, resetState});
        }
      }
    });
  };

  return (
    <View margin="m">
      {!reading && !error && (
        <View>
          <View margin="m">
            <Text variant="scanHeader">{translate('screen.scan.header')}</Text>
          </View>
          <View height={175} alignItems="center" margin="m">
            <IconI
              name="radio-outline"
              color={theme.colors.primary}
              size={100}
            />
            <IconF name="smartphone" color={theme.colors.primary} size={60} />
          </View>
          <View marginVertical="s" marginHorizontal="l" alignItems="center">
            <Text variant="scanDescription">
              {translate('screen.scan.description')}
            </Text>
          </View>
          <View marginVertical="l" marginHorizontal="xxl">
            <Button
              label={translate('button.scan.scan')}
              variant="primary"
              onPress={() => scanTag()}
            />
          </View>
        </View>
      )}
      {reading && !error && <Scanning />}
      {error && <Error error="read" />}
    </View>
  );
};
