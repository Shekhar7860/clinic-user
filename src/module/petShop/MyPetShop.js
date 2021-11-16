/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Rating} from 'react-native-ratings';
import OVText, {
  medium,
  poppinsMedium,
  poppinsRegular,
  small,
} from '../../components/OVText';
import FlatListSlider from '../../flatListSlider/FlatListSlider';
import ImageSliderView from '../../flatListSlider/ImageSliderView';
import {
  APP_ICON,
  BANNER_PET_SHOP,
  BOTTOM_ARROW,
  ETA,
  PRICE,
  RATING_FILL,
  SEARCH_BLACK,
  SHOP_LOCATION,
  SHOP_TYPE,
} from '../../images';
import Network from '../../network/Network';
import {AuthContext} from '../../services/authProvider';
import {showToastMessage} from '../../utils';
import {
  BG_COLOR,
  BLACK,
  GREEN_COLOR,
  TEXT_COLOR_LIGHT,
  WHITE,
  YELLOW,
} from '../../utils/Colors';
import {LoaderIndicator} from '../../common/LoaderIndicator';

const windowWidth = Dimensions.get('window').width;

const MyPetShop = props => {
  const navigation = useNavigation();
  const [sliderData, setSliderData] = useState([
    {bannerImage: BANNER_PET_SHOP},
    {bannerImage: BANNER_PET_SHOP},
    {bannerImage: BANNER_PET_SHOP},
    {bannerImage: BANNER_PET_SHOP},
    {bannerImage: BANNER_PET_SHOP},
    {bannerImage: BANNER_PET_SHOP},
  ]);
  const [loading, setLoading] = useState(false);
  const {user, token, setUser} = useContext(AuthContext);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getAllPetShop();
  }, []);

  const getAllPetShop = () => {
    setLoading(true);
    Network('user/get-shops', 'get', null, token)
      .then(async res => {
        if (res.status === true) {
          console.log(' \n\n Result ', JSON.stringify(res));
          setCategoryData(res.data);
          setLoading(false);
        } else {
          showToastMessage(res.message);
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('PetShopDetail', {itemData: item})}>
      <View
        style={{
          margin: 6,
          borderRadius: 10,
          flexDirection: 'column',
          backgroundColor: WHITE,
          justifyContent: 'center',
          padding: 10,
          marginTop: 10,
          marginHorizontal: 10,
          elevation: 3,
        }}>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FAA41A', '#906445', '#28246F']}
            style={{
              padding: 10,
              width: 60,
              height: 60,
              borderRadius: 30,
            }}>
            <Image
              source={APP_ICON}
              style={{width: 40, height: 40, resizeMode: 'contain'}}
            />
          </LinearGradient>
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
              <Rating
                type="custom"
                ratingCount={5}
                imageSize={15}
                ratingColor={WHITE}
                ratingBackgroundColor={WHITE}
                ratingImage={RATING_FILL}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                marginTop: 5,
              }}>
              <Image source={SHOP_LOCATION} />
              <OVText
                size={small}
                fontType={poppinsRegular}
                color={BLACK}
                style={{marginStart: 10}}>
                42, Borivali East, Mumbai
              </OVText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                marginTop: 5,
              }}>
              <Image source={SHOP_TYPE} />
              <OVText
                size={small}
                fontType={poppinsRegular}
                color={BLACK}
                style={{marginStart: 10}}>
                Dog Food, Grooming Kits, Chew Sticks
              </OVText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                marginTop: 5,
              }}>
              <Image source={PRICE} />
              <OVText
                size={small}
                fontType={poppinsRegular}
                color={BLACK}
                style={{marginStart: 10}}>
                {'\u20B9'} 50
              </OVText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                marginTop: 5,
              }}>
              <Image source={ETA} />
              <OVText
                size={small}
                fontType={poppinsRegular}
                color={BLACK}
                style={{marginStart: 10}}>
                20 minutes
              </OVText>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={GREEN_COLOR}
                style={{marginEnd: 10}}>
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
          style={{textAlign: 'center', marginStart: 10}}>
          Search for Pet Shops or Area / Locality
        </OVText>
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
                Filter By
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
            keyExtractor={item => item.id}
            style={{marginTop: 10}}
          />
        </View>
      </ScrollView>
      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default MyPetShop;
