/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext, useEffect } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import { Header } from '../../common/Header';
import { OVButton } from '../../components/OVButton';
import OVText, {
    medium,
    poppinsLight,
    poppinsMedium,
    poppinsRegular,
    small,
} from '../../components/OVText';
import { SEARCH_BLACK, VACCINATION_ADD } from '../../images';
import {
    APP_THEME_COLOR,
    BLACK,
    ORANGE,
    TEXT_COLOR_LIGHT,
    WHITE,
    YELLOW,
} from '../../utils/Colors';

import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import { LoaderIndicator } from '../../common/LoaderIndicator';

const windowWidth = Dimensions.get('window').width;

const VaccinationDetail = props => {

    const { itemData } = props.route.params;
    console.log("itemData", itemData);

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { token } = useContext(AuthContext);
    const [categoryData, setCategoryData] = useState([]);
    const [refreshList, setRefreshList] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [vaccineCharge, setVaccineCharge] = useState();
    const [totalCharge, setTotalCharge] = useState();
    const [isClinic, setIsClinic] = useState(true);

    useEffect(() => {
        getClinicList();
        setVaccineCharge(parseInt(itemData?.services[3]?.price));
    }, []);

    const getClinicList = () => {
        setLoading(true);
        const payload = {
            clinic_id: itemData?.id,
        };
        Network('user/get-user-clinic-vaccines', 'post', payload, token)
            .then(async res => {
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));

                    var result = res.data;
                    result.map(function (el) {
                        console.log('Element', JSON.stringify(el));
                        var o = Object.assign({}, el);
                        o.isActive = false;
                        return o;
                    });
                    setCategoryData(result);
                    setLoading(false);
                } else {
                    showToastMessage(res.message);
                    setLoading(false);
                }
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const setPrice = (status, price) => {
        console.log(status, price);
        if (status) {
            setTotalPrice(price + totalPrice);
        } else {
            setTotalPrice(totalPrice - price);
        }
    };

    const totalVaccineCharge = () => {

        if(!isClinic)
        {
            var price = parseInt(totalPrice, 10) + parseInt(vaccineCharge, 10);
        }
        else
        {
            var price = parseInt(totalPrice, 10);
        }
        // setTotalCharge(price);
        return price;
    };

    /**
     * Parse the array and return course name is selected or not
     */
    const checkValidVaccineId = () => {
        console.log(JSON.stringify(categoryData));
        for (let i = 0; i < categoryData.length; i++) {
            if (categoryData[i].isActive == true) {
                return true;
            }
        }
        return false;
    };

    const getVaccineIds = () => {
        var id = '';
        for (let i = 0; i < categoryData.length; i++) {
            if (categoryData[i].isActive == true) {
                id = id + ', ' + categoryData[i].id;
            }
        }
        return id.substring(1);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                item.isActive = !item.isActive;
                setRefreshList(!refreshList);
                setPrice(item.isActive, item.price);
            }}
            style={{ marginHorizontal: 10 }}>
            <View
                style={{
                    margin: 6,
                    borderRadius: 10,
                    flexDirection: 'row',
                    backgroundColor: item.isActive ? APP_THEME_COLOR : WHITE,
                    justifyContent: 'center',
                    padding: 10,
                    marginTop: 10,
                    elevation: 3,
                    alignItems: 'center',
                }}>
                <OVText
                    size={small}
                    fontType={poppinsRegular}
                    color={item.isActive ? WHITE : BLACK}
                    style={{ flex: 1, marginEnd: 10 }}>
                    {item.name}
                </OVText>
                <OVText
                    size={small}
                    fontType={poppinsRegular}
                    color={item.isActive ? WHITE : BLACK}
                    style={{ marginEnd: 10 }}>
                    {item.price}
                </OVText>
                <Image
                    source={VACCINATION_ADD}
                    style={{ tintColor: item.isActive ? WHITE : ORANGE }}
                />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Vaccination Detail"
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
            <ScrollView contentContainerStyle={{ backgroundColor: WHITE }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        backgroundColor: WHITE,
                    }}>
                    <OVText
                        size={medium}
                        fontType={poppinsMedium}
                        color={BLACK}
                        style={{ textAlign: 'center', marginTop: 20, marginHorizontal: 20 }}>
                        Please Select from the below list of vaccinations available
                    </OVText>
                    <FlatList
                        data={categoryData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={{ marginTop: 10 }}
                        extraData={refreshList}
                    />
                    <View
                        style={{
                            backgroundColor: WHITE,
                            padding: 10,
                            borderRadius: 20,
                            marginTop: 20,
                            elevation: 3,
                            marginHorizontal: 20,
                            flexDirection: 'column',
                        }}>
                        <OVText
                            size={medium}
                            fontType={poppinsMedium}
                            color={BLACK}
                            style={{
                                textAlign: 'center',
                                marginTop: 20,
                                marginHorizontal: 20,
                            }}>
                            Select the location for vaccination
                        </OVText>

                        <View
                            style={{
                                backgroundColor: YELLOW,
                                height: 2,
                                marginHorizontal: 30,
                                marginTop: 10,
                            }}
                        />

                        <View
                            style={{
                                marginVertical: 20,
                                flexDirection: 'row',
                                marginHorizontal: 30,
                            }}>
                            <OVText
                                size={medium}
                                fontType={poppinsLight}
                                color={!isClinic ? WHITE : BLACK}
                                style={{
                                    textAlign: 'center',
                                    marginEnd: 10,
                                    backgroundColor: !isClinic ? YELLOW : WHITE,
                                    borderRadius: 4,
                                    flex: 1,
                                    padding: 10,
                                    elevation: 3,
                                }}
                                onPress={() => setIsClinic(false)}>
                                DOORSTEP
                            </OVText>
                            <OVText
                                size={medium}
                                fontType={poppinsLight}
                                color={isClinic ? WHITE : BLACK}
                                style={{
                                    textAlign: 'center',
                                    marginStart: 10,
                                    backgroundColor: isClinic ? YELLOW : WHITE,
                                    borderRadius: 4,
                                    flex: 1,
                                    padding: 10,
                                    elevation: 3,
                                }}
                                onPress={() => setIsClinic(true)}>
                                CLINIC
                            </OVText>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <OVText
                            size={medium}
                            fontType={poppinsMedium}
                            color={BLACK}
                            style={{
                                textAlign: 'center',
                                marginTop: 20,
                                marginStart: 10,
                                backgroundColor: YELLOW,
                                borderRadius: 4,
                                padding: 10,
                                color: WHITE,
                                elevation: 3,
                                marginEnd: 30,
                            }}>
                            
                            { (totalPrice - vaccineCharge) > 0 ? 'Vaccine + ' : '' } Service Charge : Rs. {totalVaccineCharge()}
                        </OVText>
                    </View>
                    {categoryData.length > 0 && (
                        <OVButton
                            title="Schedule Now"
                            color={APP_THEME_COLOR}
                            textColor={WHITE}
                            marginTop={20}
                            marginBottom={20}
                            onPress={() => {
                                if (checkValidVaccineId()) {
                                    navigation.navigate('BookAppointments', {
                                        appointmentId: 0,
                                        id: itemData?.id,
                                        price: totalVaccineCharge(),
                                        bookingType: 3,
                                        isDoorstep: isClinic,
                                        vaccineId: getVaccineIds(),
                                        item: itemData,
                                    });
                                } else {
                                    showToastMessage('Please select atlease one vaccine ');
                                }
                            }}
                            width={windowWidth - 20}
                        />
                    )}
                </View>
            </ScrollView>
            {loading && <LoaderIndicator loading={loading} />}
        </SafeAreaView>
    );
};

export default VaccinationDetail;
