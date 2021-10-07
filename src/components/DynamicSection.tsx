import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {DynamicField, DynamicNewField, View, Text, Button} from 'components';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import {
  Attribute,
  CustomAttributeState,
  DynamicSectionProps,
  NewAttribute,
} from 'types';
import Icon from 'react-native-vector-icons/Ionicons';
import store, {useAppDispatch} from 'store/configureStore';
import {createCustomAttribute} from 'store/slices/customAttribute/customAttributeAsyncThunk';

export const DynamicSection: React.FC<DynamicSectionProps> = ({
  collection,
  label,
  isEditable,
  setChanges,
}) => {
  const [items, setItems] = useState<Attribute[]>([]);
  const [icon, setIcon] = useState<string>('chevron-down-outline');
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  /* const {customAttributes}: CustomAttributeState = useAppSelector(
    (state) => state.customAttribute,
  ); */

  useEffect(() => {
    if (collection !== null) {
      setItems(collection);
    }
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
    dispatch(createCustomAttribute(item)).then(() => {
      const {
        customAttribute,
      }: CustomAttributeState = store.getState().customAttribute;
      if (customAttribute !== null) {
        const _items = [...items];
        _items.unshift(customAttribute);
        setChanges(_items);
      }
    });
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
        <View justifyContent="center">
          {isEditable && (
            <View flexDirection="row">
              <View marginRight="m">
                <Button
                  label={!edit ? 'Edit' : 'Cancel'}
                  onPress={() => setEdit(!edit)}
                  variant="edit"
                />
              </View>
            </View>
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
        <View>{open && !edit && <ListEmptyComponent />}</View>
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
