import React from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import { relativeHeight, relativeWidth } from "./Matrix";

export default ({ onPress = () => { }, buttonText = "", source = '' }) => {
    return (
        <View style={styles.mainBox}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Image style={styles.image} source={source} />
            </TouchableOpacity>
            <View style={{ marginTop: relativeHeight(18), width: relativeWidth(65) }}>
                <Text>{buttonText}</Text>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    mainBox: {
        justifyContent: "center",
        alignItems: 'center'
    },
    button: {
        width: relativeWidth(100),
        height: relativeWidth(100),
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 20,
        shadowOpacity: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    image: {
        width: relativeWidth(61.1),
        height: relativeHeight(43.3),
        resizeMode: "cover",
    }
})