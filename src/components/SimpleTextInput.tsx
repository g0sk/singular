import React, {useRef, useEffect, SetStateAction, Dispatch} from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import {useTheme} from 'ui/theme';

interface SimpleTextInputProps extends RNTextInputProps {
  focused: boolean;
  setFocused: Dispatch<SetStateAction<boolean>>;
}

export const SimpleTextInput: React.FC<SimpleTextInputProps> = ({
  focused,
  setFocused,
  ...props
}: SimpleTextInputProps) => {
  const theme = useTheme();
  const _ref = useRef<TextInput>(null);
  const styles = StyleSheet.create({
    input: {
      color: theme.colors.darkText,
      fontSize: 14,
      borderBottomColor: focused ? theme.colors.primary : theme.colors.white,
      borderBottomWidth: 1,
      marginBottom: 0,
      paddingBottom: 0,
    },
  });

  useEffect(() => {
    if (focused === true) {
      _ref.current?.focus();
    }
  }, [focused]);

  return (
    <RNTextInput
      ref={_ref}
      style={styles.input}
      underlineColorAndroid="transparent"
      selectionColor={theme.colors.primary}
      placeholderTextColor={theme.colors.default}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
};
