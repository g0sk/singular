import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface HeaderProps {
  title: string;
  hasDescription: boolean;
  description?: string | undefined;
}

const Header: React.FC<HeaderProps> = ({
  title,
  hasDescription = false,
  description,
}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      {hasDescription && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {},
  title: {},
  description: {},
});

export default Header;
