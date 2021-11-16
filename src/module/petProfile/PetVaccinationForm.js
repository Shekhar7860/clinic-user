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
import { parseDate, parseDateHiphenFormat } from '../../utils/BaseUtils';
import { APP_ICON, GENDER_OTHERS } from '../../images';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

const windowWidth = Dimensions.get('window').width;

const PetVaccinationForm = props => {

    const { pet_id } = props.route.params;
    const tabIndex = props.route.params?.tabIndex || 1;
    const navigation = useNavigation();
    const { user, token, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [checkupDate, setCheckupDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {

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
            data.append('type', 2);
            data.append('pet_id', pet_id);
            data.append('title', title);
            data.append('date', parseDateHiphenFormat(checkupDate));

            Network('user/save-pet-report', 'post', data, token)
                .then(async res => {
                    console.log(' /n/n Result ', JSON.stringify(res.data));
                    showToastMessage(res.message);
                    setLoading(false);
                    navigation.goBack({tabIndex:tabIndex});
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
                title="Vaccine History"
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
                            Vaccine Type
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
            {loading && <LoaderIndicator loading={loading} />}
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

export default PetVaccinationForm;
