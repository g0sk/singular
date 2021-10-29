import {apiURL} from 'api';
import {Active, NewActive, Pagination} from 'types';

const getActive = (id: number) => apiURL.get('/api/actives/' + id);
const getActives = (pagination: Pagination) =>
  apiURL.get(
    `/api/actives?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}`,
  );
const getFilteredActives = (urlParams: string) =>
  apiURL.get('/api/actives' + urlParams);

//Tag reference
const getTag = (urlParams: string) => apiURL.get('/api/actives' + urlParams);
const createActive = (active: NewActive) => apiURL.post('/api/actives', active);
const updateActive = (active: Active, id: number) =>
  apiURL.put('/api/actives/' + id, active);
const deleteActive = (id: number) => apiURL.delete('/api/actives/' + id);

export default {
  getActive,
  getTag,
  getActives,
  getFilteredActives,
  createActive,
  updateActive,
  deleteActive,
};
