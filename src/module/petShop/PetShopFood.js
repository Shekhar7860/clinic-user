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
import {Header} from '../../common/Header';
import OVText, {
  extraSmall,
  poppinsMedium,
  poppinsRegular,
  small,
} from '../../components/OVText';
import {BANNER_PET_SHOP, BOTTOM_ARROW, FOOD, SEARCH_BLACK} from '../../images';
import {
  APP_THEME_COLOR,
  BG_COLOR,
  BLACK,
  GRAY_400,
  GRAY_600,
  RED,
  TEXT_COLOR_LIGHT,
  WHITE,
  YELLOW,
} from '../../utils/Colors';
import {OVButton} from '../../components/OVButton';
import Network from '../../network/Network';
import {AuthContext} from '../../services/authProvider';
import {showToastMessage} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import {LoaderIndicator} from '../../common/LoaderIndicator';

const windowWidth = Dimensions.get('window').width;

const PetShopFood = props => {
  const {item} = props.route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {user, token, setUser} = useContext(AuthContext);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getFoodCategory();
  }, []);

  const getFoodCategory = () => {
    setLoading(true);
    const payload = {cat_id: item.id};
    Network(`user/get-sub-categories?cat_id=${item.id}`, 'get', null, token)
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

  const addProductToCart = id => {
    setLoading(true);
    const payload = {product_id: id, qty: 1};
    Network('user/addToCart', 'post', payload, token)
      .then(async res => {
        console.log(' \n\n Result ', JSON.stringify(res));
        setLoading(false);
        showToastMessage(res.message);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        width: windowWidth / 2,
        justifyContent: 'flex-end',
        height: windowWidth / 2,
      }}>
      <View
        style={{
          flexDirection: 'column',
          marginHorizontal: 20,
          marginVertical: 10,
        }}>
        {index % 2 == 0 ? (
          <View
            style={{
              alignItems: 'flex-start',
              backgroundColor: GRAY_400,
              borderRadius: 5,
            }}>
            <Image
              source={item.image}
              style={{width: '100%', height: '70%', resizeMode: 'contain'}}
            />
            <View
              style={{
                position: 'absolute',
                backgroundColor: RED,
                padding: 6,
                end: 0,
                borderTopLeftRadius: 15,
              }}>
              <OVText size={small} fontType={poppinsRegular} color={WHITE}>
                Rs. 500
              </OVText>
            </View>
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'rgba(52, 52, 52, 0.7)',
                padding: 6,
                bottom: 0,
                start: 0,
                width: '100%',
              }}>
              <OVText
                size={extraSmall}
                fontType={poppinsRegular}
                color={WHITE}
                style={{flex: 1}}>
                Pedigree 10KG DOG FOOD
              </OVText>
            </View>
          </View>
        ) : (
          <View
            style={{
              alignItems: 'flex-end',
              backgroundColor: GRAY_400,
              borderRadius: 5,
            }}>
            <Image
              source={item.image}
              style={{width: '100%', height: '70%', resizeMode: 'contain'}}
            />
            <View
              style={{
                position: 'absolute',
                backgroundColor: RED,
                padding: 6,
                end: 0,
                borderTopLeftRadius: 15,
              }}>
              <OVText size={small} fontType={poppinsRegular} color={WHITE}>
                Rs. 500
              </OVText>
            </View>
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'rgba(52, 52, 52, 0.7)',
                padding: 6,
                bottom: 0,
                start: 0,
                width: '100%',
              }}>
              <OVText
                size={extraSmall}
                fontType={poppinsRegular}
                color={WHITE}
                style={{flex: 1}}>
                Pedigree 10KG DOG FOOD
              </OVText>
            </View>
          </View>
        )}
        <OVText
          size={small}
          fontType={poppinsRegular}
          color={BLACK}
          style={{marginTop: 6}}
          numberOfLines={1}>
          {item.cat_title}
        </OVText>
        <View style={{alignItems: 'flex-end'}}>
          <OVText
            size={small}
            fontType={poppinsRegular}
            color={WHITE}
            style={{
              marginTop: 6,
              backgroundColor: YELLOW,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 10,
            }}
            onPress={() => addProductToCart(item.id)}>
            Add
          </OVText>
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
        title="Food"
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
                Sort
              </OVText>
              <Image
                source={BOTTOM_ARROW}
                style={{marginStart: 10, tintColor: BLACK}}
              />
            </View>
          </View>
          <FlatList
            data={categoryData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            style={{flex: 1}}
          />
          <OVButton
            title="Go To Cart"
            color={APP_THEME_COLOR}
            textColor={WHITE}
            marginTop={20}
            marginBottom={20}
            onPress={() => navigation.navigate('FoodCart')}
            width={windowWidth - 20}
          />
        </View>
      </ScrollView>
      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default PetShopFood;
