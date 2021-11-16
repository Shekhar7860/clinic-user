/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import OVText, {large, poppinsMedium} from '../components/OVText';
import {WHITE} from '../utils/Colors';

export default function EmptyView(props) {
  const {title} = props;
  return (
    <View style={styles.container}>
      <OVText size={large} fontType={poppinsMedium} color={WHITE}>
        {title}
      </OVText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
});
