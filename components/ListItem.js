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
      <View>
        <Image
          style={styles.image}
          source={{uri: uploadsUrl + item.thumbnails?.w160}}
        ></Image>
      </View>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={{fontSize: 11, width: 180}}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'darkgrey',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    alignContent: 'space-around',
    borderRadius: 15,
  },
  image: {
    borderRadius: 10,
    borderBottomLeftRadius: 40,
    width: 180,
    height: 100,
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
