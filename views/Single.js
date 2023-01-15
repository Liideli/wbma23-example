import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const Single = ({route}) => {
  console.log(route.params);
  const {title, description, filename, time_added: time} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.areaA}>
        <Image source={{uri: uploadsUrl + filename}} style={styles.image} />
        <View style={styles.titleBackground}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <View style={styles.areaB}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    paddingTop: 40,
  },
  title: {
    color: '#fff',
    flex: 2,
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleBackground: {
    position: 'absolute',
    bottom: 10,
    padding: 5,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  image: {
    flex: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  time: {
    flex: 1,
    fontSize: 14,
    padding: 5,
  },
  description: {
    flex: 2,
    fontSize: 14,
    padding: 5,
  },
  areaA: {
    flex: 3,
    justifyContent: 'flex-end',
  },
  areaB: {
    flex: 1,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
