import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Button, DynamicSection, Text, View} from 'components';
import {
  ActiveTypeDetailsScreenProps,
  ActiveType,
  ActiveTypeState,
  Attribute,
} from 'types';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from 'react-native';
import {translate} from 'core';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {
  deleteActiveType,
  fetchActiveType,
  fetchActiveTypes,
  updateActiveType,
} from 'store/slices/activeType/activeTypeAsyncThunk';
import {
  clearActiveType,
  resetActiveTypeState,
} from 'store/slices/activeType/activeTypeSlice';
import {fetchUnits} from 'store/slices/unit/unitAsyncThunk';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFocusEffect} from '@react-navigation/core';
import {useTheme} from 'ui/theme';

export const ActiveTypeDetails: React.FC<ActiveTypeDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const [item, setItem] = useState<ActiveType>({} as ActiveType);
  const [save, setSave] = useState<boolean>(false);
  const [referenceError, setReferenceError] = useState<string | undefined>();
  const [name, setName] = useState<string>('');
  const [basicAttributes, setBasicAttributes] = useState<Attribute[]>([]);
  const [customAttributes, setCustomAttributes] = useState<Attribute[]>([]);
  const [changedBasicAttributes, setChangedBasicAttributes] = useState<
    Attribute[]
  >([]);
  const [changedCustomAttributes, setChangedCustomAttributes] = useState<
    Attribute[]
  >([]);
  const [change, setChange] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const _ref = useRef<TextInput>(null);
  const activeTypeState: ActiveTypeState = useAppSelector(
    (state) => state.activeType,
  );

  const _handleDelete = () => {
    Alert.alert(
      translate('form.activeType.action.delete.title') + ' ' + item.name + '?',
      translate('form.activeType.action.delete.message'),
      [
        {
          text: translate('action.general.cancel'),
          onPress: () => null,
        },
        {
          text: translate('action.general.delete'),
          onPress: _deleteActiveType,
        },
      ],
    );
  };

  const _deleteActiveType = () => {
    dispatch(deleteActiveType(item.id)).then(() => {
      dispatch(resetActiveTypeState());
      dispatch(fetchActiveTypes({page: 1, itemsPerPage: 9}));
      navigation.goBack();
    });
  };

  const _handleRefresh = () => {
    if (activeTypeState.activeType !== null) {
      store.dispatch(fetchActiveType(route.params.typeId));
      store.dispatch(fetchUnits());
    }
  };

  const _handleTitleChange = () => {
    navigation.setOptions({title: name});
    if (name.length < 2) {
      setReferenceError('error');
    } else {
      setReferenceError(undefined);
    }
  };

  const _handleSave = () => {
    if (change) {
      if (name.length >= 2) {
        setSave(true);
        const _item = {} as ActiveType;
        _item.id = item.id;
        _item.name = name;
        _item.basicAttributes = [...changedBasicAttributes];
        _item.customAttributes = [...changedCustomAttributes];
        dispatch(updateActiveType(_item)).then(() => {
          dispatch(resetActiveTypeState());
          dispatch(fetchActiveTypes({page: 1, itemsPerPage: 9}));
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
      setChange(false);
    }
  };

  useEffect(() => {
    setChange(true);
  }, [name, basicAttributes, customAttributes]);

  useLayoutEffect(() => {
    if (activeTypeState.activeType !== null) {
      setItem(activeTypeState.activeType);
      setName(activeTypeState.activeType.name);
      setBasicAttributes([...activeTypeState.activeType.basicAttributes]);
      setCustomAttributes([...activeTypeState.activeType.customAttributes]);
      setChangedBasicAttributes([
        ...activeTypeState.activeType.basicAttributes,
      ]);
      setChangedCustomAttributes([
        ...activeTypeState.activeType.customAttributes,
      ]);
    }
  }, [activeTypeState]);

  useEffect(() => {
    setSave(false);
    store.dispatch(fetchUnits());
    if (route.params.typeId !== null) {
      store.dispatch(fetchActiveType(route.params.typeId));
    }
  }, [route.params.typeId]);

  useFocusEffect(() => {
    return () => {
      store.dispatch(clearActiveType());
    };
  });

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
                <TouchableOpacity onPress={() => _ref.current?.focus()}>
                  <View>
                    <Text variant="formLabel">
                      {translate('form.activeType.name.label')}
                    </Text>
                  </View>
                  <View marginTop="s">
                    <TextInput
                      style={{
                        borderBottomColor: !referenceError
                          ? theme.colors.primary
                          : theme.colors.error,
                        borderBottomWidth: 1,
                        margin: 0,
                        padding: 0,
                      }}
                      ref={_ref}
                      placeholder={translate(
                        'form.activeType.name.placeholder',
                      )}
                      value={name}
                      autoCapitalize="words"
                      onChangeText={(text) => setName(text)}
                      onBlur={_handleTitleChange}
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
                setChanges={(_basicAttributes) =>
                  setChangedBasicAttributes(_basicAttributes)
                }
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
                setChanges={(_customAttributes) =>
                  setChangedCustomAttributes(_customAttributes)
                }
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
