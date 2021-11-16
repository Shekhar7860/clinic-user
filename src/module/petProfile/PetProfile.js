/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { Header } from '../../common/Header';
import OVText, {
    extraSmall,
    poppinsMedium,
    poppinsRegular,
    small,
    large
} from '../../components/OVText';
import {
    PET_AGE,
    PET_GENDER,
    PET_IMAGE_SMALL,
    PET_NAME,
    PET_TYPE,
    PET_WEIGHT,
    MEDICAL_RECORDS,
    VACCINATION,
    DEWORMING,
    PET_REPORTS,
    PET_SYRUP,
    PET_TABLET,
    FORWORD_ARROW,
} from '../../images';
import {
    APP_THEME_COLOR,
    BG_COLOR,
    BLACK,
    GRAY_300,
    GRAY_400,
    TEXT_COLOR_LIGHT,
    WHITE,
    YELLOW,
    ORANGE
} from '../../utils/Colors';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import EmptyView from '../../common/EmptyView';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import {getItem, setItem, removeItem} from '../../services/storageService';

const windowWidth = Dimensions.get('window').width;

const categoryData = [
    {
        id: 1,
        image: PET_REPORTS,
        name: 'Chest X-Ray Report',
        date: '24/01/2021',
    },
    {
        id: 2,
        image: PET_REPORTS,
        name: 'Chest X-Ray 1',
        date: '24/01/2021',
    },
    {
        id: 3,
        image: PET_SYRUP,
        name: 'Syrup',
        date: '24/01/2021',
    }
];

