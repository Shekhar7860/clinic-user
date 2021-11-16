import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import Login from './module/login/Login';
import Splash from './module/Splash';
import Welcome from './module/welcome/Welcome';
import SignUp from './module/signup/SignUp';
import HomeScreen from './module/home/HomeScreen';
import BookAppointments from './module/appointments/BookAppointments';
import BookingStatus from './module/appointments/BookingStatus';
import AuthContextProvider from './services/authProvider';
import VideoConsultation from './module/appointments/VideoConsultation';
import DoctorProfile from './module/doctorProfile/DoctorProfile';
import PetShopDetail from './module/petShop/PetShopDetail';
import PetShopFood from './module/petShop/PetShopFood';
import FoodCart from './module/petShop/FoodCart';
import PetProfile from './module/petProfile/PetProfile';
import LabResults from './module/petProfile/LabResults';
import PetMedicalForm from './module/petProfile/PetMedicalForm';
import PetMedicalFormEdit from './module/petProfile/PetMedicalFormEdit';
import PetVaccinationForm from './module/petProfile/PetVaccinationForm';
import PetVaccinationFormEdit from './module/petProfile/PetVaccinationFormEdit';
import PetDewormingForm from './module/petProfile/PetDewormingForm';
import PetDewormingFormEdit from './module/petProfile/PetDewormingFormEdit';
import Vaccination from './module/vaccination/Vaccination';
import VaccinationDetail from './module/vaccination/VaccinationDetail';
import PetBoarding from './module/boarding/PetBoarding';
import PetAdoption from './module/adoption/PetAdoption';
import PetTraining from './module/training/PetTraining';
import PetSpa from './module/spa/PetSpa';
import ComingSoon from './common/ComingSoon';
import Insurance from './module/insurance/Insurance';
import Notificatios from './module/notifications/Notificatios';
import ChangePassword from './module/changePassword/ChangePassword';
import ForgotPassword from './module/login/ForgotPassword';
import NewPassword from './module/login/NewPassword';
import OwnerProfile from './module/ownerProfile/OwnerProfile';
import LegalInformation from './module/legalInformation/LegalInformation';
import AddPetProfile from './module/petProfile/AddPetProfile';
import {Chat} from './module/chat/Chat';
import PlacesApiSearch from './module/placesapisearch';
import VideoCall from './module/video/VideoCall';
import Wallet from './module/wallet/wallet';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export var userCurrentLocation = null;

const App = () => {
  const Stack = createStackNavigator();

  return (
    <AuthContextProvider>
      <SafeAreaView style={styles.container}>
        {(console.disableYellowBox = true)}
        <View style={styles.bottomSafeArea}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="BookAppointments"
                component={BookAppointments}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="BookingStatus"
                component={BookingStatus}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="VideoConsultation"
                component={VideoConsultation}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DoctorProfile"
                component={DoctorProfile}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PetShopDetail"
                component={PetShopDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PetShopFood"
                component={PetShopFood}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="FoodCart"
                component={FoodCart}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PetProfile"
                component={PetProfile}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="LabResults"
                component={LabResults}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PetMedicalForm"
                component={PetMedicalForm}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PetMedicalFormEdit"
                component={PetMedicalFormEdit}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PetVaccinationForm"
                component={PetVaccinationForm}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PetVaccinationFormEdit"
                component={PetVaccinationFormEdit}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PetDewormingForm"
                component={PetDewormingForm}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PetDewormingFormEdit"
                component={PetDewormingFormEdit}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Vaccination"
                component={Vaccination}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="VaccinationDetail"
                component={VaccinationDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PetBoarding"
                component={PetBoarding}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PetAdoption"
                component={PetAdoption}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PetTraining"
                component={PetTraining}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PetSpa"
                component={PetSpa}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ComingSoon"
                component={ComingSoon}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Insurance"
                component={Insurance}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Notificatios"
                component={Notificatios}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="NewPassword"
                component={NewPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="OwnerProfile"
                component={OwnerProfile}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="LegalInformation"
                component={LegalInformation}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AddPetProfile"
                component={AddPetProfile}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PlacesApiSearch"
                component={PlacesApiSearch}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="VideoCall"
                component={VideoCall}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Wallet"
                component={Wallet}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaView>
    </AuthContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSafeArea: {
    flex: 1,
  },
});

export default App;
