import React from 'react';
import RNDatePicker from 'react-native-date-picker';
import {DatePickerProps} from 'types';
import {View} from './View';
import {locale} from 'i18n-js';
import {translate} from 'core';

export const DatePicker: React.FC<DatePickerProps> = ({
  open,
  entryDate,
  maximumDate = new Date(),
  minimumDate = new Date('2010-01-01'),
  onCancel,
  setShowCalendar,
  setParentDate,
}) => {
  const _onConfirm = (_date: Date) => {
    setParentDate(_date);
    setShowCalendar(false);
  };

  return (
    <View borderRadius={25}>
      <RNDatePicker
        open={open}
        modal
        date={entryDate}
        mode="date"
        locale={locale}
        title={translate('filter.record.date.title')}
        confirmText={translate('button.general.confirm')}
        cancelText={translate('button.general.cancel')}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        androidVariant="nativeAndroid"
        onConfirm={_onConfirm}
        onCancel={onCancel}
      />
    </View>
  );
};
