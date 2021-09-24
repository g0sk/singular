import React, {useState, useEffect} from 'react';
import {View} from 'components';
import {DocumentForm} from './';
//import {translate} from 'core';
import {DocumentActiveStackProps} from 'types';
import {StyleSheet} from 'react-native';
import {Active} from 'types';
import store from 'store/configureStore';
import {fetchActiveRecord} from 'store/slices/record/recordAsyncThunk';

export const DocumentActive: React.FC<DocumentActiveStackProps> = ({route}) => {
  const [active, setActive] = useState<Active | null>(null);

  useEffect(() => {
    if (
      route.params.active !== null &&
      route.params?.active.activeRecord !== null
    ) {
      setActive(route.params.active);
      store.dispatch(fetchActiveRecord(route.params.active.activeRecord.id));
    }
  }, [route.params.active]);

  return (
    <View style={styles.container} margin="m">
      <DocumentForm active={active} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activity: {
    flexDirection: 'column',
  },
  date: {
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
  },
  icon: {
    justifyContent: 'center',
  },
  button: {},
  form: {
    height: 200,
    //borderRadius: 25,
    //borderColor: '#4b4a4d',
    //borderWidth: 2,
  },
  field: {},
});
