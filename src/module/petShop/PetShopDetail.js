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
import {Header} from '../../common/Header';
import {LoaderIndicator} from '../../common/LoaderIndicator';
import OVText, {
  extraSmall,
  poppinsMedium,
  small,
} from '../../components/OVText';
import {BOTTOM_ARROW, SEARCH_BLACK} from '../../images';
import Network from '../../network/Network';
import {AuthContext} from '../../services/authProvider';
import {showToastMessage} from '../../utils';
import {
  BG_COLOR,
  BLACK,
  GRAY_300,
  TEXT_COLOR_LIGHT,
  WHITE,
} from '../../utils/Colors';

const windowWidth = Dimensions.get('window').width;

const PetShopDetail = props => {
  const {itemData} = props.route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {user, token, setUser} = useContext(AuthContext);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getFoodCategory();
  }, []);

  const getFoodCategory = () => {
    setLoading(true);
    Network('user/get-categories', 'get', null, token)
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
      style={{width: windowWidth / 2}}
      onPress={() => navigation.navigate('PetShopFood', {item: item})}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#FAA41A', '#906445', '#28246F']}
        style={{
          margin: 6,
          borderRadius: 10,
          flexDirection: 'column-reverse',
          marginHorizontal: 10,
          backgroundColor: GRAY_300,
          height: 150,
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            marginEnd: 30,
            borderTopEndRadius: 20,
          }}>
          <OVText
            size={extraSmall}
            fontType={poppinsMedium}
            color={WHITE}
            style={{textAlign: 'left', margin: 10, bottom: 0}}>
            {item.name}
          </OVText>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BG_COLOR}}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title={itemData.name}
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
            style={{marginTop: 10}}
            numColumns={2}
          />
        </View>
      </ScrollView>
      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default PetShopDetail;
