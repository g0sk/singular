import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActiveDetailsScreenProps,
  ActiveType,
  Attribute,
  File,
  NewActiveProps,
  ServerError,
} from 'types';
import {fetchUnits} from 'store/slices/unit/unitAsyncThunk';
import {createActive, fetchActives} from 'store/slices/active/activeAsyncThunk';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {
  Button,
  Text,
  View,
  DynamicSection,
  ImageUpload,
  Dropdown,
} from 'components';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {translate} from 'core';
import {useFocusEffect} from '@react-navigation/core';
import {resetUnitState} from 'store/slices/unit/unitSlice';
import {
  fetchActiveType,
  fetchActiveTypes,
} from 'store/slices/activeType/activeTypeAsyncThunk';
import {useTheme} from 'ui/theme';

export const NewActive: React.FC<ActiveDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const [basicAttributes, setBasicAttributes] = useState<Attribute[]>([]);
  const [customAttributes, setCustomAttributes] = useState<Attribute[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [change, setChange] = useState<boolean>(false);
  const [reference, setReference] = useState<string>('');
  const [referenceError, setReferenceError] = useState<boolean>(false);
  const [type, setType] = useState<ActiveType | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const activeState = useAppSelector((state) => state.active);
  const {activeTypes, loading} = useAppSelector((state) => state.activeType);
  const referenceRef = useRef<TextInput>(null);
  const theme = useTheme();

  useEffect(() => {
    store.dispatch(fetchUnits());
    store.dispatch(fetchActiveTypes({page: 1, itemsPerPage: 30}));
  }, [route.params]);

  useEffect(() => {
    if (type !== null) {
      store.dispatch(fetchActiveType(type.id)).then(() => {
        const {activeType} = store.getState().activeType;
        if (activeType !== null) {
          setBasicAttributes(activeType.basicAttributes);
          setCustomAttributes(activeType.customAttributes);
        }
      });
    }
  }, [type]);

  //Unmount when screen loses focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        store.dispatch(resetUnitState());
      };
    }, []),
  );

  const onHandleSave = () => {
    if (reference.length < 8) {
      setReferenceError(true);
      setChange(false);
      ToastAndroid.showWithGravity(
        translate('form.field.minRef'),
        ToastAndroid.CENTER,
        ToastAndroid.LONG,
      );
    } else if (type === null) {
      setChange(false);
      ToastAndroid.showWithGravity(
        translate('form.field.typeSelect'),
        ToastAndroid.CENTER,
        ToastAndroid.LONG,
      );
    } else {
      onSave();
    }
  };

  const onSave = () => {
    if (type !== null) {
      const newActive: NewActiveProps = {
        reference: reference,
        description: description,
        activeType: {...type},
        basicAttributes: [...basicAttributes],
        customAttributes: [...customAttributes],
        file: file !== null ? {...file} : null,
      };
      dispatch(createActive(newActive))
        .unwrap()
        .then(() => {
          dispatch(fetchActives({page: 1, itemsPerPage: 7}));
          navigation.goBack();
        })
        .catch((refError: ServerError) => {
          ToastAndroid.showWithGravity(
            translate('error.general.used') +
              ' (' +
              refError.violations[0].propertyPath +
              ')',
            ToastAndroid.CENTER,
            ToastAndroid.LONG,
          );
          setChange(false);
        });
    }
  };

  const onChange = useCallback(() => {
    if (!change) {
      setChange(true);
    }
  }, [change]);

  const onFileChange = (_file: File | null) => {
    if (_file !== null) {
      setFile({..._file});
    } else {
      setFile(null);
    }
    onChange();
  };

  const onReferenceChange = (_reference: string) => {
    setReference(_reference);
    if (_reference.length >= 8) {
      referenceError ? setReferenceError(false) : null;
      onChange();
    } else {
      setReferenceError(true);
    }
  };

  const onTypeChange = (_type: ActiveType) => {
    initialLoad ? setInitialLoad(false) : null;
    setType(_type);
    onChange();
  };

  const onDescriptionChange = (_description: string) => {
    setDescription(_description);
    onChange();
  };

  const onBasicAttributesChange = (_basicAttributes: Attribute[]) => {
    setBasicAttributes([..._basicAttributes]);
    onChange();
  };
  const onCustomAttributesChange = (_customAttributes: Attribute[]) => {
    setCustomAttributes([..._customAttributes]);
    onChange();
  };

  return (
    <View style={styles.container} marginHorizontal="m" marginBottom="m">
      {loading && initialLoad ? (
        <View style={styles.loading}>
          <ActivityIndicator animating={loading} size="large" color="black" />
        </View>
      ) : (
        <ScrollView
          horizontal={false}
          refreshControl={<RefreshControl refreshing={activeState.loading} />}>
          <View marginTop="m">
            <TouchableOpacity onPress={() => referenceRef.current?.focus()}>
              <View flexDirection="column" alignItems="flex-start">
                <View>
                  <Text variant="formLabel">
                    {translate('form.active.reference.label')}
                  </Text>
                </View>
                <View>
                  <TextInput
                    style={{
                      padding: 0,
                      borderBottomColor: referenceError
                        ? theme.colors.error
                        : theme.colors.primary,
                      borderBottomWidth: 1,
                    }}
                    selectionColor={theme.colors.primary}
                    ref={referenceRef}
                    value={reference}
                    onChangeText={onReferenceChange}
                    placeholder={translate('form.active.reference.placeholder')}
                    maxLength={16}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View marginTop="m" marginBottom="s">
            <View>
              <Text variant="formLabel">
                {translate('form.active.type.label')}
              </Text>
            </View>
            <View marginVertical="s">
              <Dropdown
                selected={type}
                options={activeTypes}
                editSelected={true}
                setParentValue={onTypeChange}
                header={translate('form.activeType.type.header')}
                placeholder={translate('form.activeType.type.placeholder')}
              />
            </View>
          </View>
          <ImageUpload file={file} saveImage={onFileChange} />
          <View marginTop="l" marginBottom="m">
            <View marginBottom="m">
              <Text variant="formLabel">
                {translate('form.active.description.label')}
              </Text>
            </View>
            <View
              borderRadius={10}
              borderColor="primary"
              borderWidth={1}
              width={280}>
              <TextInput
                style={{textAlignVertical: 'top', padding: 10}}
                placeholder={translate('form.active.description.placeholder')}
                numberOfLines={4}
                value={description}
                multiline={true}
                onChangeText={onDescriptionChange}
                maxLength={255}
              />
            </View>
          </View>
          {loading ? (
            <View margin="m">
              <ActivityIndicator
                animating={loading}
                size={'large'}
                color="black"
              />
            </View>
          ) : (
            <View>
              <View marginVertical="s">
                <DynamicSection
                  collection={basicAttributes}
                  label={translate('form.active.basicAttribute.label')}
                  canAddItems={false}
                  editValue={true}
                  editDropdownValue={false}
                  setChanges={onBasicAttributesChange}
                />
              </View>
              <View marginBottom="m">
                <DynamicSection
                  collection={customAttributes}
                  label={translate('form.active.customAttribute.label')}
                  canAddItems={true}
                  editValue={true}
                  editDropdownValue={true}
                  setChanges={onCustomAttributesChange}
                />
              </View>
            </View>
          )}
          {change && (
            <View marginHorizontal="xxl" marginTop="l" marginBottom="xxl">
              <Button
                disabled={loading}
                onPress={onHandleSave}
                variant="secondary"
                label={translate('action.general.create')}
              />
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  loading: {
    alignItems: 'center',
    height: 400,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activity: {
    flexDirection: 'column',
  },
  info: {
    flexDirection: 'row',
  },
  icon: {
    justifyContent: 'center',
  },
  entryDate: {},
});
