import React, {useState} from 'react';
import {useAuth} from 'core/auth';
import {Screen, View, Text, Button} from 'components';
import {ImagePicker, ParsedImage} from 'components/ImagePicker';
import {Avatar} from 'components/Avatar';
import {useAppSelector} from 'store/configureStore';
//import UserSlice from 'store/slices/UserSlice';

export const Home = () => {
  const [image, setImage] = useState<ParsedImage | undefined>(undefined);
  const [modal, setModal] = useState<boolean>(false);
  //const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.user);
  const {signOut} = useAuth();
  return (
    <Screen>
      <View>
        <Button label="Logout" onPress={() => signOut()} />
        <Button label="Media select" onPress={() => setModal(true)} />
        <ImagePicker
          setModalVisibility={setModal}
          visible={modal}
          saveImage={setImage}
        />
        {image && image.uri && (
          <Avatar uri={image?.uri} hasBorder={false} height={60} width={60} />
        )}
        <Text>{user?.name}</Text>
      </View>
    </Screen>
  );
};
