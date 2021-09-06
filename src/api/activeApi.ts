import {apiURL} from 'api';
import {Active} from '../types';

const getActive = (id: number) => apiURL.get('/api/actives/' + id);
const getActives = () => apiURL.get('/api/actives');
const createActive = (active: Active) => apiURL.post('/api/actives', active);
const updateActive = (active: Active, id: number) =>
  apiURL.put('/api/actives/' + id, active);
const deleteActive = (id: number) => apiURL.delete('/api/actives/' + id);
const getTypes = () => apiURL.get('/api/active_types');

export default {
  getActive,
  getActives,
  getTypes,
  createActive,
  updateActive,
  deleteActive,
};
