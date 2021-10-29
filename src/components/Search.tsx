import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import debounce from 'lodash.debounce';
import {Text, View} from './';
import {FilterModal} from './';
import {useTheme} from 'ui/theme';
import {fetchFilteredActives} from 'store/slices/active/activeAsyncThunk';
import store from 'store/configureStore';
import {Mode, SearchFilter} from 'types';
import {resetActiveState} from 'store/slices/active/activeSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import {translate} from 'core';
import {fetchFilteredActiveTypes} from 'store/slices/activeType/activeTypeAsyncThunk';
import {resetActiveTypeState} from 'store/slices/activeType/activeTypeSlice';

export const Search: React.FC<{
  setOpen: Dispatch<SetStateAction<boolean>>;
  placeholder: string;
  filters: SearchFilter[];
  segment: Mode;
}> = ({setOpen, placeholder, filters, segment}) => {
  const [filter, setFilter] = useState<SearchFilter>({
    key: 'reference',
    name: translate('filter.active.reference'),
    color: 'primary',
  });
  const [query, setQuery] = useState<string>('');
  const theme = useTheme();
  const searchRef = useRef<TextInput>(null);

  useEffect(() => {
    if (segment === 'active') {
      setFilter({
        key: 'reference',
        name: translate('filter.active.reference'),
        color: 'primary',
      });
    } else {
      setFilter({
        key: 'name',
        name: translate('filter.activeType.name'),
        color: 'orange',
      });
    }
  }, [segment]);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const debounceSearch = useMemo(
    () =>
      debounce((_filter) => {
        const _filters = [];
        if (segment === 'active') {
          _filters.push(_filter);
          store.dispatch(resetActiveState());
          store.dispatch(
            fetchFilteredActives({
              pagination: {page: 1, itemsPerPage: 7},
              filters: _filters,
            }),
          );
        } else {
          _filters.push(_filter);
          store.dispatch(resetActiveTypeState());
          store.dispatch(
            fetchFilteredActiveTypes({
              pagination: {page: 1, itemsPerPage: 7},
              filters: _filters,
            }),
          );
        }
      }, 500),
    [segment],
  );

  const onChangeText = (_text: string) => {
    setQuery(_text);
    debounceSearch({key: filter.key, value: _text});
  };

  const onFilterChange = (_filter: SearchFilter) => {
    setFilter(_filter);
    if (query.length > 0) {
      debounceSearch({key: _filter.key, value: query});
    }
  };

  return (
    <View flexDirection="row" alignItems="center" height={45}>
      <View
        width={310}
        borderRadius={20}
        borderWidth={2}
        borderColor={segment === 'active' ? 'primary' : 'orange'}
        flexDirection="row"
        alignItems="center">
        <TouchableOpacity onPress={() => setOpen(false)}>
          <View marginHorizontal="s">
            <Icon
              name="arrow-back-outline"
              size={26}
              color={
                segment === 'active'
                  ? theme.colors.primary
                  : theme.colors.orange
              }
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => searchRef.current?.focus()}>
          <View alignItems="center" flexDirection="row" borderRadius={20}>
            <View width={180}>
              <TextInput
                ref={searchRef}
                placeholder={placeholder}
                selectionColor={
                  segment === 'active'
                    ? theme.colors.primary
                    : theme.colors.orange
                }
                onChangeText={onChangeText}
                value={query}
                style={{fontSize: 16}}
              />
            </View>
            <View
              borderRadius={8}
              backgroundColor={filter.color}
              paddingHorizontal="ss"
              paddingVertical="ss"
              alignItems="center"
              minWidth={70}
              maxWidth={80}>
              <Text textAlign="center" variant="filter">
                {filter.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View marginHorizontal="m">
        <FilterModal filters={filters} setFilter={onFilterChange} />
      </View>
    </View>
  );
};
