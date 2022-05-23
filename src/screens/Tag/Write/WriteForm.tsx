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
import {initNfc, writeNdefTextRecord} from 'core/nfc/nfc_scanner';
import {TextInput as RNTextInput, ToastAndroid} from 'react-native';
import {clearActiveTypeList} from 'store/slices/activeType/activeTypeSlice';
import {useTheme} from 'ui/theme';
import Writting from './Writting';

export const WriteForm: React.FC<WriteFormScreenProps> = ({navigation}) => {
  const {colors} = useTheme();
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

  const writeTag = () => {
    if (activeType !== null && !error) {
      setWriting(true);
      initNfc()
        .then(() => {
          writeNdefTextRecord(reference, activeType.id.toString()).then(() => {
            navigation.navigate('WriteSuccess', {
              title: translate('screen.scan.home'),
              reference,
              type: activeType.name,
            });
            resetState();
          });
        })
        .catch(() => {
          setError(true);
        });
    }
  };

  return (
    <View>
      {!writing ? (
        <View height={507}>
          <View margin="m">
            <Text variant="header1">{translate('form.write.title')}</Text>
          </View>
          <View
            marginVertical="m"
            marginHorizontal="m"
            padding="m"
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
        <Writting />
      )}
      <View marginHorizontal="xxl" paddingHorizontal="m" marginTop="xl">
        <Button label="Write" onPress={() => handleWrite()} />
      </View>
    </View>
  );
};
