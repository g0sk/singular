import React, {useState, useEffect} from 'react';
import {DatePickerProps} from 'types';
import DateTimePicker, {
  AndroidEvent,
} from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

type CalendarMode = 'date' | 'time';

export const DatePicker: React.FC<DatePickerProps> = ({
  entryDate,
  setParentDate,
  setShowCalendar,
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const mode: CalendarMode = 'date';

  useEffect(() => {
    const newDate = new Date(entryDate);
    setDate(newDate);
  }, [entryDate]);

  const _calendarOnChange = (evt: AndroidEvent, selectedDate?: Date) => {
    setShowCalendar(false);
    if (
      evt.type === 'set' &&
      selectedDate &&
      !dayjs(selectedDate).isSame(date)
    ) {
      setParentDate(selectedDate);
    }
  };
  return (
    <DateTimePicker
      value={date}
      mode={mode}
      is24Hour={true}
      display="default"
      onChange={_calendarOnChange}
      maximumDate={new Date()}
      minimumDate={new Date('01/01/1950')}
    />
  );
};
