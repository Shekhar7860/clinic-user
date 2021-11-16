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
    Linking
} from 'react-native';
import OVText, {
    extraSmall,
    medium,
    poppinsMedium,
    small,
} from '../../components/OVText';
import FlatListSlider from '../../flatListSlider/FlatListSlider';
import ImageSliderView from '../../flatListSlider/ImageSliderView';
import {
    BANNER_1,
    BOTTOM_ARROW,
    SEARCH,
    SURFACE_1,
    SURFACE_10,
    SURFACE_2,
    SURFACE_3,
    SURFACE_4,
    SURFACE_5,
    SURFACE_6,
    SURFACE_7,
    SURFACE_8,
    SURFACE_9,
} from '../../images';
import {
    APP_THEME_COLOR,
    BG_COLOR,
    ITEM_1,
    ITEM_10,
    ITEM_2,
    ITEM_3,
    ITEM_4,
    ITEM_5,
    ITEM_6,
    ITEM_7,
    ITEM_8,
    ITEM_9,
    TEXT_COLOR_BLUE,
    WHITE,
    YELLOW,
} from '../../utils/Colors';

import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import { MESIBO_TOKEN } from '../../utils/AppConstant';
import { checkNotifications } from 'react-native-permissions';

const windowWidth = Dimensions.get('window').width;

