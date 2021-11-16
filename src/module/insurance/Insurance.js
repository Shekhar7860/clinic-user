/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../../common/Header';
import OVText, {
  large,
  medium,
  poppinsBold,
  poppinsMedium,
  poppinsRegular,
} from '../../components/OVText';
import FlatListSlider from '../../flatListSlider/FlatListSlider';
import ImageSliderView from '../../flatListSlider/ImageSliderView';
import {
  BOTTOM_ARROW,
  SPA_BANNER,
  TRAING_BANNER,
  CAMERA_SMALL,
  GALLERY_SMALL,
} from '../../images';
import {
  APP_THEME_COLOR,
  BLACK,
  TEXT_COLOR_LIGHT,
  WHITE,
  YELLOW,
} from '../../utils/Colors';
import {OVButton} from '../../components/OVButton';
import PetTypeDialog from './PetTypeDialog';
import ImagePicker from '../../components/ImagePicker';
import Network from '../../network/Network';
import {AuthContext} from '../../services/authProvider';
import {LoaderIndicator} from '../../common/LoaderIndicator';

const windowWidth = Dimensions.get('window').width;

const Insurance = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {token, setPetProfileData} = useContext(AuthContext);
  const [showDialog, setShowDialog] = useState(false);
  const [petList, setPetList] = useState([]);
  const [showImagePickerDialog, setShowImagePickerDialog] = useState(false);
  const [type, setType] = useState({id: 0, name: " What's your pet’s type?"});
  const [sliderData, setSliderData] = useState([
    {bannerImage: SPA_BANNER},
    {bannerImage: TRAING_BANNER},
    {bannerImage: SPA_BANNER},
    {bannerImage: TRAING_BANNER},
  ]);

  useEffect(() => {
    getPetProfile();
  }, []);

  const getPetProfile = () => {
    setLoading(true);
    fetch('https://treatos.in/api/v1/pet/breed/')
      .then(response => response.json())
      .then(json => {
        console.log(' /n/n Result ', JSON.stringify(json.results));
        setPetList(json.results);
        setLoading(false);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  const getPremium = id => {
    setLoading(true);
    const payload = {
      first_name: 'Pankaj Pawar Test',
      gender: 'Male',
      mobile: '8421536162',
      email: 'pawarpankaj41@rediffmail.com',
      pet_name: 'JACOB',
      pet_age: 25,
      pet_breed: 2,
      pet_gender: 'Male',
      is_microchipped: true,
      referrer: 'JustDogs',
      identifier_list: [
        'basic_cover',
        'long_term_care_cover',
        'mortality_benefit_cover',
        'terminal_diseases_cover',
        'opd_cover',
        'third_party_cover_five_lac',
        'theft_lost_straying_cover',
      ],
    };
    Network(
      'external_user_and_premium_integration/',
      'post',
      payload,
      token,
      false,
      true,
    )
      .then(async res => {
        console.log(' \n\n Result ', JSON.stringify(res));
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: WHITE}}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title="Pet Insurance"
      />

      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: WHITE,
          }}>
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
          <OVText
            size={large}
            fontType={poppinsBold}
            color={APP_THEME_COLOR}
            style={{flex: 1, marginTop: 30, textAlign: 'center'}}>
            Tell us about your pet.
          </OVText>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowDialog(true)}>
            <View
              style={{
                backgroundColor: WHITE,
                elevation: 4,
                borderRadius: 20,
                padding: 10,
                marginTop: 20,
                marginHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={TEXT_COLOR_LIGHT}
                style={{flex: 1}}>
                {type.name}
              </OVText>
              <Image source={BOTTOM_ARROW} style={{tintColor: BLACK}} />
            </View>
          </TouchableOpacity>

          <View
            style={{
              backgroundColor: WHITE,
              elevation: 4,
              borderRadius: 20,
              padding: 10,
              marginTop: 20,
              marginHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={TEXT_COLOR_LIGHT}
              style={{flex: 1}}>
              What's your pet’s age?
            </OVText>
          </View>
          <View
            style={{
              backgroundColor: WHITE,
              elevation: 4,
              borderRadius: 20,
              padding: 10,
              marginTop: 20,
              marginHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={TEXT_COLOR_LIGHT}
              style={{flex: 1}}>
              What's your pet’s breed?
            </OVText>
          </View>

          <View
            style={{
              backgroundColor: WHITE,
              elevation: 4,
              borderRadius: 20,
              marginTop: 20,
              marginHorizontal: 20,
              flexDirection: 'column',
            }}>
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={BLACK}
              style={{
                paddingVertical: 10,
                textAlign: 'left',
                flex: 1,
                marginStart: 10,
              }}>
              Previous Treatment &amp; Surgeries
            </OVText>

            <View
              style={{
                backgroundColor: 'rgba(250, 164, 26, 0.2)',
                padding: 10,
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <View style={{flexDirection: 'row', marginHorizontal: 30}}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setShowImagePickerDialog(true)}
                  style={{
                    flex: 1,
                    padding: 10,
                    backgroundColor: WHITE,
                    borderRadius: 6,
                    alignItems: 'center',
                    marginEnd: 10,
                  }}>
                  <Image source={CAMERA_SMALL} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setShowImagePickerDialog(true)}
                  style={{
                    flex: 1,
                    padding: 10,
                    backgroundColor: WHITE,
                    borderRadius: 6,
                    alignItems: 'center',
                    marginEnd: 10,
                  }}>
                  <Image source={GALLERY_SMALL} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: WHITE,
              elevation: 4,
              borderRadius: 20,
              padding: 10,
              marginTop: 20,
              marginHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={TEXT_COLOR_LIGHT}
              style={{flex: 1}}>
              Annual Vaccination Done? (Yes/No)
            </OVText>
          </View>
          <OVButton
            title="GET A QUOTE"
            color={APP_THEME_COLOR}
            textColor={WHITE}
            marginTop={20}
            marginBottom={20}
            onPress={() => getPremium()}
            width={windowWidth - 20}
          />
        </View>
      </ScrollView>
      <PetTypeDialog
        dialogVisible={showDialog}
        setDialogVisible={() => setShowDialog(false)}
      />
      <PetTypeDialog
        dialogVisible={showDialog}
        setDialogVisible={() => setShowDialog(false)}
        title="Pet Type"
        data={petList}
        type={4}
        onSelectedItem={item => {
          setShowDialog(false);
          setType(item);
        }}
      />
      <ImagePicker
        selectedImagePath={path => {
          setShowImagePickerDialog(false);
        }}
        dialogVisible={showImagePickerDialog}
        setDialogVisible={() => setShowImagePickerDialog(false)}
      />
      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default Insurance;
