import React from 'react';
import {Text, Button, View, TextInput, StyleSheet} from 'react-native';
import {useUser} from '../hooks/ApiHooks';
import {Controller, useForm} from 'react-hook-form';

const RegisterForm = (props) => {
  // const {setIsLoggedIn} = useContext(MainContext);
  // const {postLogin} = useAuthentication();
  const {postUser} = useUser();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
  });

  const register = async (registerData) => {
    console.log('Registering: ', registerData);
    // const data = {username: 'roopekl', password: 'salasana123'};
    try {
      const registerResult = await postUser(registerData);
      console.log('registeration result', registerResult);
    } catch (error) {
      console.error('register', error);
      // TODO: notify user about failed registeration attempt
    }
  };

  return (
    <View>
      <Text>Register Form</Text>
      <Controller
        control={control}
        rules={{required: true, minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {errors.username?.type === 'required' && <Text>is required</Text>}
      {errors.username?.type === 'minLength' && (
        <Text>min length is 3 characters</Text>
      )}
      <Controller
        control={control}
        rules={{required: true, minLength: 5}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && <Text>Password (min. 5 chars) is required.</Text>}
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email?.type === 'required' && <Text>is required</Text>}
      <Controller
        control={control}
        rules={{minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.textInput}
            placeholder="Full name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="full_name"
      />
      {errors.username?.type === 'minLength' && (
        <Text>min length is 3 characters</Text>
      )}
      <Button title="Sign in!" onPress={handleSubmit(register)} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: 200,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    margin: 1,
  },
});

export default RegisterForm;
