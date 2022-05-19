import {PaginationFilters} from 'types';
import {Filters} from '../../types';

export function createUrlParams(params: PaginationFilters): string {
  const {pagination, filters} = params;
  let urlParams = '';
  urlParams += `?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}`;
  if (filters.length > 0) {
    filters.forEach((_filter, _index) => {
      urlParams += `&${_filter.key}=${_filter.value}`;
    });
  }
  return urlParams;
}

export function createUrlFilterParams(filters: Filters): string {
  let urlParams = '';
  if (filters.length > 0) {
    filters.forEach((_filter, _index) => {
      if (_index === 0) {
        urlParams += `?${_filter.key}=${_filter.value}`;
      } else {
        urlParams += `&${_filter.key}=${_filter.value}`;
      }
    });
  }
  return urlParams;
}
