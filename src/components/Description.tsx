import React, {useState} from 'react';
import {View, Text} from 'components';
import {TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {translate} from 'core';

type DescriptionProps = {
  description: string;
};

export const Description: React.FC<DescriptionProps> = ({description}) => {
  const [show, setShow] = useState<boolean>(false);

  const truncatedText = description.substring(0, 75) + '...';

  const FormField: React.FC = () => {
    return (
      <TouchableOpacity onPress={() => setShow(true)}>
        <View marginTop="l" marginBottom="m">
          <View marginBottom="m">
            <Text variant="formLabel">
              {translate('form.active.description.label')}
            </Text>
          </View>
          <View
            borderRadius={4}
            borderColor="dark"
            minHeight={40}
            maxWidth={280}>
            <Text>
              {description.length > 0
                ? truncatedText
                : translate('form.active.description.empty')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FormField />
      <Modal
        coverScreen={true}
        isVisible={show}
        hasBackdrop={true}
        backdropColor="gray"
        backdropOpacity={0.8}
        onBackdropPress={() => setShow(false)}
        onBackButtonPress={() => setShow(false)}
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}>
        <View
          backgroundColor="white"
          minHeight={250}
          maxHeight={400}
          borderRadius={15}
          paddingBottom="m"
          paddingHorizontal="m"
          paddingTop="l">
          <View
            flexDirection="row"
            alignContent="center"
            justifyContent="space-between">
            <View marginBottom="m" marginTop="ss">
              <Text variant="formLabel">
                {translate('form.active.description.label')}
              </Text>
            </View>
          </View>
          <View>
            <Text>
              {description.length > 0
                ? description
                : translate('form.active.description.empty')}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};
