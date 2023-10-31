/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { relativeHeight, relativeWidth } from './src/component/Matrix';
import { createImage } from './src/component/Service';
import GradientButton from './src/component/GradientButton';
import ShadowButton from './src/component/ShadowButton';
import ImageUploadButton from './src/component/ImageUploadButton';
import Repository from './src/component/Repository';


function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [img, setImg] = useState(null)
  const [open, setOpen] = useState(false)
  const [updatedImgData, setUpdatedImgData] = useState('');
  const [path, setPath] = useState('');
  const [tag, setTag] = useState('')

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onUpload = async () => {
    let data = { ...updatedImgData, size: updatedImgData?.fileSize, lastModified: new Date(updatedImgData?.timestamp).getTime() }
    const formData = new FormData();
    if (data.size) {
      formData.append('file', {
        uri: data.path,
        type: data.type,
        name: data.filename
      });
      const path = `https://asia-southeast1-disesesidentificationsystem.cloudfunctions.net/diseasePrediction`
      Repository.postData(path, formData).then((response) => {
        setTag(response?.data)

      }).catch((err) => {
        console.log("Error : ", err)
        Alert.alert("Error", JSON.stringify(err))
      })

    }
  };

  const onClean = () => {
    setImg(null);
    setUpdatedImgData('');
    setPath('');
    setTag('')
  }

  return (
    <View style={styles.container}>
      <ScrollView>

        <View style={{ marginTop: 30 }}>
          <TouchableOpacity onPress={() => setOpen(true)} style={{ height: relativeHeight(160), width: relativeWidth(335), alignSelf: 'center', backgroundColor: '#cccccc' }}>
            {img ? <Image style={styles.image} source={{ uri: img }} /> : null
            }
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: relativeWidth(20), marginTop: 20 }}>
            <View style={{ width: relativeWidth(120) }}>
              <GradientButton onPress={onUpload} buttonText='Test' />
            </View>
            <View style={{ width: relativeWidth(120) }}>
              <GradientButton onPress={onClean} isSecondory buttonText='Clear' />
            </View>

          </View>
        </View>
        <View style={{ height: relativeHeight(600), backgroundColor: 'red', width: relativeWidth(375) }}>
          <WebView
            originWhitelist={['*']}
            source={{ html: tag }}
          />

        </View>
        <ImageUploadButton
          open={open}
          onClose={() => {
            setOpen(false)
          }}
          onPress={({ isImage, data }) => {
            if (isImage) {
              const file = createImage(data);
              setImg(data.uri);
              setUpdatedImgData(file);
              setPath(data.uri)
              // setIsImageError(false)
            }
            setOpen(false)
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  image: {
    height: relativeHeight(160),
    width: relativeWidth(335),
    resizeMode: 'contain'
  }
});

export default App;



