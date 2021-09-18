import {apiURL} from 'api';

const getActiveRecord = (id: number) => apiURL.get('/api/active_records/' + id);
const getActiveRecords = () => apiURL.get('api/active_records');

export default {
  getActiveRecord,
  getActiveRecords,
};
