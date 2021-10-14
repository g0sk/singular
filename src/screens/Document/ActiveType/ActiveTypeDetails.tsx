import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Button,
  DynamicSection,
  SimpleTextInput as TextInput,
  Text,
  View,
} from 'components';
import {
  ActiveTypeDetailsScreenProps,
  ActiveType,
  ActiveTypeState,
  Attribute,
} from 'types';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {translate} from 'core';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {
  deleteActiveType,
  fetchActiveType,
  fetchActiveTypes,
  updateActiveType,
} from 'store/slices/activeType/activeTypeAsyncThunk';
import {clearActiveType} from 'store/slices/activeType/activeTypeSlice';
import {fetchUnits} from 'store/slices/unit/unitAsyncThunk';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const ActiveTypeDetails: React.FC<ActiveTypeDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const [item, setItem] = useState<ActiveType>({} as ActiveType);
  const [save, setSave] = useState<boolean>(false);
  const [referenceError, setReferenceError] = useState<string | undefined>();
  const [name, setName] = useState<string>('');
  const [focused, setfocused] = useState<boolean>(false);
  const [basicAttributes, setBasicAttributes] = useState<Attribute[]>([]);
  const [customAttributes, setCustomAttributes] = useState<Attribute[]>([]);
  const [change, setChange] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const activeTypeState: ActiveTypeState = useAppSelector(
    (state) => state.activeType,
  );

  const _handleDelete = () => {
    dispatch(deleteActiveType(item.id)).then(() => {
      dispatch(fetchActiveTypes());
      navigation.goBack();
    });
  };

  const _handleRefresh = () => {
    if (activeTypeState.activeType !== null) {
      store.dispatch(fetchActiveType(route.params.typeId));
      store.dispatch(fetchUnits());
    }
  };
  const _handleSave = () => {
    if (change) {
      if (name.length >= 2) {
        setSave(true);
        const _item = {} as ActiveType;
        _item.id = item.id;
        _item.name = name;
        _item.basicAttributes = [...basicAttributes];
        _item.customAttributes = [...customAttributes];
        dispatch(updateActiveType(_item)).then(() => {
          dispatch(fetchActiveTypes());
          ToastAndroid.showWithGravity(
            translate('success.general.saved'),
            ToastAndroid.BOTTOM,
            ToastAndroid.SHORT,
          );
        });
      } else {
        ToastAndroid.showWithGravity(
          translate('form.field.minRef'),
          ToastAndroid.CENTER,
          ToastAndroid.SHORT,
        );
      }
    }
    setChange(false);
  };

  const _handleName = (_name: string) => {
    setName(_name);
    setChange(true);
  };
  const _handleBasicAttributes = (_basicAttributes: Attribute[]) => {
    setChange(true);
    setBasicAttributes([..._basicAttributes]);
  };
  const _handleCustomAttributes = (_customAttributes: Attribute[]) => {
    setChange(true);
    setCustomAttributes([..._customAttributes]);
  };

  useLayoutEffect(() => {
    if (activeTypeState.activeType !== null) {
      setItem(activeTypeState.activeType);
      setName(activeTypeState.activeType.name);
      setBasicAttributes([...activeTypeState.activeType.basicAttributes]);
      setCustomAttributes([...activeTypeState.activeType.customAttributes]);
    }
  }, [activeTypeState]);

  useEffect(() => {
    setSave(false);
    store.dispatch(fetchUnits());
    if (route.params.typeId !== null) {
      store.dispatch(fetchActiveType(route.params.typeId));
    }
  }, [route.params.typeId]);

  useEffect(() => {
    return () => {
      store.dispatch(clearActiveType());
    };
  });

  useEffect(() => {
    navigation.setOptions({title: name});
    if (name.length < 2) {
      setReferenceError('error');
    } else {
      setReferenceError(undefined);
    }
  }, [navigation, name]);

  useEffect(() => {
    return () => {
      store.dispatch(clearActiveType());
    };
  }, [save]);

  return (
    <View style={styles.container} marginHorizontal="m" marginBottom="m">
      {activeTypeState.loading && !save ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color="black"
            animating={activeTypeState.loading}
          />
        </View>
      ) : (
        <View marginBottom="xl">
          <KeyboardAwareScrollView
            scrollEnabled={true}
            horizontal={false}
            refreshControl={
              <RefreshControl
                refreshing={activeTypeState.loading}
                onRefresh={_handleRefresh}
              />
            }>
            <View style={styles.header} paddingTop="s" marginRight="m">
              <View marginBottom="l">
                <TouchableOpacity onPress={() => setfocused(!focused)}>
                  <View>
                    <Text variant="formLabel">
                      {translate('form.activeType.name.label')}
                    </Text>
                  </View>
                  <View marginTop="s">
                    <TextInput
                      placeholder={translate(
                        'form.activeType.name.placeholder',
                      )}
                      value={name}
                      autoCapitalize="words"
                      onChangeText={_handleName}
                      focused={focused}
                      setFocused={setfocused}
                      error={referenceError}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {change && (
                <View width={100}>
                  <Button
                    onPress={_handleSave}
                    variant="secondary"
                    label={translate('action.general.save')}
                  />
                </View>
              )}
            </View>
            <View marginBottom="m">
              <DynamicSection
                editValue={true}
                editDropdownValue={true}
                collection={basicAttributes}
                label={translate('form.activeType.basicAttribute.label')}
                isEditable={false}
                setChanges={_handleBasicAttributes}
                open={true}
              />
            </View>
            <View marginVertical="m">
              <DynamicSection
                editValue={true}
                editDropdownValue={true}
                collection={customAttributes}
                label={translate('form.activeType.customAttribute.label')}
                isEditable={true}
                setChanges={_handleCustomAttributes}
                open={true}
              />
            </View>
            <View marginHorizontal="xxl" marginTop="xl" marginBottom="xxl">
              <Button
                variant="delete"
                label={translate('action.general.delete')}
                onPress={_handleDelete}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
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
  date: {
    //alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
  },
  icon: {
    justifyContent: 'center',
  },
  entryDate: {},
});
