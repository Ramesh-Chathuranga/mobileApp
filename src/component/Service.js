import { PixelRatio, Platform, Dimensions, StatusBar } from 'react-native';
import _ from "lodash";
export const createImage = (file) => {
    let uri = Platform.OS === 'android' ? file.path : file.uri;
    const type = file.type;
    uri = Platform.OS === 'android' ? uri : uri.replace('file://', '');
    const name = file.fileName;
    const size = file.fileSize;
    const data = {
      ...file,
      lastModified: new Date().getTime(),
      uri,
      name,
      size,
      type,
      filename: name,
    };
    return data;
  };