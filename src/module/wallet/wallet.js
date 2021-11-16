/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, Image, SafeAreaView, ScrollView, View} from 'react-native';
import {Header} from '../../common/Header';
import {LoaderIndicator} from '../../common/LoaderIndicator';
import {OVButton} from '../../components/OVButton';
import OVText, {
  bold,
  medium,
  poppinsBold,
  poppinsLight,
  poppinsMedium,
  poppinsSemiBold,
  small,
} from '../../components/OVText';
import {DOCTOR_1, USER_SMALL} from '../../images';
import {
  APP_THEME_COLOR,
  BG_COLOR,
  BLACK,
  GRAY_100,
  GRAY_800,
  GREEN_COLOR,
  WHITE,
  YELLOW,
} from '../../utils/Colors';
import Network from '../../network/Network';
import {AuthContext} from '../../services/authProvider';

const windowWidth = Dimensions.get('window').width;

const Wallet = props => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(false);
  const {token} = useContext(AuthContext);
  useEffect(() => {
    getWalletBalance();
  }, []);

  const getWalletBalance = () => {
    setLoading(true);
    Network('user/wallet/create', 'get', null, token)
      .then(async res => {
        if (res.status === true) {
          console.log(' /n/n Result ', JSON.stringify(res));
          const data = res.data;
          const bal = data.wallet_balance ? data.wallet_balance : 0;
          setBalance(bal);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: BG_COLOR}}>
      <Header
        isHome={false}
        navigation={navigation}
        onBackPressed={() => navigation.goBack()}
        title="Wallet Balance"
      />
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <OVText
            size={bold}
            fontType={poppinsSemiBold}
            color={GRAY_800}
            style={{
              paddingVertical: 14,
              paddingStart: 10,
            }}>
            Balance
          </OVText>

          <OVText
            size={bold}
            fontType={poppinsSemiBold}
            color={GRAY_800}
            style={{
              paddingVertical: 14,
              paddingStart: 10,
            }}>
            {balance}
          </OVText>
        </View>
      </ScrollView>
      {loading && <LoaderIndicator loading={loading} />}

    </SafeAreaView>
  );
};

export default Wallet;
