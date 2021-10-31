import {apiURL} from 'api';
import {ActiveType, NewActiveTypeProps} from 'types';

const getActiveType = (id: number) => apiURL.get('/api/active_types/' + id);
const getActiveTypes = (urlParams: string) =>
  apiURL.get('/api/active_types' + urlParams);
const getFilteredActiveTypes = (urlParams: string) =>
  apiURL.get('/api/active_types' + urlParams);
const createActiveType = (activeType: NewActiveTypeProps) =>
  apiURL.post('/api/active_types', activeType);
const updateActiveType = (activeType: ActiveType, id: number) =>
  apiURL.put('/api/active_types/' + id, activeType);
const deleteActiveType = (id: number) =>
  apiURL.delete('/api/active_types/' + id);

export default {
  getActiveType,
  getActiveTypes,
  getFilteredActiveTypes,
  createActiveType,
  updateActiveType,
  deleteActiveType,
};
