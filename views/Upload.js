import { Card } from '@rneui/base';
import PropTypes from 'prop-types';

const Upload = ({navigation}) => {
  return (
    <Card>
      <Card.Image />
    <Card/>
    );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;