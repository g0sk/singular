import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Search, View, Text} from './';
import Icon from 'react-native-vector-icons/Feather';
import {HeaderProps, SearchFilter} from 'types';
import {translate} from 'core';

export const Header: React.FC<HeaderProps> = ({
  label,
  labelAction = () => null,
  defaultIcon,
  defaultAction = () => null,
  hasExtraIcon = false,
  extraIcon,
  segment,
}) => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const placeholder =
    segment === 'active'
      ? translate('screen.active.searchActive')
      : translate('screen.activeType.searchActiveType');

  const activeFilters: SearchFilter[] = [
    {
      key: 'reference',
      name: translate('filter.active.reference'),
      color: 'primary',
    },
    {
      key: 'activeType.name',
      name: translate('filter.active.activeType'),
      color: 'orange',
    },
  ];
  const activeTypeFilters: SearchFilter[] = [
    {
      key: 'name',
      name: translate('filter.activeType.name'),
      color: 'orange',
    },
  ];

  const currentFilters =
    segment === 'active' ? activeFilters : activeTypeFilters;
  return (
    <View>
      {!openSearch ? (
        <View flexDirection="row" justifyContent="space-between" height={45}>
          <View>
            <TouchableOpacity onPress={labelAction}>
              <Text variant="headerTitle">{label}</Text>
            </TouchableOpacity>
          </View>
          <View flexDirection="row" alignItems="center">
            {hasExtraIcon && extraIcon && (
              <View marginRight="l">
                <TouchableOpacity onPress={() => setOpenSearch(true)}>
                  <Icon name={extraIcon} size={25} />
                </TouchableOpacity>
              </View>
            )}
            {defaultIcon && (
              <View>
                <TouchableOpacity onPress={() => defaultAction()}>
                  <Icon name={defaultIcon} size={25} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ) : (
        <Search
          setOpen={setOpenSearch}
          placeholder={placeholder}
          filters={currentFilters}
          segment={segment}
        />
      )}
    </View>
  );
};
