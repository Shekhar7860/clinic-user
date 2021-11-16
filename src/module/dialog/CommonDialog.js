/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, Image, Modal, TouchableOpacity, View } from 'react-native';
import OVText, { medium, poppinsRegular } from '../../components/OVText';
import { CLOSE_DIALOG } from '../../images';
import { APP_THEME_COLOR, BLACK, GRAY_200, WHITE } from '../../utils/Colors';

export default function CommonDialog(props) {
    const {
        dialogVisible,
        setDialogVisible,
        onSelectedItem,
        title,
        data,
        height = '70%',
    } = props;

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => onSelectedItem(item)}
            style={{
                borderRadius: 10,
                padding: 15,
                paddingStart: 10,
                backgroundColor: index % 2 ? WHITE : GRAY_200,
            }}>
            <OVText
                size={medium}
                fontType={poppinsRegular}
                color={BLACK}
                style={{ textAlign: 'left', flex: 1 }}>
                {item.name}
            </OVText>
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={dialogVisible}
            transparent={true}
            animationType={'fade'}
            onRequestClose={() => {
                dialogVisible;
            }}>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    backgroundColor: 'rgba(52, 52, 52, 0.6)',
                }}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        width: '80%',
                        borderRadius: 20,
                        elevation: 4,
                        flexDirection: 'column',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: APP_THEME_COLOR,
                            padding: 10,
                            borderTopLeftRadius: 20,
                            borderTopEndRadius: 20,
                            alignItems: 'center',
                        }}>
                        <OVText
                            size={medium}
                            fontType={poppinsRegular}
                            color={WHITE}
                            style={{ flex: 1, marginLeft: 10 }}>
                            {title}
                        </OVText>
                        <TouchableOpacity
                            style={{ margin: 10 }}
                            activeOpacity={1}
                            onPress={() => setDialogVisible(false)}>
                            <Image source={CLOSE_DIALOG} style={{ tintColor: WHITE }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}
