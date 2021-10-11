import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Button,
  DynamicSection,
  SimpleTextInput as TextInput,
  Text,
  View,
} from 'components';
import {
  NewActiveTypeScreenProps,
  Attribute,
  NewActiveType,
  BasicAttributeState,
  ActiveTypeState,
} from 'types';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {translate} from 'core';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {
  createActiveType,
  fetchActiveTypes,
} from 'store/slices/activeType/activeTypeAsyncThunk';
import {fetchUnits} from 'store/slices/unit/unitAsyncThunk';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {clearActiveType} from 'store/slices/activeType/activeTypeSlice';
import {fetchBasicAttributes} from 'store/slices/basicAttribute/basicAttributeAsyncThunk';

export const ActiveTypeNewItem: React.FC<NewActiveTypeScreenProps> = ({
  navigation,
}) => {
  const [referenceError, setReferenceError] = useState<string | undefined>();
  const [name, setName] = useState<string>('');
  const [focused, setfocused] = useState<boolean>(false);
  const [basicAttributes, setBasicAttributes] = useState<Attribute[]>([]);
  const [customAttributes, setCustomAttributes] = useState<Attribute[]>([]);
  const [change, setChange] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const basicAttributeState: BasicAttributeState = useAppSelector(
    (state) => state.basicAttribute,
  );
  const activeTypeState: ActiveTypeState = useAppSelector(
    (state) => state.activeType,
  );

  const _handleSave = () => {
    if (change) {
      if (name.length >= 2) {
        const _item = {} as NewActiveType;
        _item.name = name;
        _item.basicAttributes = [...basicAttributes];
        _item.customAttributes = [...customAttributes];
        dispatch(createActiveType(_item)).then(() => {
          dispatch(fetchActiveTypes());
          navigation.goBack();
        });
      } else {
        ToastAndroid.showWithGravity(
          'Type name must be at least 2 characters long',
          ToastAndroid.CENTER,
          ToastAndroid.SHORT,
        );
      }
      setChange(false);
    }
  };

  const _handleName = (_name: string) => {
    setName(_name);
    name.length >= 1 ? setChange(true) : null;
  };
  const _handleBasicAttributes = (_basicAttributes: Attribute[]) => {
    setBasicAttributes([..._basicAttributes]);
    setChange(true);
  };
  const _handleCustomAttributes = (_customAttributes: Attribute[]) => {
    setCustomAttributes(_customAttributes);
    setChange(true);
  };

  useEffect(() => {
    store.dispatch(fetchBasicAttributes());
    store.dispatch(fetchUnits());
  }, []);

  useLayoutEffect(() => {
    setBasicAttributes([...basicAttributeState.basicAttributes]);
  }, [basicAttributeState]);

  useEffect(() => {
    if (name.length < 2) {
      setReferenceError('error');
    } else {
      setReferenceError(undefined);
    }
  }, [name]);

  useEffect(() => {
    return () => {
      store.dispatch(clearActiveType());
    };
  });

  return (
    <View style={styles.container} margin="m">
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
          <KeyboardAwareScrollView
            scrollEnabled={true}
            horizontal={false}
            refreshControl={
              <RefreshControl
                enabled={false}
                refreshing={activeTypeState.loading}
              />
            }>
            <View style={styles.header} paddingTop="s" marginRight="m">
              <View marginBottom="l">
                <TouchableOpacity onPress={() => setfocused(!focused)}>
                  <View>
                    <Text variant="formLabel">Type</Text>
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
                    label={
                      !activeTypeState.loading
                        ? translate('action.general.save')
                        : ''
                    }
                  />
                </View>
              )}
            </View>
            <View marginBottom="m">
              <DynamicSection
                collection={basicAttributes}
                label="Basic Attributes"
                isEditable={false}
                setChanges={_handleBasicAttributes}
                open={true}
              />
            </View>
            <View marginVertical="m">
              <DynamicSection
                collection={customAttributes}
                label="Custom Attributes"
                isEditable={true}
                setChanges={_handleCustomAttributes}
                open={true}
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
