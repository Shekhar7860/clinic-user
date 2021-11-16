/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import {from} from 'seamless-immutable';
import {Header} from '../../common/Header';
import {LoaderIndicator} from '../../common/LoaderIndicator';
import ImagePicker from '../../components/ImagePicker';
import {OVButton} from '../../components/OVButton';
import OVText, {
  extraSmall,
  medium,
  poppinsMedium,
} from '../../components/OVText';
import {DOCTOR_1, APP_ICON} from '../../images';
import Network from '../../network/Network';
import {AuthContext} from '../../services/authProvider';
import {showToastMessage} from '../../utils';
import {
  APP_THEME_COLOR,
  BG_COLOR,
  GRAY_100,
  GRAY_800,
  GREEN_COLOR,
  WHITE,
} from '../../utils/Colors';
import {PROFILE_IMAGE_URL} from '../../utils/AppConstant';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import CommonDialoug from '../insurance/CommonDialoug';
import CityDialoug from '../insurance/CityDialoug';

const windowWidth = Dimensions.get('window').width;

const OwnerProfile = props => {
  const navigation = useNavigation();
  const {user, token, setUser} = useContext(AuthContext);
  const [showImagePickerDialog, setShowImagePickerDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [otherAddress, setOtherAddress] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [profilePath, setProfilePath] = useState('');
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [stateDialog, setStateDialog] = useState(false);
  const [cityDialog, setCityDialog] = useState(false);
  const [referalCode, setReferalCode] = useState('');

  const [searchUpdatedState, setSearchUpdated] = useState([]);

  useEffect(() => {
    // console.log("user", user);
    getReferelCode();
    getUserProfile();
    getState();
    getCity();
  }, []);

  const setSearchdata = arr => {
    console.log('coming in chek>>', arr);
    setSearchUpdated(arr);
  };
  const checkPermission = async () => {
    requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]).then(statuses => {
      if (statuses[PERMISSIONS.ANDROID.CAMERA] === 'denied') checkPermission();
      else setShowImagePickerDialog(true);
    });
  };

  const openSharingOption = () => {
    const shareOptions = {
      title: 'Share refferal code',
      failOnCancel: false,
      message: referalCode,
    };
    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const getCity = stateId => {
    setLoading(true);
    Network(`user/get-cities?state_id=${stateId}`, 'get', null, token)
      .then(async res => {
        console.log(res, 'res of cities>>>>');
        if (res.status === true) {
          setCityData(res.data);
        } else {
          showToastMessage(res.message);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const getReferelCode = () => {
    setLoading(true);
    Network('user/ref/create', 'get', null, token)
      .then(async res => {
        if (res && res.status === true && res.data && res.data.length > 0) {
          console.log(res, 'res in ger refrel code>>>>');
          setReferalCode(res.data[0].ref_code);
        } else {
          showToastMessage(res.message);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const getState = () => {
    setLoading(true);
    Network('user/get-states', 'get', null, token)
      .then(async res => {
        if (res.status === true) {
          setStateData(res.data);
        } else {
          showToastMessage(res.message);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const getUserProfile = () => {
    setLoading(true);
    Network('user/get-profile', 'get', null, token)
      .then(async res => {
        if (res.status === true) {
          console.log(' /n/n Result ', JSON.stringify(res));
          const data = res.data;
          setFirstName(
            data.first_name == 'null' || data.first_name == null
              ? ''
              : data.first_name,
          );
          setLastName(
            data.last_name == 'null' || data.last_name == null
              ? ''
              : data.last_name,
          );
          setEmailAddress(
            data.email == 'null' || data.email == null ? '' : data.email,
          );
          setMobileNumber(
            data.mobile_no == 'null' || data.mobile_no == null
              ? ''
              : data.mobile_no,
          );
          setAddress(
            data.address == 'null' || data.address == null ? '' : data.address,
          );
          setOtherAddress(
            data.address2 == 'null' || data.address2 == null
              ? ''
              : data.address2,
          );
          setHouseNo(
            data.house_no == 'null' || data.house_no == null
              ? ''
              : data.house_no,
          );
          setLandmark(
            data.landmark == 'null' || data.landmark == null
              ? ''
              : data.landmark,
          );
          setCity(data.city == 'null' || data.city == null ? '' : data.city);
          setState(
            data.state == 'null' || data.state == null ? '' : data.state,
          );
          setPostCode(
            data.postcode == 'null' || data.postcode == null
              ? ''
              : data.postcode,
          );
          setCountry(
            data.country == 'null' || data.country == null ? '' : data.country,
          );
          setLatitude(
            data.lati == 'null' || data.lati == null ? '' : data.lati,
          );
          setLongitude(
            data.longi == 'null' || data.longi == null ? '' : data.longi,
          );
          setProfilePath(
            data.profile_pic == ''
              ? ''
              : `${PROFILE_IMAGE_URL}${data.profile_pic}`,
          );
          setLoading(false);
          console.log('Agava', data.profile_pic);
        } else {
          showToastMessage(res.message);
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
        showToastMessage(error);
      });
  };

  const updateProfile = () => {
    if (
      typeof firstName == 'undefined' ||
      firstName == null ||
      firstName.length === 0
    ) {
      showToastMessage('Please enter first name');
    } else if (
      typeof emailAddress == 'undefined' ||
      emailAddress == null ||
      emailAddress.length === 0
    ) {
      showToastMessage('Please enter email address');
    } else if (
      typeof mobileNumber == 'undefined' ||
      mobileNumber == null ||
      mobileNumber.length === 0
    ) {
      showToastMessage('Please enter mobile number');
    } else if (
      typeof address == 'undefined' ||
      address == null ||
      address.length === 0
    ) {
      showToastMessage('Please enter address');
    } else if (
      typeof city == 'undefined' ||
      city == null ||
      city.length === 0
    ) {
      showToastMessage('Please enter city');
    } else if (
      typeof state == 'undefined' ||
      state == null ||
      state.length === 0
    ) {
      showToastMessage('Please enter state');
    } else if (
      typeof postCode == 'undefined' ||
      postCode == null ||
      postCode.length < 6
    ) {
      showToastMessage('Please enter post code');
    } else {
      setLoading(true);
      let data = new FormData();
      data.append('first_name', firstName);
      data.append('email', emailAddress);
      data.append('mobile_no', mobileNumber);
      if (typeof lastName != 'undefined' && lastName != null) {
        data.append('last_name', lastName);
      }
      if (typeof address != 'undefined' && address != null) {
        data.append('address', address);
      }

      if (typeof otherAddress != 'undefined' && otherAddress != null) {
        data.append('address2', otherAddress);
      }
      if (typeof houseNo != 'undefined' && houseNo != null) {
        data.append('house_no', houseNo);
      }
      if (typeof landmark != 'undefined' && landmark != null) {
        data.append('landmark', landmark);
      }
      if (city) {
        data.append('city', city);
      }
      if (state) {
        data.append('state', state);
      }

      data.append('postcode', postCode);
      if (country) {
        data.append('country', country);
      }

      if (latitude != null || latitude != '') {
        data.append('lati', latitude);
      }

      if (longitude != null || longitude != '') {
        data.append('longi', longitude);
      }

      if (profilePath) {
        data.append('profile_pic', {
          uri: profilePath,
          name: Date.parse(new Date()) + 'userImage.png',
          filename: 'userImage.png',
          type: 'image/png',
        });
      }

      Network('user/update-profile', 'post', data, token)
        .then(async res => {
          console.log(' /n/n Result ', JSON.stringify(res));
          if (res.status === true) {
            setUser(res.data);
            showToastMessage(res.message);
            navigation.goBack();
          } else {
            showToastMessage(res.message);
            setLoading(false);
          }
        })
        .catch(error => {
          setLoading(false);
          showToastMessage(error);
        });
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BG_COLOR}}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title="Profile"
      />
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FAA41A', '#906445', '#28246F']}
            style={{padding: 10}}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => checkPermission()}>
                {profilePath ? (
                  <Image
                    source={profilePath != '' ? {uri: profilePath} : DOCTOR_1}
                    style={{width: 100, height: 100, borderRadius: 50}}
                  />
                ) : (
                  <Image
                    source={APP_ICON}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      resizeMode: 'contain',
                    }}
                  />
                )}
              </TouchableOpacity>
              <OVText
                size={extraSmall}
                fontType={poppinsMedium}
                color={WHITE}
                style={{marginTop: 6}}>
                Upload Photo
              </OVText>
            </View>
          </LinearGradient>
          <View style={{flexDirection: 'column'}}>
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                padding: 12,
                backgroundColor: WHITE,
              }}>
              First Name
            </OVText>

            <TextInput
              style={styles.textField}
              value={firstName}
              onChangeText={text =>
                setFirstName(text.replace(/[^A-Za-z]/gi, ''))
              }
            />
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                paddingVertical: 10,
                paddingStart: 10,
                backgroundColor: WHITE,
              }}>
              Last Name
            </OVText>

            <TextInput
              style={styles.textField}
              value={lastName}
              onChangeText={text =>
                setLastName(text.replace(/[^A-Za-z]/gi, ''))
              }
            />
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                paddingVertical: 10,
                paddingStart: 10,
                backgroundColor: WHITE,
              }}
              editable={false}>
              Email Address
            </OVText>

            <TextInput
              style={styles.textField}
              value={emailAddress}
              onChangeText={text => setEmailAddress(text)}
              editable={false}
            />
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                paddingVertical: 10,
                paddingStart: 10,
                backgroundColor: WHITE,
              }}>
              Mobile Number
            </OVText>

            <TextInput
              style={styles.textField}
              value={mobileNumber}
              onChangeText={text =>
                setMobileNumber(text.replace(/[^0-9]/g, ''))
              }
              keyboardType="numeric"
              maxLength={10}
            />
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                paddingVertical: 10,
                paddingStart: 10,
                backgroundColor: WHITE,
              }}>
              Main Address
            </OVText>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PlacesApiSearch', {
                  onAddressSelect: data => {
                    console.log('PlacesApiSearch Recieved: ', data);
                    setAddress(data.address);
                    setCity(data.city);
                    setState(data.state);
                    setPostCode(!data.zipcode ? '' : data.zipcode);
                    setCountry(data.country);
                    setLatitude(data.latitude);
                    setLongitude(data.longitude);
                  },
                  latitude: latitude,
                  longitude: longitude,
                })
              }>
              <OVText
                size={medium}
                fontType={poppinsMedium}
                color={GREEN_COLOR}
                style={styles.textField}>
                {address}
              </OVText>
            </TouchableOpacity>
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                paddingVertical: 10,
                paddingStart: 10,
                backgroundColor: WHITE,
              }}>
              Other Address
            </OVText>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PlacesApiSearch', {
                  onAddressSelect: data => {
                    console.log(data);
                    setOtherAddress(data.address);
                  },
                  latitude: latitude,
                  longitude: longitude,
                })
              }>
              <OVText
                size={medium}
                fontType={poppinsMedium}
                color={GREEN_COLOR}
                style={styles.textField}>
                {otherAddress}
              </OVText>
            </TouchableOpacity>

            <View>
              <OVText
                size={medium}
                fontType={poppinsMedium}
                color={GREEN_COLOR}
                style={{
                  paddingVertical: 10,
                  paddingStart: 10,
                  backgroundColor: WHITE,
                }}>
                House No./Flat No.
              </OVText>
              <View
                style={{
                  backgroundColor: WHITE,
                  paddingVertical: 2,
                  flexDirection: 'column',
                }}>
                <TextInput
                  style={styles.textField}
                  value={houseNo}
                  onChangeText={text => setHouseNo(text)}
                  keyboardType="default"
                  maxLength={55}
                />
              </View>
            </View>

            <View>
              <OVText
                size={medium}
                fontType={poppinsMedium}
                color={GREEN_COLOR}
                style={{
                  paddingVertical: 10,
                  paddingStart: 10,
                  backgroundColor: WHITE,
                }}>
                Landmark
              </OVText>
              <View
                style={{
                  backgroundColor: WHITE,
                  paddingVertical: 2,
                  flexDirection: 'column',
                }}>
                <TextInput
                  style={styles.textField}
                  value={landmark}
                  onChangeText={text => setLandmark(text)}
                  keyboardType="default"
                  maxLength={55}
                />
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setStateDialog(true)}>
              <View>
                <OVText
                  size={medium}
                  fontType={poppinsMedium}
                  color={GREEN_COLOR}
                  style={{
                    paddingVertical: 10,
                    paddingStart: 10,
                    backgroundColor: WHITE,
                  }}>
                  State
                </OVText>

                <TextInput
                  style={styles.textField}
                  value={state}
                  onChangeText={text => setState(text)}
                  editable={false}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (cityData.length === 0) {
                  showToastMessage('No City Available');
                } else {
                  setCityDialog(true);
                }
              }}>
              <OVText
                size={medium}
                fontType={poppinsMedium}
                color={GREEN_COLOR}
                style={{
                  paddingVertical: 10,
                  paddingStart: 10,
                  backgroundColor: WHITE,
                }}>
                City
              </OVText>

              <TextInput
                style={styles.textField}
                value={city}
                onChangeText={text => setCity(text)}
                editable={false}
              />
            </TouchableOpacity>

            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                paddingVertical: 10,
                paddingStart: 10,
                backgroundColor: WHITE,
              }}
              maxLength={6}>
              Postcode
            </OVText>

            <TextInput
              style={styles.textField}
              value={postCode}
              onChangeText={text => setPostCode(text.replace(/[^0-9]/g, ''))}
              maxLength={6}
            />
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                paddingVertical: 10,
                paddingStart: 10,
                backgroundColor: WHITE,
              }}>
              Refferal code
            </OVText>

            <Text onPress={() => openSharingOption()} style={{marginLeft: 10}}>
              {referalCode}
            </Text>

            <OVButton
              title="Submit"
              color={APP_THEME_COLOR}
              textColor={WHITE}
              marginTop={20}
              marginBottom={20}
              onPress={() => updateProfile(true)}
              width={windowWidth - 20}
            />
          </View>
        </View>
      </ScrollView>
      <ImagePicker
        selectedImagePath={path => {
          setShowImagePickerDialog(false);
          setProfilePath(path);
        }}
        dialogVisible={showImagePickerDialog}
        setDialogVisible={() => setShowImagePickerDialog(false)}
      />
      <CommonDialoug
        dialogVisible={stateDialog}
        setDialogVisible={() => setStateDialog(false)}
        title="Select State"
        data={stateData}
        type={4}
        onSelectedItem={item => {
          setStateDialog(false);
          setState(item.name);
          getCity(item.id);
        }}
        height="60%"
        setUpdatedData={setSearchdata}
        searchUpdatedState={searchUpdatedState}
      />
      <CityDialoug
        dialogVisible={cityDialog}
        setDialogVisible={() => setCityDialog(false)}
        title="Select City"
        data={cityData}
        type={4}
        onSelectedItem={item => {
          setCityDialog(false);
          setCity(item.name);
        }}
        height="60%"
        setUpdatedData={setSearchdata}
        searchUpdatedState={searchUpdatedState}
      />
      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textField: {
    fontFamily: 'Poppins-Regular',
    padding: 12,
    backgroundColor: GRAY_100,
    color: GRAY_800,
  },
});

export default OwnerProfile;
