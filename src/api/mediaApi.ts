import {apiURL} from 'api';

const getMediaImage = (contentUrl: string) => apiURL.get(contentUrl);
const createMediaImage = (contentUrl: string) =>
  apiURL.post('/api/media_objects', {contentUrl});

export default {
  getMediaImage,
  createMediaImage,
};
