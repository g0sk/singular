import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {DynamicField, DynamicNewField, View, Text, Button} from 'components';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {translate} from 'core';
import {useTheme} from 'ui/theme';
import {Attribute, DynamicSectionProps} from 'types';
import Icon from 'react-native-vector-icons/Ionicons';

export const DynamicSection: React.FC<DynamicSectionProps> = ({
  collection,
  label,
  isEditable,
  editDropdownValue,
  editValue,
  setChanges,
  open,
  emptyMessage,
}) => {
  const [icon, setIcon] = useState<string>('chevron-down-outline');
  const [openSection, setOpenSection] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const theme = useTheme();

  useEffect(() => {
    open ? setOpenSection(open) : null;
  }, [open]);

  useEffect(() => {
    if (!openSection) {
      setEdit(false);
    }
  }, [openSection]);

  const _headerHandler = useCallback(() => {
    setOpenSection(!openSection);
    openSection
      ? setIcon('chevron-down-outline')
      : setIcon('chevron-up-outline');
  }, [openSection]);

  const _addNewItem = (item: Attribute) => {
    const _items = [...collection];
    _items.unshift(item);
    setChanges(_items);
  };

  const _removeItem = (index: number) => {
    const _items = collection.splice(index, 1);
    setChanges(_items);
  };

  const _handleItemChange = (item: Attribute, listIndex: number) => {
    const _items = [...collection];
    _items[listIndex] = {...item};
    setChanges(_items);
  };

  const ListEmptyComponent = () => {
    return (
      <View marginVertical="s" marginHorizontal="s">
        <Text>
          {!emptyMessage
            ? translate('form.active.attribute.empty')
            : emptyMessage}
        </Text>
      </View>
    );
  };

  const ListComponent = () => {
    return (
      <View>
        {edit && (
          <View marginVertical="s">
            <DynamicNewField
              editDropdownValue={editDropdownValue}
              setNewItem={_addNewItem}
            />
          </View>
        )}
        {collection.length > 0 ? (
          collection.map((item, index) => {
            return (
              <Fragment key={index}>
                {openSection && (
                  <View style={styles.headerContainer}>
                    {edit && (
                      <View style={styles.icon} marginRight="s">
                        <TouchableOpacity onPress={() => _removeItem(index)}>
                          <Icon
                            name="remove-circle-outline"
                            size={25}
                            color={theme.colors.red}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    <DynamicField
                      editDropdownValue={editDropdownValue}
                      editValue={editValue}
                      field={item}
                      listIndex={index}
                      setItemChange={_handleItemChange}
                    />
                  </View>
                )}
              </Fragment>
            );
          })
        ) : (
          <View>{openSection && !edit && <ListEmptyComponent />}</View>
        )}
      </View>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View style={styles.headerContainer} marginBottom="s">
        <View marginRight="l">
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
            <View marginRight="m">
              <Button
                label={
                  !edit
                    ? translate('action.general.edit')
                    : translate('action.general.cancel')
                }
                onPress={() => setEdit(!edit)}
                variant="edit"
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View>
      <ListHeaderComponent />
      <ListComponent />
    </View>
  );
};

const styles = StyleSheet.create({
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
