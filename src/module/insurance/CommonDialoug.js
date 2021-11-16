/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    FlatList
    , Image,
    Modal,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput
} from 'react-native';
import OVText, { medium, poppinsRegular } from '../../components/OVText';
import { CLOSE_DIALOG } from '../../images';
import { APP_THEME_COLOR, BLACK, GRAY_200, WHITE } from '../../utils/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CommonDialoug(props) {
    const {
        dialogVisible,
        setDialogVisible,
        onSelectedItem,
        title,
        data,
        type,
        height = '40%',
        searchUpdatedState,
        setUpdatedData,
    } = props;

    const [search, setSearch] = React.useState('');
    const [refresh, setRefresh] = React.useState(false);
    const [isSearch, setIsSearch] = React.useState(false);

    console.log("data", data);

    const filterList = (string) => {
        console.log(string, 'coming in this')
        let filterArray = data.filter(function (e) {
            // return e.name.toLowerCase().match(string.toLowerCase())
            if (e.name.toLowerCase().match(string.toLowerCase())) {
                return e
            }
            // return e.name.toLowerCase().search(string.toLowerCase()) >= 0;
        });

        console.log(filterArray, 'filter array is >>>>')
        // setListData(filterArray);
        setIsSearch(true)
        setUpdatedData(filterArray)
        setSearch(string);
        setRefresh(!refresh);
    }


    const getTextName = (item, type) => {
        switch (type) {
            case 1:
                return item.pet_name;
            case 2:
                return item.breed_name;
            case 3:
                return item.petName;
            case 4:
                return item.name;
        }
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => onSelectedItem(item, index)}
            style={{
                padding: 15,
                paddingStart: 10,
                backgroundColor: index % 2 ? WHITE : GRAY_200,
            }}>
            <OVText
                size={medium}
                fontType={poppinsRegular}
                color={BLACK}
                style={{ textAlign: 'left', flex: 1 }}>
                {getTextName(item, type)}
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
                        height: height,
                    }}>
                    <View style={{ flex: 1 }}>
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

                        <View style={styles.searchSection}>
                            <Icon style={styles.searchIcon} name="search" size={20} color="#000" />
                            <TextInput
                                style={styles.input}
                                placeholder="Type Here"
                                value={search}
                                onChangeText={(searchString) => {
                                    filterList(searchString);
                                }}
                                underlineColorAndroid="transparent"
                            />
                            {search != '' && (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        filterList('');
                                        setIsSearch(false)
                                    }}>
                                    <Icon style={styles.searchIconRight} name="close" size={20} color="#000" />
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <FlatList
                                // data={data}
                                data={isSearch ? searchUpdatedState : data}
                                renderItem={renderItem}
                                keyExtractor={item => item.image}
                                extraData={refresh || data || searchUpdatedState}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({

    searchSection: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    searchIconRight: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
})