import React from "react";
import { TouchableOpacity, View, StyleSheet, Text, Platform } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { relativeHeight, relativeWidth } from "./Matrix";
import BaseColors, { colorGroup } from "./BaseColors";
export default ({ onPress = () => { }, buttonText = "", height = 50, isDisable = false, fontSize = 15, isSecondory = false, buttonColor = BaseColors.gradientDarkBlue, isButtonColor = false, backgroundColorDisable=BaseColors.white, disabledFontColor=BaseColors.lightGrey, borderWidth=1, isrelatedWidth=false, primaryBacgroundColor=colorGroup.solidButton}) => {
    return (
        <>
            {isSecondory ?
                <TouchableOpacity disabled={isDisable} onPress={onPress}
                    style={[styles.buttonStyle(height, isrelatedWidth), {
                        borderRadius:  height,
                        borderWidth:borderWidth,
                        borderColor: isDisable?BaseColors.btnDisableColor :BaseColors.black,
                    }, isDisable ? {backgroundColor: backgroundColorDisable} : styles.btnShadow]}>
                    <Text >
                        {buttonText}
                    </Text>
                </TouchableOpacity>
                :
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.3, y: 0.5 }}
                    locations={[0, 0.85]}
                    colors={primaryBacgroundColor} style={styles.linearGradient(height)}>
                    <TouchableOpacity disabled={isDisable} onPress={onPress}
                        style={[styles.buttonStyle(height), {
                            borderRadius: 10,
                        }, isDisable ? {} : styles.btnShadow]}>
                        <Text
                       >
                            {buttonText}
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            }
        </>
    )
}
const styles = StyleSheet.create({
    linearGradient: (height, isrelatedWidth) => ({
        // width: relativeHeight(335),
        width: "100%",
        height: isrelatedWidth? relativeWidth(height) :relativeHeight(height),
        borderRadius: relativeHeight(height),
        shadowColor: "#23AEF4",
        shadowOffset: {
            width: 0,
            height: 16
        },
        shadowRadius: 22,
        shadowOpacity: 1
    }),
    buttonStyle: (height) => ({
        height: relativeHeight(height),
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    }),
    btnShadow: Platform.select({
        ios:{
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 3,
            shadowOpacity: 0.2,
            elevation: 1,
        },
        android:{
        }
    })
})