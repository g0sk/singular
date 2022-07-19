import React, {
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {View, Text, Button} from 'components';
import {TextInput, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {translate} from 'core';

type DescriptionProps = {
  description: string;
  setParentDescription: Dispatch<SetStateAction<string>>;
};

export const DynamicDescription: React.FC<DescriptionProps> = ({
  description,
  setParentDescription,
}) => {
  const [_description, _setDescription] = useState<string>('');
  const [change, setChange] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [truncatedText, setTruncatedText] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    _setDescription(description);
    setTruncatedText(description.substring(0, 75) + '...');
  }, [description]);

  const showModal = () => {
    if (description.length === 0) {
      setTimeout(() => inputRef.current?.focus());
    }
    setShow(true);
  };

  const handleTextChange = (text: string) => {
    if (text !== _description) {
      setChange(true);
    } else {
      setChange(false);
    }
    _setDescription(text);
  };

  const saveDescription = () => {
    setParentDescription(_description);
    setChange(false);
    setShow(false);
  };

  const FormField: React.FC = () => {
    return (
      <TouchableOpacity onPress={showModal}>
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
        onBackdropPress={saveDescription}
        onBackButtonPress={saveDescription}
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}>
        <View
          backgroundColor="white"
          minHeight={350}
          maxHeight={500}
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
            {change && (
              <View>
                <Button
                  variant="secondary"
                  label={translate('action.general.save')}
                  onPress={() => saveDescription()}
                />
              </View>
            )}
          </View>
          <View>
            <TextInput
              ref={inputRef}
              style={{
                textAlignVertical: 'top',
                textAlign: 'justify',
                height: 230,
              }}
              placeholder={translate('form.active.description.placeholder')}
              numberOfLines={4}
              value={_description}
              multiline={true}
              onChangeText={(text) => handleTextChange(text)}
              maxLength={255}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
