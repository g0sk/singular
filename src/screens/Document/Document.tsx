import React, {useState, useEffect} from 'react';
import {Text, View, Button} from 'components';
import {DocumentForm} from './';
import {translate} from 'core';
import {DocumentStackProps} from 'types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Active} from 'types';
//import * as Yup from 'yup';
type Mode = 'date' | 'time';

export const Document: React.FC<DocumentStackProps> = ({route}) => {
  const [change, setChange] = useState<boolean>(false);
  const [active, setActive] = useState<Active | null>(null);

  useEffect(() => {
    //Null for active create
    if (route.params.active !== null) {
      setActive(route.params.active);
    }
    setChange(true);
  }, [route.params.active]);

  /* const ActiveSchema = Yup.object().shape({
    activeType: new Yup.ObjectSchema({
      id: Yup.number(),
      name: Yup.string(),
    }).required(),
    entryDate: Yup.string().required(),
    measuramentData: Yup.string().required(),
    measuramentUnit: Yup.string().required(),
    useWearTear: Yup.string().required(),
    estimatedLifeTime: Yup.string().required(),
    customAttributes: Yup.string(),
    //activeRecord: new Yup.ArraySchema({}),
    file: new Yup.ObjectSchema({
      id: Yup.number(),
      contentUrl: Yup.string(),
    }),
  }); */

  return (
    <View style={styles.container} margin="m">
      <View style={styles.header}>
        <TouchableOpacity style={styles.info} onPress={() => null}>
          <View style={styles.update} marginRight="m">
            <View marginBottom="s">
              <Text variant="updated">{translate('active.lastUpdate')}</Text>
            </View>
            <View style={styles.date}>
              <Text>17/17/27</Text>
            </View>
          </View>
          <View style={styles.icon}>
            <Icon name="documents" size={34} />
          </View>
        </TouchableOpacity>
        {change && (
          <View width={100}>
            <Button
              onPress={() => null}
              variant="secondary"
              label={translate('action.general.save')}
            />
          </View>
        )}
      </View>
      <DocumentForm active={active} />
      <View marginVertical="xl" marginHorizontal="xxl">
        <Button
          onPress={() => null}
          variant="delete"
          label={translate('action.general.delete')}
        />
      </View>
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
  update: {
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
