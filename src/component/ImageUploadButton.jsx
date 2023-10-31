import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image, Platform } from 'react-native';
import { relativeHeight, relativeWidth } from './Matrix';
import colors from './BaseColors';
import UploadAPhoto from "../../assets/Popups/Uploadphoto.png";
import TakeAPhoto from "../../assets/Popups/TakaAphoto.png";
import GradientButton from './GradientButton';
import ShadowButton from './ShadowButton';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import _ from "lodash";
export default ({ open, onClose = () => { }, onPress = () => { }, }) => {
  
    const options = (mediaType) => ({
        noData: true,
        mediaType,
        includeExtra: true,
    });
    const onResponse = (response) => {
        if (response['assets']) {
            const object = response['assets'][0];
            const isImage = object.type.includes("image");
            const path = object.uri;
            onPress({
                isImage,
                data: {
                    ...object,
                    path,
                    uri: Platform.OS === 'android' ? object.uri : object.uri.replace('file://', ''),
                }
            })
        }
    }
    const handleChoosePhoto = (index) => {
        switch (index) {
            case 0: {
                launchCamera(options('photo'), (response) => {
                    onResponse(response);
                });
                break;
            }
            case 1: {
                launchImageLibrary(options('mixed'), (response) => {
                    onResponse(response);
                },)
                break;
            }
            default: {
                onClose();
                break;
            }
        }
    }
return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
            onClose()
        }}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text>{"Select A Image"}</Text>
                <View style={styles.buttonContainer}>
                    <ShadowButton
                        onPress={()=>handleChoosePhoto(1)}
                        source={UploadAPhoto} buttonText={'Upload Photo'} />
                    <View style={styles.centerLine} />
                    <ShadowButton
                        onPress={()=>handleChoosePhoto(0) }
                        source={TakeAPhoto} buttonText={'Take a Photo'} />
                </View>
                <View style={styles.buttonBox}>
                    <GradientButton onPress={onClose} buttonText={"Close"} />
                </View>
            </View>
        </View>
    </Modal>
);
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: colors.modalBackground
    },
    modalView: {
        width: relativeWidth(348),
        height: relativeHeight(418),
        borderRadius: 50,
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: relativeWidth(46),
        paddingVertical: relativeHeight(32)
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: relativeHeight(61),
        marginBottom: relativeHeight(54)
    },
    centerLine: {
        width: 1.2,
        height: relativeHeight(155),
        // transform: "rotate(-89.911deg)",
        backgroundColor: colors.textBoxColor
    },
    buttonBox: {
        width: relativeWidth(228),
        alignSelf: "center"
    }
});