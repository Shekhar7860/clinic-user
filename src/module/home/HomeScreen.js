/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, PermissionsAndroid, Platform } from 'react-native';
import { Header } from '../../common/Header';
import { BACKGROUND_COLOR, WHITE } from '../../utils/Colors';
import MyAppointments from '../appointments/MyAppointments';
import MyPetShop from '../petShop/MyPetShop';
import ComingSoon from '../../common/ComingSoon';
import MyDashboard from '../dashboard/MyDashboard';
import BottomNavigation from './BottomNavigation';
import MyAccount from '../account/MyAccount';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../services/authProvider';
import GetLocation from 'react-native-get-location';
import NotificationDialog from '../dialog/NotificationDialog';
import messaging from '@react-native-firebase/messaging';

const HomeScreen = props => {

    const navigation = useNavigation();
    const [selectedValue, setSelectedValue] = useState(1);
    const [isHomePage, setIsHomePage] = useState(true);
    const [toolbarText, setToolbarText] = useState('Home');
    const { setLatitude, setLongitude, petProfileData } = useContext(AuthContext);

    const [isNotificationRecieved, setIsNotificationRecieved] = useState(false);
    const [notificationData, setNotificationData] = useState({});
    const [sliderData, setSliderData] = useState([
    ]);

    const { token } = useContext(AuthContext);

    useEffect(() => {
        getAllBanners();
    }, [])

    useEffect(() => {

        // console.log("petProfileData", petProfileData);
        // Register foreground handler
        messaging().onMessage(async remoteMessage => {
            console.log('Recieved Foreground- .>>>> ', JSON.stringify(remoteMessage));

            if (typeof remoteMessage.data != "undefined") {
                if (typeof remoteMessage.data.room_name != "undefined") {
                    setNotificationData(remoteMessage.data);
                    setIsNotificationRecieved(!isNotificationRecieved);
                }
            }
        });

        // Register background handler
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Recieved - Background .>>>> ', JSON.stringify(remoteMessage));
            if (typeof remoteMessage.data != "undefined") {
                if (typeof remoteMessage.data.room_name != "undefined") {
                    setNotificationData(remoteMessage.data);
                    setIsNotificationRecieved(!isNotificationRecieved);
                }
            }
        });

        messaging().onNotificationOpenedApp(async remoteMessage => {
            console.log('Recieved onNotificationOpenedApp- .>>>> ', JSON.stringify(remoteMessage));
            if (typeof remoteMessage.data != "undefined") {
                if (typeof remoteMessage.data.room_name != "undefined") {
                    setNotificationData(remoteMessage.data);
                    setIsNotificationRecieved(!isNotificationRecieved);
                }
            }
        });


    }, []);

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                getOneTimeLocation();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        getOneTimeLocation();
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        requestLocationPermission();
    }, []);

    const getOneTimeLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log(location);
                setLatitude(location.latitude);
                setLongitude(location.longitude);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            });
    };

    const updateSelectedValue = index => {
        switch (index) {
            case 1:
                setToolbarText('Home');
                setIsHomePage(true);
                break;
            case 2:
                setToolbarText('Appointments');
                setIsHomePage(false);
                break;
            case 3:
                setToolbarText('Pet Store');
                setIsHomePage(false);
                break;
            case 4:
                setToolbarText('Account');
                setIsHomePage(false);
                break;
        }
        setSelectedValue(index);
    };

    const getAllBanners = () => {

        Network('user/get-banners-list', 'get', null, token)
            .then(async res => {

                console.log('getting banners>>>>>>>>>>>>>>>>', res)
                if (res.status === true) {
                    if (res && res.data && res.data.homepage && res.data.homepage.length > 0) {

                        res.data.homepage.forEach(element => {
                            console.log(element.b_image, 'element in foreach>>>>>>>>>>>')
                            setSliderData([{
                                bannerImage: element.b_image
                            }])
                        });

                        console.log(sliderData, 'sliderData in loop');

                    }
                } else {
                }
            })
            .catch(error => {
            });
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'column', flex: 1 }}>
                {selectedValue !== 3 && (
                    <Header
                        isHome={isHomePage}
                        navigation={props.navigation}
                        onBackPressed={() => updateSelectedValue(1)}
                        title={toolbarText}
                        onSidemenuClick={() => navigation.navigate('PetProfile', { petData: petProfileData })}
                    />
                )}
                <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
                    {selectedValue === 1 && (
                        <MyDashboard
                            navigation={props.navigation}
                            updateSelectedValue={index => updateSelectedValue(index)}
                            setSelectedValue={index => {
                                setIsHomePage(false);
                                updateSelectedValue(index);
                                setSelectedValue(index);
                            }}
                            sliderData={sliderData}
                        />
                    )}
                    {selectedValue === 2 && (
                        <MyAppointments
                            navigation={props.navigation}
                            updateSelectedValue={index => updateSelectedValue(index)}
                        />
                    )}
                    {selectedValue === 3 && (
                        // <MyPetShop
                        //     navigation={props.navigation}
                        //     updateSelectedValue={index => updateSelectedValue(index)}
                        // />
                        <ComingSoon
                            navigation={props.navigation}
                            title={toolbarText}
                            updateSelectedValue={index => updateSelectedValue(index)}
                        />
                    )}
                    {selectedValue === 4 && (
                        <MyAccount
                            navigation={props.navigation}
                            updateSelectedValue={index => updateSelectedValue(index)}
                        />
                    )}
                </View>
                <View
                    style={{
                        flex: 0.1,
                        maxHeight: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <BottomNavigation
                        navigation={props.navigation}
                        updateSelectedValue={index => updateSelectedValue(index)}
                        selectedValue={selectedValue}
                    />
                </View>
            </View>
            <NotificationDialog
                dialogVisible={isNotificationRecieved}
                setDialogVisible={() => setIsNotificationRecieved(false)}
                data={notificationData}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
