import React, {useEffect, useState} from 'react';
import {API_URL} from '@env';
import {
  ActivityIndicator,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {Button, Modal, Text, View} from 'components';
import {ImageUploadProps, MediaObjectState, ParsedImage} from 'types';
import {translate} from 'core';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'ui/theme';
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import store, {useAppDispatch, useAppSelector} from 'store/configureStore';
import {createMediaObject} from 'store/slices/mediaObject/mediaObjectAsyncThunk';

export const ImageUpload: React.FC<ImageUploadProps> = ({file, saveImage}) => {
  const [contentUrl, setContentUrl] = useState<string>('');
  const [newImage, setNewImage] = useState<ParsedImage>();
  const [show, setShow] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const mediaObjectState: MediaObjectState = useAppSelector(
    (state) => state.mediaObject,
  );

  useEffect(() => {
    if (file !== null && file.contentUrl !== undefined) {
      setContentUrl(API_URL + file.contentUrl);
    } else {
      setContentUrl('');
    }
  }, [file]);

  useEffect(() => {
    if (newImage !== undefined && newImage.uri !== undefined) {
      setContentUrl(newImage.uri);
    } else {
      setContentUrl('');
    }
  }, [newImage]);

  const updateImage = () => {
    if (newImage !== undefined && newImage.uri !== undefined) {
      dispatch(createMediaObject(newImage)).then(() => {
        const mediaObject = store.getState().mediaObject;
        if (mediaObject.image !== null) {
          setIsNew(false);
          saveImage(mediaObject.image);
          setContentUrl(API_URL + mediaObject.image.contentUrl);
          setShow(!show);
        }
      });
    }
  };

  const parseImageResponse = (response: ImagePickerResponse): ParsedImage => {
    const base64URI = 'data:image/jpg;base64,' + response.base64;
    return {
      base64: base64URI,
      type: response.type,
      uri: response.uri,
      height: response.height,
      width: response.width,
      fileSize: response.fileSize,
      fileName: response.fileName,
    };
  };

  const errorToast = (errorMessage: string) => {
    ToastAndroid.showWithGravity(
      errorMessage,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };

  const showGallery = () => {
    const libraryOptions: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 1,
    };
    launchImageLibrary(libraryOptions, (response: ImagePickerResponse) => {
      if (response.errorCode) {
        errorToast(response.errorCode);
      }
      if (!response.didCancel) {
        setIsNew(true);
        const parsedImage = parseImageResponse(response);
        setNewImage(parsedImage);
      }
    });
  };

  const showCamera = () => {
    const cameraOptions: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      cameraType: 'back',
      includeBase64: true,
      saveToPhotos: true,
    };
    launchCamera(cameraOptions, (response: ImagePickerResponse) => {
      if (response.errorCode) {
        errorToast(response.errorCode);
      }
      if (!response.didCancel) {
        setIsNew(true);
        const parsedImage = parseImageResponse(response);
        setNewImage(parsedImage);
      }
    });
  };

  const ImageModal = () => {
    return (
      <View
        flexDirection="column"
        backgroundColor="white"
        borderRadius={10}
        minHeight={150}>
        <View>
          {contentUrl.length > 0 ? (
            <View flexDirection="column">
              <View
                paddingVertical="s"
                marginHorizontal="m"
                flexDirection="row"
                justifyContent="flex-end">
                {isNew && (
                  <View>
                    {mediaObjectState.loading ? (
                      <View marginHorizontal="m" marginVertical="s">
                        <ActivityIndicator
                          animating={mediaObjectState.loading}
                          size="small"
                          color={theme.colors.primary}
                        />
                      </View>
                    ) : (
                      <TouchableOpacity onPress={updateImage}>
                        <Icon
                          name="checkmark-circle-outline"
                          color={theme.colors.primary}
                          size={35}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
              <View margin="m" alignItems="center">
                <Image
                  style={{zIndex: 10}}
                  source={{uri: contentUrl}}
                  height={280}
                  width={300}
                />
              </View>
            </View>
          ) : (
            <View alignItems="center" margin="m">
              <Icon name="image" size={40} color="black" />
            </View>
          )}
        </View>
        <View flexDirection="column" alignItems="center">
          <Button
            marginBottom="m"
            variant="upload"
            label={translate('action.image.take')}
            onPress={showCamera}
          />
          <Button
            marginBottom="m"
            variant="upload"
            label={translate('action.image.select')}
            onPress={showGallery}
          />
        </View>
      </View>
    );
  };
  const ImagePreview = () => {
    return (
      <View justifyContent="flex-start">
        {contentUrl.length > 0 ? (
          <Image
            style={{zIndex: 10}}
            height={50}
            width={50}
            source={{uri: contentUrl}}
          />
        ) : (
          <Text>{translate('form.active.media.noMedia')}</Text>
        )}
      </View>
    );
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => setShow(!show)}>
          <View>
            <View marginBottom="m">
              <Text variant="formLabel">
                {translate('form.active.media.media')}
              </Text>
            </View>
            <ImagePreview />
          </View>
        </TouchableOpacity>
      </View>
      <Modal children={<ImageModal />} show={show} setVisibility={setShow} />
    </View>
  );
};
