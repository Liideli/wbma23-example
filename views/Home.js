import {Platform, StyleSheet, SafeAreaView} from 'react-native';
import List from '../components/List';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <List />
    </SafeAreaView>
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
    paddingLeft: 110,
  },
  title: {
    fontWeight: 'bold',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'blue',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

export default Home;
