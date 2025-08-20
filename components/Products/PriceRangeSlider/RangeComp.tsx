import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Thumb = () => (
  <View style={styles.thumb} />
);

const styles = StyleSheet.create({
  thumb: {
    width: 25,
    height: 25,
    borderRadius: 14,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#000',
  },
});

export const Rail = () => <View style={railStyles.rail} />;

const railStyles = StyleSheet.create({
  rail: {
    flex: 1,
    height: 2,
    borderRadius: 3,
    backgroundColor: '#ccc',
  },
});

export const Notch = () => <View style={notchStyles.notch} />;

const notchStyles = StyleSheet.create({
  notch: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
});

export const Label = ({ text }: { text: string }) => (
  <View style={labelStyles.container}>
    <Text style={labelStyles.text}>{text}</Text>
  </View>
);

const labelStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
});



export const RailSelected = () => <View style={railSelectedStyles.railSelected} />;

const railSelectedStyles = StyleSheet.create({
  railSelected: {
    flex: 1,
    height: 2,
    borderRadius: 3,
    backgroundColor: '#000',
  },
});
