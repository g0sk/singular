import {apiURL} from 'api';

const getMediaImage = (contentUrl: string) => apiURL.get(contentUrl);

const createMediaImage = () => null;
/* const createMediaImage = (image: ParsedImage) => {
  let bodyFormData = new FormData();
  const mediaImage = {
    name: image.fileName,
    type: image.type,
    size: image.fileSize,
    uri: image.uri,
  };
  console.log(mediaImage);
  bodyFormData.append('image', mediaImage);

  apiURL
    .post('/api/media_objects', mediaImage, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log('---------------------------------------------------------');
      console.log('res: ', res);
    })
    .catch((error) => console.log('error creating media image ', error));
}; */

export default {
  getMediaImage,
  createMediaImage,
};
