/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext, useEffect} from 'react';
import {Dimensions, Image, SafeAreaView, ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Header} from '../../common/Header';
import {OVButton} from '../../components/OVButton';
import OVText, {
  medium,
  poppinsLight,
  poppinsMedium,
  poppinsSemiBold,
  small,
} from '../../components/OVText';
import {DOCTOR_1, USER_SMALL} from '../../images';
import {
  APP_THEME_COLOR,
  BG_COLOR,
  BLACK,
  GRAY_100,
  GRAY_800,
  GREEN_COLOR,
  WHITE,
  YELLOW,
} from '../../utils/Colors';

import Network from '../../network/Network';
import {AuthContext} from '../../services/authProvider';
import {showToastMessage} from '../../utils';
import {LoaderIndicator} from '../../common/LoaderIndicator';
import {DOCTOR_IMAGE_URL} from '../../utils/AppConstant';
import AppointmentTypeDialog from '../appointments/AppointmentTypeDialog';

const windowWidth = Dimensions.get('window').width;

const DoctorProfile = props => {
  const {
    doctorId,
    price,
    bookingType,
    appointmentId,
    isDoorstep = false,
    isEnableDoorstep = 0,
    vaccineId,
    item = null,
  } = props.route.params;
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [doctorData, setDoctorData] = useState({});
  const {user, token, setUser} = useContext(AuthContext);
  const [appointmentTypeDialog, setAppointmentTypeDialog] = useState(false);
  const [doctorItemData, setDoctorItemData] = useState({});

  console.log('props.route.params', props.route.params);

  useEffect(() => {
    getDoctorDetail();
  }, []);

  const getDoctorDetail = () => {
    setLoading(true);
    const payload = {doctor_id: doctorId};
    Network('user/get-doctor-details', 'post', payload, token)
      .then(async res => {
        if (res.status === true) {
          console.log(' \n\n Result ', res);
          setDoctorData(res.data);
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BG_COLOR}}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title="Doctor Profile"
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
            <View style={{flexDirection: 'row'}}>
              <Image
                source={{uri: `${DOCTOR_IMAGE_URL}${doctorData.image}`}}
                style={{width: 70, height: 70, borderRadius: 35}}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginStart: 20,
                  justifyContent: 'center',
                }}>
                <OVText
                  size={medium}
                  fontType={poppinsMedium}
                  color={WHITE}
                  style={{}}>
                  Dr. {doctorData.name}
                </OVText>
                <OVText size={small} fontType={poppinsLight} color={WHITE}>
                  {doctorData.Speciality}
                </OVText>
                <OVText size={small} fontType={poppinsLight} color={WHITE}>
                  {doctorData.exprience == null ? '0' : doctorData.exprience}{' '}
                  Year(s) of Experience
                </OVText>
                {doctorData && doctorData.price != null && (
                  <OVText size={small} fontType={poppinsLight} color={WHITE}>
                    Rs. {doctorData.price} / Session
                  </OVText>
                )}
              </View>
            </View>
          </LinearGradient>
          <View style={{flexDirection: 'column'}}>
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                paddingVertical: 10,
                paddingStart: 10,
                backgroundColor: WHITE,
              }}>
              VCI Reg. No.
            </OVText>
            <OVText
              size={medium}
              fontType={poppinsLight}
              color={GRAY_800}
              style={{
                paddingVertical: 14,
                paddingStart: 10,
                backgroundColor: GRAY_100,
              }}>
              {doctorData?.vci_no}
            </OVText>
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                paddingVertical: 10,
                paddingStart: 10,
                backgroundColor: WHITE,
              }}>
              SPEAKS
            </OVText>
            <OVText
              size={medium}
              fontType={poppinsLight}
              color={GRAY_800}
              style={{
                paddingVertical: 14,
                paddingStart: 10,
                backgroundColor: GRAY_100,
              }}>
              {doctorData?.language_name}
            </OVText>
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                paddingVertical: 10,
                paddingStart: 10,
                backgroundColor: WHITE,
              }}>
              MEDICAL PRACTISE
            </OVText>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={GRAY_800}
              style={{
                paddingTop: 14,
                paddingStart: 10,
                backgroundColor: GRAY_100,
              }}>
              {doctorData?.address}{' '}
              {doctorData?.city != null && doctorData?.city != ''
                ? ' - ' + doctorData?.city
                : ''}
            </OVText>
            {/* <OVText
              size={medium}
              fontType={poppinsLight}
              color={GRAY_800}
              style={{
                paddingBottom: 14,
                paddingStart: 10,
                backgroundColor: GRAY_100,
              }}>
              Borivali, Mumbai
            </OVText> */}
            <OVText
              size={medium}
              fontType={poppinsMedium}
              color={GREEN_COLOR}
              style={{
                paddingVertical: 10,
                paddingStart: 10,
                backgroundColor: WHITE,
              }}>
              SPECIALISATIONS
            </OVText>
            <OVText
              size={medium}
              fontType={poppinsLight}
              color={GRAY_800}
              style={{
                paddingVertical: 14,
                paddingStart: 10,
                backgroundColor: GRAY_100,
              }}>
              {doctorData.speciality_name}
            </OVText>
            {/* <View
              style={{
                backgroundColor: WHITE,
                paddingVertical: 10,
                paddingHorizontal: 10,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <OVText
                size={medium}
                fontType={poppinsMedium}
                color={GREEN_COLOR}
                style={{}}>
                FEEDBACK (33)
              </OVText>
              <OVText
                size={small}
                fontType={poppinsMedium}
                color={YELLOW}
                style={{textAlign: 'right'}}>
                SHOW ALL
              </OVText>
            </View> */}
            {/* <View
              style={{
                flexDirection: 'column',
                backgroundColor: GRAY_100,
                padding: 14,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={USER_SMALL} />
                <OVText
                  size={medium}
                  fontType={poppinsLight}
                  color={BLACK}
                  style={{
                    paddingStart: 10,
                    flex: 1,
                  }}>
                  Tanuja Tanwar
                </OVText>
              </View>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={GRAY_800}
                style={{
                  marginTop: 6,
                  flex: 1,
                }}>
                Such a sweet helpful doctor.
              </OVText>
              <OVText
                size={small}
                fontType={poppinsLight}
                color={GRAY_800}
                style={{
                  marginTop: 10,
                  flex: 1,
                }}>
                3 May at 1:30 PM
              </OVText>
            </View> */}
            <OVButton
              title="BOOK CONSULTATION"
              color={APP_THEME_COLOR}
              textColor={WHITE}
              marginTop={20}
              marginBottom={20}
              onPress={() => {
                if (bookingType === 1) {
                  if (isEnableDoorstep == 1) {
                    setAppointmentTypeDialog(true);
                  } else {
                    navigation.navigate('BookAppointments', {
                      id: doctorData.id,
                      price: doctorData.price,
                      appointmentId: 0,
                      bookingType: bookingType,
                      isDoorstep: isDoorstep,
                      item: item,
                    });
                  }
                } else {
                  navigation.navigate('BookAppointments', {
                    id: doctorData.id,
                    price: doctorData.price,
                    appointmentId: 0,
                    bookingType: bookingType,
                    isDoorstep: isDoorstep,
                    item: item,
                  });
                }
              }}
              width={windowWidth - 20}
            />
          </View>
        </View>
      </ScrollView>

      <AppointmentTypeDialog
        dialogVisible={appointmentTypeDialog}
        setDialogVisible={(status, doorstep) => {
          setAppointmentTypeDialog(false);
          if (status) {
            navigation.navigate('BookAppointments', {
              appointmentId: 0,
              id: doctorId,
              price: price,
              bookingType: bookingType,
              isDoorstep: doorstep,
              item: doctorItemData,
            });
          }
        }}
      />

      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default DoctorProfile;
