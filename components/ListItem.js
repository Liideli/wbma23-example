import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = ({singleMedia, navigation}) => {
  const item = singleMedia;
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        navigation.navigate('Single', item);
      }}
    >
      <View style={styles.areaA}>
        <Image
          style={styles.image}
          source={{uri: uploadsUrl + item.thumbnails?.w160}}
        ></Image>
      </View>
      <View style={styles.areaB}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
    display: 'flex',
    backgroundColor: 'oldlace',
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  image: {
    borderBottomLeftRadius: 40,
    height: 120,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  areaA: {
    flex: 1,
  },
  areaB: {
    flex: 1,
    padding: 10,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
