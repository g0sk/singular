import {apiURL} from 'api';

const getBasicAttributes = () => apiURL.get('/api/basic_attributes');

export default {
  getBasicAttributes,
};
