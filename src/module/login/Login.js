/* eslint-disable react-native/no-inline-styles */
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager,
} from 'react-native-fbsdk';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-root-toast';
import labels from '../../assets/labels';
import { LoaderIndicator } from '../../common/LoaderIndicator';
import { OVButton } from '../../components/OVButton';
import OVText, {
    medium,
    poppinsBold,
    poppinsMedium,
    xLarge,
} from '../../components/OVText';
import { FACEBOOK, INSTAGRAM, LOGIN_BG } from '../../images';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import { GREEN_COLOR, WHITE, YELLOW } from '../../utils/Colors';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import { validateEmail, validatePhone } from '../../utils';
import OtpVerificationDialog from '../signup/OtpVerificationDialog';
import Feather from 'react-native-vector-icons/Feather';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Login = () => {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [securePasswordEntry, setSecurePasswordEntry] = useState(true);
    const [loginData, setLoginData] = useState({});
    const { setUser, setToken, setDefaultPetIndex } = useContext(AuthContext);
    const { firebaseToken, setFirebaseToken } = useContext(AuthContext);
    const [otpVerificationDialog, setOtpVerificationDialog] = useState(false);

    useEffect(() => {
        checkPermission();
        requestUserPermission();
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '711823586634-6itnngmmmp0hr0c0emu5pm0mcjspn4kr.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            iosClientId: '711823586634-th642ns1ppnrfaub88ia7kg2surgsh0o.apps.googleusercontent.com',
        });
    }, []);

    const checkPermission = async () => {
        requestMultiple([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ]).then(statuses => {
            console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
        });
    };

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            fetchFirebaseToken();
            console.warn('Authorization status:', authStatus);
        }
    };

    const fetchFirebaseToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            setFirebaseToken(fcmToken);
            console.log('Your Firebase Token is:', fcmToken);
        } else {
            console.log('Failed', 'No token received');
        }
    };

    const loginAction = () => {

        if (typeof emailAddress == 'undefined' || emailAddress == null || emailAddress == 'null' || emailAddress.length === 0) {
            showToastMessage('Enter your email address/mobile');
        } else if (typeof password == 'undefined' || password == null || password == 'null' || password.length === 0) {
            showToastMessage('Please enter password');
        } else {
            setLoading(true);
            const payload = {
                email: emailAddress,
                password: password,
                firebase_token: firebaseToken,
            };
            Network('user/login', 'post', payload)
                .then(async res => {
                    console.log(' /n/n Result ', JSON.stringify(res));
                    if (res.status === true) {
                        setToken(res.token);
                        if (res.data.is_otp_verified == 0) {
                            setLoginData(res.data);
                            //   generateOtp(res.data.mobile_no);
                        } else {
                            setUser(res.data);
                            setDefaultPetIndex(0);
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                            });
                        }
                        setLoading(true);
                    } else {
                        setLoading(false);
                        Toast.show(res.message);
                    }
                })
                .catch(error => {
                    setLoading(false);
                    Toast.show(error);
                });
        }
    };

    const generateOtp = mobile => {
        setLoading(true);
        const payload = { mobile_no: mobile };
        Network('user/generate-otp', 'post', payload, null)
            .then(async res => {
                if (res.status === true) {
                    console.log(' \n\n Result ', JSON.stringify(res));
                    setOtpVerificationDialog(true);
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

    const verifyOtp = value => {
        setLoading(true);
        const payload = {
            first_name: loginData.first_name,
            mobile_no: loginData.mobile_no,
            otp: value,
        };
        Network('user/verify-otp', 'post', payload, null)
            .then(async res => {
                if (res.status === true) {
                    setLoading(false);
                    setUser(res.data);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                } else {
                    console.log(' \n\n Resudddlt ', JSON.stringify(res));
                    showToastMessage(res.message);
                    setLoading(false);
                    setOtpVerificationDialog(true);
                }
            })
            .catch(error => {
                setLoading(false);
            });
    };

    const socialLoginAction = (email, firstName, lastName, id) => {
        const payload = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            social_id: id,
        };
        Network('user/social-login-vendor', 'post', payload)
            .then(async res => {
                console.log(' /n/n Result ', JSON.stringify(res));
                if (res.status === true) {
                    setUser(res.data);
                    setToken(res.token);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                } else {
                    setLoading(false);
                    Toast.show(res.message);
                }
            })
            .catch(error => {
                setLoading(false);
                Toast.show(error);
            });
    };

    const handleFacebook = () => {
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        console.log(data.accessToken.toString());
                        const processRequest = new GraphRequest(
                            '/me?fields=name,email,picture.type(large)',
                            null,
                            getResponseInfo,
                        );
                        // Start the graph request.
                        new GraphRequestManager().addRequest(processRequest).start();
                    });
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error);
            },
        );
    };

    const getResponseInfo = (error, result) => {
        console.log(JSON.stringify(result));
        socialLoginAction(
            result.email,
            result.name.split(' ')[0],
            result.name.split(' ')[1],
            result.id,
        );
    };

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('User --->   ', JSON.stringify(userInfo));
            socialLoginAction(
                userInfo.user.email,
                userInfo.user.givenName,
                userInfo.user.familyName,
                userInfo.user.id,
            );
        } catch (error) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    const updateSecureTextEntry = () => {
        setSecurePasswordEntry(!securePasswordEntry);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <Image
                        source={LOGIN_BG}
                        style={{
                            width: windowWidth,
                            height: windowHeight,
                            resizeMode: 'stretch',
                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'column',
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: windowWidth,
                            height: windowHeight,
                        }}>
                        <OVText
                            size={xLarge}
                            fontType={poppinsBold}
                            color={WHITE}
                            style={{ marginTop: 70, marginBottom: 40 }}>
                            {labels.login}
                        </OVText>

                        <View style={styles.textInputContainer}>
                            <OVText
                                size={medium}
                                fontType={poppinsMedium}
                                color={WHITE}
                                style={{ textAlign: 'center', marginTop: 10 }}>
                                {labels.emailMobile}
                            </OVText>
                            <View style={{ 
                                alignItems: 'center', 
                                flexDirection: 'row' 
                            }}>
                                <TextInput
                                    placeholder="Enter Email/Mobile"
                                    placeholderTextColor={WHITE}
                                    style={styles.textField}
                                    value={emailAddress}
                                    onChangeText={text => setEmailAddress(text)}
                                />
                            </View>
                        </View>
                        <View style={styles.textInputContainer}>
                            <OVText
                                size={medium}
                                fontType={poppinsMedium}
                                color={WHITE}
                                style={{ textAlign: 'center', marginTop: 10 }}>
                                {labels.password}
                            </OVText>
                            <View style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}>
                                <TextInput
                                    placeholder="Enter Password"
                                    placeholderTextColor={WHITE}
                                    style={styles.textField}
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                    secureTextEntry={securePasswordEntry}
                                />
                               
                                <TouchableOpacity
                                    onPress={updateSecureTextEntry}
                                    activeOpacity={.8}
                                >
                                    {securePasswordEntry ?
                                        <Feather
                                            name="eye-off"
                                            color="white"
                                            size={20}
                                            style={{ paddingHorizontal: 10 }}
                                        />
                                        :
                                        <Feather
                                            name="eye"
                                            color="white"
                                            size={20}
                                            style={{ paddingHorizontal: 10 }}
                                        />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>

                        <OVButton
                            title="LOGIN"
                            color={WHITE}
                            textColor={GREEN_COLOR}
                            marginTop={40}
                            onPress={() => loginAction()}
                        />
                        <OVText
                            onPress={() => navigation.navigate('ForgotPassword')}
                            size={medium}
                            fontType={poppinsMedium}
                            color={WHITE}
                            style={{ textAlign: 'center', marginTop: 20 }}>
                            Forgot your Password?
                        </OVText>
                        <OVText
                            size={medium}
                            fontType={poppinsMedium}
                            color={WHITE}
                            style={{ textAlign: 'center', marginTop: 10 }}>
                            Don't have an account?
                            <OVText
                                onPress={() => navigation.navigate('SignUp')}
                                size={medium}
                                fontType={poppinsMedium}
                                color={YELLOW}
                                style={{
                                    textAlign: 'center',
                                    marginTop: 10,
                                    textDecorationLine: 'underline',
                                }}>
                                {' '}
                                Sign Up
                            </OVText>
                        </OVText>
                        {/* <OVText
                            size={medium}
                            fontType={poppinsBold}
                            color={WHITE}
                            style={{ textAlign: 'center', marginTop: 10 }}>
                            Or login Via
                        </OVText> */}
                        {/* <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginTop: 10,
                            }}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => handleFacebook()}>
                                <Image source={FACEBOOK} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => handleGoogleSignIn()}>
                                <Image
                                    source={INSTAGRAM}
                                    style={{
                                        marginStart: 20,
                                        width: 30,
                                        height: 30,
                                        resizeMode: 'contain',
                                    }}
                                />
                            </TouchableOpacity>
                        </View> */}
                    </View>

                    {loading && <LoaderIndicator loading={loading} />}
                </View>
            </ScrollView>
            <OtpVerificationDialog
                dialogVisible={otpVerificationDialog}
                setDialogVisible={value => {
                    verifyOtp(value);
                    setOtpVerificationDialog(false);
                }}
                resendOtp={() => generateOtp(loginData.mobile_no)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textInputContainer: {
        width: '80%',
        marginTop: 20,
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        borderRadius: 10,
    },
    textField: {
        flex:1,
        color: WHITE,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        width: '100%',
        paddingEnd: 30,
        paddingStart: 30
    },
});

export default Login;
