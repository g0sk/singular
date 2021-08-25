import {apiURL} from 'api';
import {ParsedImage} from 'types';

const getMediaImage = (contentUrl: string) => apiURL.get(contentUrl);

const createMediaImage = (image: ParsedImage) => {
  let bodyFormData = new FormData();
  console.log(image);
  bodyFormData.append('file', {
    name: 'se_ha_subido_correctamente.jpg',
    type: image.type,
    uri: image.uri,
  });

  return apiURL
    .post('/api/media_objects', bodyFormData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data; boundary=',
      },
    })
    .then((res) => {
      console.log('---------------------------------------------------------');
      console.log('res: ', res);
    })
    .catch((error) => console.log('error creating media image ', error));
};

export default {
  getMediaImage,
  createMediaImage,
};
