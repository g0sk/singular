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
import {Text, View, FilterModal} from './';
import {useTheme} from 'ui/theme';
import {fetchFilteredActives} from 'store/slices/active/activeAsyncThunk';
import store from 'store/configureStore';
import {Mode, SearchFilter} from 'types';
import {resetActiveState} from 'store/slices/active/activeSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import {fetchFilteredActiveTypes} from 'store/slices/activeType/activeTypeAsyncThunk';
import {resetActiveTypeState} from 'store/slices/activeType/activeTypeSlice';

export const Search: React.FC<{
  setOpen: Dispatch<SetStateAction<boolean>>;
  placeholder: string;
  filters: SearchFilter[];
  segment: Mode;
}> = ({setOpen, placeholder, filters, segment}) => {
  const [filter, setFilter] = useState<SearchFilter>({} as SearchFilter);
  const [query, setQuery] = useState<string>('');
  const theme = useTheme();
  const searchRef = useRef<TextInput>(null);

  useEffect(() => {
    if (segment === 'active') {
      setFilter(filters[0]);
    } else {
      setFilter(filters[0]);
    }
  }, [filters, segment]);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const debounceSearch = useMemo(
    () =>
      debounce((_filter) => {
        const orderFilter = {
          key: segment === 'active' ? 'order[entryDate]' : 'order[id]',
          value: 'desc',
        };
        const _filters = [];
        _filters.push(orderFilter);
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

  const closeSearch = () => {
    if (query.length > 0) {
      onChangeText('');
    }
    setOpen(false);
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
        <TouchableOpacity onPress={() => closeSearch()}>
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
            <View width={165}>
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
              overflow="hidden"
              borderRadius={20}
              backgroundColor={filter.color}
              paddingVertical="ss"
              marginRight="m"
              marginLeft="s"
              alignItems="center"
              minWidth={80}
              maxWidth={80}>
              <Text
                textAlign="center"
                textTransform="capitalize"
                variant="filter">
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
