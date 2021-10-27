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
  canAddItems,
  editDropdownValue,
  editValue,
  setChanges,
  open,
  emptyMessage,
}) => {
  const [newItems, setNewItems] = useState<Attribute[]>([]);
  const [icon, setIcon] = useState<string>('chevron-down-outline');
  const [openSection, setOpenSection] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);

  const theme = useTheme();

  useEffect(() => {
    setNewItems(collection);
  }, [collection]);

  useEffect(() => {
    open ? setOpenSection(open) : null;
  }, [open]);

  useEffect(() => {
    if (!openSection) {
      setEdit(false);
    }
  }, [openSection]);

  const onEditMode = () => {
    setEdit(!edit);
    if (!edit && change) {
      console.log('hehe');
      setChanges([...newItems]);
      setChange(false);
    }
  };

  const onChange = useCallback(() => {
    if (!change) {
      setChange(true);
    }
  }, [change]);

  const onHeaderPress = useCallback(() => {
    setOpenSection(!openSection);
    openSection
      ? setIcon('chevron-down-outline')
      : setIcon('chevron-up-outline');
  }, [openSection]);

  const onAddNewItem = (item: Attribute) => {
    const items = [...newItems];
    items.unshift(item);
    onChange();
    setNewItems([...items]);
  };

  const onRemoveItem = (index: number) => {
    const items = newItems.splice(index, 1);
    setNewItems([...items]);
    onChange();
  };

  const onItemChange = (item: Attribute, listIndex: number) => {
    const items = [...newItems];
    items[listIndex] = {...item};
    setChanges(items);
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
      <View margin="s">
        {edit && <DynamicNewField setNewItem={onAddNewItem} />}
        {newItems.length > 0 ? (
          newItems.map((item, index) => {
            return (
              <Fragment key={index}>
                {openSection && (
                  <View style={styles.headerContainer}>
                    {edit && (
                      <View style={styles.icon} marginRight="s">
                        <TouchableOpacity onPress={() => onRemoveItem(index)}>
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
                      setItemChange={onItemChange}
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
      <View style={styles.headerContainer}>
        <View marginRight="l">
          <TouchableOpacity style={styles.header} onPress={onHeaderPress}>
            <View marginRight="s">
              <Text variant="formLabel">{label}</Text>
            </View>
            <View style={styles.icon}>
              <Icon name={icon} size={15} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View justifyContent="center">
          {canAddItems && (
            <View marginRight="m">
              <Button
                label={
                  !edit
                    ? translate('action.general.edit')
                    : translate('action.general.cancel')
                }
                onPress={() => onEditMode()}
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