const categoryData = [
    {
        image: SURFACE_1,
        color: ITEM_1,
        title: 'Vet Appointment',
        desc: 'Book an appointment for vet consultation',
    },
    {
        image: SURFACE_2,
        color: ITEM_2,
        title: 'Vaccination',
        desc: 'Get your pet vaccinated at your doorstep',
    },
    {
        image: SURFACE_3,
        color: ITEM_3,
        title: 'Video Consultation',
        desc: 'Consult expert vets online',
    },
    {
        image: SURFACE_4,
        color: ITEM_4,
        title: 'Grooming & Spa',
        desc: 'Grooming & spa service at your doorstep',
    },
    {
        image: SURFACE_5,
        color: ITEM_5,
        title: '',
        desc: 'Online & Local Store',
    },
    {
        image: SURFACE_6,
        color: ITEM_6,
        title: 'Pet Insurance',
        desc: 'Insure your pet with best policies',
    },
];
const categoryData_1 = [
    {
        image: SURFACE_1,
        color: ITEM_1,
        title: 'Vet Appointment',
        desc: 'Book an appointment for vet consultation',
    },
    {
        image: SURFACE_2,
        color: ITEM_2,
        title: 'Vaccination',
        desc: 'Get your pet vaccinated at your doorstep',
    },
    {
        image: SURFACE_3,
        color: ITEM_3,
        title: 'Video Consultation',
        desc: 'Consult expert vets online',
    },
    {
        image: SURFACE_4,
        color: ITEM_4,
        title: 'Grooming & Spa',
        desc: 'Grooming & spa service at your doorstep',
    },
    {
        image: SURFACE_5,
        color: ITEM_5,
        title: '',
        desc: 'Online & Local Store',
    },
    {
        image: SURFACE_6,
        color: ITEM_6,
        title: 'Pet Insurance',
        desc: 'Insure your pet with best policies',
    },
    {
        image: SURFACE_7,
        color: ITEM_7,
        title: 'Fresh Cooked Pet Food',
        desc: 'Fresh food delivered to your doorstep',
    },
    {
        image: SURFACE_8,
        color: ITEM_8,
        title: 'Pet Boarding',
        desc: 'Drop your pet at best kennels in city',
    },
    {
        image: SURFACE_9,
        color: ITEM_9,
        title: 'Pet Training & Behaviour',
        desc: 'Consult the best Trainers & Experts',
    },
    {
        image: SURFACE_10,
        color: ITEM_10,
        title: 'Pet Adoption',
        desc: 'Looking to adopt a pet?',
    },
];
const MyDashboard = props => {
    console.log(props, 'props in my dashboard>>>')
    const { sliderData } = props;
    console.log(sliderData, 'sliderData in props>>>');
    const navigation = useNavigation();
    const { user, setMesiboToken, setMesiboId } = useContext(AuthContext);
    // console.log(user);
    const [isShowMore, setIsShowMore] = useState(true);
    const [askLink, setAskLink] = useState('');
    const [loading, setLoading] = useState(false);
    const { token, setPetProfileData, defaultPetIndex } = useContext(AuthContext);
    // const [sliderData, setSliderData] = useState([
    //     // { bannerImage: 'https://myappsdevelopment.in/demos/pets/public/images/bannerImages/1620973372.png' },
    //     // { bannerImage: BANNER_1 },
    // ]);

    useEffect(() => {

        checkNotifications
        // getAllBanners();
        getPetProfile();
    }, []);

    const getPetProfile = () => {

        console.log("user", user);
        console.log("defaultPetIndex", defaultPetIndex);
        setLoading(true);
        Network('user/get-my-pet', 'get', null, token)
            .then(async res => {
                if (res.status === true) {
                    console.log(' /n/n Result', JSON.stringify(res));
                    setAskLink(res?.ask_a_question_link);
                    if (res.data.length) {
                        const data = res.data;
                        var index = 0;
                        if (typeof defaultPetIndex != 'undefined' && defaultPetIndex >= 0) {
                            if (typeof data[defaultPetIndex] != 'undefined') {
                                index = defaultPetIndex;
                            }
                        }

                        setPetProfileData(data[index]);
                    }
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })
            .catch(error => {
                setLoading(false);
            });
    };

    // const getAllBanners = () => {
    //     let bannerImage = {};

    //     setLoading(true);
    //     Network('user/get-banners-list', 'get', null, token)
    //         .then(async res => {

    //             console.log('getting banners>>>>>>>>>>>>>>>>', res)
    //             if (res.status === true) {
    //                 if (res && res.data && res.data.homepage && res.data.homepage.length > 0) {

    //                     res.data.homepage.forEach(element => {
    //                         console.log(element.b_image, 'element in foreach>>>>>>>>>>>')
    //                         setSliderData({
    //                             bannerImage: element.b_image
    //                         })
    //                     });

    //                     console.log(sliderData, 'sliderData in loop');

    //                 }
    //                 setLoading(false);
    //             } else {
    //                 setLoading(false);
    //             }
    //         })
    //         .catch(error => {
    //             setLoading(false);
    //         });
    // };


    const onItemClick = (index,item) => {
        console.log(index, 'indexxx')
        console.log(item,'item>>');
        switch (index) {
            case 0:
                navigation.navigate('VideoConsultation', { bookingType: 1 });
                break;
            case 1:
                navigation.navigate('Vaccination');
                break;
            case 2:
                navigation.navigate('VideoConsultation', { bookingType: 2 });
                break;
            case 3:
                // navigation.navigate('PetSpa');
                navigation.navigate('ComingSoon',{title:item.title});
                break;
            case 4:
                navigation.navigate('ComingSoon',{title:item.title});

                // props.setSelectedValue(3);
                break;
            case 5:
                // navigation.navigate('Insurance');
                navigation.navigate('ComingSoon',{title:item.title});
                break;
            case 6:
                // navigation.navigate('PetShopFood');
                navigation.navigate('ComingSoon',{title:item.title});
                break;
            case 7:
                // navigation.navigate('PetBoarding');
                navigation.navigate('ComingSoon',{title:item.title});
                break;
            case 8:
                // navigation.navigate('PetTraining');
                navigation.navigate('ComingSoon',{title:item.title});
                break;
            case 9:
                // navigation.navigate('PetAdoption');
                navigation.navigate('ComingSoon',{title:item.title});
                break;
        }
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => onItemClick(index,item)}
            style={{
                width: windowWidth / 2 - 20,
                margin: 6,
                backgroundColor: item.color,
                borderRadius: 10,
                alignItems: 'center',
                flexDirection: 'column',
            }}>
            <View
                style={{
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                <Image
                    source={item.image}
                    style={{ height: 120, resizeMode: 'contain' }}
                />
                {item.title !== '' && (
                    <OVText
                        size={small}
                        fontType={poppinsMedium}
                        color={TEXT_COLOR_BLUE}
                        style={{ textAlign: 'center', marginTop: -10 }}>
                        {item.title}
                    </OVText>
                )}
                <OVText
                    size={extraSmall}
                    fontType={poppinsMedium}
                    color={TEXT_COLOR_BLUE}
                    style={{ textAlign: 'center', marginHorizontal: 5 }}>
                    {item.desc}
                </OVText>
            </View>
        </TouchableOpacity>
    );

    const openLink = () => {

        // console.log("askLink", askLink);
        if (typeof askLink != 'undefined' && askLink != null && askLink != 'null') {
            Linking.openURL(`${askLink}`).catch((err) =>
                console.error('An error occurred', err),
            );
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        paddingTop: 10,
                    }}>
                    {sliderData && sliderData.length ?
                        <FlatListSlider
                            data={sliderData}
                            width={windowWidth}
                            timer={5000}
                            component={<ImageSliderView />}
                            indicatorActiveWidth={10}
                            contentContainerStyle={{ paddingHorizontal: 8 }}
                            indicatorContainerStyle={{ position: 'absolute', bottom: -20 }}
                            indicatorActiveColor={YELLOW}
                            indicatorInActiveColor="gray"
                            animation
                        />
                        : null}


                    <View
                        style={{
                            marginTop: 40,
                            flexDirection: 'row',
                            marginStart: 30,
                        }}>
                        <Image source={SEARCH} />

                        <TouchableOpacity
                            activeOpacity={.9}
                            onPress={() => openLink()}>
                            <OVText
                                size={medium}
                                fontType={poppinsMedium}
                                color={WHITE}
                                style={{
                                    textAlign: 'center',
                                    backgroundColor: YELLOW,
                                    borderRadius: 20,
                                    paddingHorizontal: 30,
                                    paddingVertical: 10,
                                    marginStart: 20,
                                    flex: 1,
                                    marginEnd: 40,
                                }}>
                                Ask a Question
                            </OVText>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <FlatList
                            data={isShowMore ? categoryData : categoryData_1}
                            renderItem={renderItem}
                            keyExtractor={item => item.image}
                            numColumns={2}
                            extraData={isShowMore}
                        />
                    </View>

                    <View
                        style={{
                            alignItems: 'flex-end',
                            margin: 10,
                        }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setIsShowMore(!isShowMore)}>
                            <View
                                style={{
                                    backgroundColor: APP_THEME_COLOR,
                                    borderRadius: 10,
                                    paddingVertical: 6,
                                    justifyContent: 'center',
                                    paddingHorizontal: 20,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <OVText
                                    size={small}
                                    fontType={poppinsMedium}
                                    color={WHITE}
                                    style={{ textAlign: 'center' }}>
                                    {isShowMore ? 'More' : 'Less'}
                                </OVText>
                                <Image source={BOTTOM_ARROW} style={{ marginStart: 10 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {loading && <LoaderIndicator loading={loading} />}
        </SafeAreaView>
    );
};

export default MyDashboard;
