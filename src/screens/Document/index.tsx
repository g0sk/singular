import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {ImagePicker} from 'components/mediaSelect/ImagePicker';

export const Document = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <View>
      <Text> Document view</Text>
      <Button title="Select image" onPress={() => setShowModal(!showModal)} />
      <ImagePicker visible={showModal} />
    </View>
  );
};
