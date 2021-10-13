import React, {useEffect, useLayoutEffect, useState} from 'react';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {translate} from 'core';
import dayjs from 'dayjs';
import {
  fetchActiveType,
  fetchActiveTypes,
} from 'store/slices/activeType/activeTypeAsyncThunk';
import {createActive, fetchActives} from 'store/slices/active/activeAsyncThunk';
import {
  Button,
  Dropdown,
  DatePicker,
  DynamicSection,
  Text,
  SimpleTextInput as TextInput,
  View,
} from 'components';
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import {
  ActiveState,
  ActiveTagEvent,
  ActiveType,
  ActiveTypeState,
  Attribute,
  NewActive,
  ServerError,
  TagDetailsScreenProps,
} from 'types';
import {fetchUnits} from 'store/slices/unit/unitAsyncThunk';
import {clearActive} from 'store/slices/active/activeSlice';
import {clearActiveType} from 'store/slices/activeType/activeTypeSlice';

export const TagDetails: React.FC<TagDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const [change, setChange] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const [typeChange, setTypeChange] = useState<boolean>(false);

  //Tag values
  const [tag, setTag] = useState<ActiveTagEvent | null>(null);
  const [reference, setReference] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [type, setType] = useState<ActiveType | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [basicAttributes, setBasicAttributes] = useState<Attribute[]>([]);
  const [customAttributes, setCustomAttributes] = useState<Attribute[]>([]);

  //Errors
  const [referenceError, setReferenceError] = useState<string | undefined>(
    undefined,
  );

  //slices
  const activeTypeState: ActiveTypeState = useAppSelector(
    (state) => state.activeType,
  );
  const activeState: ActiveState = useAppSelector((state) => state.active);

  //Handlers

  const _handleSave = () => {
    const _item: NewActive = {} as NewActive;
    if (change) {
      if (reference.length >= 2 && type) {
        _item.reference = reference;
        _item.entryDate = date.toString();
        _item.activeType = {...type};
        _item.basicAttributes = [...basicAttributes];
        _item.customAttributes = [...customAttributes];
        dispatch(createActive(_item))
          .unwrap()
          .then(() => {
            dispatch(fetchActives());
            navigation.navigate('DocumentList', {tab: 'active'});
          })
          .catch((error: ServerError) => {
            ToastAndroid.showWithGravity(
              translate('error.general.used') +
                ' (' +
                error.violations[0].propertyPath +
                ')',
              ToastAndroid.CENTER,
              ToastAndroid.LONG,
            );
            setChange(false);
            setReferenceError('error');
          });
      } else {
        if (reference.length < 2) {
          ToastAndroid.showWithGravity(
            translate('form.field.minRef'),
            ToastAndroid.CENTER,
            ToastAndroid.SHORT,
          );
        }
        if (type === null) {
          ToastAndroid.showWithGravity(
            translate('form.field.unitSelect'),
            ToastAndroid.CENTER,
            ToastAndroid.SHORT,
          );
        }
      }
    }
    setChange(false);
  };

  const _handleDateChange = (_date: Date) => {
    setDate(_date);
    setChange(true);
  };

  const _handleReferenceChange = (_reference: string) => {
    setReference(_reference);
    reference.length >= 0 ? setChange(true) : null;
    setChange(true);
  };

  const _handleTypeChange = (_item: ActiveType) => {
    setType(_item);
    setChange(true);
  };

  const _handleBasicAttributesChange = (_basicAttributes: Attribute[]) => {
    setBasicAttributes([..._basicAttributes]);
    setChange(true);
  };

  const _handleCustomAttributesChange = (_customAttributes: Attribute[]) => {
    setCustomAttributes([..._customAttributes]);
    setChange(true);
  };

  //component mount
  useEffect(() => {
    store.dispatch(fetchActiveTypes());
    store.dispatch(fetchUnits());
  }, []);

  useEffect(() => {
    if (route.params.tag) {
      setTag(route.params.tag);
      if (route.params.tag.id !== undefined) {
        setReference(route.params.tag.id.toString());
        setChange(true);
      }
    }
  }, [route.params.tag]);

  useEffect(() => {
    if (tag !== null) {
      if (tag.tagType) {
        setType(tag.tagType);
      } else {
        ToastAndroid.showWithGravity(
          translate('form.tag.notFound'),
          ToastAndroid.CENTER,
          ToastAndroid.LONG,
        );
      }
    }
  }, [tag]);

  useLayoutEffect(() => {
    if (activeTypeState.activeType !== null) {
      setBasicAttributes([...activeTypeState.activeType.basicAttributes]);
      setCustomAttributes([...activeTypeState.activeType.customAttributes]);
    }
  }, [activeTypeState.activeType]);

  useEffect(() => {
    if (type !== null) {
      store.dispatch(fetchActiveType(type.id));
      setTypeChange(true);
    }
  }, [type]);

  //Displayed entryDate
  useLayoutEffect(() => {
    if (date) {
      setFormattedDate(dayjs(date).format('DD/MM/YYYY'));
    }
  }, [date]);

  useEffect(() => {
    if (reference.length < 2) {
      setReferenceError('error');
    } else {
      setReferenceError(undefined);
    }
  }, [reference]);

  useEffect(() => {
    return () => {
      dispatch(clearActive());
      dispatch(clearActiveType());
    };
  });

  return (
    <View style={styles.container} marginHorizontal="m" marginBottom="m">
      {activeTypeState.loading && !typeChange ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color="black"
            animating={activeTypeState.loading}
          />
        </View>
      ) : (
        <View marginBottom="xl">
          <ScrollView
            horizontal={false}
            refreshControl={
              <RefreshControl
                refreshing={activeState.loading}
                enabled={false}
              />
            }>
            <View style={styles.header} paddingTop="m" marginRight="m">
              <View alignSelf="flex-start">
                <TouchableOpacity
                  onPress={() => setShowCalendar(!showCalendar)}>
                  {showCalendar && (
                    <DatePicker
                      entryDate={date}
                      setShowCalendar={setShowCalendar}
                      setParentDate={_handleDateChange}
                      maximumDate={new Date()}
                      minimumDate={new Date()}
                    />
                  )}
                  <View style={styles.entryDate} marginVertical="m">
                    <View>
                      <Text variant="formLabel">
                        {translate('form.tag.entryDate.label')}
                      </Text>
                    </View>
                    <View marginTop="s">
                      <Text>{formattedDate}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              {change && (
                <View width={100}>
                  <Button
                    onPress={_handleSave}
                    variant="secondary"
                    label={translate('action.general.create')}
                  />
                </View>
              )}
            </View>
            <View>
              <TouchableOpacity onPress={() => setFocused(!focused)}>
                <View flexDirection="column" alignItems="flex-start">
                  <View>
                    <Text variant="formLabel">
                      {translate('form.tag.reference.label')}
                    </Text>
                  </View>
                  <View height={40}>
                    <TextInput
                      setFocused={setFocused}
                      focused={focused}
                      textAlign="left"
                      value={reference}
                      placeholder={translate('form.tag.reference.placeholder')}
                      autoCapitalize="none"
                      onChangeText={_handleReferenceChange}
                      error={referenceError}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View marginTop="m" marginBottom="s">
              <View>
                <Text variant="formLabel">
                  {translate('form.tag.type.label')}
                </Text>
              </View>
              <View marginVertical="s">
                <Dropdown
                  editValue={true}
                  selected={type}
                  options={activeTypeState.activeTypes}
                  header={translate('form.tag.type.header')}
                  placeholder={translate('form.tag.type.placeholder')}
                  setParentValue={_handleTypeChange}
                />
              </View>
            </View>
            {activeTypeState.loading ? (
              <View margin="l">
                <ActivityIndicator
                  animating={activeTypeState.loading}
                  size="large"
                  color="black"
                />
              </View>
            ) : (
              <View>
                <View marginVertical="m">
                  <DynamicSection
                    editDropdownValue={true}
                    editValue={true}
                    collection={basicAttributes}
                    emptyMessage={translate('form.tag.basicAttribute.empty')}
                    label={translate('form.tag.basicAttribute.label')}
                    isEditable={false}
                    setChanges={_handleBasicAttributesChange}
                    open={true}
                  />
                </View>
                <View marginTop="m" marginBottom="l">
                  <DynamicSection
                    editDropdownValue={true}
                    editValue={true}
                    collection={customAttributes}
                    label={translate('form.tag.customAttribute.label')}
                    emptyMessage={translate('form.tag.customAttribute.empty')}
                    isEditable={true}
                    setChanges={_handleCustomAttributesChange}
                    open={true}
                  />
                </View>
              </View>
            )}
          </ScrollView>
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
  info: {
    flexDirection: 'row',
  },
  icon: {
    justifyContent: 'center',
  },
  entryDate: {},
});
