/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Alert,
  Linking,
  Platform,
  TouchableOpacity,
} from 'react-native';
import OVText, {
  medium,
  poppinsMedium,
  poppinsRegular,
  small,
} from '../../components/OVText';
import {
  DOCTOR_1,
  DOCTOR_2,
  APP_ICON,
  VACCINATION_TYPE,
  CLINIC_LOCATION,
} from '../../images';
import {
  APP_THEME_COLOR,
  BG_COLOR,
  BLACK,
  LIGHT_GREEN,
  LIGHT_GREEN2,
  ORANGE,
  RED,
  WHITE,
  MAROON,
  GREEN,
} from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import { DOCTOR_IMAGE_URL } from '../../utils/AppConstant';
import LinearGradient from 'react-native-linear-gradient';
import EmptyView from '../../common/EmptyView';

const windowWidth = Dimensions.get('window').width;

const MyAppointments = props => {
  const navigation = useNavigation();
  const { user, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getMyAppointment();
  }, []);

  const getMyAppointment = date => {
    setLoading(true);
    Network('user/get-all-appointment', 'get', null, token)
      .then(async res => {
        console.log(' /n/n Result ', res);
        setLoading(false);
        setCategoryData(res.data);
      })
      .catch(error => {
        setLoading(false);
        showToastMessage(error);
      });
  };

  const endAppointment = appointmentId => {
    setLoading(true);
    let data = new FormData();
    data.append('appointment_id', appointmentId);
    Network('user/cancel-appointment', 'post', data, token)
      .then(async res => {
        console.log(' /n/n Result ', JSON.stringify(res));
        setLoading(false);
        showToastMessage(res.message);
        getMyAppointment();
      })
      .catch(error => {
        setLoading(false);
        showToastMessage(error);
      });
  };

  const confirmCancelAppointment = appointmentId => {
    Alert.alert(
      'Confirm',
      'Are you sure to cacnel this appointment?',
      [
        {
          text: 'Yes',
          onPress: () => endAppointment(appointmentId),
          style: 'cancel',
        },
        {
          text: 'No',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const openMap = item => {
    if (
      typeof item?.vendor_latitude != 'undefined' &&
      item?.vendor_latitude != null &&
      item?.vendor_latitude != '' &&
      typeof item?.vendor_longitude != 'undefined' &&
      item?.vendor_longitude != null &&
      item?.vendor_longitude != ''
    ) {
      var lat = `${item?.vendor_latitude}`; // '28.6077438';
      var long = `${item?.vendor_longitude}`; // ',77.3674968';
      var zoom = ',17z';
      // const URL = `geo:${lat},${long}`//'https://www.google.com/maps/place/' + lat + long + '/@' + lat + long + zoom;
      const URL = Platform.select({
        ios: `maps:0,0?q=${lat},${long}`,
        android: `geo:0,0?q=${lat},${long}`,
      });
      console.error('/n/n/n/n map url', URL),
        Linking.openURL(`${URL}`).catch(err =>
          console.error('An error occurred', err),
        );
    }
  };

  const renderItem = ({ item }) => (
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
      <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate('BookingStatus', {
              booking_id: item.id,
              referrer: 2,
            });
          }}>
          {item.doctor_image !== null ? (
            <Image
              source={{ uri: item.doctor_image }}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
          ) : (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#FAA41A', '#906445', '#28246F']}
              style={{
                padding: 10,
                width: 60,
                height: 60,
                borderRadius: 30,
              }}>
              <Image
                source={APP_ICON}
                style={{ width: 40, height: 40, resizeMode: 'contain' }}
              />
            </LinearGradient>
          )}
        </TouchableOpacity>

        <View style={{ flex: 1, flexDirection: 'column', marginStart: 20 }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate('BookingStatus', {
                booking_id: item.id,
                referrer: 2,
              });
            }}>
            <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
              {item.doctor_name}
            </OVText>

            <OVText size={small} fontType={poppinsRegular} color={BLACK}>
              <Image source={VACCINATION_TYPE} /> Type :
              {item.appointment_type === 1
                ? ' Vet online Consultation'
                : item.appointment_type === 2
                  ? ' Vet Appointment Consultation'
                  : item.appointment_type === 3
                    ? ' Vet Appointment Doorstep'
                    : item.appointment_type === 4
                      ? ' Vaccine at Clinic'
                      : item.appointment_type === 5
                        ? ' Vaccine at Doorstep'
                        : ''}
            </OVText>
          </TouchableOpacity>
          {(item.appointment_type === 1 ||
            item.appointment_type === 4 ||
            1) && (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  flexWrap: 'wrap',
                  flexShrink: 1,
                }}
                activeOpacity={0.9}
                onPress={() => openMap(item)}>
                <OVText
                  size={small}
                  fontType={poppinsRegular}
                  color={BLACK}
                  style={{ flex: 1 }}>
                  <Image source={CLINIC_LOCATION} /> {` `}
                  Address : {item?.vendor_address}
                </OVText>
              </TouchableOpacity>
            )}

          {/* {item.appointment_type === 1 &&
                        item.speciality &&
                        item.speciality.length > 0 && (
                            <OVText size={small} fontType={poppinsRegular} color={BLACK}>
                                {item.appointment_type === 1
                                    ? item.speciality[0].name
                                    : 'Vaccine'}
                            </OVText>
                        )} */}

          {item.appointment_type === 3 && (
            <OVText size={small} fontType={poppinsRegular} color={BLACK}>
              Vaccine
            </OVText>
          )}

          {item.language > 0 && (
            <OVText size={small} fontType={poppinsRegular} color={BLACK}>
              {item.language[0].name}
            </OVText>
          )}

          <OVText size={small} fontType={poppinsRegular} color={BLACK}>
            {/* {item.exprience != null ? item.exprience : '0'} Years of Experiance */}
          </OVText>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <OVText
          size={small}
          fontType={poppinsRegular}
          color={WHITE}
          style={{
            textAlign: 'center',
            backgroundColor: APP_THEME_COLOR,
            borderRadius: 6,
            paddingVertical: 10,
            marginEnd: 5,
            flex: 1,
            elevation: 3,
          }}>
          Date : {item.date}
        </OVText>

        <OVText
          size={small}
          fontType={poppinsRegular}
          color={WHITE}
          style={{
            textAlign: 'center',
            backgroundColor: APP_THEME_COLOR,
            borderRadius: 6,
            paddingVertical: 10,
            marginStart: 10,
            flex: 1,
            elevation: 3,
          }}>
          Time : {item.time}
        </OVText>
      </View>

      {item.appointment_status != 2 ? (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
          }}>
          {item?.is_rescheduled == null ||
            item?.is_rescheduled == '' ||
            item?.is_rescheduled == 0 ? (
            <OVText
              onPress={() =>
                navigation.navigate('BookAppointments', {
                  appointmentId: item.id,
                  bookingType: item.appointment_type,
                  id: item.doctor_id,
                })
              }
              size={small}
              fontType={poppinsRegular}
              color={WHITE}
              style={{
                backgroundColor: ORANGE,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 20,
                elevation: 3,
                textAlign: 'center',
                flex: 1,
              }}>
              Rechedule
            </OVText>
          ) : (
            <OVText
              onPress={() => showToastMessage('You have already reschedule.')}
              size={small}
              fontType={poppinsRegular}
              color={WHITE}
              style={{
                backgroundColor: ORANGE,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 20,
                elevation: 3,
                textAlign: 'center',
                flex: 1,
              }}>
              Rechedule
            </OVText>
          )}

          <OVText
            onPress={() => confirmCancelAppointment(item.id)}
            size={small}
            fontType={poppinsRegular}
            color={WHITE}
            style={{
              backgroundColor: MAROON,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 20,
              elevation: 3,
              flex: 1,
              marginHorizontal: 10,
              textAlign: 'center',
            }}>
            Cancel
          </OVText>
          <OVText
            onPress={() => navigation.navigate('Chat', { itemData: item })}
            size={small}
            fontType={poppinsRegular}
            color={WHITE}
            style={{
              backgroundColor: LIGHT_GREEN2,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20,
              elevation: 3,
              textAlign: 'center',
              flex: 1,
            }}>
            Chat
          </OVText>
          {item?.chatCount > 0 && (
            <OVText
              style={{
                height: 10,
                width: 10,
                backgroundColor: GREEN,
                position: 'absolute',
                right: -0,
                top: 0,
                borderRadius: 20,
                zIndex: 9,
                elevation: 5,
              }}></OVText>
          )}
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <OVText
            onPress={() => { }}
            size={small}
            fontType={poppinsRegular}
            color={WHITE}
            style={{
              backgroundColor: MAROON,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 20,
              elevation: 3,
              flex: 1,
              marginHorizontal: 10,
              textAlign: 'center',
            }}>
            Cancelled
          </OVText>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <FlatList
            data={categoryData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={<EmptyView title="No data found." />}
          />
        </View>
      </ScrollView>
      {loading && <LoaderIndicator loading={loading} />}
    </SafeAreaView>
  );
};

export default MyAppointments;
