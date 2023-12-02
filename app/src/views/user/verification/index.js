import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components';
import Input from '../../../sharedComponents/input';
import validation from '../../../constants/validationMsg';
import InsideAuthApi from '../../../services/inSideAuth';
import { useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../../store/actions';
import Routes from '../../../constants/routeConst';

import {
  SubmitButton,
  InputView,
  StyledScrollView,
  BodyWrapper,
  StyledImageBackground,
  StyledCardCover,
  StyledTitle
} from './style';
import { ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import errorFnc from '../../errorHandeler/errorFunc';
import BannerImg from '../../../assets/images/logo.png';

const Verification = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const colors = themeContext.colors[themeContext.baseColor];
  const [loading, setLoading] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [userIdProof, setUserIdProof] = useState('');
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    setContactNumber(props.route.params?.data?.contactNumber ? props.route.params.data.contactNumber : '');
    setUserIdProof(props.route.params?.data?.userIdProof ? props.route.params.data.userIdProof : '');
    setUserImage(props.route.params?.data?.userImage ? props.route.params.data.userImage : '')
  }, [props])

  const editDetailsFnc = () => {
    try {
      let isValid = [];
      isValid.push(contactNumber.length > 0);
      isValid.push(userIdProof.length > 0);
      isValid.push(userImage.length > 0);
      if (isValid.includes(false)) {
        errorFnc(validation.validateField(), true);
      } else {
        setLoading(true);
        const requestData = {
          contactNumber: contactNumber,
          userImage: userImage,
          userIdProof: userIdProof
        }
        InsideAuthApi()
          .requestedForUserVerification(requestData)
          .then((res) => {
            setLoading(false);
            dispatch(snackbarUpdate({
              type: 'success',
              msg: res?.message
            }));
            props.navigation.goBack();
          })
          .catch((err) => {
            setLoading(false);
            errorFnc(err?.data?.message ? err.data.message : '', true)
          });
      }
    } catch (e) {
      errorFnc(e)
    }
  }

  return (
    <ShadowWrapperContainer bgWhite>
      <StyledScrollView>
        <BodyWrapper>
          <StyledTitle>User Image</StyledTitle>
          <TouchableOpacity onPress={() => props.navigation.navigate(Routes.camera, {
            data: {
              contactNumber: contactNumber,
              userIdProof: userIdProof,
              userImage: userImage
            },
            selectItem: 'userImage'
          })}>
            <StyledImageBackground resizeMode='cover' blurRadius={10} source={userImage !== '' ? { uri: userImage } : BannerImg}>
              <StyledCardCover source={userImage ? { uri: userImage } : BannerImg} resizeMode='contain' />
            </StyledImageBackground>
          </TouchableOpacity>
          <StyledTitle>Id Proof</StyledTitle>
          <TouchableOpacity onPress={() => props.navigation.navigate(Routes.camera, {
            data: {
              contactNumber: contactNumber,
              userIdProof: userIdProof,
              userImage: userImage
            },
            selectItem: 'userIdProof'
          })}>
            <StyledImageBackground resizeMode='cover' blurRadius={10} source={userIdProof ? { uri: userIdProof } : BannerImg}>
              <StyledCardCover source={userIdProof ? { uri: userIdProof } : BannerImg} resizeMode='contain' />
            </StyledImageBackground>
          </TouchableOpacity>
          <InputView>
            <Input
              title={'Contact Number'}
              placeholder={'Enter your phone number'}
              onInputChange={(val) => setContactNumber(val)}
              onSubmit={() => Keyboard.dismiss()}
              value={contactNumber}
              type={'input'}
              keyNum={true}
              ele={'input'}
            />
          </InputView>
          <SubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' loading={loading} onPress={!loading ? editDetailsFnc : null}>
            Save
          </SubmitButton>
        </BodyWrapper>
      </StyledScrollView>
    </ShadowWrapperContainer >
  );
};

export default Verification;