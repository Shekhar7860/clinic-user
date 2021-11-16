/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {Image, Modal, TouchableOpacity, View} from 'react-native';
import {OVButton} from '../../components/OVButton';
import OVText, {
  large,
  medium,
  poppinsBold,
  poppinsRegular,
  poppinsSemiBold,
} from '../../components/OVText';
import {CLOSE_DIALOG} from '../../images';
import {AuthContext} from '../../services/authProvider';
import {parseDate} from '../../utils/BaseUtils';
import {
  APP_THEME_COLOR,
  BLACK,
  GRAY_400,
  RED,
  TEXT_COLOR_LIGHT,
  WHITE,
} from '../../utils/Colors';
import PetTypeDialog from '../insurance/PetTypeDialog';

export default function ConfirmAppointmentDialog(props) {
  const {
    dialogVisible,
    setDialogVisible,
    date,
    selectedData,
    time,
    isDoorstep,
    item = null,
    petList,
    bookingType,
    price,
  } = props;

  const {user, token, petProfileData, setPetProfileData} =
    useContext(AuthContext);
  const [petTypeDialog, setPetTypeDialog] = useState(false);

  const getBookingType = () => {
    switch (bookingType) {
      case 1:
        return 'Vet Consultation';

      case 2:
        return 'Video Consultation';

      case 3:
        return 'Vaccine Consultation';
    }
  };

  return (
    <Modal
      visible={dialogVisible}
      transparent={true}
      animationType={'fade'}
      onRequestClose={() => {
        dialogVisible;
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'rgba(52, 52, 52, 0.6)',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '80%',
            alignItems: 'center',
            borderRadius: 20,
            elevation: 4,
            flexDirection: 'column',
            padding: 10,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', margin: 10}}
            activeOpacity={1}
            onPress={() => setDialogVisible(false)}>
            <Image source={CLOSE_DIALOG} />
          </TouchableOpacity>
          <OVText
            size={large}
            fontType={poppinsSemiBold}
            color={APP_THEME_COLOR}>
            Appointment
          </OVText>

          <View
            style={{
              width: '90%',
              height: 0.4,
              alignSelf: 'center',
              backgroundColor: GRAY_400,
              marginTop: 10,
              marginLeft: 6,
            }}
          />

          <OVText
            size={medium}
            fontType={poppinsRegular}
            color={TEXT_COLOR_LIGHT}
            style={{marginTop: 10}}>
            Book Appointment For:{' \n'}
          </OVText>
          <OVText
            size={medium}
            fontType={poppinsSemiBold}
            color={BLACK}
            style={{marginTop: -10}}>
            {petProfileData?.petName}
          </OVText>
          <View style={{flexDirection: 'row-reverse'}}>
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={RED}
              style={{marginTop: 10, textAlign: 'right'}}
              onPress={() => setPetTypeDialog(true)}>
              Change Pet
            </OVText>
          </View>

          <View
            style={{
              width: '90%',
              height: 0.4,
              alignSelf: 'center',
              backgroundColor: GRAY_400,
              marginTop: 10,
              marginLeft: 6,
            }}
          />

          <OVText
            size={medium}
            fontType={poppinsRegular}
            color={TEXT_COLOR_LIGHT}
            style={{marginTop: 20}}>
            Type of service:{'\n'}
          </OVText>
          <OVText
            size={medium}
            fontType={poppinsSemiBold}
            color={BLACK}
            style={{marginTop: -10}}>
            {getBookingType()}
            {bookingType === 1 ||
              (bookingType === 3 && (
                <OVText
                  size={medium}
                  fontType={poppinsSemiBold}
                  color={BLACK}
                  style={{marginTop: 0}}>
                  {'/'} {!isDoorstep ? 'Doorstep' : 'Clinic'}
                </OVText>
              ))}
          </OVText>

          <View
            style={{
              width: '90%',
              height: 0.4,
              alignSelf: 'center',
              backgroundColor: GRAY_400,
              marginTop: 10,
              marginLeft: 6,
            }}
          />

          {item && (
            <View>
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={TEXT_COLOR_LIGHT}
                style={{marginTop: 10}}>
                Service Location:{' '}
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsSemiBold}
                color={BLACK}
                style={{marginTop: 10}}>
                {item.address}
              </OVText>
            </View>
          )}

          <View
            style={{
              width: '90%',
              height: 0.4,
              alignSelf: 'center',
              backgroundColor: GRAY_400,
              marginTop: 10,
              marginLeft: 6,
            }}
          />

          <OVText
            size={medium}
            fontType={poppinsRegular}
            color={TEXT_COLOR_LIGHT}
            style={{marginTop: 10}}>
            Amount:{' '}
          </OVText>
          <OVText
            size={medium}
            fontType={poppinsSemiBold}
            color={BLACK}
            style={{marginTop: 10}}>
            {'Rs. '} {price}
          </OVText>

          <View
            style={{
              width: '90%',
              height: 0.4,
              alignSelf: 'center',
              backgroundColor: GRAY_400,
              marginTop: 10,
              marginLeft: 6,
            }}
          />

          <OVText
            size={medium}
            fontType={poppinsRegular}
            color={BLACK}
            style={{padding: 10, marginTop: 10}}>
            On {parseDate(date)}
          </OVText>

          <OVText size={large} fontType={poppinsBold} color={BLACK}>
            {time}
          </OVText>

          <OVButton
            title="CONFIRM"
            color={APP_THEME_COLOR}
            textColor={WHITE}
            marginTop={20}
            marginBottom={20}
            onPress={() => setDialogVisible(true)}
            width={100}
          />
        </View>
        <PetTypeDialog
          data={petList}
          dialogVisible={petTypeDialog}
          setDialogVisible={() => setPetTypeDialog(false)}
          onSelectedItem={item => {
            setPetProfileData(item);
            setPetTypeDialog(false);
          }}
          type={3}
          title="Pet Name"
        />
      </View>
    </Modal>
  );
}
