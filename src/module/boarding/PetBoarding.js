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
import {Header} from '../../common/Header';
import OVText, {
  medium,
  poppinsMedium,
  poppinsRegular,
  small,
} from '../../components/OVText';
import FlatListSlider from '../../flatListSlider/FlatListSlider';
import ImageSliderView from '../../flatListSlider/ImageSliderView';
import {
  BOARDING_BANNER,
  BOARDING_IMAGE,
  BOARDING_LOCATION,
  BOARDING_NEARBY,
  BOARDING_PRICE,
  BOTTOM_ARROW,
  RATING_FILL,
  SEARCH_BLACK,
  SEARCH_LOCATION,
} from '../../images';
import {
  BG_COLOR,
  BLACK,
  GREEN_COLOR,
  RED,
  TEXT_COLOR_LIGHT,
  WHITE,
  YELLOW,
} from '../../utils/Colors';

const windowWidth = Dimensions.get('window').width;

const categoryData = [
  {
    image: BOARDING_IMAGE,
    name: 'Pyarelal Pet Boarding Center',
    desc: 'Vasant Vihar, Delhi',
    price: 'Rs.500/Day',
    service: 'Available',
  },
  {
    image: BOARDING_IMAGE,
    name: 'Pyarelal Pet Boarding Center',
    desc: 'Vasant Vihar, Delhi',
    price: 'Rs.500/Day',
    service: 'Not Available',
  },
  {
    image: BOARDING_IMAGE,
    name: 'Pyarelal Pet Boarding Center',
    desc: 'Vasant Vihar, Delhi',
    price: 'Rs.500/Day',
    service: 'Available',
  },
  {
    image: BOARDING_IMAGE,
    name: 'Pyarelal Pet Boarding Center',
    desc: 'Vasant Vihar, Delhi',
    price: 'Rs.500/Day',
    service: 'Not Available',
  },
  {
    image: BOARDING_IMAGE,
    name: 'Pyarelal Pet Boarding Center',
    desc: 'Vasant Vihar, Delhi',
    price: 'Rs.500/Day',
    service: 'Available',
  },
];
const PetBoarding = props => {
  const navigation = useNavigation();
  const [sliderData, setSliderData] = useState([
    {bannerImage: BOARDING_BANNER},
    {bannerImage: BOARDING_BANNER},
    {bannerImage: BOARDING_BANNER},
    {bannerImage: BOARDING_BANNER},
  ]);
  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('BookAppointments', {itemData: {}})}
      style={{marginHorizontal: 10}}>
      <View
        style={{
          margin: 6,
          borderRadius: 10,
          flexDirection: 'column',
          backgroundColor: WHITE,
          justifyContent: 'center',
          padding: 10,
          marginTop: 10,

          elevation: 3,
        }}>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Image source={item.image} />
          <View style={{flexDirection: 'column', marginStart: 20, flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                {item.name}
              </OVText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                marginTop: 5,
              }}>
              <Image source={BOARDING_LOCATION} />
              <OVText
                size={small}
                fontType={poppinsRegular}
                color={BLACK}
                style={{marginStart: 10}}>
                {item.desc}
              </OVText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                marginTop: 5,
              }}>
              <Image source={BOARDING_PRICE} />
              <OVText
                size={small}
                fontType={poppinsRegular}
                color={BLACK}
                style={{marginStart: 10}}>
                {item.price}
              </OVText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                marginTop: 5,
              }}>
              <Image source={BOARDING_NEARBY} />
              <OVText
                size={small}
                fontType={poppinsRegular}
                color={BLACK}
                style={{marginStart: 10}}>
                Pickup/Drop{' '}
                <OVText
                  size={small}
                  fontType={poppinsRegular}
                  color={item.service === 'Available' ? GREEN_COLOR : RED}
                  style={{marginStart: 10}}>
                  {item.service}
                </OVText>
              </OVText>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                position: 'absolute',
                end: 0,
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
              }}>
              <Rating
                type="custom"
                ratingCount={5}
                imageSize={15}
                ratingColor={WHITE}
                ratingBackgroundColor={WHITE}
                ratingImage={RATING_FILL}
              />
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={GREEN_COLOR}
                style={{marginEnd: 10, marginTop: 20, bottom: 0}}>
                5 Kms
              </OVText>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BG_COLOR}}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title="Pet Boarding"
      />
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: WHITE,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
          elevation: 1,
        }}>
        <Image source={SEARCH_BLACK} style={{tintColor: BLACK}} />
        <OVText
          size={small}
          fontType={poppinsMedium}
          color={TEXT_COLOR_LIGHT}
          style={{textAlign: 'left', marginStart: 10, flex: 1}}>
          Search for Boarding Centers, Location
        </OVText>
        <Image source={SEARCH_LOCATION} style={{tintColor: BLACK}} />
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: WHITE,
          }}>
          <View
            style={{
              alignItems: 'flex-end',
              marginEnd: 10,
              marginVertical: 10,
            }}>
            <View
              style={{
                borderRadius: 20,
                paddingVertical: 10,
                justifyContent: 'center',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: WHITE,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
              }}>
              <OVText
                size={small}
                fontType={poppinsMedium}
                color={BLACK}
                style={{textAlign: 'center'}}>
                Nearby
              </OVText>
              <Image
                source={BOTTOM_ARROW}
                style={{marginStart: 10, tintColor: BLACK}}
              />
            </View>
          </View>
          <FlatListSlider
            data={sliderData}
            width={windowWidth}
            timer={5000}
            component={<ImageSliderView />}
            indicatorActiveWidth={10}
            contentContainerStyle={{
              justifyContent: 'center',
            }}
            indicatorContainerStyle={{position: 'absolute', bottom: -10}}
            indicatorActiveColor={YELLOW}
            indicatorInActiveColor="gray"
            animation
          />

          <FlatList
            data={categoryData}
            renderItem={renderItem}
            keyExtractor={item => item.image}
            style={{marginTop: 10}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PetBoarding;
