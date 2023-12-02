import React, { useContext, useState } from 'react';
import LoginLayout from '../../sharedComponents/layout/loginLayout';
import { ThemeContext } from 'styled-components';
import Input from '../../sharedComponents/input';
import defaultValue from '../../constants/defaultValue';
import { updateObject, validate } from '../../utils';
import validation from '../../constants/validationMsg';
import Modal from '../../sharedComponents/modal';
import OutsideAuthApi from '../../services/outSideAuth';
import { useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../store/actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import Routes from '../../constants/routeConst';

import {
  LoginOuterView,
  SplashTitle,
  LoginDescription,
  LoginSubmitButton,
  InputView,
  StyledInputOtp,
  StyledForgot
} from './style';
import errorFnc from '../errorHandeler/errorFunc';

const ForgotPassword = (props) => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const spacing = themeContext.spacing;
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    controls: {
      userId: {
        elementType: 'input',
        elementConfig: {
          type: 'userId',
          text: 'User',
          placeholder: 'Enter your User ID / Email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={spacing.width * 5} />,
          <Feather name="check-circle" color="green" size={spacing.width * 5} />,
        ],
      },
      password: {
        elementType: 'password',
        elementConfig: {
          type: 'password',
          text: 'New Password',
          placeholder: 'Enter your new password',
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
  const formElementsArray = []

  const onInputChange = (val, type) => {
    try {
      let varVal = {};
      if (!validate(val, { required: true })) {
        varVal = updateObject(data, {
          controls: updateObject(data.controls, {
            [type]: updateObject(data.controls[type], {
              value: val,
              errors: validation.requiredField(),
              valid: false,
            }),
          }),
        });
        setData(varVal);
      } else if (type === 'password' && !validate(val, { password: true })) {
        varVal = updateObject(data, {
          controls: updateObject(data.controls, {
            [type]: updateObject(data.controls[type], {
              value: val,
              errors: validation.validateField('password'),
              valid: false,
            }),
          }),
        });
        setData(varVal);
      } else if (
        type === 'otp' &&
        !validate(val, { minLength: defaultValue.otpLength })
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
        setData(varVal);
      } else if (type === 'userId') {
        const requestData = {
          "userId": val
        }
        varVal = updateObject(data, {
          controls: updateObject(data.controls, {
            userId: updateObject(data.controls.userId, {
              value: val,
              valid: false,
            }),
          }),
        });
        setData(varVal);
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
        setData(varVal);
      }
    } catch (e) {
      errorFnc(e)
    }
  };

  const passwordChangeFnc = () => {
    try {
      let isValid = [];
      let val = {};
      formElementsArray.map(
        (x) => (
          x.id == 'userId' ||
            x.id == 'password' ||
            (modalShow && x.id == 'otp')
            ? (val[x.id] = x.config.value)
            : null
        ),
      );
      if (isValid.includes(false)) {
        errorFnc(validation.validateField(), true);
      } else {
        if (!modalShow) {
          let requestData = {}
          if (validate(data.controls.userId.value, { email: true })) {
            requestData = {
              "email": data.controls.userId.value
            }
          } else {
            requestData = {
              "userId": data.controls.userId.value
            }
          }
          let varVal;
          varVal = updateObject(data, {
            controls: updateObject(data.controls, {
              otp: updateObject(data.controls.otp, {
                errors: '',
                value: '',
                valid: true,
              }),
            }),
          });
          setData(varVal);
          OutsideAuthApi()
            .verifyOtp(requestData)
            .then((res) => {
              setModalShow(true);
            })
            .catch((err) => {
              errorFnc(err?.data?.message ? err.data.message : '', true)
            });
        } else {
          const requestData = {
            "user": data.controls.userId.value,
            "otp": data.controls.otp.value.toString(),
            "password": data.controls.password.value
          }
          let varVal;
          OutsideAuthApi()
            .changePasswordApi(requestData)
            .then((res) => {
              dispatch(snackbarUpdate({
                type: 'success',
                msg: res?.message ? res.message : ''
              }))
              props.navigation.navigate(Routes.login);
            })
            .catch((err) => {
              varVal = updateObject(data, {
                controls: updateObject(data.controls, {
                  otp: updateObject(data.controls.otp, {
                    errors: err?.data?.message,
                    value: '',
                    valid: false,
                  }),
                }),
              });
              setData(varVal);
            });
        }
      }
    } catch (e) {
      errorFnc(e)
    }
  }


  for (let key in data.controls) {
    formElementsArray.push({
      id: key,
      config: data.controls[key],
    });
  }

  return (
    <LoginLayout {...props}>
      <LoginOuterView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <InputView>
          {formElementsArray?.map((x, index) => (
            x.id !== 'otp' && <Input
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
          ))}
        </InputView>
        <StyledForgot></StyledForgot>
        <LoginSubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' onPress={passwordChangeFnc}>
          Request For OTP
        </LoginSubmitButton>
      </LoginOuterView>
      <Modal show={modalShow} onClose={() => setModalShow(false)}>
        <SplashTitle>Otp!</SplashTitle>
        <LoginDescription style={{ marginBottom: 20 }}>Please enter otp details.</LoginDescription>
        <StyledInputOtp>
          {formElementsArray?.map((x, index) => (
            x.id === 'otp' && <Input
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
            />))}
          <StyledForgot>
          </StyledForgot>
          <LoginSubmitButton labelStyle={{ color: colors.backgroundColor }} mode='contained' onPress={passwordChangeFnc}>
            Change Password
          </LoginSubmitButton>
        </StyledInputOtp>
      </Modal>
    </LoginLayout>
  );
};

export default ForgotPassword;