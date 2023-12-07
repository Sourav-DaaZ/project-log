import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import Routes from '../../constants/routeConst';
import errorFnc from '../errorHandeler/errorFunc';
import {
  StyledContainer,
  StyledButton,
  StyledReverse,
  StyledTextContainer,
  StyledText,
} from './style';
var RNFS = require('react-native-fs');

const CameraComponent = props => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isBack, setIsBack] = React.useState(false);
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = isBack ? devices.back : devices.front;
  const takePhotoOptions = {
    qualityPrioritization: 'balanced',
    flash: 'off',
    quality: 25,
  };

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const takePhoto = async () => {
    try {
      if (camera.current == null) throw new Error('Camera Ref is Null');
      const photo = await camera.current.takeSnapshot(takePhotoOptions);
      const base64image = await RNFS.readFile(photo.path, 'base64');
      props.setUrl('data:image/png;base64,' + base64image);
      props.close();
    } catch (e) {
      console.log(e)
    }
  };

  return device != null && hasPermission ? (
    <StyledContainer>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <StyledButton name='camera' onPress={takePhoto}></StyledButton>
      <StyledReverse onPress={() => setIsBack(!isBack)} name="camera-reverse" />
    </StyledContainer>
  ) : (
    <StyledTextContainer>
      <StyledText>Please give your camera access from Setting.</StyledText>
    </StyledTextContainer>
  );
};

export default CameraComponent;
