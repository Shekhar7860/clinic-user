/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Header } from '../../common/Header';
import Network from '../../network/Network';
import { AuthContext } from '../../services/authProvider';
import { showToastMessage } from '../../utils';
import { BG_COLOR, BLACK } from '../../utils/Colors';

export function Chat(props) {

    const { itemData } = props.route.params;
    const navigation = useNavigation();
    const { user, token, mesiboToken, mesiboId } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    // console.log('Item Data ->>>    ', itemData);

    useEffect(() => {
        getAllMessages();
        // messaging().onMessage(async remoteMessage => {
        //   //getAllMessages();
        //   // MesiboModule.onVideoCall();
        // });
    }, []);

    const getAllMessages = date => {
        setMessages([]);
        setLoading(true);
        const payload = { user_id: itemData.doctor_id };
        Network('user/get-user-msg?appointment_id='+itemData?.id, 'get', null, token)
            .then(async res => {
                console.log(' /n/n Result ', JSON.stringify(res));
                setLoading(false);
                if (res.status === true) {
                    const dataArray = res.data;
                    setLoading(false);
                    for (let i = 0; i < dataArray.length; i++) {
                        var newMessages = null;
                        newMessages = [
                            {
                                _id: i,
                                text: dataArray[i].message,
                                createdAt: new Date(dataArray[i].created_at),
                                user: {
                                    _id: dataArray[i].sender_id,
                                    name: dataArray[i].sender_type,
                                },
                            },
                        ];

                        setMessages(prevMessages =>
                            GiftedChat.append(prevMessages, newMessages),
                        );
                    }
                }
            })
            .catch(error => {
                setLoading(false);
                showToastMessage(error);
            });
    };

    const sendMessageAction = messages => {
        setLoading(true);
        const payload = { appointment_id:itemData?.id, reciver_id: itemData.doctor_id, message: messages[0].text };
        Network('user/send-user-msg', 'post', payload, token)
            .then(async res => {
                console.log(' /n/n Result ', JSON.stringify(res));
                setLoading(false);
                onSend(messages);
            })
            .catch(error => {
                setLoading(false);
                showToastMessage(error);
            });
    };

    const onSend = useCallback((messages = []) => {
        console.log(messages);
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        );
    }, []);

    const initiateVideoCall = () => {
        setLoading(true);
        var roomName = 'AppoinmenttId' + new Date().toJSON();

        const payload = {
            receiver_id: itemData.doctor_id,
            sender_id: user.id,
            room_name: roomName,
        };
        Network('user/start-video-call', 'post', payload, token)
            .then(async res => {
                console.log(' /n/n Result ', JSON.stringify(res));
                setLoading(false);
                navigation.navigate('VideoCall', {
                    accessToken: res.data.video_token,
                    roomName: roomName,
                    authToken: token,
                    userId: user.id,
                });
                //getAccressToken(roomName);
            })
            .catch(error => {
                setLoading(false);
                showToastMessage(error);
            });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <Header
                isHome={false}
                navigation={navigation}
                onBackPressed={() => navigation.goBack()}
                title="Appointments"
                notification={false}
                video={true}
                onVideoCall={() => {
                    initiateVideoCall();
                }}
            />
            <GiftedChat
                messages={messages}
                textInputStyle={{ color: BLACK }}
                onSend={messages => sendMessageAction(messages)}
                user={{
                    _id: user.id,
                }}
            />
        </SafeAreaView>
    );
}
