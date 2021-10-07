import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {DynamicField, DynamicNewField, View, Text} from 'components';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import {Attribute, DynamicSectionProps, NewAttribute} from 'types';
import Icon from 'react-native-vector-icons/Ionicons';

export const DynamicSection: React.FC<DynamicSectionProps> = ({
  collection,
  label,
  isEditable,
  //setChanges,
}) => {
  const [items, setItems] = useState<Attribute[]>([]);
  const [icon, setIcon] = useState<string>('chevron-down-outline');
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [newItems, setNewItems] = useState<NewAttribute[]>([]);
  const theme = useTheme();

  useEffect(() => {
    if (collection !== null) {
      setItems(collection);
    }
    setNewItems([]);
  }, [collection]);

  useEffect(() => {
    if (!open) {
      setEdit(false);
    }
  }, [open]);

  const _headerHandler = useCallback(() => {
    setOpen(!open);
    open ? setIcon('chevron-down-outline') : setIcon('chevron-up-outline');
  }, [open]);

  const _addNewItem = (item: NewAttribute) => {
    newItems.unshift(item);
    const _items = [...items];
    const _newItem = {...item, id: 0};
    _items.unshift(_newItem);
    setItems(_items);
  };

  const _removeItem = (id: number) => {
    const _items = items.filter((_item) => _item.id !== id);
    setItems(_items);
  };

  const _handleItemChange = (item: Attribute) => {
    const index: number = items.findIndex((_item) => item.id === _item.id);
    const _items = [...items];
    _items[index] = {...item};
    setItems(_items);
  };

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
          {isEditable && (
            <TouchableOpacity onPress={() => setEdit(!edit)}>
              <Icon name="add-circle-outline" size={20} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View>
      <ListHeaderComponent />
      {edit && (
        <View marginVertical="s">
          <DynamicNewField setNewItem={_addNewItem} />
        </View>
      )}
      {items.length > 0 ? (
        items.map((item, index) => {
          return (
            <Fragment key={index}>
              {open && (
                <View style={styles.headerContainer}>
                  {edit && (
                    <View style={styles.icon} marginRight="s">
                      <TouchableOpacity onPress={() => _removeItem(item.id)}>
                        <Icon
                          name="remove-circle-outline"
                          size={25}
                          color={theme.colors.red}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  <DynamicField
                    field={item}
                    setItemChange={_handleItemChange}
                  />
                </View>
              )}
            </Fragment>
          );
        })
      ) : (
        <View>{open && <ListEmptyComponent />}</View>
      )}
    </View>
  );
};

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
