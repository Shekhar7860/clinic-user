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
import {Header} from '../../common/Header';
import OVText, {
  extraSmall,
  medium,
  poppinsBold,
  poppinsMedium,
  poppinsRegular,
  small,
} from '../../components/OVText';
import {BANNER_PET_SHOP, BOTTOM_ARROW, FOOD, SEARCH_BLACK} from '../../images';
import {
  APP_THEME_COLOR,
  BG_COLOR,
  BLACK,
  GRAY_300,
  GRAY_400,
  GRAY_600,
  RED,
  TEXT_COLOR_LIGHT,
  WHITE,
  YELLOW,
} from '../../utils/Colors';
import {OVButton} from '../../components/OVButton';

const windowWidth = Dimensions.get('window').width;

const categoryData = [
  {
    image: FOOD,
    name: 'Anna Pet Shop',
    desc: 'General Vet \nEnglish \n21+ Yaers of Experiance',
  },
  {
    image: FOOD,
    name: 'Dr John Thomos',
    desc: 'General Vet \nEnglish \n21+ Yaers of Experiance',
  },
  {
    image: FOOD,
    name: 'Anna Pet Shop',
    desc: 'General Vet \nEnglish \n21+ Yaers of Experiance',
  },
  {
    image: FOOD,
    name: 'Dr John Thomos',
    desc: 'General Vet \nEnglish \n21+ Yaers of Experiance',
  },
  {
    image: FOOD,
    name: 'Anna Pet Shop',
    desc: 'General Vet \nEnglish \n21+ Yaers of Experiance',
  },
];
const FoodCart = props => {
  const navigation = useNavigation();

  const [sliderData, setSliderData] = useState([
    {bannerImage: BANNER_PET_SHOP},
    {bannerImage: BANNER_PET_SHOP},
    {bannerImage: BANNER_PET_SHOP},
    {bannerImage: BANNER_PET_SHOP},
    {bannerImage: BANNER_PET_SHOP},
    {bannerImage: BANNER_PET_SHOP},
  ]);
  const renderItem = ({item, index}) => (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: index % 2 === 0 ? APP_THEME_COLOR : WHITE,
        borderRadius: 10,
      }}>
      <Image
        source={item.image}
        style={{width: 80, height: 80, resizeMode: 'contain', marginStart: 10}}
      />

      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          marginHorizontal: 20,
        }}>
        <OVText
          size={medium}
          fontType={poppinsRegular}
          color={index % 2 === 0 ? WHITE : BLACK}
          style={{
            textAlign: 'left',
          }}>
          Drools 5KG DOG FOOD
        </OVText>
        <OVText
          size={small}
          fontType={poppinsRegular}
          color={index % 2 === 0 ? WHITE : BLACK}
          style={{
            textAlign: 'right',
          }}>
          Rs. 500
        </OVText>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginEnd: 10,
          flexDirection: 'column',
        }}>
        <OVText
          size={medium}
          fontType={poppinsRegular}
          color={index % 2 === 0 ? WHITE : BLACK}
          style={{
            textAlign: 'left',
          }}>
          1
        </OVText>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 14,
              height: 14,
              backgroundColor: index % 2 === 0 ? WHITE : APP_THEME_COLOR,
              borderRadius: 7,
              marginEnd: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <OVText
              size={medium}
              fontType={poppinsBold}
              color={index % 2 === 0 ? APP_THEME_COLOR : WHITE}
              style={{marginTop: -3}}>
              -
            </OVText>
          </View>
          <View
            style={{
              width: 14,
              height: 14,
              backgroundColor: index % 2 === 0 ? WHITE : APP_THEME_COLOR,
              borderRadius: 7,
              marginEnd: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <OVText
              size={medium}
              fontType={poppinsBold}
              color={index % 2 === 0 ? APP_THEME_COLOR : WHITE}
              style={{marginTop: -3}}>
              +
            </OVText>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BG_COLOR}}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title="Food"
      />
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: WHITE,
          }}>
          <View
            style={{backgroundColor: GRAY_300, margin: 10, borderRadius: 20}}>
            <FlatList
              data={categoryData}
              renderItem={renderItem}
              keyExtractor={item => item.image}
              style={{marginTop: 10}}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row-reverse',
            }}>
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={WHITE}
              style={{
                textAlign: 'left',
                backgroundColor: BLACK,
                borderRadius: 10,
                padding: 10,
                marginEnd: 10,
              }}>
              CGST: Rs.10
            </OVText>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row-reverse',
            }}>
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={WHITE}
              style={{
                textAlign: 'left',
                backgroundColor: BLACK,
                borderRadius: 10,
                padding: 10,
                marginEnd: 10,
              }}>
              SGST: Rs. 10
            </OVText>
          </View>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row-reverse',
            }}>
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={WHITE}
              style={{
                textAlign: 'left',
                backgroundColor: YELLOW,
                borderRadius: 10,
                padding: 10,
                marginEnd: 10,
              }}>
              Total : Rs.1300
            </OVText>
          </View>
          <OVButton
            title="Proceed to Buy"
            color={APP_THEME_COLOR}
            textColor={WHITE}
            marginTop={20}
            marginBottom={20}
            onPress={() => navigation.navigate('Home')}
            width={windowWidth - 20}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodCart;
