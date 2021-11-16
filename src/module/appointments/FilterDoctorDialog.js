/* eslint-disable react-native/no-inline-styles */
import CheckBox from '@react-native-community/checkbox';
import React, {useCallback, useState} from 'react';
import {Image, Modal, TouchableOpacity, View} from 'react-native';
import {OVButton} from '../../components/OVButton';
import OVText, {
  large,
  medium,
  poppinsRegular,
  poppinsSemiBold,
} from '../../components/OVText';
import {OVTextInput} from '../../components/OVTextInput';
import {CLOSE_DIALOG, BOTTOM_ARROW} from '../../images';
import {
  APP_THEME_COLOR,
  BLACK,
  GRAY_400,
  TEXT_COLOR_LIGHT,
  WHITE,
} from '../../utils/Colors';
import RangeSlider from 'rn-range-slider';
import Thumb from '../../components/Thumb';
import Rail from '../../components/Rail';
import RailSelected from '../../components/RailSelected';
import Notch from '../../components/Notch';
import Label from '../../components/Label';
import FilterTypeDialog from './FilterTypeDialog';

export default function FilterDoctorDialog(props) {
  const {
    dialogVisible,
    setDialogVisible,
    nearby,
    setNearBy,
    experiance,
    setExperiance,
    category,
    setCategory,
    speciality,
    setSpeciality,
    experianceData,
    specialityData,
    languageData,
  } = props;

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(30);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(30);
  const [filterDialog, setFilterDialog] = useState(false);
  const [filterType, setFilterType] = useState(false);
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  const getVisibleData = type => {
    switch (type) {
      case 1:
        return experianceData;
      case 2:
        return specialityData;
      case 3:
        return languageData;
    }
  };

  const getVisibleTitle = type => {
    switch (type) {
      case 1:
        return 'Select Experience';
      case 2:
        return 'Select Speciality';
      case 3:
        return 'Select Language';
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
            borderRadius: 20,
            elevation: 4,
            flexDirection: 'column',
            padding: 10,
          }}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', margin: 10}}
            activeOpacity={1}
            onPress={() => setDialogVisible(false)}>
            <Image source={CLOSE_DIALOG} />
          </TouchableOpacity>
          <View style={{marginHorizontal: 20}}>
            <OVText
              size={large}
              fontType={poppinsSemiBold}
              color={APP_THEME_COLOR}
              style={{textAlign: 'center'}}>
              Filter By
            </OVText>
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={TEXT_COLOR_LIGHT}
              style={{marginTop: 10}}>
              Experience (In Years)
            </OVText>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setFilterType(1);
                setFilterDialog(true);
              }}>
              <OVTextInput
                editable={false}
                keyboardType="number"
                style={{marginHorizontal: 10, flex: 1}}
                value={experiance.name}
                onChange={value => setExperiance(value)}
                rightIcon={BOTTOM_ARROW}
              />
            </TouchableOpacity>
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={TEXT_COLOR_LIGHT}
              style={{marginTop: 10}}>
              Speciality
            </OVText>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setFilterType(2);
                setFilterDialog(true);
              }}>
              <OVTextInput
                editable={false}
                style={{marginHorizontal: 10}}
                value={speciality.name}
                onChange={value => setSpeciality(value)}
                rightIcon={BOTTOM_ARROW}
              />
            </TouchableOpacity>
            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={TEXT_COLOR_LIGHT}
              style={{marginTop: 10}}>
              Language
            </OVText>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setFilterType(3);
                setFilterDialog(true);
              }}>
              <OVTextInput
                editable={false}
                style={{marginHorizontal: 10}}
                value={category.name}
                onChange={value => setCategory(value)}
                rightIcon={BOTTOM_ARROW}
              />
            </TouchableOpacity>

            <OVText
              size={medium}
              fontType={poppinsRegular}
              color={TEXT_COLOR_LIGHT}
              style={{marginTop: 10, textAlign: 'left', marginLeft: 10}}>
              Distance
            </OVText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={TEXT_COLOR_LIGHT}
                style={{textAlign: 'left', marginLeft: 10}}>
                {low} Km
              </OVText>
              <OVText
                size={medium}
                fontType={poppinsRegular}
                color={TEXT_COLOR_LIGHT}
                style={{textAlign: 'left', marginLeft: 10}}>
                {high} Km
              </OVText>
            </View>
            <RangeSlider
              min={min}
              max={max}
              step={1}
              disableRange={false}
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={false}
              renderNotch={renderNotch}
              onValueChanged={handleValueChange}
              style={{marginTop: 10}}
            />
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
      </View>
      <FilterTypeDialog
        dialogVisible={filterDialog}
        setDialogVisible={() => setFilterDialog(false)}
        title={getVisibleTitle(filterType)}
        data={getVisibleData(filterType)}
        onSelectedItem={item => {
          switch (filterType) {
            case 1:
              setExperiance(item);
              break;
            case 2:
              setSpeciality(item);
              break;
            case 3:
              setCategory(item);
              break;
          }
          setFilterDialog(false);
        }}
        height="20%"
      />
    </Modal>
  );
}
