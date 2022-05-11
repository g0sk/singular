import {Text, View} from 'components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {RecordListItemProps} from 'types';

export const RecordListItem: React.FC<RecordListItemProps> = ({
  record,
  navigation,
}) => {
  const goToDetails = () => {
    navigation.navigate('RecordDetails', {
      active: record,
      title: record.reference,
    });
  };
  return (
    <View
      borderRadius={9}
      borderColor="primary"
      borderWidth={2}
      margin="m"
      flexDirection="row">
      <TouchableOpacity onPress={goToDetails}>
        <View flexDirection="row" alignItems="center">
          <View flexDirection="column" marginRight="l">
            <View marginTop="s" marginHorizontal="s" marginBottom="m">
              <Text>{record.reference}</Text>
            </View>
            <View marginHorizontal="s" marginBottom="s">
              <Text>{record.type.name}</Text>
            </View>
          </View>
          <View>
            <Text>{record.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
