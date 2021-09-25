import React, {useState} from 'react';
import {SimpleTextInput as TextInput, Text, View} from 'components';
import {DynamicFieldsProps} from 'types';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Vibration,
} from 'react-native';
import {useTheme} from 'ui/theme';
export const DynamicFields: React.FC<DynamicFieldsProps> = ({
  field,
  //listIndex,
  canDelete,
  custom,
}) => {
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const theme = useTheme();

  const _longPressHandler = () => {
    Vibration.vibrate(200, true);
    if (canDelete) {
      setShowIcon(!showIcon);
    } else {
      ToastAndroid.showWithGravity(
        custom
          ? 'Custom attributes can be edited on type form'
          : 'Basic attributes cant be edited',
        ToastAndroid.CENTER,
        ToastAndroid.SHORT,
      );
    }
  };
  return (
    <View style={styles.container}>
      {canDelete && showIcon && (
        <View marginRight="s">
          <TouchableOpacity onPress={() => null}>
            <Icon name="remove-circle-outline" color="red" size={20} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.field}>
        <Pressable
          onLongPress={_longPressHandler}
          delayLongPress={700}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? theme.colors.primary : 'white',
              opacity: pressed ? 0.6 : 1,
              borderRadius: pressed ? 10 : 0,
            },
          ]}>
          <View style={styles.container}>
            <View
              style={styles.label}
              borderColor="default"
              padding="s"
              marginRight="xl">
              <Text>{field.name}</Text>
            </View>
            <View>
              <TextInput value={field.value} />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  field: {},
  label: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
  },
  value: {
    color: 'black',
  },
});
