import {apiURL} from './index';
import {Unit} from 'types';

const getUnits = () => apiURL.get('/api/units');
const getUnit = (id: number) => apiURL.get('/api/units/' + id);
const createUnit = (unit: Unit) => apiURL.post('/api/units', unit);
const updateUnit = (unit: Unit) => apiURL.put('/api/units/' + unit.id, unit);
const deleteUnit = (id: number) => apiURL.delete('/api/units/' + id);

export default {
  getUnit,
  getUnits,
  createUnit,
  updateUnit,
  deleteUnit,
};