const PetProfile = props => {

    const petData = props.route.params.petData;
    const tabIndex = props.route.params?.tabIndex || 1;
    const navigation = useNavigation();
    const { user, token, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectedItemType, setSelectedItemType] = useState(tabIndex);
    const [petMedicalHistoryList, setPetMedicalHistoryList] = useState([]);
    const [petProfile, setPetProfile] = useState({});
    // console.log("user", user);
    // console.log("props.route.params", props.route.params?.tabIndex);
    // console.log("petData", petData);

    useEffect(() => {

        const unsubscribe = navigation.addListener("focus", () => {
            // alert(selectedItemType);
            getUserPetProfile();
            getPetMedicalHistory(selectedItemType);
        });
        return unsubscribe;
    }, []);

    const getUserPetProfile = () => {
        setLoading(true);
        const payload = { pet_id: petData?.id };

        Network('user/get-pet-details', 'post', payload, token)
            .then(async res => {
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));
                    setPetProfile(res.data);
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

    const getPetMedicalHistory = (type) => {
        setLoading(true);
        Network('user/get-pet-report?type=' + type + '&pet_id=' + petData?.id, 'get', null, token)
            .then(async res => {
                if (res.status === true) {
                    console.log(' /n/n Result ', JSON.stringify(res));
                    setPetMedicalHistoryList(res.data);
                } else {
                    showToastMessage(res.message);
                }
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    };

    const getPetMedicalHistorySwitcher = (type = 1) => {
        setSelectedItemType(type);
        getPetMedicalHistory(type);
    };

    const routePetHistoryForm = (type = 1) => {

        if (type == 1) {
            navigation.navigate('PetMedicalForm', { pet_id: petData?.id, tabIndex:tabIndex });
        }
        else if (type == 2) {
            navigation.navigate('PetVaccinationForm', { pet_id: petData?.id, tabIndex:tabIndex });
        }
        else if (type == 3) {
            navigation.navigate('PetDewormingForm', { pet_id: petData?.id, tabIndex:tabIndex });
        }

    };

    const routePetHistoryFormEdit = (item, type = 1) => {
        
        if (type == 1) {
            navigation.navigate('PetMedicalFormEdit', { testDetail: item, tabIndex:tabIndex });
        }
        else if (type == 2) {
            navigation.navigate('PetVaccinationFormEdit', { testDetail: item, tabIndex:tabIndex });
        }
        else if (type == 3) {
            navigation.navigate('PetDewormingFormEdit', { testDetail: item, tabIndex:tabIndex });
        }

    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => routePetHistoryFormEdit(item, selectedItemType)}>
            <View
                style={{
                    flexDirection: 'column',
                    padding: 10,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                    }}>

                    {/* <Image source={item.image} /> */}

                    <OVText
                        size={small}
                        fontType={poppinsRegular}
                        color={WHITE}
                        style={{
                            textAlign: 'left',
                            marginStart: 10,
                            flex: 1,
                        }}>
                        {item.title} {(item?.doses != null && item?.doses != '') ? '('+item.doses+')':''}
                    </OVText>
                    <OVText
                        size={small}
                        fontType={poppinsRegular}
                        color={WHITE}
                        style={{
                            textAlign: 'right',
                            marginStart: 10,
                        }}>
                        {item.date}
                    </OVText>
                    <Image
                        source={FORWORD_ARROW}
                        style={{ tintColor: WHITE, marginStart: 10 }}
                    />
                </View>
                <View style={{ height: 1, backgroundColor: WHITE, marginTop: 10 }} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Pet Profile"
                onSidemenuClick={() => console.log('done')}

            />
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        backgroundColor: BG_COLOR,
                    }}>
                    <View
                        style={{
                            backgroundColor: WHITE,
                            borderRadius: 10,
                            elevation: 3,
                            padding: 10,
                            margin: 10,
                            flexDirection: 'column',
                        }}>
                        <OVText
                            size={extraSmall}
                            fontType={poppinsMedium}
                            color={TEXT_COLOR_LIGHT}
                            style={{ textAlign: 'right' }}>
                            {/* Last Visit: 24/01/2021 */}
                        </OVText>

                        { typeof petProfile.pet_img_path != 'undefined' && petProfile.pet_img_path != '' && petProfile.pet_img_path != null ?
                            <Image source={{uri:petProfile.pet_img_path}} style={{ alignSelf: 'center', width: 40, height: 40, borderRadius:50 }} />
                            :
                            <Image source={PET_IMAGE_SMALL} style={{ alignSelf: 'center',width: 40, height: 40, borderRadius:50 }} />
                        }

                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 6,
                                justifyContent: 'center',
                            }}>
                            <Image source={PET_NAME} />
                            <OVText
                                size={small}
                                fontType={poppinsRegular}
                                color={BLACK}
                                style={{ textAlign: 'right', marginStart: 10, marginEnd: 20 }}>
                                {petProfile.petName}
                            </OVText>
                            <Image source={PET_TYPE} />
                            <OVText
                                size={small}
                                fontType={poppinsRegular}
                                color={BLACK}
                                style={{ textAlign: 'right', marginStart: 10 }}>
                                {petProfile.breed_name}
                            </OVText>
                        </View>
                        <View
                            style={{ height: 1, backgroundColor: GRAY_400, marginVertical: 10 }}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                padding: 6,
                            }}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                <Image source={PET_GENDER} />
                                <OVText
                                    size={small}
                                    fontType={poppinsRegular}
                                    color={BLACK}
                                    style={{ marginStart: 10 }}>
                                    {petProfile.sex}
                                </OVText>
                            </View>
                            <View
                                style={{
                                    width: 1,
                                    backgroundColor: GRAY_400,
                                    marginHorizontal: 10,
                                }}
                            />
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                <Image source={PET_AGE} />
                                <OVText
                                    size={small}
                                    fontType={poppinsRegular}
                                    color={BLACK}
                                    style={{ marginStart: 10 }}>
                                    {petProfile.age} Year(s)
                                </OVText>
                            </View>
                            <View
                                style={{
                                    width: 1,
                                    backgroundColor: GRAY_400,
                                    marginHorizontal: 10,
                                }}
                            />
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                <Image source={PET_WEIGHT} />
                                <OVText
                                    size={small}
                                    fontType={poppinsRegular}
                                    color={BLACK}
                                    style={{ marginStart: 10 }}>
                                    {petProfile.current_weight} Kg(s)
                                </OVText>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            backgroundColor: GRAY_300,
                            padding: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => getPetMedicalHistorySwitcher(1)}
                            style={{
                                flex: 1,
                                borderRadius: 10,
                                backgroundColor:
                                    selectedItemType === 1 ? APP_THEME_COLOR : WHITE,
                                padding: 10,
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    source={MEDICAL_RECORDS}
                                    style={{
                                        tintColor: selectedItemType === 1 ? WHITE : APP_THEME_COLOR,
                                    }}
                                />
                                <OVText
                                    size={small}
                                    fontType={poppinsRegular}
                                    color={selectedItemType === 1 ? WHITE : BLACK}
                                    style={{ marginTop: 10, flex: 1 }}>
                                    Medical
                                </OVText>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => getPetMedicalHistorySwitcher(2)}
                            style={{
                                flex: 1,
                                borderRadius: 10,
                                backgroundColor:
                                    selectedItemType === 2 ? APP_THEME_COLOR : WHITE,
                                padding: 10,
                                marginHorizontal: 10,
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    source={VACCINATION}
                                    style={{
                                        tintColor: selectedItemType === 2 ? WHITE : APP_THEME_COLOR,
                                    }}
                                />
                                <OVText
                                    size={small}
                                    fontType={poppinsRegular}
                                    color={selectedItemType === 2 ? WHITE : BLACK}
                                    style={{ marginTop: 10 }}>
                                    Vaccination
                                </OVText>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => getPetMedicalHistorySwitcher(3)}
                            style={{
                                flex: 1,
                                borderRadius: 10,
                                backgroundColor:
                                    selectedItemType === 3 ? APP_THEME_COLOR : WHITE,
                                padding: 10,
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    source={DEWORMING}
                                    style={{
                                        tintColor: selectedItemType === 3 ? WHITE : APP_THEME_COLOR,
                                    }}
                                />
                                <OVText
                                    size={small}
                                    fontType={poppinsRegular}
                                    color={selectedItemType === 3 ? WHITE : BLACK}
                                    style={{ marginTop: 10 }}>
                                    Deworming
                                </OVText>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            marginTop: 20,
                            backgroundColor: YELLOW,
                            borderTopEndRadius: 30,
                            borderTopStartRadius: 30,
                            padding: 10,
                            flex: 1,
                        }}>
                        <FlatList
                            data={petMedicalHistoryList}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            style={{ marginTop: 10 }}
                            ListEmptyComponent={<EmptyView title="No data available" />}
                        />
                    </View>

                </View>
            </ScrollView>



            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => routePetHistoryForm(selectedItemType)}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    backgroundColor: APP_THEME_COLOR,
                    padding: 5,
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    alignItems: 'center',
                    alignContent: 'center',
                }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignContent: 'center',
                    }}>
                    <OVText
                        size={large}
                        fontType={poppinsRegular}
                        color={WHITE}
                        style={{}}>
                        +
                    </OVText>
                </View>
            </TouchableOpacity>
            {loading && <LoaderIndicator loading={loading} />}
        </SafeAreaView>
    );
};

export default PetProfile;
