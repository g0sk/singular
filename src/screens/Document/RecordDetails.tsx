import {DynamicSection, Text, View} from 'components';
import {translate} from 'core';
import dayjs from 'dayjs';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {RecordDetailsStackProps} from 'types';

export const RecordDetails: React.FC<RecordDetailsStackProps> = ({route}) => {
  return (
    <View style={styles.container} marginHorizontal="m" marginBottom="m">
      <View marginBottom="xl">
        <ScrollView horizontal={false}>
          <View alignSelf="flex-start">
            <TouchableOpacity>
              <View style={styles.entryDate} marginVertical="m">
                <View>
                  <Text variant="formLabel">
                    {translate('form.active.entryDate.label')}
                  </Text>
                </View>
                <View marginTop="s">
                  <Text>
                    {dayjs(route.params.active.entryDate).format('DD/MM/YYYY')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <View flexDirection="column" alignItems="flex-start">
                <View>
                  <Text variant="formLabel">
                    {translate('form.active.reference.label')}
                  </Text>
                </View>
                <View height={40}>
                  <Text>{route.params.active.reference}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View marginBottom="s">
            <View>
              <Text variant="formLabel">
                {translate('form.active.type.label')}
              </Text>
            </View>
            <View marginVertical="s">
              <View
                alignSelf="flex-start"
                style={styles.picker}
                borderColor="primary"
                minWidth={75}
                maxWidth={130}>
                <TouchableOpacity>
                  <View
                    paddingHorizontal="s"
                    paddingVertical="s"
                    alignItems="center">
                    <Text variant="listItemData">
                      {route.params.active.type.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <View marginVertical="m">
              <DynamicSection
                collection={route.params.active.basic_attributes}
                label={translate('form.active.basicAttribute.label')}
                isEditable={false}
                editDropdownValue={false}
                editValue={false}
                setChanges={() => null}
                open={true}
              />
            </View>
            <View marginTop="m" marginBottom="l">
              <DynamicSection
                collection={route.params.active.custom_attributes}
                label={translate('form.active.customAttribute.label')}
                isEditable={false}
                editDropdownValue={false}
                editValue={false}
                setChanges={() => null}
                open={true}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  picker: {
    borderRadius: 12,
    borderWidth: 2,
    minHeight: 30,
  },
  loading: {
    alignItems: 'center',
    height: 400,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activity: {
    flexDirection: 'column',
  },
  info: {
    flexDirection: 'row',
  },
  icon: {
    justifyContent: 'center',
  },
  entryDate: {},
});
