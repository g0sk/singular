import React, {useState} from 'react';
import {Modal, Section, Text, UserModal, View} from 'components';
import {API_URL} from '@env';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {RecordDetailsStackProps} from 'types';
import {translate} from 'core';

export const RecordDetails: React.FC<RecordDetailsStackProps> = ({route}) => {
  const [showImage, setShowImage] = useState<boolean>(false);
  let active = route.params.recordActive;
  let uri =
    active.file !== null ? API_URL + route.params.recordActive.file : '';
  console.log(route.params.recordActive);
  const ImagePreview = () => {
    return (
      <View>
        <Image
          source={{uri: uri}}
          style={{zIndex: 10}}
          height={400}
          width={355}
        />
      </View>
    );
  };

  return (
    <View marginHorizontal="m" marginBottom="m">
      <View marginBottom="xl">
        <ScrollView horizontal={false}>
          <View>
            <View>
              <View marginVertical="m">
                <View>
                  <Text variant="formLabel">
                    {translate('form.active.entryDate.label')}
                  </Text>
                </View>
                <View marginTop="s">
                  <Text>{active.entry_date.trimStart().split(' ')[0]}</Text>
                </View>
              </View>
            </View>
            <View>
              <View flexDirection="column" alignItems="flex-start">
                <View>
                  <Text variant="formLabel">
                    {translate('form.active.reference.label')}
                  </Text>
                </View>
                <View height={40}>
                  <Text>{active.reference}</Text>
                </View>
              </View>
            </View>
            <View marginBottom="s">
              <View>
                <Text variant="formLabel">
                  {translate('form.active.type.label')}
                </Text>
              </View>
              <View marginVertical="s">
                <View alignSelf="flex-start">
                  <Text variant="listItemData">{active.type.name}</Text>
                </View>
              </View>
            </View>
            {active.file === null ? (
              <View>
                <View marginBottom="m">
                  <Text variant="formLabel">
                    {translate('form.active.media.media')}
                  </Text>
                </View>
                <View marginLeft="s" justifyContent="flex-start">
                  <Text>{translate('form.active.media.noMediaShow')}</Text>
                </View>
              </View>
            ) : (
              <TouchableOpacity onPress={() => setShowImage(!showImage)}>
                <View marginBottom="m">
                  <Text variant="formLabel">
                    {translate('form.active.media.media')}
                  </Text>
                </View>
                <View justifyContent="flex-start">
                  <Image
                    style={{zIndex: 10}}
                    height={50}
                    width={50}
                    source={{uri: uri}}
                  />
                </View>
              </TouchableOpacity>
            )}
            <Modal
              children={<ImagePreview />}
              show={showImage}
              setVisibility={setShowImage}
            />
            <View marginTop="l" marginBottom="m">
              <View marginBottom="m">
                <Text variant="formLabel">
                  {translate('form.active.description.label')}
                </Text>
              </View>
              {active.description.length > 0 ? (
                <View
                  borderRadius={10}
                  borderColor="primary"
                  borderWidth={1}
                  padding="s"
                  width={280}
                  marginRight="xl">
                  <Text>{active.description}</Text>
                </View>
              ) : (
                <View width={250}>
                  <Text>{translate('form.active.description.empty')}</Text>
                </View>
              )}
            </View>
            <View>
              <View marginVertical="s">
                <Section
                  collection={active.basic_attributes}
                  label={translate('form.active.basicAttribute.label')}
                  open={true}
                />
              </View>
              <View marginBottom="m">
                <Section
                  collection={active.custom_attributes}
                  label={translate('form.active.customAttribute.label')}
                  open={true}
                />
              </View>
              <View>
                <UserModal user={active.user} created={false} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
