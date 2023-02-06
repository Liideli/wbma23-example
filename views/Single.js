import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Card} from '@rneui/themed';
import {Text} from '@rneui/themed';
import {Video} from 'expo-av';
import {Icon, ListItem} from '@rneui/base';
import {useFavourite, useUser} from '../hooks/ApiHooks';
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
    file_id: fileId,
  } = route.params;
  const video = useRef(null);
  const [owner, setOwner] = useState({});
  const [likes, setLikes] = useState([]);
  const [userLikesIt, setUserLikesIt] = useState(false);
  const {getUserById} = useUser();
  const {getFavouritesByFileId, postFavourite, deleteFavourite} =
    useFavourite();

  const getOwner = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const owner = await getUserById(userId, token);
    console.log(owner);
    setOwner(owner);
  };

  const getLikes = async () => {
    const likes = await getFavouritesByFileId(fileId);
    console.log('likes', likes);
    setLikes(likes);
    // TODO: check if the user id is included in the 'likes' array
    // and set the 'userLikesIt' accordingly
  };

  const likeFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await postFavourite(fileId, token);
      getLikes();
    } catch (error) {
      console.log(error);
      // note: you cannot like smae file multiple times
    }
  };
  const dislikeFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await deleteFavourite(fileId, token);
      getLikes();
    } catch (error) {
      console.log(error);
      // note: you cannot like same file multiple times
    }
  };

  useEffect(() => {
    getOwner();
    getLikes();
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
          <Icon name="person" />
          <Text>
            {owner.username} ({owner.full_name})
          </Text>
        </ListItem>
        <ListItem>
          {userLikesIt ? (
            <Icon name="favorite" color="red" onPress={dislikeFile} />
          ) : (
            <Icon name="favorite-border" onPress={likeFile} />
          )}
          <Text>Likes: {likes.length}</Text>
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
