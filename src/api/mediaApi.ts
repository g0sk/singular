import {apiURL} from 'api';

const getMediaImage = (contentUrl: string) => apiURL.get(contentUrl);

export default {
  getMediaImage,
};
