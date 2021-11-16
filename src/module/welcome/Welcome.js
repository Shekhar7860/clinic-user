/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Dimensions, Image, SafeAreaView, ScrollView, View} from 'react-native';
import labels from '../../assets/labels';
import {LoaderIndicator} from '../../common/LoaderIndicator';
import {OVButton} from '../../components/OVButton';
import OVText, {poppinsMedium, small} from '../../components/OVText';
import FlatListSlider from '../../flatListSlider/FlatListSlider';
import ImageSliderView from '../../flatListSlider/WelcomeImageSlider';
import {
  APP_ICON,
  LOGIN_BG,
  WELCOME_BANNER_1,
  WELCOME_BANNER_2,
} from '../../images';
import {GREEN_COLOR, WHITE, YELLOW} from '../../utils/Colors';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Welcome = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [sliderData, setSliderData] = useState([
    {image: WELCOME_BANNER_1, title: 'Hello 1'},
    {image: WELCOME_BANNER_2, title: 'Hello 2'},
  ]);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{flexDirection: 'column', flex: 1}}>
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
              position: 'absolute',
              flexDirection: 'column',
              width: windowWidth,
              height: windowHeight,
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={APP_ICON}
                style={{
                  width: 150,
                  height: 40,
                  resizeMode: 'contain',
                  marginTop: 50,
                  marginBottom: 20,
                }}
              />
            </View>

            <FlatListSlider
              width={windowWidth}
              height={200}
              data={sliderData}
              timer={5000}
              component={<ImageSliderView />}
              indicatorActiveWidth={10}
              contentContainerStyle={{paddingHorizontal: 8}}
              indicatorContainerStyle={{position: 'absolute', bottom: -20}}
              indicatorActiveColor={YELLOW}
              indicatorInActiveColor="gray"
              animation
            />

            {/* <PagerView /> */}

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 20,
              }}>
              <OVButton
                title="SIGN IN"
                color={WHITE}
                textColor={GREEN_COLOR}
                marginTop={20}
                onPress={() => navigation.navigate('Login')}
              />

              <OVButton
                title="SIGN UP"
                color={GREEN_COLOR}
                textColor={WHITE}
                marginTop={20}
                onPress={() => navigation.navigate('SignUp')}
              />
              <OVText
                size={small}
                fontType={poppinsMedium}
                color={WHITE}
                style={{marginTop: 20, textAlign: 'center'}}>
                {labels.privacyPolicy}
              </OVText>
            </View>
          </View>

          {loading && <LoaderIndicator loading={loading} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
