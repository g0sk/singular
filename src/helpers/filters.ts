import {PaginationFilters} from 'types';

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
