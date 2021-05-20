import React, {useState} from 'react';
import {useAuth} from 'core/auth';
import {View, Button} from 'react-native';
//import Screen from 'components/Screen';
import {ImagePicker, ParsedImage} from 'components/mediaSelect/ImagePicker';
import {Avatar} from 'components/Avatar';

export const Home = () => {
  const [image, setImage] = useState<ParsedImage | undefined>(undefined);
  const [modal, setModal] = useState<boolean>(false);

  const {signOut} = useAuth();
  return (
    <View>
      <Button title="Logout" onPress={() => signOut()} />
      <Button title="Media select" onPress={() => setModal(true)} />
      <ImagePicker
        setModalVisibility={setModal}
        visible={modal}
        saveImage={setImage}
      />
      {image && image.uri ? (
        <Avatar uri={image?.uri} hasBorder={false} height={60} width={60} />
      ) : null}
    </View>
  );
};
