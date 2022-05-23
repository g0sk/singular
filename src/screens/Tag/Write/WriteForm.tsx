import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  SimpleTextInput as TextInput,
  Dropdown,
} from 'components';
import {translate} from 'core';
import {ActiveType} from 'types';
import {ActiveTypeState, WriteFormScreenProps} from 'types';
import store, {useAppSelector} from 'store/configureStore';
import {fetchActiveTypesList} from 'store/slices/activeType/activeTypeAsyncThunk';
import {
  cancelRequest,
  initNfc,
  writeNdefTextRecord,
} from 'core/nfc/nfc_scanner';
import {
  ActivityIndicator,
  TextInput as RNTextInput,
  ToastAndroid,
} from 'react-native';
import {clearActiveTypeList} from 'store/slices/activeType/activeTypeSlice';
import {useTheme} from 'ui/theme';
import {isEnabled} from 'core/nfc/nfc_scanner';
import {useNfc} from 'core/nfc';
import Icon from 'react-native-vector-icons/Ionicons';

export const WriteForm: React.FC<WriteFormScreenProps> = ({navigation}) => {
  const {colors} = useTheme();
  const {checkNfcEnabled} = useNfc();
  const {activeTypes}: ActiveTypeState = useAppSelector(
    (state) => state.activeType,
  );
  const [reference, setReference] = useState<string>('');
  const referenceRef = createRef<RNTextInput>();
  const [referenceError, setReferenceError] = useState<boolean>(false);
  const [activeType, setActiveType] = useState<ActiveType | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [writing, setWriting] = useState<boolean>(false);

  useEffect(() => {
    store.dispatch(clearActiveTypeList());
    store.dispatch(
      fetchActiveTypesList({
        pagination: {
          page: 1,
          itemsPerPage: 1,
        },
        filters: [],
      }),
    );
  }, []);

  useEffect(() => {
    referenceRef.current?.focus();
  }, [referenceRef]);

  useEffect(() => {
    if (writing) {
      navigation.setOptions({headerShown: false});
    } else {
      navigation.setOptions({headerShown: true});
    }
  }, [writing, navigation]);

  const resetState = () => {
    setReference('');
    setReferenceError(false);
    setActiveType(null);
    setError(false);
    setWriting(false);
  };

  const onReferenceBlur = () => {
    if (reference.length >= 8) {
      referenceError ? setReferenceError(false) : null;
    } else {
      setReferenceError(true);
      setError(true);
    }
  };

  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.CENTER);
  };

  const handleWrite = () => {
    if (reference.length < 8) {
      setReferenceError(true);
      showToast(translate('form.field.minRef'));
    } else if (activeType === null) {
      showToast(translate('form.field.typeSelect'));
    } else {
      writeTag();
    }
  };

  const writeTag = async () => {
    const _enabled = await isEnabled();
    if (_enabled && activeType && !error) {
      setWriting(!writing);
      if (!writing) {
        initNfc()
          .then(() => {
            writeNdefTextRecord(reference, activeType.id.toString()).then(
              (res) => {
                if (res) {
                  navigation.navigate('WriteSuccess', {
                    title: translate('screen.scan.home'),
                    reference,
                    type: activeType.name,
                  });
                  resetState();
                }
              },
            );
          })
          .catch(() => {
            console.log('Writing aborted in screen');
          });
      } else {
        cancelRequest();
      }
    } else {
      checkNfcEnabled();
    }
  };

  return (
    <View margin="m">
      {!writing ? (
        <View height={491}>
          <View marginHorizontal="m" marginTop="m" marginBottom="m">
            <Text variant="header1">{translate('form.write.title')}</Text>
          </View>
          <View
            marginHorizontal="m"
            flexDirection="column"
            borderRadius={25}
            borderWidth={2}
            borderColor="primary">
            <View flexDirection="column" paddingHorizontal="m">
              <View marginVertical="m">
                <Text variant="dataLabel">
                  {translate('form.write.reference.placeholder')}
                </Text>
              </View>
              <View minWidth={100} maxWidth={200}>
                <TextInput
                  style={{
                    padding: 0,
                    borderBottomColor: referenceError
                      ? colors.error
                      : colors.primary,
                    borderBottomWidth: 1,
                  }}
                  ref={referenceRef}
                  autoCapitalize="characters"
                  onChangeText={setReference}
                  placeholder={translate('form.active.reference.placeholder')}
                  value={reference}
                  onBlur={() => onReferenceBlur}
                />
              </View>
            </View>
            <View
              flexDirection="column"
              marginVertical="m"
              paddingHorizontal="m">
              <View marginVertical="m">
                <Text variant="dataLabel">Type</Text>
              </View>
              <View>
                <Dropdown
                  selected={activeType}
                  options={activeTypes}
                  editSelected={true}
                  setParentValue={setActiveType}
                  header={translate('form.write.type.label')}
                  placeholder={translate('form.activeType.type.placeholder')}
                />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View marginHorizontal="xl" height={491}>
          <View>
            <View>
              <Text variant="scanHeader">{translate('action.scan.write')}</Text>
            </View>
            <View marginVertical="xxl">
              <View marginTop="l">
                <ActivityIndicator size="large" color={colors.primary} />
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
                    color={colors.primary}
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
      <View marginHorizontal="xxl" marginTop="xl">
        <Button
          variant="primary"
          label={
            !writing
              ? translate('button.scan.write')
              : translate('button.scan.cancel')
          }
          onPress={handleWrite}
        />
      </View>
    </View>
  );
};
