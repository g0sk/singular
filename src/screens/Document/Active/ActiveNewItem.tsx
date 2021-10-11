import React, {useEffect, useLayoutEffect, useState} from 'react';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {translate} from 'core/i18n';
import dayjs from 'dayjs';
import {
  fetchActiveType,
  fetchActiveTypes,
} from 'store/slices/activeType/activeTypeAsyncThunk';
import {createActive} from 'store/slices/active/activeAsyncThunk';
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
} from 'react-native';
import {
  ActiveType,
  ActiveTypeState,
  Attribute,
  NewActive,
  NewActiveScreenProps,
} from 'types';
import {fetchUnits} from 'store/slices/unit/unitAsyncThunk';
import {clearActive} from 'store/slices/active/activeSlice';
import {clearActiveType} from 'store/slices/activeType/activeTypeSlice';

export const ActiveNewItem: React.FC<NewActiveScreenProps> = ({}) => {
  const dispatch = useAppDispatch();
  const [change, setChange] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  //Active values
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

  //Handlers

  const _handleSave = () => {
    const _item: NewActive = {} as NewActive;
    if (change) {
      if (reference.length >= 2 && type && date) {
        _item.reference = reference;
        _item.entryDate = date.toString();
        _item.activeType = {...type};
        _item.basicAttributes = [...basicAttributes];
        _item.customAttributes = [...customAttributes];
        dispatch(createActive(_item));
      } else {
        ToastAndroid.showWithGravity(
          'Reference must be 2 characters at least',
          ToastAndroid.CENTER,
          ToastAndroid.SHORT,
        );
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
    if (activeTypeState.activeType !== null) {
      setBasicAttributes([...activeTypeState.activeType.basicAttributes]);
      setCustomAttributes([...activeTypeState.activeType.customAttributes]);
    }
  }, [activeTypeState.activeType]);

  useEffect(() => {
    if (type !== null) {
      store.dispatch(fetchActiveType(type.id));
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
          <ScrollView horizontal={false}>
            <View style={styles.header} paddingTop="m" marginRight="m">
              <View alignSelf="flex-start">
                <TouchableOpacity
                  onPress={() => setShowCalendar(!showCalendar)}>
                  {showCalendar && (
                    <DatePicker
                      entryDate={date}
                      setShowCalendar={setShowCalendar}
                      setParentDate={_handleDateChange}
                    />
                  )}
                  <View style={styles.entryDate} marginVertical="m">
                    <View>
                      <Text variant="formLabel">Entry Date</Text>
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
                    label={translate('action.general.save')}
                  />
                </View>
              )}
            </View>
            <View>
              <TouchableOpacity onPress={() => setFocused(!focused)}>
                <View flexDirection="column" alignItems="flex-start">
                  <View>
                    <Text variant="formLabel">Reference</Text>
                  </View>
                  <View height={40}>
                    <TextInput
                      setFocused={setFocused}
                      focused={focused}
                      textAlign="left"
                      value={reference}
                      placeholder="Reference id"
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
                <Text variant="formLabel">Type</Text>
              </View>
              <View marginVertical="s">
                <Dropdown
                  selected={type}
                  options={activeTypeState.activeTypes}
                  header="Types"
                  placeholder="Select type"
                  setParentValue={_handleTypeChange}
                />
              </View>
            </View>
            <View marginVertical="m">
              <DynamicSection
                loading={activeTypeState.loading}
                collection={basicAttributes}
                emptyMessage="Select a type to inherit it's  basic attributes"
                label="Basic Attributes"
                isEditable={false}
                setChanges={_handleBasicAttributesChange}
                open={true}
              />
            </View>
            <View marginTop="m" marginBottom="l">
              <DynamicSection
                loading={activeTypeState.loading}
                collection={customAttributes}
                label="Custom Attributes"
                emptyMessage="Select a type to inherit it's custom attributes"
                isEditable={true}
                setChanges={_handleCustomAttributesChange}
                open={true}
              />
            </View>
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
