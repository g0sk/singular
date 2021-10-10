import {apiURL} from 'api';
import {ActiveType, NewActiveType} from 'types';

const getActiveType = (id: number) => apiURL.get('/api/active_types/' + id);
const getActiveTypes = () => apiURL.get('/api/active_types');
const createActiveType = (activeType: NewActiveType) =>
  apiURL.post('/api/active_types', activeType);
const updateActiveType = (activeType: ActiveType, id: number) =>
  apiURL.put('/api/active_types/' + id, activeType);
const deleteActiveType = (id: number) =>
  apiURL.delete('/api/active_types/' + id);

export default {
  getActiveType,
  getActiveTypes,
  createActiveType,
  updateActiveType,
  deleteActiveType,
};
