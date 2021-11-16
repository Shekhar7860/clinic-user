/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import DateTimePicker from '../../common/DateTimePicker';
import {Header} from '../../common/Header';
import {LoaderIndicator} from '../../common/LoaderIndicator';
import {OVButton} from '../../components/OVButton';
import OVText, {
  extraSmall,
  medium,
  poppinsMedium,
  poppinsRegular,
  small,
} from '../../components/OVText';
import Network from '../../network/Network';
import {AuthContext} from '../../services/authProvider';
import {showToastMessage} from '../../utils';
import {
  APP_THEME_COLOR,
  BG_COLOR,
  BLACK,
  GRAY_100,
  GRAY_800,
  GREEN_COLOR,
  ORANGE,
  WHITE,
} from '../../utils/Colors';
import PetTypeDialog from '../insurance/PetTypeDialog';
import {parseDate, parseDateHiphenFormat} from '../../utils/BaseUtils';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from '../../components/ImagePicker';
import {APP_ICON, GENDER_OTHERS} from '../../images';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';

const windowWidth = Dimensions.get('window').width;
const GENDER_DATA = [
  {id: 1, pet_name: 'Male'},
  {id: 2, pet_name: 'Female'},
];

const AddPetProfile = props => {
  const {petId, petProfile} = props.route.params;
  const navigation = useNavigation();
  const {user, token, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [petName, setPetName] = useState('');
  const [type, setType] = useState('Select pet type');
  const [breed, setBreed] = useState('Select pet breed');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Select Gender');
  const [petGenderDialog, setGenderDialog] = useState(false);
  const [adoptionDate, setAdoptationDate] = useState(new Date());
  const [dewormingDate, setDewormingDate] = useState(new Date());
  const [heatDate, setHeatDate] = useState(new Date());
  const [nextHeatDate, setNextHeatDate] = useState(new Date());
  const [dateType, setDateType] = useState(1);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [petTypeDialog, setPetTypeDialog] = useState(false);
  const [petTypeData, setPetTypeData] = useState(false);
  const [petBreedDialog, setPetBreedDialog] = useState(false);
  const [petBreedData, setBreedData] = useState(false);
  const [showImagePickerDialog, setShowImagePickerDialog] = useState(false);
  const [profilePath, setProfilePath] = useState('');
  const [nuturedStatus, setNuturedStatus] = useState(false);

  useEffect(() => {
    if (petId !== 0) {
      getUserProfile();
    } else {
      getPetType();
    }
  }, []);

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

  const getPetType = () => {
    setLoading(true);
    Network('user/pet-type', 'get', null, token)
      .then(async res => {
        if (res.status === true) {
          console.log(' /n/n Result ', JSON.stringify(res));
          setPetTypeData(res.data);
        } else {
          showToastMessage(res.message);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const getPetBreed = petType => {
    setLoading(true);
    Network(`user/getBreeds?pet_type=${petType}`, 'get', null, token)
      .then(async res => {
        if (res.status === true) {
          setBreedData(res.data);
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
    const payload = {pet_id: petId};

    Network('user/get-pet-details', 'post', payload, token)
      .then(async res => {
        if (res.status === true) {
          console.log(' \n\n Result ', JSON.stringify(res));
          const data = res.data;
          setType({id: data.pet_type, pet_name: data.pet_type_name});
          setBreed({id: data.breed_id, breed_name: data.breed_name});
          setPetName(data.petName);
          setGender({id: '1', pet_name: data.sex});
          setHeight(data.current_height);
          setWeight(data.current_height);
          setNuturedStatus(data.nutured_status == '1' ? true : false);
          setAddress(data.address == '' ? '' : data.address);
          setCity(data.city == '' ? '' : data.city);
          setState(data.state == '' ? '' : data.state);
          setPostCode(data.postcode == '' ? '' : data.postcode);
          setCountry(data.country == '' ? '' : data.country);
          setProfilePath(data.pet_img_path);
          setAge(data.age.toString());
          setLoading(false);
        } else {
          showToastMessage(res.message);
          setLoading(false);
        }
        getPetType();
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const updateProfile = () => {
    if (type === 'Select pet type') {
      showToastMessage('Please select pet type');
    } else if (breed === 'Select pet breed') {
      showToastMessage('Please select pet breed');
    } else if (petName === '') {
      showToastMessage('Please enter pet name');
    } else if (height === '') {
      showToastMessage('Please enter pet height');
    } else if (weight === '') {
      showToastMessage('Please enter pet weight');
    } else if (age === '') {
      showToastMessage('Please enter pet age');
    } else if (gender === 'Select Gender') {
      showToastMessage('Please select gender');
    } else {
      setLoading(true);
      let data = new FormData();
      data.append('pet_name', petName);
      data.append('gender', gender.pet_name);
      data.append('type', type.id.toString());
      data.append('breed', breed.id.toString());
      data.append('height', height);
      data.append('weight', weight);
      data.append('age', age);
      data.append('nutured_status', nuturedStatus ? 1 : 0);
      data.append('adoption_date', parseDateHiphenFormat(adoptionDate));
      // data.append('address', address);
      // data.append('city', city);
      // data.append('state', state);
      // data.append('postcode', postCode);
      // data.append('lati', latitude);
      // data.append('longi', longitude);
      data.append('deworming_date', parseDateHiphenFormat(dewormingDate));

      if (profilePath) {
        data.append('pet_image', {
          uri: profilePath,
          name: Date.parse(new Date()) + 'userImage.png',
          filename: 'userImage.png',
          type: 'image/png',
        });
      }

      if (gender.id === 2) {
        data.append('heat_date', parseDateHiphenFormat(heatDate));
        data.append('next_followup_date', parseDateHiphenFormat(nextHeatDate));
      }

      if (petId !== 0) {
        data.append('pet_id', petId);
      }

      var url = '';
      if (petId !== 0) {
        url = 'user/update-pet-details';
      } else {
        url = 'user/pet-register';
      }

      Network(url, 'post', data, token)
        .then(async res => {
          console.log(' /n/n Result ', JSON.stringify(res.data));
          showToastMessage(res.message);
          setLoading(false);
          petProfile('Profile Created');
          navigation.goBack();
        })
        .catch(error => {
          setLoading(false);
          // showToastMessage(error);
        });
    }
  };

  const getPetTypeName = id => {
    for (let i = 0; i < petTypeData.length; i++) {
      if (id === petTypeData[i].id) {
        return petTypeData[i].pet_name;
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BG_COLOR}}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title="Add Pet Profile"
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
                {profilePath !== '' ? (
                  <Image
                    source={profilePath !== '' ? {uri: profilePath} : APP_ICON}
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
              Pet Type
            </OVText>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setPetTypeDialog(true)}>
              <TextInput
                placeholder="Select pet type"
                style={styles.textField}
                value={
                  type === 'Select pet type' ? 'Select pet type' : type.pet_name
                }
                onChangeText={text => setType(text)}
                editable={false}
              />
            </TouchableOpacity>
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                padding: 12,
                backgroundColor: WHITE,
              }}>
              Pet Breed
            </OVText>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setPetBreedDialog(true)}>
              <TextInput
                style={styles.textField}
                value={
                  breed === 'Select pet breed'
                    ? 'Select pet breed'
                    : breed.breed_name
                }
                onChangeText={text => setBreed(text)}
                editable={false}
              />
            </TouchableOpacity>
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                padding: 12,
                backgroundColor: WHITE,
              }}>
              Pet Name
            </OVText>

            <TextInput
              style={styles.textField}
              value={petName}
              onChangeText={text => setPetName(text.replace(/[^A-Za-z]/gi, ''))}
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
              Height (in feet)
            </OVText>

            <TextInput
              style={styles.textField}
              value={height}
              onChangeText={text => setHeight(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              maxLength={3}
              contextMenuHidden={false}
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
              Weight (in kg)
            </OVText>

            <TextInput
              style={styles.textField}
              value={weight}
              onChangeText={text => setWeight(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              maxLength={3}
              contextMenuHidden={false}
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
              age (in year)
            </OVText>

            <TextInput
              style={styles.textField}
              value={age}
              onChangeText={text => setAge(text.replace(/[^0-9.]/g, ''))}
              keyboardType="numeric"
              maxLength={4}
              contextMenuHidden={false}
            />

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setDateType(1);
                setShowDatePicker(true);
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
                Adoption Date
              </OVText>

              <TextInput
                style={styles.textField}
                value={parseDateHiphenFormat(adoptionDate)}
                editable={false}
              />
            </TouchableOpacity>
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                padding: 12,
                backgroundColor: WHITE,
              }}>
              Pet Gender
            </OVText>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setGenderDialog(true)}>
              <TextInput
                style={styles.textField}
                value={
                  gender === 'Select Gender' ? 'Select Gender' : gender.pet_name
                }
                onChangeText={text => setGender(text)}
                editable={false}
              />
            </TouchableOpacity>
            {gender.id === 2 && (
              <View>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setDateType(3);
                    setShowDatePicker(true);
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
                    Heat Date
                  </OVText>

                  <TextInput
                    style={styles.textField}
                    value={parseDateHiphenFormat(heatDate)}
                    editable={false}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setDateType(4);
                    setShowDatePicker(true);
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
                    Next Followup Date
                  </OVText>

                  <TextInput
                    style={styles.textField}
                    value={parseDateHiphenFormat(nextHeatDate)}
                    editable={false}
                  />
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setDateType(2);
                setShowDatePicker(true);
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
                Deworming Date
              </OVText>

              <TextInput
                style={styles.textField}
                value={parseDateHiphenFormat(dewormingDate)}
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
              }}>
              Natured Status
            </OVText>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setNuturedStatus(true)}>
                <View style={{marginEnd: 20, alignItems: 'center'}}>
                  <Image
                    source={GENDER_OTHERS}
                    style={{tintColor: nuturedStatus ? ORANGE : BLACK}}
                  />

                  <OVText
                    size={small}
                    fontType={poppinsRegular}
                    color={nuturedStatus ? ORANGE : BLACK}
                    style={{marginBottom: 10, marginTop: 6}}>
                    Yes
                  </OVText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setNuturedStatus(false)}>
                <View style={{marginStart: 20, alignItems: 'center'}}>
                  <Image
                    source={GENDER_OTHERS}
                    style={{tintColor: !nuturedStatus ? ORANGE : BLACK}}
                  />
                  <OVText
                    size={small}
                    fontType={poppinsRegular}
                    color={!nuturedStatus ? ORANGE : BLACK}
                    style={{marginBottom: 10, marginTop: 6}}>
                    No
                  </OVText>
                </View>
              </TouchableOpacity>
            </View>
            {/* <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                paddingVertical: 10,
                paddingStart: 10,
                backgroundColor: WHITE,
              }}>
              Address
            </OVText>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PlacesApiSearch', {
                  onAddressSelect: data => {
                    console.log(data);
                    setAddress(data.name);
                    setCity(data.city);
                    setState(data.state);
                    setPostCode(!data.zipcode ? '' : data.zipcode);
                    setCountry(data.country);
                    setLatitude(data.latitude);
                    setLongitude(data.longitude);
                  },
                })
              }>
              <TextInput
                style={styles.textField}
                value={address}
                onChangeText={text => setAddress(text)}
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
              }}>
              City
            </OVText>

            <TextInput
              style={styles.textField}
              value={city}
              onChangeText={text => setCity(text)}
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
              State
            </OVText>

            <TextInput
              style={styles.textField}
              value={state}
              onChangeText={text => setState(text)}
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
              Postcode
            </OVText>

            <TextInput
              style={styles.textField}
              value={postCode}
              onChangeText={text => setPostCode(text)}
            /> */}
            {/* <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                paddingVertical: 10,
                paddingStart: 10,
                backgroundColor: WHITE,
              }}>
              Country
            </OVText>

            <TextInput
              style={styles.textField}
              value={country}
              onChangeText={text => setCountry(text)}
            /> */}

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
      <DateTimePicker
        mode="date"
        show={showDatePicker}
        onDateSelectChange={selectedDate => {
          setShowDatePicker(false);
          if (dateType === 1) {
            setAdoptationDate(selectedDate);
          } else if (dateType === 2) {
            setDewormingDate(selectedDate);
          } else if (dateType === 3) {
            setHeatDate(selectedDate);
          } else if (dateType === 3) {
            setNextHeatDate(selectedDate);
          }
        }}
        value={adoptionDate}
      />
      <PetTypeDialog
        dialogVisible={petTypeDialog}
        setDialogVisible={() => setPetTypeDialog(false)}
        title="Pet Type"
        data={petTypeData}
        type={1}
        onSelectedItem={item => {
          setPetTypeDialog(false);
          setType(item);
          getPetBreed(item.id);
        }}
      />
      <PetTypeDialog
        dialogVisible={petBreedDialog}
        setDialogVisible={() => setPetBreedDialog(false)}
        title="Pet Breed"
        data={petBreedData}
        type={2}
        onSelectedItem={item => {
          setPetBreedDialog(false);
          setBreed(item);
        }}
      />
      <PetTypeDialog
        dialogVisible={petGenderDialog}
        setDialogVisible={() => setGenderDialog(false)}
        title="Pet Gender"
        data={GENDER_DATA}
        type={1}
        onSelectedItem={item => {
          setShowDatePicker(false);
          setGenderDialog(false);
          setGender(item);
        }}
        height="24%"
      />

      <ImagePicker
        selectedImagePath={path => {
          setShowImagePickerDialog(false);
          setProfilePath(path);
        }}
        dialogVisible={showImagePickerDialog}
        setDialogVisible={() => setShowImagePickerDialog(false)}
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

export default AddPetProfile;
