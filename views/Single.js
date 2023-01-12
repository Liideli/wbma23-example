import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const Single = ({route}) => {
  console.log(route.params);
  const {title, description, filename, time_added: time} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text>{title}</Text>
      <Image source={{uri: uploadsUrl + filename}} style={styles.image} />
      <Text>{time}</Text>
      <Text>{description}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    width: 300,
    height: 300,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;