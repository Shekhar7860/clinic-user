/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OVText, { large, poppinsMedium } from '../components/OVText';
import {
    AUDIO_CALL,
    BACK_ARROW,
    NOTIFICATION,
    PET_IMAGE_SMALL,
    VIDEO_CALL,
} from '../images';
import { APP_THEME_COLOR, TEXT_COLOR_BLUE, WHITE, ORANGE } from '../utils/Colors';
import { AuthContext } from '../services/authProvider';

/**
 *
 * @param {*} props
 * This is a common header component among most of the screen.
 *
 */
export const Header = props => {
    const {
        isHome = true,
        onBackPressed,
        navigation,
        title = 'Home',
        onSidemenuClick,
        notification = true,
        audio = false,
        video = false,
        onAudioCall,
        onVideoCall,
    } = props;
    const { user, token, petProfileData } = useContext(AuthContext);

    const [] = useState(false);
    return (
        <View style={{ flexDirection: 'column' }}>
            {/* { console.log("petProfileData header", petProfileData)} */}
            {isHome && (
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: APP_THEME_COLOR,
                        padding: 4,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>

                    {(typeof petProfileData != 'undefined' && petProfileData !== undefined) ?
                        <TouchableOpacity activeOpacity={1} onPress={() => onSidemenuClick()}
                        >
                            {(petProfileData !== undefined && petProfileData.pet_img_path != '' && petProfileData.pet_img_path != null) ?
                                <Image
                                    source={{ uri: petProfileData.pet_img_path }}
                                    style={{ width: 40, height: 40, borderRadius: 20, margin: 10, borderColor: ORANGE, borderWidth: 2}}
                                />
                                :
                                <Image
                                    source={PET_IMAGE_SMALL}
                                    style={{ width: 40, height: 40, borderRadius: 20, margin: 10, borderColor: ORANGE, borderWidth: 2 }}
                                />
                            }
                        </TouchableOpacity>
                        :
                        <TouchableOpacity activeOpacity={1} onPress={() => { }}>
                            <View
                                style={{ width: 40, height: 40, borderRadius: 20, margin: 10 }} >
                            </View>

                        </TouchableOpacity>
                    }

                    {isHome === true && (
                        <View
                            style={{
                                color: TEXT_COLOR_BLUE,
                                flex: 1,
                                borderBottomColor: WHITE,
                                marginStart: 20,
                                flexDirection: 'row',
                                marginEnd: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <OVText
                                size={large}
                                fontType={poppinsMedium}
                                color={WHITE}
                                style={{ textAlign: 'center' }}>
                                {title}
                            </OVText>
                        </View>
                    )}
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('Notificatios')}>
                        <Image
                            source={NOTIFICATION}
                            resizeMode="contain"
                            style={{ width: 30, height: 30, marginEnd: 10 }}
                        />
                    </TouchableOpacity>
                </View>
            )}
            {!isHome && (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#FAA41A', '#906445', '#28246F']}
                    style={{ padding: 10 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={() => onBackPressed()}>
                            <Image source={BACK_ARROW} resizeMode="contain" />
                        </TouchableOpacity>

                        <View
                            style={{
                                color: TEXT_COLOR_BLUE,
                                flex: 1,
                                borderBottomColor: WHITE,
                                marginStart: 20,
                                flexDirection: 'row',
                                marginEnd: 10,
                            }}>
                            <OVText
                                size={large}
                                fontType={poppinsMedium}
                                color={WHITE}
                                style={{ textAlign: 'left' }}>
                                {title}
                            </OVText>
                        </View>

                        {notification && (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => navigation.navigate('Notificatios')}>
                                <Image
                                    source={NOTIFICATION}
                                    resizeMode="contain"
                                    style={{ width: 30, height: 30, marginEnd: 10 }}
                                />
                            </TouchableOpacity>
                        )}
                        {(notification && typeof petProfileData != 'undefined' &&  petProfileData !== undefined ) ?
                            <TouchableOpacity activeOpacity={1} onPress={() => onSidemenuClick()}
                            >
                                {(petProfileData !== undefined && petProfileData.pet_img_path != '' && petProfileData.pet_img_path != null) ?
                                    <Image
                                        source={{ uri: petProfileData.pet_img_path }}
                                        style={{ width: 30, height: 30, borderRadius: 20, margin: 10, borderColor: ORANGE, borderWidth: 2}}
                                    />
                                    :
                                    <Image
                                        source={PET_IMAGE_SMALL}
                                        style={{ width: 30, height: 30, borderRadius: 20, marginEnd: 0, borderColor: ORANGE, borderWidth: 2 }}
                                    />
                                }
                            </TouchableOpacity>
                            :
                            <TouchableOpacity activeOpacity={1} onPress={() => { }}>
                                <View
                                    style={{ width: 30, height: 30, borderRadius: 20, margin: 10 }} >
                                </View>

                            </TouchableOpacity>
                        }

                        {video && (
                            <TouchableOpacity activeOpacity={1} onPress={() => onVideoCall()}>
                                <Image
                                    source={VIDEO_CALL}
                                    resizeMode="contain"
                                    style={{ width: 30, height: 30, tintColor: WHITE }}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </LinearGradient>
            )}
        </View>
    );
};
