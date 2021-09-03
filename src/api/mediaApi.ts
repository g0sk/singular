import {apiURL} from 'api';
import {ParsedImage} from 'types';

const getMediaImage = (contentUrl: string) => apiURL.get(contentUrl);

const createMediaImage = (image: ParsedImage) => {
  let bodyFormData = new FormData();
  bodyFormData.append('file', {
    name: image.fileName,
    type: image.type,
    uri: image.uri,
  });

  return apiURL.post('/api/media_objects', bodyFormData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data; boundary=',
    },
  });
};

export default {
  getMediaImage,
  createMediaImage,
};
