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
  AttributeValueState,
} from 'types';
import {
  ActivityIndicator,
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
import {fetchAttributeValues} from 'store/slices/attributeValue/attributeValueAsyncThunk';

export const ActiveTypeNewItem: React.FC<NewActiveTypeScreenProps> = (
  {
    //navigation,
  },
) => {
  const [referenceError, setReferenceError] = useState<string | undefined>();
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [focused, setfocused] = useState<boolean>(false);
  const [basicAttributes, setBasicAttributes] = useState<Attribute[]>([]);
  const [customAttributes, setCustomAttributes] = useState<Attribute[]>([]);
  const [change, setChange] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const attributeValueState: AttributeValueState = useAppSelector(
    (state) => state.attributeValue,
  );

  const _handleSave = () => {
    if (change) {
      if (name.length >= 2) {
        const _item = {} as NewActiveType;
        _item.name = name;
        _item.basicAttributes = [...basicAttributes];
        _item.customAttributes = [...customAttributes];
        dispatch(createActiveType(_item));
        dispatch(fetchActiveTypes());
      } else {
        ToastAndroid.showWithGravity(
          'Type name must be at least 2 characters long',
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
    setBasicAttributes([..._basicAttributes]);
    setChange(true);
  };
  const _handleCustomAttributes = (_customAttributes: Attribute[]) => {
    setCustomAttributes(_customAttributes);
    setChange(true);
  };

  useEffect(() => {
    store.dispatch(fetchAttributeValues());
    store.dispatch(fetchUnits());
  }, []);

  useLayoutEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    setBasicAttributes([...attributeValueState.attributeValues]);
    setLoading(attributeValueState.loading);
  }, [attributeValueState]);

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
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="black" animating={loading} />
        </View>
      ) : (
        <View marginBottom="xl">
          <KeyboardAwareScrollView scrollEnabled={true} horizontal={false}>
            <View style={styles.header} paddingTop="s" marginRight="m">
              <View marginTop="m" marginBottom="l">
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
                    label={translate('action.general.save')}
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
