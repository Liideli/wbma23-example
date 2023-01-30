import React, {useContext, useState} from 'react';
import {Button, Card, Input} from '@rneui/base';
import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Upload = ({navigation}) => {
  const [mediafile, setMediaFile] = useState({});
  const [loading, setLoading] = useState(false);
  const {postMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const uploadFile = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const filename = mediafile.uri.split('/').pop();
    let fileExt = filename.split('.').pop();
    if (fileExt === 'jpg') fileExt = 'jpeg';
    const mimeType = mediafile.type + '/' + fileExt;
    formData.append('file', {
      uri: mediafile.uri,
      name: filename,
      type: mimeType,
    });
    console.log('form data', formData);
    try {
      const result = await postMedia(
        formData,
        await AsyncStorage.getItem('userToken')
      );
      console.log('upload result', result);
      Alert.alert('Upload OK', 'File id: ' + result.file_id, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            // update 'update' state in context
            setUpdate(!update);
            // TODO: navigate to home
          },
        },
      ]);
    } catch (error) {
      console.error('file upload failed', error);
    } finally {
      setLoading(false);
    }
  };

  const pickFile = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setMediaFile(result.assets[0]);
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{padding: 16}}
        activeOpacity={1}
      >
        <Card>
          <Card.Image
            source={{uri: mediafile.uri || 'https://placekitten.com/200/300'}}
          />
          <Controller
            control={control}
            rules={{required: {value: true, message: 'is required'}}}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                errorMessage={errors.username && errors.username.message}
              />
            )}
            name="title"
          />
          <Controller
            control={control}
            rules={{required: {value: true, message: 'is required'}}}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                errorMessage={errors.username && errors.username.message}
              />
            )}
            name="description"
          />
          <Button title="Pick a file" onPress={pickFile} />
          <Button
            disabled={!mediafile.uri}
            title="Upload"
            onPress={handleSubmit(uploadFile)}
          />
          {loading && <ActivityIndicator size="large" />}
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
