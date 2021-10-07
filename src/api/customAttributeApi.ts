import {NewAttribute} from 'types';
import {apiURL} from 'api';

const getCustomAttribute = (id: number) =>
  apiURL.get('/api/custom_attributes/' + id);
const getCustomAttributes = () => apiURL.get('/api/custom_attributes');
const createCustomAttribute = (customAttribute: NewAttribute) =>
  apiURL.post('/api/custom_attributes', customAttribute);

export default {
  getCustomAttribute,
  getCustomAttributes,
  createCustomAttribute,
};
