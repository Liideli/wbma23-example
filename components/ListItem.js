import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {ListItem as RNEListItem} from '@rneui/themed';
import {Avatar} from '@rneui/base';
import {Button} from '@rneui/themed';

const ListItem = ({singleMedia, navigation}) => {
  const item = singleMedia;
  return (
    <RNEListItem bottomDivider>
      <Avatar rounded source={{uri: uploadsUrl + item.thumbnails?.w160}} />
      <RNEListItem.Content>
        <RNEListItem.Title>{item.title}</RNEListItem.Title>
        <RNEListItem.Subtitle>{item.description}</RNEListItem.Subtitle>
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
