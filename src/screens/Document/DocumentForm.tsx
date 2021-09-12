import React, {useEffect, useState} from 'react';
import {Dropdown, View} from 'components';
import {StyleSheet} from 'react-native';
import {useAppSelector} from 'store/configureStore';
import {Active, ActiveType, DocumentFormProps} from 'types';
//import {translate} from 'core';

export const DocumentForm: React.FC<DocumentFormProps> = ({active}) => {
  //const [types, setTypes] = useState<ActiveTypes>([]);
  const [item, setItem] = useState<Active | null>(null);
  const {activeTypes} = useAppSelector((state) => state.active);
  const [type, setType] = useState<ActiveType>({} as ActiveType);

  useEffect(() => {
    setItem(active);
    console.log(type);
    active !== null ? setType(active.activeType) : null;
  }, [active, activeTypes, type]);
  return (
    <View style={styles.container}>
      <View>
        <Dropdown
          value={item?.activeType}
          options={activeTypes}
          placeholder="Select"
          emptyMessage="No items"
          header="Types"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
