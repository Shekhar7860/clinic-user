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
import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../../common/Header';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import OVText, {
    medium,
    poppinsMedium,
    poppinsRegular,
    small,
    poppinsBold,
    poppinsSemiBold
} from '../../components/OVText';
import FlatListSlider from '../../flatListSlider/FlatListSlider';
import ImageSliderView from '../../flatListSlider/ImageSliderView';
import {
    APP_ICON,
    BOTTOM_ARROW,
    CLINIC_LOCATION,
    SEARCH_BLACK,
    VACCINATION_BANNER,
    VACCINATION_PRICE,
    VACCINATION_TYPE,
} from '../../images';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import { DOCTOR_IMAGE_URL } from '../../utils/AppConstant';
import {
    BG_COLOR,
    BLACK,
    GREEN_COLOR,
    TEXT_COLOR_LIGHT,
    WHITE,
    YELLOW,
    APP_THEME_COLOR,
    ORANGE
} from '../../utils/Colors';
import { getDistance } from 'geolib';
import CommonDialog from '../dialog/CommonDialog';

const windowWidth = Dimensions.get('window').width;

const Vaccination = props => {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { user, token, latitude, longitude } = useContext(AuthContext);
    const [categoryData, setCategoryData] = useState([]);

    const [sortByDialog, setSortByDialog] = useState(false);
    const [sortByData, setSortByData] = useState([{ id: 1, name: 'Price' }, { id: 2, name: 'Distance' }]);
    const [sortByValue, setSortByValue] = useState({
        id: 0,
        name: 'Sort By',
    });

    const [filterTypeDialog, setFilterTypeDialog] = useState(false);
    const [filterTypeData, setAppointmentTypeData] = useState([{ id: 1, name: 'Doorstep' }, { id: 2, name: 'Clinic' }]);
    const [filterTypeValue, setFilterTypeValue] = useState({
        id: 0,
        name: 'Filter By',
    });

    const [sliderData, setSliderData] = useState([
    ]);
    // const [sliderData, setSliderData] = useState([
    //     { bannerImage: VACCINATION_BANNER },
    //     { bannerImage: VACCINATION_BANNER },
    //     { bannerImage: VACCINATION_BANNER },
    //     { bannerImage: VACCINATION_BANNER },
    //     { bannerImage: VACCINATION_BANNER },
    //     { bannerImage: VACCINATION_BANNER },
    // ]);

    useEffect(() => {
        getAllBanners();
        getClinicList();
    }, []);

    const getDoctorDistance = (docLat, docLng) => {
        if (docLat && docLng && latitude && longitude) {
            var dis = getDistance(
                { latitude: latitude, longitude: longitude },
                { latitude: docLat, longitude: docLng },
            );
            return dis / 1000;
        } else {
            return '0';
        }
    };

    const getClinicList = () => {

        setLoading(true);
        Network('user/get-all-clinic?sortby=' + sortByValue.id + '&filterby=' + filterTypeValue.id, 'get', null, token)
            .then(async res => {
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));
                    setCategoryData(res.data);
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

    const getAllBanners = () => {

        Network('user/get-banners-list', 'get', null, token)
            .then(async res => {

                console.log('getting banners in videos>>>>>>>>>>>>>>>>', res)
                if (res.status === true) {
                    if (res && res.data && res.data.vaccination && res.data.vaccination.length > 0) {

                        res.data.vaccination.forEach(element => {
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


    const setFilterTypeValue2 = (item) => {
        setFilterTypeValue(item);
        getClinicList();
    }

    const setSortByValue2 = (item) => {
        setSortByValue(item);
        getClinicList();
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('VaccinationDetail', { itemData: item })}
            style={{ marginHorizontal: 10 }}>
            <View
                style={{
                    margin: 6,
                    borderRadius: 10,
                    flexDirection: 'column',
                    backgroundColor: WHITE,
                    justifyContent: 'center',
                    padding: 10,
                    marginTop: 10,

                    elevation: 3,
                }}>
                <View
                    style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
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
                    <View style={{ flexDirection: 'column', marginStart: 20, flex: 1 }}>
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

                        {item.services.length > 0 && (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1,
                                    marginTop: 5,
                                }}>
                                <Image source={VACCINATION_PRICE} />
                                <OVText
                                    size={small}
                                    fontType={poppinsRegular}
                                    color={BLACK}
                                    style={{ marginStart: 10 }}>
                                    {item && item.services[3] && item.services[3].price ? item.services[3].price : '0'} /
                                    Vaccine
                                </OVText>
                            </View>
                        )}

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                flex: 1,
                                marginTop: 5,
                            }}>
                            <Image source={VACCINATION_TYPE} />
                            <OVText
                                size={small}
                                fontType={poppinsRegular}
                                color={BLACK}
                                style={{ marginStart: 10 }}>
                                {item && item?.services[3] && item.services[3]?.is_doorstep ? 'Doorstep / ' : ''}
                                Clinic
                            </OVText>
                        </View>
                        <View
                            style={{
                                position: 'absolute',
                                end: 0,
                                marginTop: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={GREEN_COLOR}
                                style={{ marginEnd: 10 }}>
                                {/* {getDoctorDistance(item.latitude, item.longitude)} Km */}
                                {item?.distance || 0.00} KM
                            </OVText>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                flex: 1,
                                marginTop: 5,
                            }}>
                            {/* {(item.image != '' && item.image != null) ? ( */}
                            <Image source={{ uri: item.image }} />
                            {/* ) : */}
                            <Image source={CLINIC_LOCATION} />
                            {/* } */}

                            <OVText
                                size={small}
                                fontType={poppinsRegular}
                                color={BLACK}
                                style={{ marginStart: 10, flex: 1, flexWrap: 'wrap' }}>
                                {item?.landmark}
                            </OVText>
                        </View>
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
                title="Clinics for Vaccination"
            />
            <View
                style={{
                    margin: 10,
                    padding: 10,
                    backgroundColor: WHITE,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 10,
                    elevation: 1,
                }}>
                <Image source={SEARCH_BLACK} style={{ tintColor: BLACK }} />
                <OVText
                    size={small}
                    fontType={poppinsMedium}
                    color={TEXT_COLOR_LIGHT}
                    style={{ textAlign: 'center', marginStart: 10 }}>
                    Search for Price Range, Location
                </OVText>
            </View>
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        backgroundColor: WHITE,
                    }}>

                    <View
                        style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10, alignContent: 'space-around' }}>
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'flex-start',
                                marginEnd: 10,
                                marginVertical: 10,
                            }}>
                            <View
                                style={{
                                    width: '70%',
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

                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        alignContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    activeOpacity={1}
                                    onPress={() => setSortByDialog(true)}>
                                    <OVText
                                        size={small}
                                        fontType={poppinsMedium}
                                        color={BLACK}
                                        style={{ textAlign: 'center' }}>
                                        {sortByValue.name}
                                    </OVText>

                                    <Image
                                        source={BOTTOM_ARROW}
                                        style={{ marginStart: 10, tintColor: BLACK }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View
                            style={{
                                flex: 1,
                                alignItems: 'flex-end',
                                marginEnd: 10,
                                marginVertical: 10,
                            }}>
                            <View
                                style={{
                                    width: '70%',
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

                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        alignContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    activeOpacity={1}
                                    onPress={() => setFilterTypeDialog(true)}>
                                    <OVText
                                        size={small}
                                        fontType={poppinsMedium}
                                        color={BLACK}
                                        style={{ textAlign: 'center' }}>
                                        {filterTypeValue.name}
                                    </OVText>
                                    <Image
                                        source={BOTTOM_ARROW}
                                        style={{ marginStart: 10, tintColor: BLACK }}
                                    />

                                </TouchableOpacity>
                            </View>
                        </View>
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
                            />
                            : null
                    }

                    <FlatList
                        data={categoryData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={{ marginTop: 10 }}
                    />
                </View>

                <CommonDialog
                    data={sortByData}
                    dialogVisible={sortByDialog}
                    setDialogVisible={() => setSortByDialog(false)}
                    onSelectedItem={item => {
                        setSortByValue2(item);
                        setSortByDialog(false);

                    }}
                    title="Select Sort By"
                />

                <CommonDialog
                    data={filterTypeData}
                    dialogVisible={filterTypeDialog}
                    setDialogVisible={() => setFilterTypeDialog(false)}
                    onSelectedItem={item => {
                        setFilterTypeValue2(item);
                        setFilterTypeDialog(false);

                    }}
                    title="Select Filter By"
                />

            </ScrollView>
            {loading && <LoaderIndicator loading={loading} />}
        </SafeAreaView>
    );
};

export default Vaccination;
