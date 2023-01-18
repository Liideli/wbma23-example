import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
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
  }, []);

  return {mediaArray};
};

const useAuthentication = () => {
  const postLogin = async () => {
    // TODO: post login to api
    // https://media.mw.metropolia.fi/wbma/docs/#api-Authentication-PostAuth
  };
};

const useUser = () => {
  const checkUser = async () => {
    // call https://media.mw.metropolia.fi/wbma/docs/#api-User-CheckUserName
  };
  // https://media.mw.metropolia.fi/wbma/docs/#api-User
};

export {useMedia, useAuthentication, useUser};
