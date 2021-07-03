import React, {useState} from 'react';
import {Button, Screen, View, Text} from 'components';
import {ActivityIndicator} from 'react-native';
import {initNfc, readNdef} from 'utils/nfc_scanner';
import {StyleSheet} from 'react-native';

export const Scan = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const discoverTags = () => {
    initNfc().then(() => {
      setLoading(true);
      readNdef().then(() => {
        setLoading(false);
      });
    });
  };
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.image}>
          <Text style={styles.title}>Scan view</Text>
        </View>
        {loading && <ActivityIndicator size="large" color="purple" />}
        <Button
          margin="xl"
          label="Scan"
          variant="primary"
          onPress={() => discoverTags()}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    margin: 20,
    //backgroundColor: 'red',
  },
  title: {
    textAlign: 'center',
  },
  scanButton: {},
  image: {
    //backgroundColor: 'gray',
    //height: 400,
    //width: 400,
  },
});
