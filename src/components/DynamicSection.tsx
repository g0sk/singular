export function DynamicSection<T>() {
  return null;
}

/* import React, {useCallback, useEffect, useState} from 'react';
import {SimpleTextInput as TextInput, View, Text} from 'components';
import {FlatList, TouchableOpacity, StyleSheet} from 'react-native';
//import {translate} from 'core';
import Icon from 'react-native-vector-icons/Ionicons';
import {DynamicSectionProps} from 'types';

interface SectionItem extends T {
  id: number;
  name: string;
  value: string;
}

export function DynamicSection<T>({collection, label}: DynamicSectionProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [icon, setIcon] = useState<string>('chevron-down-outline');
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (collection) {
      setItems([...collection]);
    }
  }, [collection]);

  const _headerHandler = useCallback(() => {
    setOpen(!open);
    open ? setIcon('chevron-down-outline') : setIcon('chevron-up-outline');
  }, [open]);

  const _addAttributeHandler = () => null;

  const RenderItem = <T extends SectionItem>(sectionItem: T, index: number) => {
    return (
      <View flexDirection="row" marginTop="m" marginBottom="s">
        {open && (
          <View>
            <View>
              <Text>{sectionItem.name} + ': '</Text>
            </View>
            <View style={styles.formValue}>
              <TextInput value={sectionItem.value} />
            </View>
          </View>
        )}
      </View>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View style={styles.headerContainer}>
        <View marginRight="xl">
          <TouchableOpacity style={styles.header} onPress={_headerHandler}>
            <View marginRight="s">
              <Text variant="formLabel">{label}</Text>
            </View>
            <View style={styles.icon}>
              <Icon name={icon} size={15} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={_addAttributeHandler}>
            <Icon name="add-circle-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    //Section
    <View style={styles.container}>
      {items.map((item: T, index) => {
        return (
          <View key={index}>
            <RenderItem sectionItem={item} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  formValue: {
    justifyContent: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
  },
  icon: {
    justifyContent: 'center',
  },
});
 */
