import React, {useContext, useState} from 'react';
import LoginLayout from '../../sharedComponents/layout/loginLayout';
import {ThemeContext} from 'styled-components';
import Input from '../../sharedComponents/input';
import defaultValue from '../../constants/defaultValue';
import {updateObject, validate} from '../../utils';
import validation from '../../constants/validationMsg';
import Modal from '../../sharedComponents/modal';
import OutsideAuthApi from '../../services/outSideAuth';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {snackbarUpdate, tokenUpdate} from '../../store/actions';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {
  LoginOuterView,
  SplashTitle,
  LoginDescription,
  LoginSubmitButton,
  InputView,
  StyledInputOtp,
  StyledViewButton,
  StyledForgot,
} from './style';

import Routes from '../../constants/routeConst';
import Tabs from '../../sharedComponents/tab';
import errorFnc from '../errorHandeler/errorFunc';

const Login = props => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const spacing = themeContext.spacing;
  const [modalShow, setModalShow] = useState(false);
  const [isOtpLogin, setIsOtpLogin] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [data, setData] = useState({
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          text: 'User ID / Email',
          placeholder: 'Enter your User ID / email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome
            name="user-o"
            color="#05375a"
            size={spacing.width * 5}
          />,
          <Feather
            name="check-circle"
            color="green"
            size={spacing.width * 5}
          />,
        ],
      },
      password: {
        elementType: 'password',
        elementConfig: {
          type: 'password',
          text: 'Password',
          placeholder: 'Enter your password',
        },
        value: '',
        validation: {
          required: true,
          password: true,
        },
        errors: '',
        valid: false,
        className: [],
        icons: [
          <FontAwesome name="lock" color="#05375a" size={spacing.width * 5} />,
          <Feather name={'eye-off'} color="gray" size={spacing.width * 5} />,
        ],
      },
      otp: {
        elementType: 'password',
        value: '',
        elementConfig: {
          type: 'otp',
          text: 'Otp',
          placeholder: 'Enter your OTP',
        },
        validation: {
          required: true,
          minLength: defaultValue.otpLength,
        },
        valid: false,
        errors: '',
        success: '',
        className: [],
        icons: [
          <FontAwesome name="lock" color="#05375a" size={spacing.width * 5} />,
        ],
      },
    },
  });
  const formElementsArray = [];
  const dispatch = useDispatch();

  const onInputChange = (val, type) => {
    try {
      let varVal = {};
      if (!validate(val, {required: true})) {
        varVal = updateObject(data, {
          controls: updateObject(data.controls, {
            [type]: updateObject(data.controls[type], {
              value: val,
              errors: validation.requiredField(),
              valid: false,
            }),
          }),
        });
      } else if (type === 'password' && !validate(val, {password: true})) {
        varVal = updateObject(data, {
          controls: updateObject(data.controls, {
            [type]: updateObject(data.controls[type], {
              value: val,
              errors: validation.validateField('password'),
              valid: false,
            }),
          }),
        });
      } else if (
        type === 'otp' &&
        !validate(val, {minLength: defaultValue.otpLength})
      ) {
        varVal = updateObject(data, {
          controls: updateObject(data.controls, {
            [type]: updateObject(data.controls[type], {
              value: val,
              errors: validation.validateField('OTP'),
              success: '',
              valid: false,
            }),
          }),
        });
      } else {
        varVal = updateObject(data, {
          controls: updateObject(data.controls, {
            [type]: updateObject(data.controls[type], {
              value: val,
              errors: '',
              valid: true,
            }),
          }),
        });
      }
      setData(varVal);
    } catch (e) {
      errorFnc(e);
    }
  };

  const loginFnc = () => {
    try {
      let isValid = [];
      let val = {};
      formElementsArray.map(
        x => (
          x.id == 'email' ||
          (!isOtpLogin && x.id == 'password') ||
          (isOtpLogin && modalShow && x.id == 'otp')
            ? (val[x.id] = x.config.value)
            : null,
          (!isOtpLogin && x.id == 'password') ||
          (isOtpLogin && modalShow && x.id == 'otp')
            ? isValid.push(x.config.valid)
            : null
        ),
      );
      if (isValid.includes(false)) {
        errorFnc(validation.validateField(), true);
      } else {
        if (isOtpLogin && !modalShow) {
          const requestData = {
            ...(validate(data.controls.email.value, {email: true}) && {
              email: data.controls.email.value,
            }),
            ...(!validate(data.controls.email.value, {email: true}) && {
              userId: data.controls.email.value,
            }),
          };
          let varVl;
          varVl = updateObject(data, {
            controls: updateObject(data.controls, {
              otp: updateObject(data.controls.otp, {
                errors: '',
                value: '',
                valid: true,
              }),
            }),
          });
          setData(varVl);
          setLoader(true);
          OutsideAuthApi()
            .verifyOtp(requestData)
            .then(res => {
              setLoader(false);
              setModalShow(true);
            })
            .catch(err => {
              setLoader(false);
              errorFnc(err?.data?.message ? err.data.message : '', true);
            });
        } else {
          const requestData = {
            userId: data.controls.email.value,
            ...(modalShow && {otp: data.controls.otp.value.toString()}),
            ...(!modalShow && {password: data.controls.password.value}),
          };
          let varVl;
          setLoader(true);
          OutsideAuthApi()
            .loginApi(requestData)
            .then(res => {
              setLoader(false);
              dispatch(
                tokenUpdate({
                  access_token: res.data.access_token,
                  refresh_token: res.data.refresh_token,
                }),
              );
            })
            .catch(err => {
              setLoader(false);
              errorFnc(err?.data?.message ? err.data.message : '', true);
              varVl = updateObject(data, {
                controls: updateObject(data.controls, {
                  otp: updateObject(data.controls.otp, {
                    errors: err?.data?.message,
                    value: '',
                    valid: false,
                  }),
                }),
              });
              setData(varVl);
            });
        }
      }
    } catch (e) {
      errorFnc(e);
    }
  };

  const resetPassword = () => {
    try {
      const requestData = {
        ...(validate(data.controls.email.value, {email: true}) && {
          email: data.controls.email.value,
        }),
        ...(!validate(data.controls.email.value, {email: true}) && {
          userId: data.controls.email.value,
        }),
      };
      if (!data.controls.email.valid) {
        errorFnc(validation.validateField(), true);
      } else {
        setLoader(true);
        OutsideAuthApi()
          .requestForChangePassword(requestData)
          .then(res => {
            setLoader(false);
            dispatch(
              snackbarUpdate({
                type: 'success',
                msg: res.message,
              }),
            );
          })
          .catch(err => {
            setLoader(false);
            errorFnc(err?.data?.message ? err.data.message : '', true);
          });
      }
    } catch (e) {
      errorFnc(e);
    }
  };

  for (let key in data.controls) {
    formElementsArray.push({
      id: key,
      config: data.controls[key],
    });
  }

  return (
    <LoginLayout {...props}>
      <StyledViewButton>
        <Tabs
          select={true}
          text="Log In"
          onPress={() => {
            props.navigation.navigate(Routes.login);
          }}
        />
        {/* <Tabs
          select={false}
          text="Register"
          onPress={() => {
            props.navigation.navigate(Routes.register);
          }}
        /> */}
      </StyledViewButton>
      <LoginOuterView
        // contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        >
        <InputView>
          {formElementsArray?.map(
            (x, index) =>
              x.id !== 'otp' &&
              !(x.id === 'password' && isOtpLogin) && (
                <Input
                  key={index}
                  title={x.config?.elementConfig?.text}
                  placeholder={x.config?.elementConfig?.placeholder}
                  onInputChange={onInputChange}
                  onSubmit={() => Keyboard.dismiss()}
                  value={x.config?.value}
                  type={x.config?.elementConfig?.type}
                  isValid={x.config?.valid}
                  validation={x.config?.validation}
                  errorMsg={x.config?.errors}
                  icons={x.config?.icons}
                  ele={x.config?.elementType}
                />
              ),
          )}
          {/* <StyledForgot>
            <TouchableOpacity
              onPress={() => props.navigation.navigate(Routes.forgotPassword)}>
              <LoginDescription>Forgot Password?</LoginDescription>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsOtpLogin(!isOtpLogin)}>
              <LoginDescription>
                {!isOtpLogin ? 'OTP Login' : 'Password Login'}
              </LoginDescription>
            </TouchableOpacity>
          </StyledForgot> */}
        </InputView>
        <LoginSubmitButton
          labelStyle={{color: colors.backgroundColor}}
          loading={loader}
          mode="contained"
          onPress={!loader ? loginFnc : null}>
          Login
        </LoginSubmitButton>
      </LoginOuterView>
      <Modal show={modalShow} onClose={() => setModalShow(false)}>
        <SplashTitle>Otp!</SplashTitle>
        <LoginDescription style={{marginBottom: 20}}>
          Please enter otp details.
        </LoginDescription>
        <StyledInputOtp>
          {formElementsArray?.map(
            (x, index) =>
              x.id === 'otp' && (
                <Input
                  key={index}
                  title={x.config?.elementConfig?.text}
                  placeholder={x.config?.elementConfig?.placeholder}
                  onInputChange={onInputChange}
                  onSubmit={() => Keyboard.dismiss()}
                  value={x.config?.value}
                  autoFocus={true}
                  type={x.config?.elementConfig?.type}
                  isValid={x.config?.valid}
                  validation={x.config?.validation}
                  errorMsg={x.config?.errors}
                  icons={x.config?.icons}
                  ele={x.config?.elementType}
                  keyNum
                />
              ),
          )}
          <StyledForgot></StyledForgot>
          <LoginSubmitButton
            loading={loader}
            labelStyle={{color: colors.backgroundColor}}
            mode="contained"
            onPress={!loader ? loginFnc : null}>
            Login
          </LoginSubmitButton>
        </StyledInputOtp>
      </Modal>
    </LoginLayout>
  );
};

export default Login;
