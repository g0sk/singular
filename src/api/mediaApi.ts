import {apiURL} from 'api';

const getMediaImage = (contentUrl: string) => apiURL.get(contentUrl);
const createMediaImage = (contentUrl: string) => apiURL.post(contentUrl);
/*
const createMediaImage = (image: any) => {
  let bodyFormData = new FormData();
  bodyFormData.append('file', {
    uri:
      'file:///data/user/0/com.singular/cache/rn_image_picker_lib_temp_952cb47e-d9ca-4fad-a66a-0569cfb6e8a9.jpg',
  });
  return apiURL.post('/api/media_objects', bodyFormData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
*/

export default {
  getMediaImage,
  createMediaImage,
};
