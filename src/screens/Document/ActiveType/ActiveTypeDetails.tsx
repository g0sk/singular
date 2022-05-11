import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  Dimensions,
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
import {resetUnitState} from 'store/slices/unit/unitSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import {fetchActives} from 'store/slices/active/activeAsyncThunk';
import {resetActiveState} from 'store/slices/active/activeSlice';
import {useTheme} from 'ui/theme';

const height = Dimensions.get('window').height;

export const ActiveTypeDetails: React.FC<ActiveTypeDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [basicAttributes, setBasicAttributes] = useState<Attribute[]>([]);
  const [customAttributes, setCustomAttributes] = useState<Attribute[]>([]);
  const [change, setChange] = useState<boolean>(false);
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const _ref = useRef<TextInput>(null);
  const activeTypeState: ActiveTypeState = useAppSelector(
    (state) => state.activeType,
  );

  const onDelete = () => {
    Alert.alert(
      translate('form.activeType.action.delete.title') + ' ' + '?',
      translate('form.activeType.action.delete.message'),
      [
        {
          text: translate('action.general.cancel'),
          onPress: () => null,
        },
        {
          text: translate('action.general.delete'),
          onPress: handleDeleteActiveType,
        },
      ],
    );
  };

  const handleDeleteActiveType = () => {
    dispatch(deleteActiveType(route.params.typeId)).then(() => {
      dispatch(resetActiveTypeState());
      dispatch(
        fetchActiveTypes({
          pagination: {page: 1, itemsPerPage: 9},
          filters: [{key: 'order[id]', value: 'desc'}],
        }),
      );
      dispatch(resetActiveState());
      dispatch(
        fetchActives({
          pagination: {page: 1, itemsPerPage: 7},
          filters: [{key: 'order[entryDate]', value: 'desc'}],
        }),
      );
      navigation.goBack();
    });
  };

  const _handleRefresh = () => {
    if (activeTypeState.activeType !== null) {
      store.dispatch(fetchActiveType(route.params.typeId));
      store.dispatch(fetchUnits());
    }
  };

  const onSave = () => {
    if (change && activeTypeState.activeType !== null) {
      const activeType: ActiveType = {
        ...activeTypeState.activeType,
        basicAttributes: [...basicAttributes],
        customAttributes: [...customAttributes],
      };
      dispatch(updateActiveType(activeType)).then(() => {
        dispatch(resetActiveTypeState());
        dispatch(
          fetchActiveTypes({
            pagination: {page: 1, itemsPerPage: 9},
            filters: [{key: 'order[id]', value: 'desc'}],
          }),
        );
        ToastAndroid.showWithGravity(
          translate('success.general.saved'),
          ToastAndroid.BOTTOM,
          ToastAndroid.SHORT,
        );
      });
    }
    setChange(false);
  };

  const onBasicAttributesChange = (_basicAttributes: Attribute[]) => {
    setChange(true);
    setBasicAttributes(_basicAttributes);
  };

  const onCustomAttributesChange = (_customAttributes: Attribute[]) => {
    setChange(true);
    setCustomAttributes(_customAttributes);
  };

  useEffect(() => {
    store.dispatch(fetchUnits());
    if (route.params.typeId !== null) {
      store.dispatch(fetchActiveType(route.params.typeId));
    }
  }, [route.params.typeId]);

  useLayoutEffect(() => {
    if (activeTypeState.activeType !== null) {
      setInitialLoad(false);
      setBasicAttributes([...activeTypeState.activeType.basicAttributes]);
      setCustomAttributes([...activeTypeState.activeType.customAttributes]);
    }
  }, [activeTypeState.activeType]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        store.dispatch(clearActiveType());
        store.dispatch(resetUnitState());
      };
    }, []),
  );

  return (
    <View marginHorizontal="m" marginBottom="m">
      {activeTypeState.loading && initialLoad ? (
        <View alignItems="center" height={height - 100} justifyContent="center">
          <ActivityIndicator
            size="large"
            color={colors.primary}
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
            <View
              flexDirection="row"
              justifyContent="space-between"
              paddingTop="s"
              marginRight="m">
              <View marginBottom="l">
                <TouchableOpacity onPress={() => _ref.current?.focus()}>
                  <View>
                    <Text variant="formLabel">
                      {translate('form.activeType.name.label')}
                    </Text>
                  </View>
                  <View marginTop="s">
                    <Text>{activeTypeState.activeType?.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {change && (
                <View width={100}>
                  <Button
                    onPress={onSave}
                    variant="secondary"
                    label={translate('action.general.save')}
                  />
                </View>
              )}
            </View>
            <View flexDirection="column" marginBottom="m">
              <View marginBottom="m">
                <Text variant="formLabel">
                  {translate('form.activeType.activeTypeCount')}
                </Text>
              </View>
              <View flexDirection="row">
                <View marginRight="s">
                  <Icon name="document-text" size={20} />
                </View>
                <View>
                  <Text>{activeTypeState.activeType?.activesCount}</Text>
                </View>
              </View>
            </View>
            <View marginBottom="m">
              <DynamicSection
                editValue={true}
                editDropdownValue={true}
                collection={basicAttributes}
                label={translate('form.activeType.basicAttribute.label')}
                canAddItems={false}
                setChanges={onBasicAttributesChange}
              />
            </View>
            <View marginVertical="m">
              <DynamicSection
                editValue={true}
                editDropdownValue={true}
                collection={customAttributes}
                label={translate('form.activeType.customAttribute.label')}
                canAddItems={true}
                setChanges={onCustomAttributesChange}
              />
            </View>
            <View marginHorizontal="xxl" marginTop="xl" marginBottom="xxl">
              <Button
                variant="delete"
                label={translate('action.general.delete')}
                onPress={onDelete}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
      )}
    </View>
  );
};
