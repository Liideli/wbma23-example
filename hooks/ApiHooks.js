import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {baseUrl} from '../utils/variables';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update} = useContext(MainContext);
  const loadMedia = async () => {
    try {
      const response = await fetch(baseUrl + 'media');
      const json = await response.json();
      // 2nd fetch:
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          const json = await fileResponse.json();
          return json;
        })
      );
      setMediaArray(media);
    } catch (error) {
      console.log('List, loadMedia', error);
    }
  };

  useEffect(() => {
    loadMedia();
    // load media when update state changes in main context
    // by add update state to the array below
  }, [update]);

  const postMedia = async (fileData, token) => {
    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-type': 'multipart/form-data',
      },
      body: fileData,
    };
    try {
      return await doFetch(baseUrl + 'media', options);
    } catch (error) {
      throw new Error('postUpload' + error.message);
    }
  };

  return {mediaArray, postMedia};
};

const useAuthentication = () => {
  const postLogin = async (userCredentials) => {
    // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
      // TODO: add method, headers and body for sending json data with POST
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
      const loginResult = await doFetch(baseUrl + 'login', options);
      return loginResult;
    } catch (error) {
      throw new Error('postLogin' + error.message);
    }
  };

  return {postLogin};
};

// https://media.mw.metropolia.fi/wbma/docs/#api-User
const useUser = () => {
  const getUserByToken = async (token) => {
    // call https://media.mw.metropolia.fi/wbma/docs/#api-User-CheckUserName
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      const result = await doFetch(baseUrl + 'users/user', options);
      return result.available;
    } catch (error) {
      throw new Error('checkUser: ' + error.message);
    }
  };
  const postUser = async (userData) => {
    const options = {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    try {
      return await doFetch(baseUrl + 'users', options);
    } catch (error) {
      throw new Error('postUser' + error.message);
    }
  };
  return {getUserByToken, postUser, checkUsername};
};
const postTag = async (data, token) => {
  const options = {
    method: 'post',
    headers: {
      'x-access-token': token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    return await doFetch(baseUrl + 'tags', options);
  } catch (error) {
    throw new Error('postTag' + error.message);
  }
};

const checkUsername = async (username) => {
  try {
    return await doFetch(baseUrl + 'users/username/' + username);
  } catch (error) {
    throw new Error('checkUsername: ' + error.message);
  }
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(baseUrl + 'tags/' + tag);
    } catch (error) {
      throw new Error('getFilesByTag', error.message);
    }
  };
  return {getFilesByTag, postTag};
};

export {useMedia, useAuthentication, useUser, useTag};
