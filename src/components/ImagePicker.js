/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, Text, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BLACK, GRAY_200, WHITE} from '../utils/Colors';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
var RNFS = require('react-native-fs');
import {showToastMessage} from '../utils';

export default function ImagePicker(props) {
  const {dialogVisible, setDialogVisible, selectedImagePath} = props;

  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 200,
      maxHeight: 200,
    };
    launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped ');
      } else {
        const source = res.uri;
        selectedImagePath(source);
        setDialogVisible(false);
      }
    });
  };
  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 200,
      maxHeight: 200,
    };

    launchImageLibrary(options, res => {
      console.log(res, 'getting in res>>.');
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        const source = res.uri;
        selectedImagePath(source);
        setDialogVisible(false);
      }
    });
  };

  const onUploadDocumentPress = async () => {
    try {
      const res = await DocumentPicker.pick({
        // type: [DocumentPicker.types.pdf],
        // type: [DocumentPicker.types.images],
        // type: [DocumentPicker.types.docx],
      });

      console.log('picked document is: ', res);

      const source = res && res.length > 0 && res[0].uri;

      console.log(source, 'sorce is ?>>>>>>');

      if (res && res.length && res[0].size <= 2625339) {
        RNFetchBlob.fs
          .stat(source)
          .then(stats => {
            console.log(stats, 'rn fetch blob>>>>');
            //output: /storage/emulated/0/WhatsApp/Media/WhatsApp Images/IMG-20200831-WA0019.jpg
            selectedImagePath(`file://${stats && stats.path}`);
          })
          .catch(err => {
            console.log('err--', err);
          });
      } else {
        showToastMessage('Please upload a file less than 2Mb');
      }
    } catch (error) {
      console.log('document picker error: ', error);
      if (DocumentPicker.isCancel(error)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      }
    }
  };

  return (
    <Modal
      visible={dialogVisible}
      transparent={true}
      animationType={'fade'}
      onRequestClose={() => {
        setDialogVisible(!dialogVisible);
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
            backgroundColor: WHITE,
            width: '80%',
            alignItems: 'center',
            borderRadius: 6,
            elevation: 4,
            flexDirection: 'column',
          }}>
          <Text
            style={{
              color: BLACK,
              fontSize: 18,
              textAlign: 'center',
              paddingVertical: 20,
              marginTop: 10,
            }}
            onPress={() => cameraLaunch()}>
            Take Photo
          </Text>

          <View
            style={{
              height: 1,
              backgroundColor: GRAY_200,
              width: '100%',
            }}
          />

          <Text
            style={{
              color: BLACK,
              fontSize: 18,
              textAlign: 'center',
              paddingVertical: 10,
              marginTop: 10,
              fontFamily: 'Raleway-Bold',
            }}
            // onPress={() => imageGalleryLaunch()}
            onPress={() => onUploadDocumentPress()}>
            Choose Image From Gallery or Docs
          </Text>

          <View
            style={{
              height: 1,
              marginTop: 20,
              backgroundColor: GRAY_200,
              width: '100%',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: GRAY_200,
              borderBottomStartRadius: 6,
              borderBottomEndRadius: 6,
            }}>
            <Text
              style={{
                color: BLACK,
                fontSize: 18,
                padding: 10,
                fontFamily: 'Raleway-Sembold',
                textAlign: 'center',
                flex: 1,
              }}
              onPress={() => {
                setDialogVisible(false);
              }}>
              Cancel
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
