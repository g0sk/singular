import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import APIProvider from 'api/APIProvider';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <APIProvider>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text>Singular</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </APIProvider>
  );
};

export default App;
