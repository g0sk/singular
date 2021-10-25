import {apiURL} from 'api';
import {Active, NewActive, PaginationFilters} from 'types';

const getActive = (id: number) => apiURL.get('/api/actives/' + id);
const getActives = ({page, itemsPerPage, filter}: PaginationFilters) =>
  apiURL.get(
    '/api/actives' +
      '?' +
      'page=' +
      page +
      (itemsPerPage ? '&itemsPerPage=' + itemsPerPage : '') +
      (filter ? '&' + filter.key + '=' + filter.value : ''),
  );
const createActive = (active: NewActive) => apiURL.post('/api/actives', active);
const updateActive = (active: Active, id: number) =>
  apiURL.put('/api/actives/' + id, active);
const deleteActive = (id: number) => apiURL.delete('/api/actives/' + id);

export default {
  getActive,
  getActives,
  createActive,
  updateActive,
  deleteActive,
};
