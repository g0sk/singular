import {View} from 'components';
import React, {useRef, useEffect, SetStateAction, Dispatch} from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import {useTheme} from 'ui/theme';

interface SimpleTextInputProps extends RNTextInputProps {
  focused?: boolean;
  setFocused?: Dispatch<SetStateAction<boolean>>;
  error?: string;
}

export const SimpleTextInput: React.FC<SimpleTextInputProps> = ({
  focused,
  setFocused,
  error,
  ...props
}: SimpleTextInputProps) => {
  const theme = useTheme();
  const _ref = useRef<TextInput>(null);
  const color: keyof typeof theme.colors = !error ? 'primary' : 'error';

  const styles = StyleSheet.create({
    input: {
      color: theme.colors.darkText,
      fontSize: 14,
      marginBottom: 0,
      paddingBottom: 0,
    },
  });

  const _handleFocus = () => {
    if (setFocused) {
      setFocused(true);
    }
  };

  const _handleBlur = () => {
    if (setFocused) {
      setFocused(false);
    }
  };

  useEffect(() => {
    if (focused === true) {
      _ref.current?.focus();
    }
  }, [focused]);

  return (
    <View borderBottomColor={color} borderBottomWidth={1}>
      <RNTextInput
        ref={_ref}
        style={styles.input}
        underlineColorAndroid="transparent"
        selectionColor={theme.colors.primary}
        placeholderTextColor={theme.colors.default}
        onFocus={_handleFocus}
        onBlur={_handleBlur}
        {...props}
      />
    </View>
  );
};
