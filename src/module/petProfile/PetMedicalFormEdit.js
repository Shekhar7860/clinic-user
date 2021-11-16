/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import DateTimePicker from '../../common/DateTimePicker';
import { Header } from '../../common/Header';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import { OVButton } from '../../components/OVButton';
import OVText, {
    extraSmall,
    medium,
    poppinsMedium,
    poppinsRegular,
    small,
    poppinsSemiBold
} from '../../components/OVText';

import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import {
    APP_THEME_COLOR,
    BG_COLOR,
    BLACK,
    GRAY_100,
    GRAY_800,
    GREEN_COLOR,
    ORANGE,
    WHITE,
    GRAY_400
} from '../../utils/Colors';
import PetTypeDialog from '../insurance/PetTypeDialog';
import { parseDate, parseDateHiphenFormat, parseStrToDate } from '../../utils/BaseUtils';
import { CAMERA, GALLERY } from '../../images';
import ImagePicker from '../../components/ImagePicker';
import { APP_ICON, GENDER_OTHERS } from '../../images';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import ImageView from "react-native-image-viewing";

const windowWidth = Dimensions.get('window').width;

const images = [
    {
        uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    },
    {
        uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
    },
    {
        uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    },
];

const PetMedicalFormEdit = props => {

    const testDetail = props.route.params.testDetail;
    const tabIndex = props.route.params?.tabIndex || 1;
    const navigation = useNavigation();
    const { user, token, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(typeof testDetail.title != 'undefined' && testDetail.title != null && testDetail.title != 'null' ? testDetail.title : '');
    const [checkupDate, setCheckupDate] = useState(typeof testDetail.date != 'undefined' && testDetail.date != null && testDetail.date != 'null' ? parseStrToDate(testDetail.date) : new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showImagePickerDialog, setShowImagePickerDialog] = useState(false);
    const [document, setDocument] = useState('');
    const [visible, setIsVisible] = useState(false);
    const [imgArr, setImgArry] = useState([]);


    useEffect(() => {
        console.log("testDetail", testDetail);
        if (testDetail && testDetail.document != '') {
            setImgArry([{uri:testDetail.document}])
        }
    }, []);

    const checkPermission = async () => {
        requestMultiple([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ]).then(statuses => {
            if (statuses[PERMISSIONS.ANDROID.CAMERA] === 'denied') checkPermission();
            else setShowImagePickerDialog(true);
        });
    };

    const saveForm = () => {
        if (title === '') {
            showToastMessage('Please enter title');
        } else if (checkupDate === '') {
            showToastMessage('Please choose date');
        } else {
            setLoading(true);
            // key=>pet_id,type,title,doses,date,document
            let data = new FormData();
            data.append('type', 1);
            data.append('id', testDetail?.id);
            data.append('owner_id', testDetail?.owner_id);
            data.append('pet_id', testDetail?.pet_id);
            data.append('title', title);
            data.append('date', parseDateHiphenFormat(checkupDate));

            if (document) {
                data.append('document', {
                    uri: document,
                    name:  Date.parse(new Date()) + 'petMedicalDocument.'+document.split('.').pop(),
                    filename: Date.parse(new Date()) + 'petMedicalDocument.'+document.split('.').pop(),
                    // type: 'image/png',
                    // type: 'application/pdf',
                    type: 'multipart/form-data'

                });
            }

            Network('user/update-pet-report', 'post', data, token)
                .then(async res => {
                    console.log(' /n/n Result ', JSON.stringify(res.data));
                    showToastMessage(res.message);
                    setLoading(false);
                    navigation.goBack({ tabIndex: tabIndex });
                })
                .catch(error => {
                    setLoading(false);
                });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Medical History"
            />
            <ScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>

                    <View style={{ flexDirection: 'column' }}>

                        <OVText
                            size={medium}
                            fontType={poppinsMedium}
                            color={GREEN_COLOR}
                            style={{
                                padding: 12,
                                backgroundColor: WHITE,
                            }}>
                            Title
                        </OVText>

                        <TextInput
                            style={styles.textField}
                            value={title}
                            onChangeText={text => setTitle(text.replace(/[^A-Za-z0-9 ]/gi, ''))}
                        />

                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                setShowDatePicker(true);
                            }}>
                            <OVText
                                size={medium}
                                fontType={poppinsMedium}
                                color={GREEN_COLOR}
                                style={{
                                    paddingVertical: 10,
                                    paddingStart: 10,
                                    backgroundColor: WHITE,
                                }}>
                                Date
                            </OVText>

                            <TextInput
                                style={styles.textField}
                                value={parseDateHiphenFormat(checkupDate)}
                                editable={false}
                            />
                        </TouchableOpacity>

                        <View
                            style={{
                                paddingVertical: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <OVText
                                size={medium}
                                fontType={poppinsSemiBold}
                                color={APP_THEME_COLOR}
                                style={{
                                    marginStart: 20,
                                    marginBottom: 10,
                                    flex: 1,
                                }}>
                                Upload Document
                            </OVText>
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                activeOpacity={1}
                                onPress={() => {
                                    testDetail.document !== 'https://myappsdevelopment.in/demos/pets/public/images/petReports/1628712500.png' ? setIsVisible(true) :
                                        setShowImagePickerDialog(true);
                                }}>
                                <View
                                    style={{
                                        flex: 1,
                                        height: 110,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 10,
                                        borderColor: GRAY_400,
                                        borderWidth: 1,
                                        margin: 10,
                                    }}>
                                    <Image
                                        source={document !== '' ? { uri: document } : (testDetail.document !== '' ? { uri: testDetail.document } : CAMERA)}
                                        style={
                                            document !== ''
                                                ? {
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: 10,
                                                    margin: 1,
                                                }
                                                : testDetail.document !== ''
                                                    ? {
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: 10,
                                                        margin: 1,
                                                    } :
                                                    {}
                                        }
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <OVButton
                            title="Submit"
                            color={APP_THEME_COLOR}
                            textColor={WHITE}
                            marginTop={20}
                            marginBottom={20}
                            onPress={() => saveForm()}
                            width={windowWidth - 20}
                        />
                    </View>
                </View>
            </ScrollView>

            <DateTimePicker
                mode="date"
                show={showDatePicker}
                onDateSelectChange={selectedDate => {
                    setShowDatePicker(false);
                    setCheckupDate(selectedDate);
                }}
                value={checkupDate}
            />

            <ImagePicker
                selectedImagePath={path => {
                    setShowImagePickerDialog(false);
                    setDocument(path);
                }}
                dialogVisible={showImagePickerDialog}
                setDialogVisible={() => setShowImagePickerDialog(false)}
            />
            {loading && <LoaderIndicator loading={loading} />}
            <ImageView
                images={imgArr}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textField: {
        fontFamily: 'Poppins-Regular',
        padding: 12,
        backgroundColor: GRAY_100,
        color: GRAY_800,
    },
});

export default PetMedicalFormEdit;
