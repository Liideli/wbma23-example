import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {ListItem as RNEListItem} from '@rneui/themed';
import {Avatar, ButtonGroup} from '@rneui/base';
import {Button} from '@rneui/themed';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';

const ListItem = ({singleMedia, navigation}) => {
  const {user} = useContext(MainContext);
  const item = singleMedia;
  return (
    <RNEListItem bottomDivider>
      <Avatar rounded source={{uri: uploadsUrl + item.thumbnails?.w160}} />
      <RNEListItem.Content>
        <RNEListItem.Title>{item.title}</RNEListItem.Title>
        <RNEListItem.Subtitle>{item.description}</RNEListItem.Subtitle>
        {item.user_id === user.user_id && (
          <ButtonGroup
            buttons={['Modify', 'Delete']}
            rounded
            onPress={(index) => {
              if (index === 0) {
                console.log('Modify pressed');
              } else {
                console.log('Delete pressed');
              }
            }}
          />
        )}
      </RNEListItem.Content>
      <Button
        title="View"
        onPress={() => {
          navigation.navigate('Single', item);
        }}
      />
    </RNEListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
