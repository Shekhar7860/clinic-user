/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { getDistance } from 'geolib';
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
import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../../common/Header';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import OVText, {
    medium,
    poppinsMedium,
    poppinsRegular,
    poppinsSemiBold,
    small,
} from '../../components/OVText';
import FlatListSlider from '../../flatListSlider/FlatListSlider';
import ImageSliderView from '../../flatListSlider/ImageSliderView';
import {
    APP_ICON,
    BOTTOM_ARROW,
    CONSULTATION_BANNER,
    DOCTOR_FEE,
    DOCTOR_LOCATION,
    DOCTOR_TYPE,
    SPECIALIZATION,
    EXPERIENCE
} from '../../images';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import { DOCTOR_IMAGE_URL } from '../../utils/AppConstant';
import {
    APP_THEME_COLOR,
    BG_COLOR,
    BLACK,
    GREEN,
    RED,
    WHITE,
    YELLOW,
} from '../../utils/Colors';
import AppointmentTypeDialog from './AppointmentTypeDialog';
import FilterDoctorDialog from './FilterDoctorDialog';
import EmptyView from '../../common/EmptyView';

const windowWidth = Dimensions.get('window').width;

const VideoConsultation = props => {
    const { bookingType } = props.route.params;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { token, latitude, longitude } = useContext(AuthContext);
    const [filterDialog, setFilterDialog] = useState(false);
    const [nearby, setNearBy] = useState(false);
    const [experiance, setExperiance] = useState('');
    const [category, setCategory] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [specialityData, setSpecialityData] = useState('');
    const [languageData, setLanguageData] = useState('');
    const [experianceData, setExperianceData] = useState('');
    const [appointmentTypeDialog, setAppointmentTypeDialog] = useState(false);
    const [isDoorstep, setIsDoorStep] = useState(false);
    const [doctorId, setDoctorId] = useState(false);
    const [amount, setAmount] = useState(false);
    const [amountDoorstep, setAmountDoorstep] = useState(false);
    const [doctorItemData, setDoctorItemData] = useState({});
    const [sliderData, setSliderData] = useState([
    ]);
    // const [sliderData] = useState([
    //     { bannerImage: CONSULTATION_BANNER },
    //     { bannerImage: CONSULTATION_BANNER },
    //     { bannerImage: CONSULTATION_BANNER },
    //     { bannerImage: CONSULTATION_BANNER },
    //     { bannerImage: CONSULTATION_BANNER },
    //     { bannerImage: CONSULTATION_BANNER },
    // ]);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        getAllBanners();
        getDoctorList();
        getExperianceList();
    }, []);

    const getSpecialityList = () => {
        Network('user/get-specilities-list', 'get', null, token)
            .then(async res => {
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));
                    setSpecialityData(res.data);
                    getLanguageList();
                }
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const getLanguageList = () => {
        Network('user/get-languages-list', 'get', null, token)
            .then(async res => {
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));
                    setLanguageData(res.data);
                }
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const getExperianceList = () => {
        Network('user/get-exprience-list', 'get', null, token)
            .then(async res => {
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));
                    setExperianceData(res.data);
                }
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const getDoctorList = () => {
        setLoading(true);
        let url = 'user/get-all-doctor';
        if (bookingType === 2) {
            url = `${url}?is_video_consultation=1`;
        }

        Network(url, 'get', null, token)
            .then(async res => {
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));
                    setCategoryData(res.data);
                    setLoading(false);
                } else {
                    showToastMessage(res.message);
                    setLoading(false);
                }
                getSpecialityList();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const filterDoctorList = () => {
        setLoading(true);
        const payload = {
            experience: experiance.id,
            language: category.id,
            speciality: speciality.id,
            distance1: 0,
            distance2: 100,
        };
        let data = new FormData();
        if (experiance) {
            data.append('experience', experiance.id);
        }
        if (category) {
            data.append('language', category.id);
        }
        if (speciality) {
            data.append('speciality', speciality.id);
        }
        data.append('distance1', 0);
        data.append('distance2', 1000);

        Network('user/filter-doctor', 'post', data, token)
            .then(async res => {
                console.log(' \n\n Result ', JSON.stringify(res));
                setLoading(false);
                if (res.status === true) {
                    setCategoryData(res.data);
                    setLoading(false);
                } else {
                    setCategoryData([]);
                    showToastMessage(res.message);
                    setLoading(false);
                }
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const pageTitle = type => {
        switch (type) {
            case 1:
                return 'Vet Appointment';
            case 2:
                return 'Video Appointment';
        }
    };

    const getAllBanners = () => {

        Network('user/get-banners-list', 'get', null, token)
            .then(async res => {

                console.log('getting banners in videos>>>>>>>>>>>>>>>>', res)
                if (res.status === true) {
                    if (res && res.data && res.data.video_consultation && res.data.video_consultation.length > 0) {

                        res.data.video_consultation.forEach(element => {
                            console.log(element.b_image, 'element in foreach videos>>>>>>>>>>>')
                            setSliderData([{
                                bannerImage: element.b_image
                            }])
                        });

                        console.log(sliderData, 'sliderData in loop videos');

                    }
                } else {
                }
            })
            .catch(error => {
            });
    };

    const getDoctorDistance = (docLat, docLng) => {
        if (docLat && docLng && latitude && longitude) {
            var dis = getDistance(
                { latitude: latitude, longitude: longitude },
                { latitude: docLat, longitude: docLng },
            );
            return dis / 1000;
        } else {
            // console.log(docLat, docLng, latitude, longitude);
            return '0';
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                setDoctorItemData(item);
                if (item.services.length > 0) {
                    setDoctorId(item.id);
                    setAmount(item?.services[1]?.price);
                    setAmountDoorstep(item?.services[2]?.price);
                    setDoctorItemData(item);
                    if (bookingType === 1) {
                        if (
                            item.services[1]?.is_doorstep == 1 &&
                            item.services[2]?.is_doorstep == 1
                        ) {
                            // setAppointmentTypeDialog(true);
                            navigation.navigate('DoctorProfile', {
                                appointmentId: 0,
                                doctorId: item.id,
                                price: item.item?.services[1]?.price,
                                bookingType: bookingType,
                                isDoorstep: isDoorstep,
                                isEnableDoorstep: item?.services[1]?.is_doorstep,
                                item: item,
                            });
                        } else {
                            navigation.navigate('DoctorProfile', {
                                appointmentId: 0,
                                doctorId: item.id,
                                price: item.item?.services[1]?.price,
                                bookingType: bookingType,
                                isDoorstep: isDoorstep,
                                isEnableDoorstep: item?.services[1]?.is_doorstep,
                                item: item,
                            });
                        }
                    } else {
                        navigation.navigate('DoctorProfile', {
                            appointmentId: 0,
                            doctorId: item.id,
                            price: item.item?.services[1]?.price,
                            bookingType: bookingType,
                            isDoorstep: isDoorstep,
                            isEnableDoorstep: item?.services[1]?.is_doorstep,
                            item: item,
                        });
                    }
                }
            }}>
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
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            {bookingType === 2 && (
                                <View
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 10,
                                        marginBottom: 5,
                                        backgroundColor: item.is_online === 1 ? GREEN : RED,
                                    }}

                                />
                            )}
                            {bookingType === 2 && (
                                <OVText size={medium} fontType={poppinsMedium} color={BLACK}
                                    style={{ marginBottom: 20, }}
                                >
                                    {item.is_online === 1 ? 'Online' : 'Offline'}
                                </OVText>
                            )}

                            {item.image !== null ? (
                                <Image
                                    source={{ uri: `${DOCTOR_IMAGE_URL}${item.image}` }}
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
                        </View>
                        <View style={{ flexDirection: 'column', marginStart: 20, flex: 1 }}>
                            {item.clinic_name && (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flex: 1,
                                        marginTop: 5,
                                    }}>
                                    <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                                        {item.clinic_name}
                                    </OVText>
                                </View>
                            )}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    flex: 1,
                                }}>
                                <OVText size={medium} fontType={poppinsMedium} color={BLACK}>
                                    {item.name}
                                </OVText>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1,
                                    marginTop: 5,
                                }}>
                                <Image source={SPECIALIZATION} />
                                <OVText
                                    size={small}
                                    fontType={poppinsRegular}
                                    color={BLACK}
                                    style={{ marginStart: 10 }}>
                                    {item.speciality}
                                </OVText>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1,
                                    marginTop: 5,
                                }}>
                                <Image source={EXPERIENCE} />
                                <OVText
                                    size={small}
                                    fontType={poppinsRegular}
                                    color={BLACK}
                                    style={{ marginStart: 10 }}>
                                    {item.exprience === 'undefined' ? '0' : item.exprience} Year(s)
                                </OVText>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1,
                                    marginTop: 5,
                                }}>
                                <Image source={DOCTOR_LOCATION} />
                                <OVText
                                    size={small}
                                    fontType={poppinsRegular}
                                    color={BLACK}
                                    style={{ marginStart: 10, flex: .8, flexWrap: 'wrap' }}>
                                    {item?.landmark}
                                </OVText>
                            </View>

                            {bookingType === 1 && (
                                <View>
                                    {item.services && item.services.length > 0 && (
                                        <View>
                                            {typeof item.services[1] != 'undefined' && typeof item.services[1].service_value != 'undefined' && item.services[1].service_value === 1 && (
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        flex: 1,
                                                        marginTop: 5,
                                                    }}>
                                                    <Image source={DOCTOR_FEE} />
                                                    <OVText
                                                        size={small}
                                                        fontType={poppinsRegular}
                                                        color={BLACK}
                                                        style={{ marginStart: 10 }}>
                                                        {'\u20B9'}{' '}
                                                        {item.services.length > 0
                                                            ? item.services[1].price
                                                            : '0'}
                                                        /Session (Clinic)
                                                    </OVText>
                                                </View>
                                            )}

                                            {typeof item.services[2] != 'undefined' && typeof item.services[2].service_value != 'undefined' && item.services[2]?.service_value === 1 && (
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        flex: 1,
                                                        marginTop: 5,
                                                    }}>
                                                    <Image source={DOCTOR_FEE} />
                                                    <OVText
                                                        size={small}
                                                        fontType={poppinsRegular}
                                                        color={BLACK}
                                                        style={{ marginStart: 10 }}>
                                                        {'\u20B9'}{' '}
                                                        {item.services.length > 0
                                                            ? item.services[2]?.price
                                                            : '0'}
                                                        /Session (Doorstep)
                                                    </OVText>
                                                </View>
                                            )}
                                        </View>
                                    )}
                                </View>
                            )}
                            {bookingType === 2 && (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flex: 1,
                                        marginTop: 5,
                                    }}>
                                    <Image source={DOCTOR_FEE} />
                                    <OVText
                                        size={small}
                                        fontType={poppinsRegular}
                                        color={BLACK}
                                        style={{ marginStart: 10 }}>
                                        {'\u20B9'} {item.services ? item.services[0]?.price : '0'}
                                        /Session
                                    </OVText>
                                </View>
                            )}

                            {item.services && item.services.length > 0 && bookingType === 1 && (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flex: 1,
                                        marginTop: 5,
                                    }}>
                                    <Image source={DOCTOR_FEE} />
                                    <OVText
                                        size={small}
                                        fontType={poppinsRegular}
                                        color={BLACK}
                                        style={{ marginStart: 10 }}>
                                        Clinic - {item?.services[1]?.is_doorstep === 1 ? 'Yes ' : 'No'}
                                        / Doorstep -
                                        {item?.services[2]?.is_doorstep === 1 ? 'Yes' : 'No'}
                                    </OVText>
                                </View>
                            )}
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            marginStart: 20,
                            position: 'absolute',
                            end: 0,
                            flex: 1,
                            marginBottom: 20,
                        }}>
                        <OVText
                            size={small}
                            fontType={poppinsRegular}
                            color={WHITE}
                            style={{
                                textAlign: 'center',
                                backgroundColor: APP_THEME_COLOR,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 4,
                            }}
                            onPress={() => {
                                if (item.services.length > 0) {
                                    setDoctorId(item.id);
                                    setAmount(item?.services[1]?.price);
                                    setAmountDoorstep(item?.services[2]?.price);
                                    setDoctorItemData(item);
                                    if (bookingType === 1) {
                                        if (
                                            item.services[1]?.is_doorstep == 1 &&
                                            item.services[2]?.is_doorstep == 1
                                        ) {
                                            setAppointmentTypeDialog(true);
                                        } else {
                                            navigation.navigate('BookAppointments', {
                                                appointmentId: 0,
                                                id: item.id,
                                                price: item?.services[1]?.price,
                                                bookingType: bookingType,
                                                isDoorstep: isDoorstep,
                                                item: item,
                                            });
                                        }
                                    } else {
                                        navigation.navigate('BookAppointments', {
                                            appointmentId: 0,
                                            id: item.id,
                                            price: item?.services[0]?.price,
                                            bookingType: bookingType,
                                            isDoorstep: isDoorstep,
                                            item: item,
                                        });
                                    }
                                }
                            }}>
                            {/* { console.log("item?.services", item?.services[1]?.price) } */}
                            Book Now
                        </OVText>

                        <OVText
                            size={small}
                            fontType={poppinsRegular}
                            color={WHITE}
                            style={{
                                textAlign: 'center',
                                backgroundColor: APP_THEME_COLOR,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 4,
                                marginTop: 10,
                            }}
                            onPress={() => {
                                if (item.services.length > 0) {
                                    setDoctorId(item.id);
                                    setAmount(item?.services[1]?.price);
                                    setAmountDoorstep(item?.services[2]?.price);
                                    setDoctorItemData(item);
                                    if (bookingType === 1) {
                                        if (
                                            item.services[1]?.is_doorstep == 1 &&
                                            item.services[2]?.is_doorstep == 1
                                        ) {
                                            setAppointmentTypeDialog(true);
                                        } else {
                                            navigation.navigate('BookAppointments', {
                                                appointmentId: 0,
                                                id: item.id,
                                                price: item?.services[1]?.price,
                                                bookingType: bookingType,
                                                isDoorstep: isDoorstep,
                                                item: item,
                                            });
                                        }
                                    } else {
                                        navigation.navigate('BookAppointments', {
                                            appointmentId: 0,
                                            id: item.id,
                                            price: item?.services[0]?.price,
                                            bookingType: bookingType,
                                            isDoorstep: isDoorstep,
                                            item: item,
                                        });
                                    }
                                }
                            }}>
                            Book Later
                        </OVText>
                        {bookingType === 1 && (
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={GREEN}
                                style={{ textAlign: 'center', marginTop: 10 }}>
                                {/* { getDoctorDistance(item.latitude, item.longitude)} Km */}
                                {item?.distance || 0.00} KM
                            </OVText>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title={pageTitle(bookingType)}
            />
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                    <View
                        style={{
                            alignItems: 'flex-end',
                            marginEnd: 10,
                            marginVertical: 10,
                        }}>
                        <TouchableOpacity activeOpacity={.9} onPress={() => setFilterDialog(true)}>
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
                                    Filter By
                                </OVText>
                                <Image
                                    source={BOTTOM_ARROW}
                                    style={{ marginStart: 10, tintColor: BLACK }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        sliderData && sliderData.length > 0 ?
                            <FlatListSlider
                                data={sliderData}
                                width={windowWidth}
                                timer={5000}
                                component={<ImageSliderView />}
                                indicatorActiveWidth={10}
                                contentContainerStyle={{
                                    justifyContent: 'center',
                                }}
                                indicatorContainerStyle={{ position: 'absolute', bottom: -10 }}
                                indicatorActiveColor={YELLOW}
                                indicatorInActiveColor="gray"
                                animation
                            /> : null
                    }

                    <FlatList
                        data={categoryData}
                        renderItem={renderItem}
                        style={{ marginTop: 10 }}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={<EmptyView title="No data found." />}

                    />
                </View>
            </ScrollView>
            <FilterDoctorDialog
                dialogVisible={filterDialog}
                setDialogVisible={status => {
                    if (status) {
                        filterDoctorList();
                    }
                    setFilterDialog(false);
                }}
                setNearBy={value => setNearBy(value)}
                nearby={nearby}
                experiance={experiance}
                setExperiance={value => setExperiance(value)}
                category={category}
                setCategory={value => setCategory(value)}
                speciality={speciality}
                setSpeciality={value => setSpeciality(value)}
                experianceData={experianceData}
                specialityData={specialityData}
                languageData={languageData}
            />
            <AppointmentTypeDialog
                dialogVisible={appointmentTypeDialog}
                setDialogVisible={(status, doorstep) => {
                    setAppointmentTypeDialog(false);
                    if (status) {
                        navigation.navigate('BookAppointments', {
                            appointmentId: 0,
                            id: doctorId,
                            price: doorstep ? amountDoorstep : amount,
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

export default VideoConsultation;
