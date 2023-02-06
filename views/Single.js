import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Card} from '@rneui/themed';
import {Text} from '@rneui/themed';
import {Video} from 'expo-av';
import {Icon, ListItem} from '@rneui/base';
import {useUser} from '../hooks/apiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Single = ({route}) => {
  console.log(route.params);
  const {
    title,
    description,
    user_id: userId,
    filename,
    time_added: time,
    media_type: type,
    screenshot,
  } = route.params;
  const video = useRef(null);
  const {owner, setOwner} = useState({});
  const {getUserById} = useUser();

  const getOwner = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const owner = await getUserById(userId, token);
    console.log(owner);
    setOwner(getUserById(userId));
  };

  useEffect(() => {
    getOwner();
  }, []);

  return (
    <ScrollView>
      <Card>
        <Card.Divider />
        {type === 'image' ? (
          <Card.Image
            source={{uri: uploadsUrl + filename}}
            resizeMode="cover"
            style={styles.image}
          />
        ) : (
          <ListItem>
            <Video
              ref={video}
              source={{uri: uploadsUrl + filename}}
              style={{width: '100%', height: 200}}
              resizeMode="cover"
              useNativeControls
              onError={(error) => {
                console.log(error);
              }}
              isLooping
              usePoster
              posterSource={{uri: uploadsUrl + screenshot}}
            />
          </ListItem>
        )}
        <Card.Divider />

        <ListItem>
          <Card.Title>{title}</Card.Title>
        </ListItem>
        <ListItem>
          <Icon name="schedule" />
          <Text>{new Date(time).toLocaleDateString('fi-FI')}</Text>
        </ListItem>
        {description && (
          <ListItem>
            <Text>{description}</Text>
          </ListItem>
        )}
        <ListItem>
          <Text>
            {owner.username} {owner.full_name}
          </Text>
        </ListItem>
      </Card>
    </ScrollView>
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
