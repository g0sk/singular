import React, {useState, useEffect} from 'react';
import {DatePickerProps} from 'types';
import DateTimePicker, {
  AndroidEvent,
} from '@react-native-community/datetimepicker';

type CalendarMode = 'date' | 'time';

export const DatePicker: React.FC<DatePickerProps> = ({
  entryDate,
  setParentDate,
  showCalendar,
  setShowCalendar,
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const mode = 'date';

  useEffect(() => {
    const newDate = new Date(entryDate);
    setDate(newDate);
  }, [entryDate]);

  const _calendarOnChange = (evt: AndroidEvent, selectedDate?: Date) => {
    if (evt.type === 'set' && selectedDate) {
      setDate(selectedDate);
      setParentDate(selectedDate);
      setShowCalendar(!showCalendar);
    }
    if (evt.type === 'dismissed') {
      setShowCalendar(!showCalendar);
    }
  };
  return (
    <DateTimePicker
      value={date}
      mode={mode}
      is24Hour={true}
      display="default"
      onChange={(event: AndroidEvent, selectedDate?: Date) =>
        _calendarOnChange(event, selectedDate)
      }
    />
  );
};
