import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking } from "react-native";
import CryptoJS from "crypto-js";
import defaultValue from '../constants/defaultValue'
import { buildLink } from "../services/google/deepLinkingHandler";
import Share from 'react-native-share';

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const validate = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.email) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.password) {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.isAlphaNumeric) {
    const pattern = /^[a-z\d\-_\s]+$/i;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const timeFormat = (time) => {
  var dt = new Date(time);
  if (dt.getDate() === new Date().getDate()) {
    return `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`
  }
  return `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`

}

export const dateFormat = (time, oldTime) => {
  var dt = new Date(time);
  if (oldTime === undefined) {
    return `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(2, '0').slice(-2)}`
  }
  var oldDt = new Date(oldTime);
  if ((dt.getDate() === oldDt.getDate()) && (dt.getMonth() === oldDt.getMonth()) && (dt.getFullYear() === oldDt.getFullYear())) {
    return null
  } else if (dt.getDate() === new Date().getDate()) {
    return `Today`
  } else {
    return `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(2, '0').slice(-2)}`
  }
}

export const getAccessToken = async () => {
  try {
    const varData = await AsyncStorage.getItem('token') || "{}";
    return varData;
  } catch (e) {
    console.log(e)
  }
}

export const setStoreData = async (key, data) => {
  try {
    const cipherDoc = CryptoJS.AES.encrypt(JSON.stringify(data) || '[]', defaultValue[defaultValue.env].apiEncryptionSecret).toString();
    return await AsyncStorage.setItem(key, cipherDoc);
  } catch (e) {
    console.log(e);
    return []
  }
}

export const getStoreData = async (key) => {
  try {
    const varData = await AsyncStorage.getItem(key) || '[]';
    const bytes = CryptoJS.AES.decrypt(varData, defaultValue[defaultValue.env].apiEncryptionSecret);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (e) {
    // console.log(e);
    return []
  }
}

export const removeFromStore = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true
  } catch (e) {
    console.log(e);
    return true
  }
}

export const saveFncToStore = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
}

export const getStoreObjData = async (key) => {
  try {
    const varData = await AsyncStorage.getItem(key) || "{}"
    return JSON.parse(varData);
  } catch (e) {
    console.log(e);
  }
}

export const openUrl = async (url) => {
  try {
    const supported = await Linking.openURL(url);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Invalid Url: ${url}`);
    }
  } catch (e) {
    Alert.alert(`Invalid Url: ${url}`);
  }
};

const disLogic = (val) => {
  if (val < 1) {
    return '< 1';
  } else {
    return val;
  }
}

export const calDistance = (lat1, lon1, lat2, lon2) => {
  try {
    var R = 6371; // km (change this constant to get miles)
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    if (d > 1) return disLogic(Math.round(d));
    else if (d <= 1) return disLogic(Math.round(d));
    return disLogic(d);
  } catch (e) {
    return '--'
  }
}

const queryStringBulder = (obj) => {
  try {
    let str = [];
    for (let p in obj)
      if (obj.hasOwnProperty(p) && p !== null && obj[p] !== '') {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  } catch (e) {
    return ''
  }
}

export const apiEncryptionData = (data, isParam) => {
  try {
    const cipherDoc = CryptoJS.AES.encrypt(JSON.stringify(data), defaultValue[defaultValue.env].apiEncryptionSecret).toString();
    const varData = {
      data: cipherDoc,
      encritption: true
    }
    if (isParam) {
      if (defaultValue[defaultValue.env].apiEncryption) {
        return '?' + queryStringBulder(varData)
      } else {
        return '?' + queryStringBulder(data)
      }
    } else {
      if (defaultValue[defaultValue.env].apiEncryption) {
        return varData
      } else {
        return data
      }
    }
  } catch (e) {
    return data
  }
}

export const apiDecryptionData = (data) => {
  try {
    if (data?.encritption && data?.data) {
      const bytes = CryptoJS.AES.decrypt(data.data.toString(), defaultValue[defaultValue.env].apiEncryptionSecret);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } else {
      return data
    }
  } catch (e) {
    return data
  }
}

export const quaryData = (dataUrl) => {
  try {
    const paramArr = dataUrl.slice(dataUrl.indexOf('?') + 1).split('&');
    const params = {};
    paramArr.map(param => {
      const [key, val] = param.split('=');
      params[key] = decodeURIComponent(val);
    })
    return params;
  } catch (e) {
    return {}
  }
}

export const onShare = async (param, title, type, image) => {
  try {
    const url = 'https://projectxmobile.com/?' + queryStringBulder(param)
    const longUrl = await buildLink(url);
    const options = {
      title: type + ': ' + title,
      message: 'Take a look at this ' + type + ': ' + title + ', click to see details: ' + longUrl,
      // ...image && { url: image }
    }
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  } catch (e) {
    console.log(e)
  }
}

export const truncate = (eString, elength) => {
  try {
    const string = eString ? eString : '--'
    let length = elength
    if (!length) {
      length = 30;
    }
    if (elength === -1) {
      length = eString.length;
    }
    return string.substring(0, length) + (string.length > length ? '...' : '');
  } catch (e) {
    return ''
  }
}

export { queryStringBulder };