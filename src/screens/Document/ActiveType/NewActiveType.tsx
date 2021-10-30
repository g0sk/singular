import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {Button, DynamicSection, Text, View} from 'components';
import {
  NewActiveTypeScreenProps,
  Attribute,
  NewActiveTypeProps,
  BasicAttributeState,
} from 'types';
import {
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {translate} from 'core';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {
  createActiveType,
  fetchActiveTypes,
} from 'store/slices/activeType/activeTypeAsyncThunk';
import {fetchUnits} from 'store/slices/unit/unitAsyncThunk';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {fetchBasicAttributes} from 'store/slices/basicAttribute/basicAttributeAsyncThunk';
import {useFocusEffect} from '@react-navigation/core';
import {resetUnitState} from 'store/slices/unit/unitSlice';
import {useTheme} from 'ui/theme';
import {resetBasicAttributeState} from 'store/slices/basicAttribute/basicAttributeSlice';
import {clearActiveType} from 'store/slices/activeType/activeTypeSlice';

export const NewActiveType: React.FC<NewActiveTypeScreenProps> = ({
  navigation,
}) => {
  const [nameError, setNameError] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [basicAttributes, setBasicAttributes] = useState<Attribute[]>([]);
  const [customAttributes, setCustomAttributes] = useState<Attribute[]>([]);
  const [change, setChange] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const nameRef = useRef<TextInput>(null);
  const theme = useTheme();

  const basicAttributeState: BasicAttributeState = useAppSelector(
    (state) => state.basicAttribute,
  );

  const onHandleSave = () => {
    if (name.length < 2) {
      setNameError(true);
      setChange(false);
      ToastAndroid.showWithGravity(
        translate('form.field.minName'),
        ToastAndroid.CENTER,
        ToastAndroid.LONG,
      );
    } else {
      onSave();
    }
  };

  const onSave = () => {
    if (change) {
      const activeType: NewActiveTypeProps = {
        name: name,
        basicAttributes: [...basicAttributes],
        customAttributes: [...customAttributes],
      };
      dispatch(createActiveType(activeType)).then(() => {
        dispatch(fetchActiveTypes({page: 1, itemsPerPage: 9}));
        navigation.goBack();
      });
    } else {
      ToastAndroid.showWithGravity(
        translate('form.field.minRef'),
        ToastAndroid.CENTER,
        ToastAndroid.SHORT,
      );
    }
  };

  const onChange = useCallback(() => {
    if (!change) {
      setChange(true);
    }
  }, [change]);

  const onNameChange = (_name: string) => {
    onChange();
    setName(_name);
    if (_name.length > 2) {
      nameError ? setNameError(false) : null;
    } else {
      setNameError(true);
    }
  };
  const onBasicAttributesChange = (_basicAttributes: Attribute[]) => {
    onChange();
    setBasicAttributes(_basicAttributes);
  };
  const onCustomAttributesChange = (_customAttributes: Attribute[]) => {
    onChange();
    setCustomAttributes(_customAttributes);
  };

  useEffect(() => {
    store.dispatch(fetchBasicAttributes());
    store.dispatch(fetchUnits());
  }, []);

  useLayoutEffect(() => {
    setBasicAttributes([...basicAttributeState.basicAttributes]);
  }, [basicAttributeState.basicAttributes]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        store.dispatch(clearActiveType());
        store.dispatch(resetBasicAttributeState());
        store.dispatch(resetUnitState());
      };
    }, []),
  );

  return (
    <View style={styles.container} marginHorizontal="m" marginBottom="m">
      {basicAttributeState.loading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color="black"
            animating={basicAttributeState.loading}
          />
        </View>
      ) : (
        <View marginBottom="xl">
          <KeyboardAwareScrollView scrollEnabled={true} horizontal={false}>
            <View style={styles.header} paddingTop="s" marginRight="m">
              <View marginBottom="l">
                <TouchableOpacity onPress={() => nameRef.current?.focus()}>
                  <View>
                    <Text variant="formLabel">
                      {translate('form.activeType.name.label')}
                    </Text>
                  </View>
                  <View marginTop="s">
                    <TextInput
                      style={{
                        padding: 0,
                        borderBottomColor: !nameError
                          ? theme.colors.primary
                          : theme.colors.error,
                        borderBottomWidth: 1,
                      }}
                      placeholder={translate(
                        'form.activeType.name.placeholder',
                      )}
                      value={name}
                      autoCapitalize="words"
                      onChangeText={onNameChange}
                      maxLength={16}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View marginBottom="m">
                <DynamicSection
                  editValue={true}
                  collection={basicAttributes}
                  label={translate('form.activeType.basicAttribute.label')}
                  canAddItems={false}
                  editDropdownValue={true}
                  setChanges={onBasicAttributesChange}
                  open={true}
                />
              </View>
              <View marginVertical="m">
                <DynamicSection
                  editValue={true}
                  collection={customAttributes}
                  label={translate('form.activeType.customAttribute.label')}
                  editDropdownValue={true}
                  canAddItems={true}
                  setChanges={onCustomAttributesChange}
                  open={true}
                />
              </View>
            </View>
            {change && (
              <View marginHorizontal="xxl" marginTop="l" marginBottom="xxl">
                <Button
                  onPress={onHandleSave}
                  variant="secondary"
                  label={translate('action.general.create')}
                />
              </View>
            )}
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
