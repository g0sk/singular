import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {DynamicFields, View, Text} from 'components';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {translate} from 'core';
import Icon from 'react-native-vector-icons/Ionicons';
import {Attribute, DynamicSectionProps} from 'types';

export function DynamicSection({
  collection,
  label,
  canCreateNewField,
  custom,
}: DynamicSectionProps) {
  const [items, setItems] = useState<Attribute[]>([]);
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

  const ListEmptyComponent = () => {
    return (
      <View marginVertical="s" marginHorizontal="s">
        <Text>{translate('form.active.attribute.empty')}</Text>
      </View>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View style={styles.headerContainer} marginBottom="s">
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
          {canCreateNewField && open && (
            <TouchableOpacity onPress={_addAttributeHandler}>
              <Icon name="add-circle-outline" size={20} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    //Section
    <View style={styles.container}>
      <ListHeaderComponent />
      {open &&
        (items.length > 0 ? (
          items.map((item, index) => {
            return (
              <Fragment key={index}>
                <View marginVertical="s">
                  <DynamicFields
                    field={item}
                    listIndex={index}
                    canDelete={canCreateNewField}
                    custom={custom}
                  />
                </View>
              </Fragment>
            );
          })
        ) : (
          <ListEmptyComponent />
        ))}
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
