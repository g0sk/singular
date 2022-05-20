import {apiURL} from 'api';

const getActiveRecord = (id: number) => apiURL.get('/api/active_records/' + id);
const getActiveRecords = () => apiURL.get('api/active_records');
const getFilteredActiveRecord = (id: number, filter: string) =>
  apiURL.get('api/active_records/' + id + '/active_dates' + filter);

export default {
  getActiveRecord,
  getActiveRecords,
  getFilteredActiveRecord,
};
