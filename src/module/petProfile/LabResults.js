/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
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
import OVText, {
    medium,
    poppinsLight,
    poppinsMedium,
} from '../../components/OVText';
import { CAMERA, GALLERY } from '../../images';
import {
    BG_COLOR,
    BLACK,
    GRAY_100,
    GRAY_800,
    GREEN_COLOR,
    TEXT_COLOR_LIGHT,
    WHITE,
} from '../../utils/Colors';
import ImagePicker from '../../components/ImagePicker';
import { AuthContext } from '../../services/authProvider';

const windowWidth = Dimensions.get('window').width;

const LabResults = props => {

    const testDetail = props.route.params.testDetail;
    const navigation = useNavigation();
    const [refresh, setRefresh] = useState(false);
    const { user, token, setUser } = useContext(AuthContext);
    const [showImagePickerDialog, setShowImagePickerDialog] = useState(false);
    const [categoryData, setCategoryData] = useState([
        {
            name: 'Morning',
            time: '9:00 AM to 12:00 PM',
            isSelect: true,
        },
        {
            name: 'Afternoon',
            time: '12:00 PM to 04:00 PM',
            isSelect: false,
        },
        {
            name: 'Evening',
            time: '04:00 PM to 06:00 PM',
            isSelect: false,
        },
        {
            name: 'Night',
            time: '06:00 PM to 09:00 PM',
            isSelect: false,
        },
    ]);

    useEffect(() => {

        console.log("testDetail", testDetail);
        
    }, []);

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('LabResults')}>
            <View
                style={{
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: WHITE,
                }}>
                <OVText
                    size={medium}
                    fontType={poppinsLight}
                    color={GRAY_800}
                    style={{
                        flex: 1,
                    }}>
                    Blood Test
                </OVText>
                <OVText size={medium} fontType={poppinsLight} color={TEXT_COLOR_LIGHT}>
                    July 18, 2017 14:02 PM
                </OVText>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Lab Results"
            />
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <OVText
                            size={medium}
                            fontType={poppinsMedium}
                            color={GREEN_COLOR}
                            style={{
                                paddingVertical: 10,
                                paddingStart: 10,
                                backgroundColor: GRAY_100,
                            }}>
                            TODAY
                        </OVText>
                        <FlatList
                            data={categoryData}
                            renderItem={renderItem}
                            keyExtractor={item => item.image}
                        />
                        <OVText
                            size={medium}
                            fontType={poppinsMedium}
                            color={GREEN_COLOR}
                            style={{
                                paddingVertical: 10,
                                paddingStart: 10,
                                backgroundColor: GRAY_100,
                            }}>
                            PREVIOUS LAB RESULTS
                        </OVText>
                        <FlatList
                            data={categoryData}
                            renderItem={renderItem}
                            keyExtractor={item => item.image}
                        />
                    </View>
                </ScrollView>
                <View
                    style={{
                        backgroundColor: 'rgba(250, 164, 26, 0.2)',
                        padding: 10,
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                    <OVText
                        size={medium}
                        fontType={poppinsMedium}
                        color={BLACK}
                        style={{
                            paddingVertical: 10,
                        }}>
                        PREVIOUS LAB RESULTS
                    </OVText>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setShowImagePickerDialog(true)}
                            style={{
                                flex: 1,
                                padding: 10,
                                backgroundColor: WHITE,
                                borderRadius: 6,
                                alignItems: 'center',
                                marginEnd: 10,
                            }}>
                            <Image source={CAMERA} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setShowImagePickerDialog(true)}
                            style={{
                                flex: 1,
                                padding: 10,
                                backgroundColor: WHITE,
                                borderRadius: 6,
                                alignItems: 'center',
                                marginEnd: 10,
                            }}>
                            <Image source={GALLERY} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ImagePicker
                selectedImagePath={path => {
                    setShowImagePickerDialog(false);
                }}
                dialogVisible={showImagePickerDialog}
                setDialogVisible={() => setShowImagePickerDialog(false)}
            />
        </SafeAreaView>
    );
};

export default LabResults;
