import {apiURL} from 'api';

const getAttributeValues = () => apiURL.get('/api/attribute_values');

export default {
  getAttributeValues,
};
