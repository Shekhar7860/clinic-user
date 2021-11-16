/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
import { Header } from '../../common/Header';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import { OVButton } from '../../components/OVButton';
import OVText, {
    extraSmall,
    poppinsMedium,
    poppinsRegular,
    small,
} from '../../components/OVText';
import { BOTTOM_ARROW } from '../../images';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import {
    getCurrentMonth,
    getWeekDayFromDate,
    parseMonth,
    parseDateHiphenFormat,
} from '../../utils/BaseUtils';
import {
    APP_THEME_COLOR,
    BG_COLOR,
    BLACK,
    TEXT_COLOR_BLUE,
    WHITE,
    YELLOW,
} from '../../utils/Colors';
import ConfirmAppointmentDialog from './ConfirmAppointmentDialog';
import EmptyView from '../../common/EmptyView';

const windowWidth = Dimensions.get('window').width;
const DAY_ARRAY = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const WEB = 'WEB';
const UPI = 'UPI';
const BASE_RESPONSE_TEXT = 'Response or error will show here.';

const BookAppointments = props => {
    const {
        id,
        price,
        bookingType,
        appointmentId,
        isDoorstep = false,
        vaccineId = null,
        item = null,
    } = props.route.params;

    const navigation = useNavigation();
    const [responseText, setResponseText] = useState('');
    const [confirmAppointmentDialog, setConfirmAppointmentDialog] =
        useState(false);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const { user, token, petProfileData } = useContext(AuthContext);
    const [refresh, setRefresh] = useState(false);
    const [shiftType, setShiftType] = useState(0);
    const [shiftList, setShiftList] = useState([]);
    const [petList, setPetList] = useState([]);
    const [doctorSlotData, setDoctorSlotData] = useState([]);
    const [categoryData, setCategoryData] = useState([
        {
            name: 'Morning',
            time: '09:00 AM to 12:00 PM',
            isSelect: true,
            id: 1,
        },
        {
            name: 'Afternoon',
            time: '12:00 PM to 04:00 PM',
            isSelect: false,
            id: 2,
        },
        {
            name: 'Evening',
            time: '04:00 PM to 06:00 PM',
            isSelect: false,
            id: 3,
        },
        {
            name: 'Night',
            time: '06:00 PM to 09:00 PM',
            isSelect: false,
            id: 4,
        },
    ]);

    useEffect(() => {
        getPetProfile();

        console.log("props.route.params", props.route.params);
        // console.log("petProfileData", petProfileData);
    }, []);

    const getPetProfile = () => {
        Network('user/get-my-pet', 'get', null, token)
            .then(async res => {
                if (res.status === true) {
                    // console.log(' /n/n Result ', JSON.stringify(res));
                    const data = res.data;
                    setPetList(data);
                }
            })
            .catch(error => {
                setLoading(false);
            });
    };

    const startProcess = mode => {
        // console.log(price, typeof price);
        setResponseText(BASE_RESPONSE_TEXT);
        var orderId;

        //Test Credential
        const apiKey = '498028906233c8b8e88d02c7720894'; // put your apiKey here
        const apiSecret = 'd7952caf6de1a5689be1e69a8e95025f8d54b2fc'; // put your apiSecret here

        //Prod Credential
        // const apiKey = '951085472ef036a3b7b0c7f0780159'; // put your apiKey here
        // const apiSecret = 'e35071852c294c739e914b578871bc663128e167'; // put your apiSecret here

        const env = 'TEST'; // use "TEST" or "PROD"
        var tokenUrl = 'https://api.cashfree.com/api/v2/cftoken/order';
        if (env === 'TEST') {
            tokenUrl = 'https://test.cashfree.com/api/v2/cftoken/order'; //for TEST
        }

        orderId = 'Order' + parseInt(100000000 * Math.random());
        let orderApiMap = {
            orderId: orderId,
            orderAmount: `${price}`,
            orderCurrency: 'INR',
        };

        const postParams = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': apiKey,
                'x-client-secret': apiSecret,
            },
            body: JSON.stringify(orderApiMap),
        };
        // console.log("postParams", postParams);
        var cfToken;
        fetch(tokenUrl, postParams)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log('data', JSON.stringify(data));
                try {
                    cfToken = data.cftoken;
                    console.log('Token is : ' + data.cftoken);
                    startPayment(cfToken);
                } catch (error) {
                    setResponseText(data);
                }
            });

        function startPayment(cfToken) {
            var map = {
                orderId: orderId,
                orderAmount: `${price}`,
                appId: apiKey,
                tokenData: cfToken,
                orderCurrency: 'INR',
                orderNote: 'Test Note',
                notifyUrl: 'https://test.gocashfree.com/notify',
                customerName: user.first_name,
                verifyExpiry: '100',
                customerPhone: '9999999999',
                customerEmail: user.email,
            };

            // console.log("startPayment map", map);

            if (mode === UPI) {
                RNPgReactNativeSDK.startPaymentUPI(map, env, responseHandler);
            } else {
                RNPgReactNativeSDK.startPaymentWEB(map, env, responseHandler);
            }
        }

        var responseHandler = result => {
            setResponseText(typeof result);
            console.log('responseHandler', JSON.parse(result));

            if (JSON.parse(result).txStatus == 'SUCCESS') {
                BookAppointmentAction(JSON.parse(result));
            } else {
                showToastMessage('Payment cancelled');
            }
        };
    };

    useEffect(() => {
        getTimeSlot(date);
    }, []);

    const getTimeSlot = date => {
        setLoading(true);
        const payload = { doctor_id: id, day: getWeekDayFromDate(date), date: parseDateHiphenFormat(date) };
        Network('user/get-doctor-time-slot', 'post', payload, token)
            .then(async res => {
                console.log(' /n/n Result ', res.data);
                setLoading(false);
                const slotsArray = res.data;
                setDoctorSlotData(slotsArray);
                var data = [];
                for (let i = 0; i < slotsArray.length; i++) {
                    if (slotsArray[i].slot === 1) {
                        const payload = {
                            slotId: slotsArray[i].id,
                            time: slotsArray[i].from_time,
                            endTime: slotsArray[i].to_time,
                            isExpire: slotsArray[i].is_expire,
                            isSelect: false,
                        };
                        data.push(payload);
                    }
                }
                setShiftList(data);
            })
            .catch(error => {
                setLoading(false);
                showToastMessage(error);
            });
    };

    const checkTimeAvailability = () => {
        setLoading(true);
        let data = new FormData();
        data.append('doctor_id', id);
        data.append('slot', getTimeSlotValue());
        data.append('date', parseDateHiphenFormat(date));

        Network('user/check-appointment-slot', 'post', data, token)
            .then(async res => {
                console.log(' /n/n Result ', JSON.stringify(res.data));
                if (res.status === true) {
                    setLoading(false);
                    startProcess(WEB);
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

    const BookAppointmentAction = paymentKey => {
        setLoading(true);
        const payload = {
            booking_type_id: id,
            appointment_category: bookingType,
            slot: getTimeSlotValue(),
            date: parseDateHiphenFormat(date),
            time: getTimeValue(),
            payment_id: paymentKey,
            pet_id: petProfileData?.id,
            is_doorstep: isDoorstep,
            vaccine_id: vaccineId,
        };
        let data = new FormData();
        data.append('booking_type_id', id);
        data.append('appointment_category', bookingType);
        data.append('slot', getTimeSlotValue());
        data.append('date', parseDateHiphenFormat(date));
        data.append('time', getTimeValue());
        data.append('payment_id', JSON.stringify(paymentKey));
        data.append('pet_id', petProfileData?.id);
        data.append('is_doorstep', isDoorstep);

        if (vaccineId) {
            data.append('vaccine_id', vaccineId);
        }

        Network('user/book-appointment', 'post', payload, token)
            .then(async res => {
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));
                    showToastMessage('Appointment successfully created');
                    setLoading(false);
                    navigation.navigate("BookingStatus", { booking_id: res.data.id });
                    // navigation.reset({
                    //     index: 0,
                    //     routes: [{ name: 'Home' }],
                    // });
                } else {
                    showToastMessage(res.message);
                    setLoading(false);
                }
            })
            .catch(error => {
                setLoading(false);
                showToastMessage('Something went wrong');
            });
    };

    const reshduleAppointmentAction = paymentKey => {
        setLoading(true);
        let data = new FormData();
        data.append('appointment_id', appointmentId);
        data.append('slot', getShiftValue().id);
        data.append('date', parseDateHiphenFormat(date));
        data.append('time', getTimeValue());

        Network('user/reschedule-appointment', 'post', data, token)
            .then(async res => {
                console.log(' \n\n Result ', JSON.stringify(res));
                if (res.status === true) {
                    showToastMessage(res.message);
                    setLoading(false);
                    // upadateAppointment();
                    navigation.goBack();
                } else {
                    showToastMessage(res.message);
                    setLoading(false);
                }
            })
            .catch(error => {
                setLoading(false);
            });
    };

    const getShiftValue = () => {
        for (let i = 0; i < categoryData.length; i++) {
            if (categoryData[i].isSelect === true) {
                return categoryData[i];
            }
        }
    };

    const getTimeSlotValue = () => {
        console.log(JSON.stringify(shiftList));
        if (shiftList.length > 0) {
            for (let i = 0; i < shiftList.length; i++) {
                if (shiftList[i].isSelect === true) {
                    return shiftList[i].slotId;
                }
            }
        }
    };

    const getTimeValue = () => {
        if (shiftList.length > 0) {
            for (let i = 0; i < shiftList.length; i++) {
                if (shiftList[i].isSelect === true) {
                    return shiftList[i].time + ' ' + shiftList[i].endTime;
                }
            }
        }
    };

    const isSlotSelected = () => {
        if (shiftList.length > 0) {
            for (let i = 0; i < shiftList.length; i++) {
                if (shiftList[i].isSelect === true) {
                    return true;
                }
            }
        }

        return false;
    };

    const getShiftTypeArray = value => {
        var data = [];
        setShiftList([]);
        for (let i = 0; i < doctorSlotData.length; i++) {
            if (doctorSlotData[i].slot === value) {

                const payload = {
                    slotId: doctorSlotData[i].id,
                    time: doctorSlotData[i].from_time,
                    endTime: doctorSlotData[i].to_time,
                    isExpire: doctorSlotData[i].is_expire,
                    isSelect: false,
                };

                // const payload = { 
                //     time: doctorSlotData[i].from_time, 
                //     isSelect: false 
                // };

                data.push(payload);
            }
        }
        setShiftList(data);
    };

    const resetAllValues = () => {
        for (let i = 0; i < categoryData.length; i++) {
            categoryData[i].isSelect = false;
        }
        setCategoryData(categoryData);
    };

    const resetAllShiftValues = () => {
        if (shiftList.length > 0) {
            for (let i = 0; i < shiftList.length; i++) {
                shiftList[i].isSelect = false;
            }
            setShiftList(shiftList);
        }
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1 }}
            onPress={() => {
                getShiftTypeArray(index + 1);
                setShiftType(index + 1);
                resetAllValues();
                item.isSelect = true;
                setRefresh(!refresh);
            }}>
            <View
                style={{
                    flex: 1,
                    margin: 6,
                    borderRadius: 30,
                    flexDirection: 'column',
                    backgroundColor: item.isSelect ? APP_THEME_COLOR : WHITE,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    marginTop: 10,
                    marginHorizontal: 5,
                    elevation: 1,
                }}>
                <OVText
                    size={small}
                    fontType={poppinsMedium}
                    color={item.isSelect ? WHITE : BLACK}>
                    {item.name}
                </OVText>

                <OVText
                    size={extraSmall}
                    fontType={poppinsRegular}
                    color={item.isSelect ? WHITE : BLACK}>
                    {item.time}
                </OVText>
            </View>
        </TouchableOpacity>
    );

    const renderTimeItem = ({ item }) => (

        <View>
            {item?.isExpire == 0 ?
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ flex: 1 }}
                    onPress={() => {
                        resetAllShiftValues();
                        item.isSelect = true;
                        setRefresh(!refresh);
                    }}>
                    <View
                        style={{
                            flex: 1,
                            margin: 6,
                            borderRadius: 30,
                            flexDirection: 'column',
                            backgroundColor: item.isSelect ? APP_THEME_COLOR : WHITE,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10,
                            marginTop: 10,
                            marginHorizontal: 5,
                            elevation: 1,
                        }}>
                        <OVText
                            size={small}
                            fontType={poppinsMedium}
                            color={item.isSelect ? WHITE : BLACK}>
                            {item.time} - {item.endTime}
                        </OVText>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ flex: 1 }}
                    onPress={() => {
                        showToastMessage("Timeslot expired.");
                    }}>
                    <View
                        style={{
                            flex: 1,
                            margin: 6,
                            borderRadius: 30,
                            flexDirection: 'column',
                            backgroundColor: WHITE,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10,
                            marginTop: 10,
                            marginHorizontal: 5,
                            elevation: 1,
                            opacity: .8,

                        }}>
                        <OVText
                            style={{
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid'
                            }}
                            size={small}
                            fontType={poppinsMedium}
                            color={item.isSelect ? WHITE : BLACK}>
                            {item.time} - {item.endTime}
                        </OVText>
                    </View>
                </TouchableOpacity>
            }

        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title={appointmentId ? 'Reschdule Appointment' : 'Book an Appointment'}
            />
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
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
                                style={{ textAlign: 'center' }}>
                                {getCurrentMonth()}
                            </OVText>
                            <Image
                                source={BOTTOM_ARROW}
                                style={{ marginStart: 10, tintColor: BLACK }}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            marginHorizontal: 10,
                            marginTop: 10,
                            backgroundColor: WHITE,
                            borderRadius: 10,
                            elevation: 4,
                        }}>
                        <CalendarPicker
                            width={windowWidth}
                            onDateChange={date => {
                                setDate(date);
                                getTimeSlot(date);
                            }}
                            previousTitle="Previous"
                            nextTitle="Next"
                            onMonthChange={month => console.log(month)}
                            weekdays={DAY_ARRAY}
                            selectedDayColor={TEXT_COLOR_BLUE}
                            selectedDayTextColor={WHITE}
                            minDate={new Date()}
                        />
                    </View>

                    <View
                        style={{
                            marginHorizontal: 10,
                            marginTop: 10,
                            backgroundColor: YELLOW,
                            borderRadius: 10,
                            elevation: 4,
                            padding: 10,
                        }}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                            <OVText
                                size={small}
                                fontType={poppinsRegular}
                                color={WHITE}
                                style={{ textAlign: 'left', flex: 1 }}>
                                {parseMonth(date)}
                            </OVText>
                            <OVText
                                size={small}
                                fontType={poppinsRegular}
                                color={WHITE}
                                style={{ flex: 1, textAlign: 'right' }}>
                                {getShiftValue().time}
                            </OVText>
                        </View>
                        <FlatList
                            data={categoryData}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            extraData={refresh}
                        />
                    </View>
                    <View
                        style={{
                            marginHorizontal: 10,
                            marginTop: 10,
                            backgroundColor: YELLOW,
                            borderRadius: 10,
                            elevation: 4,
                            padding: 10,
                        }}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                            <OVText
                                size={small}
                                fontType={poppinsRegular}
                                color={WHITE}
                                style={{ textAlign: 'left', flex: 1 }}>
                                {parseMonth(date)}
                            </OVText>
                            <OVText
                                size={small}
                                fontType={poppinsRegular}
                                color={WHITE}
                                style={{ flex: 1, textAlign: 'center' }}>
                                {shiftList.length > 0 ? getTimeValue() : ''}
                            </OVText>
                            {shiftList.length > 0 && (
                                <OVText
                                    size={small}
                                    fontType={poppinsRegular}
                                    color={WHITE}
                                    style={{ flex: 1, textAlign: 'right' }}>
                                    {/* {shiftList[shiftType].time !== undefined
                    ? ''
                    : shiftList[shiftType].time} */}
                                </OVText>
                            )}
                        </View>
                        <FlatList
                            data={shiftList}
                            renderItem={renderTimeItem}
                            keyExtractor={item => item.slotId}
                            numColumns={2}
                            extraData={refresh}
                            ListEmptyComponent={<EmptyView title="No Slot available" />}
                        />
                    </View>
                    <OVButton
                        title="BOOK CONSULTATION"
                        color={APP_THEME_COLOR}
                        textColor={WHITE}
                        marginTop={20}
                        marginBottom={20}
                        onPress={() => {
                            console.log(isSlotSelected());
                            if (isSlotSelected() === true) {
                                setConfirmAppointmentDialog(true);
                            } else {
                                showToastMessage('Please select slot');
                            }
                        }}
                        width={windowWidth - 20}
                    />
                </View>
            </ScrollView>
            <ConfirmAppointmentDialog
                dialogVisible={confirmAppointmentDialog}
                setDialogVisible={status => {
                    if (appointmentId === 0) {
                        if (status === true) {
                            checkTimeAvailability();
                        }
                    } else {
                        reshduleAppointmentAction();
                    }
                    setConfirmAppointmentDialog(false);
                }}
                date={date}
                time={getTimeValue()}
                isDoorstep={isDoorstep}
                item={item}
                petList={petList}
                bookingType={bookingType}
                price={price}
            />
            {loading && <LoaderIndicator loading={loading} />}
        </SafeAreaView>
    );
};

export default BookAppointments;
