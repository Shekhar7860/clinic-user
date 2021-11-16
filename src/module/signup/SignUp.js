/* eslint-disable react-native/no-inline-styles */
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
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
import Toast from 'react-native-root-toast';
import labels from '../../assets/labels';
import {LoaderIndicator} from '../../common/LoaderIndicator';
import {OVButton} from '../../components/OVButton';
import OVText, {
  medium,
  poppinsBold,
  poppinsMedium,
  poppinsSemiBold,
  xLarge,
} from '../../components/OVText';
import {APP_LOGO_1, SIGN_UP_BG} from '../../images';
import Network from '../../network/Network';
import {AuthContext} from '../../services/authProvider';
import {showToastMessage, validateEmail} from '../../utils';
import {GREEN_COLOR, WHITE} from '../../utils/Colors';
import OtpVerificationDialog from './OtpVerificationDialog';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {setUser, setToken} = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpVerificationDialog, setOtpVerificationDialog] = useState(false);

  const signUpAction = () => {
    if (mobileNumber.length < 10) {
      showToastMessage('Enter your mobile number');
    } else if (emailAddress.length === 0) {
      showToastMessage('Enter your email address');
    } else if (!validateEmail(emailAddress.trim())) {
      showToastMessage('Please enter valid email address');
    } else if (password.length === 0) {
      showToastMessage('Please enter password');
    } else if (password !== confirmPassword) {
      showToastMessage('Password and confirm password not matched');
    } else {
      const payload = {
        first_name: userName,
        email: emailAddress,
        password: password,
        mobile_no: mobileNumber,
      };
      Network('user/register', 'post', payload)
        .then(async res => {
          if (res.status === true) {
            console.log(' /n/n Result ', JSON.stringify(res));
            Toast.show(res.message);
            //navigation.goBack();
            generateOtp(mobileNumber);
            setOtpVerificationDialog(true);
          } else {
            Toast.show(res.message);
            setLoading(false);
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
    const payload = {mobile_no: mobile};
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
      first_name: userName,
      mobile_no: mobileNumber,
      otp: value,
    };
    Network('user/verify-otp', 'post', payload, null)
      .then(async res => {
        if (res.status === true) {
          console.log(' \n\n Result ', JSON.stringify(res));
          navigation.goBack();
          setLoading(false);
        } else {
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
      email: emailAddress,
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
            routes: [{name: 'Home'}],
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

  return (
    <SafeAreaView>
      <Image
        source={SIGN_UP_BG}
        style={{
          width: windowWidth,
          height: windowHeight,
          resizeMode: 'stretch',
          position: 'absolute',
        }}
      />
      <ScrollView>
        <View style={{flexDirection: 'column', flex: 1}}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Image
              source={APP_LOGO_1}
              style={{marginHorizontal: 20, marginVertical: 30}}
            />

            <OVText
              size={xLarge}
              fontType={poppinsBold}
              color={WHITE}
              style={{marginTop: 20, marginBottom: 40}}>
              Sign Up
            </OVText>

            <View style={styles.textInputContainer}>
              <OVText
                size={medium}
                fontType={poppinsMedium}
                color={WHITE}
                style={{textAlign: 'center', marginTop: 10}}>
                Please enter your name
              </OVText>
              <View style={{alignItems: 'center'}}>
                <TextInput
                  placeholderTextColor={WHITE}
                  style={styles.textField}
                  onChangeText={text =>
                    setUserName(text.replace(/[^A-Za-z]/gi, ''))
                  }
                />
              </View>
            </View>

            <View style={styles.textInputContainer}>
              <OVText
                size={medium}
                fontType={poppinsMedium}
                color={WHITE}
                style={{textAlign: 'center', marginTop: 10}}>
                Mobile Number
              </OVText>
              <View style={{alignItems: 'center'}}>
                <TextInput
                  placeholderTextColor={WHITE}
                  style={styles.textField}
                  onChangeText={text =>
                    setMobileNumber(text.replace(/[^0-9]/g, ''))
                  }
                  keyboardType="numeric"
                  maxLength={10}
                  value={mobileNumber}
                />
              </View>
            </View>

            <View style={styles.textInputContainer}>
              <OVText
                size={medium}
                fontType={poppinsMedium}
                color={WHITE}
                style={{textAlign: 'center', marginTop: 10}}>
                Email
              </OVText>
              <View style={{alignItems: 'center'}}>
                <TextInput
                  placeholderTextColor={WHITE}
                  style={styles.textField}
                  onChangeText={text => setEmailAddress(text)}
                />
              </View>
            </View>
            <View style={styles.textInputContainer}>
              <OVText
                size={medium}
                fontType={poppinsMedium}
                color={WHITE}
                style={{textAlign: 'center', marginTop: 10}}>
                {labels.password}
              </OVText>
              <View style={{alignItems: 'center'}}>
                <TextInput
                  placeholderTextColor={WHITE}
                  style={styles.textField}
                  onChangeText={text => setPassword(text)}
                  secureTextEntry={true}
                  maxLength={15}
                />
              </View>
            </View>
            <View style={styles.textInputContainer}>
              <OVText
                size={medium}
                fontType={poppinsMedium}
                color={WHITE}
                style={{textAlign: 'center', marginTop: 10}}>
                Confirm Password
              </OVText>
              <View style={{alignItems: 'center'}}>
                <TextInput
                  placeholderTextColor={WHITE}
                  style={styles.textField}
                  onChangeText={text => setConfirmPassword(text)}
                  secureTextEntry={true}
                  maxLength={15}
                />
              </View>
            </View>

            <OVButton
              title="Verify"
              color={WHITE}
              textColor={GREEN_COLOR}
              marginTop={40}
              onPress={() => signUpAction()}
            />
            <OVText
              size={medium}
              fontType={poppinsSemiBold}
              color={WHITE}
              style={{textAlign: 'center', marginVertical: 20}}>
              OTP will be sent to your mobile number
            </OVText>

            {/* <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 20,
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
        resendOtp={() => generateOtp(mobileNumber)}
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
    color: WHITE,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    width: '100%',
  },
});

export default SignUp;
