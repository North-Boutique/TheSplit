import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

type Style = {
  container: ViewStyle;
  title: TextStyle;
  icon: ImageStyle;
};

export const exerciseListItem = StyleSheet.create<Style>({
  // @ts-ignore
  borderRadius: 20,
  borderWidth: 1,
  padding: 10,
  margin: 5,
});
