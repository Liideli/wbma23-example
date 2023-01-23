import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Card} from '@rneui/themed';
import {Text} from '@rneui/themed';

const Single = ({route}) => {
  console.log(route.params);
  const {title, description, filename, time_added: time} = route.params;
  return (
    <Card>
      <Card.Image
        source={{uri: uploadsUrl + filename}}
        resizeMode="cover"
        style={styles.image}
      />
      <Card.Title>{title}</Card.Title>
      <Text>{time}</Text>
      <Text>{description}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 400,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
