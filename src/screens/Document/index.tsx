import React, {useState} from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import {ImagePicker, ParsedImage} from 'components/ImagePicker';

export const Document = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [image, setImage] = useState<ParsedImage>();

  return (
    <View>
      <Text> Document view</Text>
      <Button title="Select image" onPress={() => setShowModal(true)} />
      <ImagePicker
        visible={showModal}
        setModalVisibility={setShowModal}
        saveImage={setImage}
      />
      {image?.uri !== undefined ? (
        <Image style={styles.image} source={{uri: image.uri}} />
      ) : (
        <Text>No photo </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});
