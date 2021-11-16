/* eslint-disable curly */
/* eslint-disable no-undef */
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import Toast from 'react-native-root-toast';

export default Network = (
  endpoint,
  method,
  body,
  authToken,
  mesibo,
  insurance,
) => {
  var BASE_URL;

  if (mesibo) BASE_URL = 'https://api.mesibo.com/api.php?';
  else if (insurance) BASE_URL = 'https://treatos.in/api/v1/';
  // else BASE_URL = 'https://onlinewebdemos.in/demos/pets/public/api/';
  else BASE_URL = 'https://myappsdevelopment.in/demos/pets/public/api/';


  console.warn(JSON.stringify(body));
  console.log('End Point', `${BASE_URL}${endpoint}`);
  console.log('Body ', body);
  console.log('Token ', authToken);

  return new Promise((resolve, reject) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        axios({
          method,
          url: `${BASE_URL}${endpoint}`,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          data: body,
        })
          .then(function (response) {
            // console.log(JSON.stringify(response));
            resolve(response.data);
          })
          .catch(function (error) {
            console.log(JSON.stringify(error));
            reject(error);
          });
      } else {
        reject('No connection');
      }
    });
  });
};
