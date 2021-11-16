/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {Dimensions, Image, ImageBackground, View, Text} from 'react-native';
import {SPLASH_BG} from '../images';
import {AuthContext} from '../services/authProvider';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Splash = props => {
  const {user, token} = useContext(AuthContext);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    setTimeout(() => {
      if (user) {
        props.navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        props.navigation.reset({
          index: 0,
          routes: [{name: 'Welcome'}],
        });
      }
    }, 2000);
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={SPLASH_BG}
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
        resizeMode="stretch"
      />
    </View>
  );
};
export default Splash;
