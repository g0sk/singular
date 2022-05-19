import {apiURL} from 'api';

const getActiveRecord = (id: number) => apiURL.get('/api/active_records/' + id);
const getActiveRecords = () => apiURL.get('api/active_records');
const getFilteredActiveRecord = (filter: string) =>
  apiURL.get('api/active_records' + filter);

export default {
  getActiveRecord,
  getActiveRecords,
  getFilteredActiveRecord,
};
