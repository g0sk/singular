import {Text, View} from './';
import {translate} from 'core';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Attribute, SectionProps} from 'types';
import Icon from 'react-native-vector-icons/Ionicons';

export const Section: React.FC<SectionProps> = ({label, collection, open}) => {
  const [openSection, setOpenSection] = useState<boolean>(false);
  const [icon, setIcon] = useState<string>('chevron-down-outline');

  useEffect(() => {
    if (open) {
      setOpenSection(open);
    }
  }, [open]);

  const onHeaderPress = useCallback(() => {
    setOpenSection(!openSection);
    openSection
      ? setIcon('chevron-down-outline')
      : setIcon('chevron-up-outline');
  }, [openSection]);

  const AttributeListEmptyComponent = () => {
    return (
      <View marginVertical="s" marginHorizontal="s">
        <Text>{translate('form.active.attribute.empty')}</Text>
      </View>
    );
  };

  const AttributeListHeaderComponent = () => {
    return (
      <View flexDirection="row">
        <View marginRight="l">
          <TouchableOpacity onPress={onHeaderPress}>
            <View flexDirection="row" alignItems="center">
              <View marginRight="s">
                <Text variant="formLabel">{label}</Text>
              </View>
              <View>
                <Icon name={icon} size={15} color="black" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const AttributeItem: React.FC<{item: Attribute}> = ({item}) => {
    return (
      <View marginVertical="s">
        <View flexDirection="row" alignItems="center">
          <View
            borderRadius={10}
            borderWidth={1}
            borderColor="default"
            padding="s"
            marginRight="m">
            <Text>{item.name}</Text>
          </View>
          <View marginRight="m">
            <Text>{item.value}</Text>
          </View>
          <View
            alignSelf="flex-start"
            borderColor="primary"
            borderRadius={10}
            borderWidth={2}
            minWidth={75}
            maxWidth={130}>
            <View paddingHorizontal="s" paddingVertical="s" alignItems="center">
              <Text variant="listItemData">{item.unit.name}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const AttributeListComponent = () => {
    return (
      <View margin="s">
        {collection.length > 0 ? (
          collection.map((item, index) => {
            return (
              <Fragment key={index}>
                {openSection && (
                  <View flexDirection="row">
                    <AttributeItem item={item} />
                  </View>
                )}
              </Fragment>
            );
          })
        ) : (
          <View>{openSection && <AttributeListEmptyComponent />}</View>
        )}
      </View>
    );
  };

  return (
    <View>
      <AttributeListHeaderComponent />
      <AttributeListComponent />
    </View>
  );
};
