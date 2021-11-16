/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LoaderIndicator} from '../../common/LoaderIndicator';
import OVText, {
  medium,
  poppinsMedium,
  poppinsRegular,
} from '../../components/OVText';
import {
  ACCOUNT_SETTING,
  ADD_ICON,
  APP_ICON,
  CHANGE_PASSWORD,
  DROP_DOWN,
  LEGAL_INFORMATION,
  LOGOUT,
  MY_PROFILE,
  SEND_FEEDBACK,
  WALLET_ICON,
} from '../../images';
import Network from '../../network/Network';
import {AuthContext} from '../../services/authProvider';
import {PROFILE_IMAGE_URL} from '../../utils/AppConstant';
import {
  APP_THEME_COLOR,
  BG_COLOR,
  BLACK,
  GRAY_200,
  TEXT_COLOR_AUTH_TITLES,
  WHITE,
} from '../../utils/Colors';
import PetTypeDialog from '../insurance/PetTypeDialog';

const MyAccount = props => {
  const [petTypeDialog, setPetTypeDialog] = useState(false);
  const navigation = useNavigation();
  const {
    user,
    token,
    petProfileData,
    setUser,
    setToken,
    defaultPetIndex,
    setDefaultPetIndex,
    setPetProfileData,
    setLogout,
  } = useContext(AuthContext);
  const [petName, setPetName] = useState('');
  const [loading, setLoading] = useState(false);
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    getPetProfile();
  }, []);

  const getPetProfile = () => {
    setLoading(true);
    Network('user/get-my-pet', 'get', null, token)
      .then(async res => {
        if (res.status === true) {
          console.log(' /n/n Result ', JSON.stringify(res));
          const data = res.data;
          setPetList(data);
          var index = 0;
          if (typeof defaultPetIndex != 'undefined' && defaultPetIndex >= 0) {
            if (typeof data[defaultPetIndex] != 'undefined') {
              index = defaultPetIndex;
            }
          }
          setPetName(data[index]);
          setPetProfileData(data[index]);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BG_COLOR}}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: BG_COLOR,
          }}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              marginTop: 10,
              justifyContent: 'center',
            }}>
            {petList.length > 0 ? (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate('AddPetProfile', {
                    petId: petName.id,
                    petProfile: item => {
                      console.log(item);
                      getPetProfile();
                    },
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginEnd: 20,
                  }}>
                  {typeof petName?.pet_img_path != 'undefined' &&
                  petName?.pet_img_path != '' &&
                  petName?.pet_img_path != null &&
                  petName?.pet_img_path != 'null' ? (
                    <Image
                      source={{uri: petName?.pet_img_path}}
                      style={{width: 80, height: 80, borderRadius: 40}}
                    />
                  ) : (
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#FAA41A', '#906445', '#28246F']}
                      style={{
                        padding: 10,
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                      }}>
                      <Image
                        source={APP_ICON}
                        style={{width: 60, height: 60, resizeMode: 'contain'}}
                      />
                    </LinearGradient>
                  )}

                  <TouchableOpacity
                    onPress={() => setPetTypeDialog(true)}
                    activeOpacity={1}
                    style={{
                      backgroundColor: WHITE,
                      borderRadius: 6,
                      paddingVertical: 5,
                      marginBottom: 10,
                      elevation: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingEnd: 5,
                      marginTop: 10,
                      paddingHorizontal: 10,
                    }}>
                    <OVText
                      size={medium}
                      fontType={poppinsRegular}
                      color={BLACK}
                      style={{
                        textAlign: 'center',
                      }}>
                      {petName.petName}
                    </OVText>
                    <Image source={DROP_DOWN} style={{margin: 4}} />
                  </TouchableOpacity>
                  <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                    PET
                  </OVText>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('AddPetProfile', {
                    petId: 0,
                    petProfile: item => {
                      console.log(item);
                      getPetProfile();
                    },
                  })
                }
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginEnd: 20,
                  justifyContent: 'center',
                }}>
                <Image source={ADD_ICON} style={{width: 40, height: 40}} />
                <OVText
                  size={medium}
                  fontType={poppinsMedium}
                  color={BLACK}
                  style={{marginTop: 20}}>
                  Add Pet
                </OVText>
              </TouchableOpacity>
            )}

            
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('OwnerProfile')}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginStart: 20,
                }}>
                {user.profile_pic !== '' ? (
                  <Image
                    source={{uri: `${PROFILE_IMAGE_URL}${user.profile_pic}`}}
                    style={{width: 80, height: 80, borderRadius: 40}}
                  />
                ) : (
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#FAA41A', '#906445', '#28246F']}
                    style={{
                      padding: 10,
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                    }}>
                    <Image
                      source={APP_ICON}
                      style={{width: 60, height: 60, resizeMode: 'contain'}}
                    />
                  </LinearGradient>
                )}

                <OVText
                  size={medium}
                  fontType={poppinsRegular}
                  color={BLACK}
                  style={{
                    textAlign: 'center',
                    backgroundColor: WHITE,
                    borderRadius: 6,
                    paddingVertical: 5,
                    marginBottom: 10,
                    flex: 1,
                    elevation: 1,
                    width: 100,
                    marginTop: 10,
                  }}>
                  {user.first_name}
                </OVText>
                <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                  OWNER
                </OVText>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={APP_THEME_COLOR}
              style={{marginStart: 10}}>
              PROFILE
            </OVText>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('OwnerProfile')}>
              <View
                style={{
                  backgroundColor: WHITE,
                  padding: 14,
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Image source={MY_PROFILE} />
                <OVText
                  size={medium}
                  fontType={poppinsRegular}
                  color={TEXT_COLOR_AUTH_TITLES}
                  style={{marginStart: 20}}>
                  My Profile
                </OVText>
              </View>
            </TouchableOpacity>
            <View style={{height: 1, backgroundColor: GRAY_200}} />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('ChangePassword')}>
              <View
                style={{
                  backgroundColor: WHITE,
                  padding: 14,
                  flexDirection: 'row',
                }}>
                <Image source={CHANGE_PASSWORD} />
                <OVText
                  size={medium}
                  fontType={poppinsRegular}
                  color={TEXT_COLOR_AUTH_TITLES}
                  style={{marginStart: 20}}>
                  Change Password
                </OVText>
              </View>
            </TouchableOpacity>
            <View style={{height: 1, backgroundColor: GRAY_200}} />
            <View
              style={{
                backgroundColor: WHITE,
                padding: 14,
                flexDirection: 'row',
              }}>
              <Image source={ACCOUNT_SETTING} />
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={TEXT_COLOR_AUTH_TITLES}
                style={{marginStart: 20}}>
                Settings
              </OVText>
            </View>
            <View style={{height: 1, backgroundColor: GRAY_200}} />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigation.navigate('AddPetProfile', {
                  petId: 0,
                  petProfile: () => {
                    getPetProfile();
                  },
                })
              }>
              <View
                style={{
                  backgroundColor: WHITE,
                  padding: 14,
                  flexDirection: 'row',
                }}>
                <Image source={ACCOUNT_SETTING} />
                <OVText
                  size={medium}
                  fontType={poppinsRegular}
                  color={TEXT_COLOR_AUTH_TITLES}
                  style={{marginStart: 20}}>
                  Add Pet
                </OVText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('Wallet')}>
              <View
                style={{
                  backgroundColor: WHITE,
                  padding: 14,
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Image source={WALLET_ICON} />
                <OVText
                  size={medium}
                  fontType={poppinsRegular}
                  color={TEXT_COLOR_AUTH_TITLES}
                  style={{marginStart: 20}}>
                  Wallet
                </OVText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('LegalInformation')}>
              <View
                style={{
                  backgroundColor: WHITE,
                  padding: 14,
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Image source={LEGAL_INFORMATION} />
                <OVText
                  size={medium}
                  fontType={poppinsRegular}
                  color={TEXT_COLOR_AUTH_TITLES}
                  style={{marginStart: 20}}>
                  Legal Information
                </OVText>
              </View>
            </TouchableOpacity>
            <View style={{height: 1, backgroundColor: GRAY_200}} />
            <View
              style={{
                backgroundColor: WHITE,
                padding: 14,
                flexDirection: 'row',
              }}>
              <Image source={SEND_FEEDBACK} />
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={TEXT_COLOR_AUTH_TITLES}
                style={{marginStart: 10}}>
                Send Feedback
              </OVText>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setLogout(true);
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Login'}],
                });
              }}>
              <View
                style={{
                  backgroundColor: WHITE,
                  padding: 14,
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Image source={LOGOUT} />
                <OVText
                  size={medium}
                  fontType={poppinsRegular}
                  color={TEXT_COLOR_AUTH_TITLES}
                  style={{marginStart: 20}}>
                  Logout
                </OVText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <PetTypeDialog
        data={petList}
        dialogVisible={petTypeDialog}
        setDialogVisible={() => setPetTypeDialog(false)}
        onSelectedItem={(item, index = 0) => {
          setDefaultPetIndex(index);
          setPetName(item);
          setPetTypeDialog(false);
        }}
        type={3}
        title="Pet Name"
      />
      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default MyAccount;
