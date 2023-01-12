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
          style={{width: 180, height: 200, margin: 10}}
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
    backgroundColor: '#fff',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
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
