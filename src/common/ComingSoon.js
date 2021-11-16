/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {Header} from './Header';
import OVText, {
  medium,
  poppinsMedium,
  poppinsRegular,
  small,
} from '../components/OVText';
import FlatListSlider from '../flatListSlider/FlatListSlider';
import ImageSliderView from '../flatListSlider/ImageSliderView';
import {
  BOARDING_IMAGE,
  BOARDING_LOCATION,
  BOARDING_PRICE,
  BOTTOM_ARROW,
  RATING_FILL,
  SEARCH_BLACK,
  SEARCH_LOCATION,
  SPA_AVAILABLE,
  SPA_BANNER,
  TRAING_BANNER,
  COMING_SOON,
} from '../images';
import {
  BG_COLOR,
  BLACK,
  GREEN_COLOR,
  TEXT_COLOR_LIGHT,
  WHITE,
  YELLOW,
} from '../utils/Colors';

const windowWidth = Dimensions.get('window').width;

const ComingSoon = props => {
  console.log(props, 'props in coming soon');

  let title = '';
  if (props && props.route && props.route.params) {
    title =
      props && props.route && props.route.params && props.route.params.title;
  }
  console.log(title, 'titletitletitle');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BG_COLOR}}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title={title !="" ? title : 'Header Title'} //
      />

      {/* <ScrollView> */}
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: WHITE,
        }}>
        <Image
          style={{
            height: '100%',
            width: '100%',
            marginTop: 0,
          }}
          source={COMING_SOON}
        />
        {/* <View
                        style={{
                            alignItems: 'center',
                            alignContent:'center',
                            marginEnd: 10,
                            marginVertical: 100,
                        }}>
                        <OVText
                            size={small}
                            fontType={poppinsMedium}
                            color={BLACK}
                            style={{ textAlign: 'center' }}>
                            Coming Soon...
                        </OVText>
                      
                    </View> */}
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default ComingSoon;
