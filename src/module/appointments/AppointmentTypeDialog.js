/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, Modal, TouchableOpacity, View} from 'react-native';
import {OVButton} from '../../components/OVButton';
import OVText, {
  large,
  medium,
  poppinsLight,
  poppinsSemiBold,
} from '../../components/OVText';
import {CLOSE_DIALOG} from '../../images';
import {
  APP_THEME_COLOR,
  BLACK,
  GREEN_COLOR,
  WHITE,
  YELLOW,
} from '../../utils/Colors';

export default function AppointmentTypeDialog(props) {
  const {dialogVisible, setDialogVisible} = props;
  const [isDoorstep, setIsDoorStep] = useState(true);

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
            borderRadius: 20,
            elevation: 4,
            flexDirection: 'column',
            padding: 10,
          }}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', margin: 10}}
            activeOpacity={1}
            onPress={() => setDialogVisible(false, isDoorstep)}>
            <Image source={CLOSE_DIALOG} />
          </TouchableOpacity>
          <View style={{marginHorizontal: 20}}>
            <OVText
              size={large}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{textAlign: 'center'}}>
              Appointment Type
            </OVText>

            <View style={{flexDirection: 'row', marginVertical: 20}}>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={isDoorstep ? WHITE : BLACK}
                style={{
                  textAlign: 'center',
                  marginStart: 10,
                  backgroundColor: isDoorstep ? YELLOW : WHITE,
                  borderRadius: 4,
                  flex: 1,
                  padding: 10,
                  elevation: 3,
                }}
                onPress={() => setIsDoorStep(true)}>
                DOORSTEP
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsLight}
                color={isDoorstep ? BLACK : WHITE}
                style={{
                  textAlign: 'center',
                  marginStart: 10,
                  backgroundColor: isDoorstep ? WHITE : YELLOW,
                  borderRadius: 4,
                  flex: 1,
                  padding: 10,
                  borderColor: isDoorstep ? GREEN_COLOR : WHITE,
                  elevation: 3,
                }}
                onPress={() => setIsDoorStep(false)}>
                CLINIC
              </OVText>
            </View>
          </View>

          <OVButton
            title="CONFIRM"
            color={APP_THEME_COLOR}
            textColor={WHITE}
            marginBottom={20}
            onPress={() => setDialogVisible(true, isDoorstep)}
            width={100}
          />
        </View>
      </View>
    </Modal>
  );
}
