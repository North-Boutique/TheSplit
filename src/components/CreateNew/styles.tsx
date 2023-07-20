import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

type Style = {
  container: ViewStyle;
  title: TextStyle;
  icon: ImageStyle;
};

export const rectButtonStyleSheet = StyleSheet.create<Style>({
  // @ts-ignore
  height: 40,
  width: '100%',
  marginRight: 5,
  backgroundColor: '#64748b',
  borderLeftWidth: 0,
  borderWidth: 1,
  borderColor: '#64748b',
  borderRadius: 8,
  borderTopLeftRadius: 0,
  borderBottomRightRadius: 0,
  marginBottom: 4,
});
