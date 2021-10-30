import {apiURL} from 'api';
import {Active, NewActiveProps, Pagination} from 'types';

const getActive = (id: number) => apiURL.get('/api/actives/' + id);
const getActives = ({page, itemsPerPage}: Pagination) =>
  apiURL.get(
    `/api/actives?page=${page}&itemsPerPage=${itemsPerPage}&order[entryDate]=desc`,
  );
const getFilteredActives = (urlParams: string) =>
  apiURL.get('/api/actives' + urlParams);

//Tag reference
const getTag = (urlParams: string) => apiURL.get('/api/actives' + urlParams);
const createActive = (active: NewActiveProps) =>
  apiURL.post('/api/actives', active);
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
