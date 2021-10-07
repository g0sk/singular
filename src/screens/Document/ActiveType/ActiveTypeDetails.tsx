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
} from 'react-native';
import {translate} from 'core';
import store, {useAppSelector} from 'store/configureStore';
import {fetchActiveType} from 'store/slices/activeType/activeTypeAsyncThunk';
import {clearActiveType} from 'store/slices/activeType/activeTypeSlice';
import {fetchUnits} from 'store/slices/unit/unitAsyncThunk';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const ActiveTypeDetails: React.FC<ActiveTypeDetailsScreenProps> = ({
  route,
  //navigation,
}) => {
  const [item, setItem] = useState<ActiveType>({} as ActiveType);
  const [name, setName] = useState<string>('');
  const [focused, setfocused] = useState<boolean>(false);
  const [basicAttributes, setBasicAttributes] = useState<Attribute[]>([]);
  const [customAttributes, setCustomAttributes] = useState<Attribute[]>([]);
  const [change, setChange] = useState<boolean>(false);
  const activeTypeState: ActiveTypeState = useAppSelector(
    (state) => state.activeType,
  );

  const _handleRefresh = () => {
    if (activeTypeState.activeType !== null) {
      store.dispatch(fetchActiveType(activeTypeState.activeType.id));
      store.dispatch(fetchUnits());
    }
  };
  const _handleSave = () => {
    setChange(false);
    return item;
  };

  useEffect(() => {
    store.dispatch(fetchUnits());
    if (route.params.typeId !== null) {
      store.dispatch(fetchActiveType(route.params.typeId));
    }
  }, [route.params.typeId]);

  useLayoutEffect(() => {
    if (activeTypeState.activeType !== null) {
      setItem({...activeTypeState.activeType});
      setName(activeTypeState.activeType.name);
      setBasicAttributes([...activeTypeState.activeType.basicAttributes]);
      setCustomAttributes([...activeTypeState.activeType.customAttributes]);
    }
  }, [activeTypeState]);

  //Unmount
  useEffect(() => {
    return () => {
      store.dispatch(clearActiveType());
    };
  }, []);

  return (
    <View style={styles.container} margin="m">
      {activeTypeState.loading ? (
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
            <View style={styles.header}>
              <View marginVertical="m">
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
                      onChangeText={setName}
                      focused={focused}
                      setFocused={setfocused}
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
                isEditable={true}
                setChanges={setBasicAttributes}
              />
            </View>
            <View marginVertical="m">
              <DynamicSection
                collection={customAttributes}
                label="Custom Attributes"
                isEditable={true}
                setChanges={setCustomAttributes}
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
