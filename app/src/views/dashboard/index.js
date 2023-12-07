import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import DashboardHeader from './header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native';
import {
  StyledHorizontalScrollView,
  StyledProfileView,
  StyledTitle,
  StyledScrollView,
  StyledChip,
  StyledParagraph,
  StyledButton,
  InputView
} from './style';
import OutsideAuthApi from '../../services/outSideAuth';
import Routes from '../../constants/routeConst';
import {
  BottomShadow,
  ShadowWrapperContainer,
} from '../../sharedComponents/bottomShadow';
import Input from '../../sharedComponents/input';
import Loader from '../../sharedComponents/loader';
import { useSelector, shallowEqual } from 'react-redux';
import Banner from '../../sharedComponents/banner';
import { openUrl, updateObject, validate } from '../../utils';
import { CustomHeader } from '../../routes/custom';
import logoImg from '../../assets/images/logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, FAB, Text } from 'react-native-paper';
import InsideAuthApi from '../../services/inSideAuth';
import Badge from '../../sharedComponents/badge';
import errorFnc from '../errorHandeler/errorFunc';
import AvatarImg from '../../assets/images/avatar.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardComponent from '../../sharedComponents/card';
import { Image } from 'react-native-animatable';
import ButtonComponent from '../../sharedComponents/button';
import ModalComponent from '../../sharedComponents/modal';
import validation from '../../constants/validationMsg';
import CameraComponent from '../camera';

const Dashboard = props => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const spacing = themeContext.spacing;
  const fonts = themeContext.fonts;
  const authStore = useSelector(state => state.auth, shallowEqual);
  const detailsStore = useSelector(state => state.details, shallowEqual);
  const isFocused = useIsFocused();
  const [outerScrollViewScrollEnabled, setOuterScrollViewScrollEnabled] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [category, setCategory] = useState([]);
  const [banner, setBanner] = useState([]);
  const [saveTag, setSaveTag] = useState({});
  const [flag, setFlag] = useState('Check In');
  const [refreshing, setRefreshing] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const [url, setUrl] = useState('');
  const handleInnerPressIn = () => setOuterScrollViewScrollEnabled(false);
  const handleInnerPressOut = () => setOuterScrollViewScrollEnabled(true);
  const [data, setData] = useState({
    controls: {
      checkIn: {
        elementType: 'input',
        elementConfig: {
          type: 'checkIn',
          text: 'Check In',
          placeholder: 'Enter your Check In',
        },
        value: '',
        validation: {
          required: true,
          password: true,
        },
        errors: '',
        valid: false,
        className: [],
        icons: [],
      },
      checkOut: {
        elementType: 'input',
        elementConfig: {
          type: 'checkOut',
          text: 'Check out',
          placeholder: 'Enter your Check out',
        },
        value: '',
        validation: {
          required: true,
          password: true,
        },
        errors: '',
        valid: false,
        className: [],
        icons: [],
      },
      projectHr: {
        elementType: 'input',
        elementConfig: {
          type: 'projectHr',
          text: 'Project',
          placeholder: 'Your Project',
        },
        value: '',
        validation: {
          required: true,
          password: false,
        },
        errors: '',
        valid: false,
        className: [],
        icons: [],
      },
      task: {
        elementType: 'input',
        elementConfig: {
          type: 'task',
          text: 'Task',
          placeholder: 'Add a task',
        },
        value: '',
        validation: {
          required: true,
          password: false,
        },
        errors: '',
        valid: false,
        className: [],
        icons: [],
      },
      note: {
        elementType: 'input',
        elementConfig: {
          type: 'note',
          text: 'Note',
          placeholder: 'Add a note (Optional)',
        },
        value: '',
        validation: {
          required: true,
          password: false,
        },
        errors: '',
        valid: false,
        className: [],
        icons: [],
      }
    }
  });

  const onInputChange = (val, type) => {
    console.log(val, type);
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

  const apiCall = () => {
    try {
      const paramData = {
        banner_for: 'main',
      };
      if (!(category?.length > 0)) {
        setShowLoader(true);
        OutsideAuthApi()
          .categoryListApi()
          .then(res => {
            setShowLoader(false);
            setCategory(res.data);
          })
          .catch(err => {
            setShowLoader(false);
          });
      }
      if (!(banner?.length > 0)) {
        setShowLoader(true);
        OutsideAuthApi()
          .getBannerApi(paramData)
          .then(res => {
            setShowLoader(false);
            let varData = [];
            res.data?.map((x, i) => {
              varData.push({
                key: x._id,
                img: x.image,
                onPress: () => openUrl(x.link),
              });
            });
            setBanner(varData);
          })
          .catch(err => {
            setShowLoader(false);
          });
      }
    } catch (e) {
      console.log(e);
      setShowLoader(false);
    }
  };

  const apiCallWithToken = () => {
    try {
      const varData = {
        lat: detailsStore.location.lat,
        long: detailsStore.location.long,
      };
      InsideAuthApi()
        .updateLocationApi(varData)
        .then(res => { })
        .catch(err => { });
      if (!(saveTag > 0)) {
        InsideAuthApi()
          .getSaveTagApi()
          .then(res => {
            setSaveTag(res.data);
          })
          .catch(err => { });
      }
    } catch (e) {
      errorFnc(e);
    }
  };

  useEffect(() => {
    // getTipsData();
  }, []);

  useEffect(() => {
    try {
      if (
        detailsStore.location.lat !== 0 &&
        detailsStore.location.long !== 0 &&
        detailsStore.id !== '' &&
        authStore.firebase_toke !== null
      ) {
        const requestParam = {
          token: authStore.firebase_token,
          user_id: detailsStore.id,
          location: detailsStore.location,
        };
        OutsideAuthApi()
          .firebaseTokenCall(requestParam)
          .then(() => { })
          .catch(e => {
            console.log(e);
          });
      }
    } catch (e) {
      console.log(e);
    }
  }, [authStore.firebase_token, detailsStore.id, detailsStore.location]);

  const getTipsData = async () => {
    const getTips = await AsyncStorage.getItem('tips');
    if (getTips === null) {
      props.navigation.navigate(Routes.tipsScreen);
      return await AsyncStorage.setItem('tips', 'true');
    }
  };

  useEffect(() => {
    if (isFocused && !refreshing) {
      apiCall();
    }
  }, [isFocused, refreshing]);

  useEffect(() => {
    if (
      authStore?.access_token !== '' &&
      detailsStore?.location?.lat !== 0 &&
      isFocused &&
      !refreshing
    ) {
      apiCallWithToken();
    }
  }, [isFocused, authStore.access_token, detailsStore.location, refreshing]);

  const refreshFnc = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  };
  const formElementsArray = [];

  for (let key in data.controls) {
    formElementsArray.push({
      id: key,
      config: data.controls[key],
    });
  }
console.log(url)
  return (
    <DashboardLayout
      {...props}
      refreshing={refreshing}
      setChatCount={setChatCount}>
      <StyledScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshFnc} />
        }>
        <CustomHeader
          left={
            <StyledProfileView>
              <Avatar.Image
                source={
                  detailsStore?.images
                    ? {
                      uri: detailsStore.images,
                    }
                    : AvatarImg
                }
                size={spacing.width * 15}
              />
              <View style={{ marginLeft: 10 }}>
                <StyledParagraph>
                  {detailsStore?.name ? detailsStore.name : 'hi'}
                </StyledParagraph>
                <StyledTitle>
                  Good Evening!
                </StyledTitle>
              </View>
            </StyledProfileView>
          }
          right={
            <Badge show={chatCount ? true : false} count={chatCount}>
              <Ionicons
                name="notifications-outline"
                color={colors.iconColor}
                size={spacing.width * 8}
                onPress={() => props.navigation.navigate(Routes.notification)}
              />
            </Badge>
          }
        />

        {showLoader ? (
          <Loader />
        ) : (
          <ShadowWrapperContainer noSnack bgWhite>
            <DashboardHeader
              text="Quick Access"
              outerScrollViewScrollEnabled={outerScrollViewScrollEnabled}
              onPress={() => props.navigation.navigate(Routes.category)}
              goNext={
                <AntDesign
                  name="rightcircle"
                  size={spacing.width * 7}
                  style={{
                    color: colors.mainByColor,
                    marginBottom: -spacing.height,
                  }}
                />
              }
            />
            <View style={{ flexDirection: 'row' }}>
              <StyledHorizontalScrollView
                style={{ height: '100%' }}
                horizontal
                showsHorizontalScrollIndicator={false}>
                <TouchableWithoutFeedback
                  onPressIn={handleInnerPressIn}
                  onPressOut={handleInnerPressOut}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: "space-between"
                    }}>
                    <StyledProfileView style={{ flexDirection: 'column', marginTop: 10, marginRight: 30 }}>
                      <View style={{ backgroundColor: 'gray', padding: 15, borderRadius: 10 }}>
                        <Image
                          source={
                            detailsStore?.images
                              ? {
                                uri: detailsStore.images,
                              }
                              : AvatarImg
                          }
                          style={{ width: 40, height: 40 }}
                        />
                      </View>
                      <View>
                        <StyledTitle >
                          {detailsStore?.name ? detailsStore.name : 'hii'}
                        </StyledTitle>

                      </View>
                    </StyledProfileView>
                  </View>
                </TouchableWithoutFeedback>
              </StyledHorizontalScrollView>
            </View>
          </ShadowWrapperContainer>
        )}
        <ShadowWrapperContainer noSnack bgWhite>
          <DashboardHeader
            text="Clock"
            outerScrollViewScrollEnabled={outerScrollViewScrollEnabled}
            goNext={
              flag !== 'Check In' ? <StyledChip
                textStyle={{ fontSize: fonts.regular, textColor: '#fff' }}
                style={{ backgroundColor: 'red' }}
                color='white'
              >
                {'Checked in'}
              </StyledChip> : null
            }
          />
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <StyledTitle xl>
              {'08:30:00s'}
            </StyledTitle>
            <StyledTitle l style={{ color: flag === 'Checked In' ? '#52C2CB' : 'red', marginTop: -10, marginBottom: 20 }}>
              {flag === 'Check In' ? 'Timer is clocked out!' : flag === 'Break' ? 'Break time is on!' : 'Overtime: 08:30:00s'}
            </StyledTitle>
            <StyledButton labelStyle={{ color: "white" }} style={{ backgroundColor: '#52C2CB', marginTop: 10 }} onPress={() => flag === 'Check In' ? setFlag('CCheck In') : setFlag('CClock Out')}>{flag === 'Check In' ? "Check In" : "Check Out"}</StyledButton>
            {flag !== 'Check In' ? <StyledButton labelStyle={{ color: "white" }} style={{ backgroundColor: 'gray' }} onPress={() => flag === 'Break' ? setFlag('FBreak') : setFlag('Break')}>{flag === 'Break' ? 'Finish Break' : 'Take a Break'}</StyledButton> : null}
            {flag !== 'Check In' ? <StyledButton labelStyle={{ color: "#52C2CB" }} style={{ borderColor: '#52C2CB' }} mode="outlined">Timer</StyledButton> : null}
            {flag !== 'Check In' ? <StyledButton labelStyle={{ color: "#52C2CB" }} style={{ borderColor: '#52C2CB' }} mode="outlined" onPress={() => setFlag('shift')}>Shift Overview</StyledButton> : null}
          </View>
        </ShadowWrapperContainer>
        <ModalComponent title={'Check In'} show={flag === 'CCheck In' || flag === 'Camera'} onClose={() => setFlag('Check In')}>
          <InputView>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItem: 'center', marginTop: 30, marginBottom: 0 }}>
              <Text style={{ color: colors.textLight, fontSize: fonts.medium * 1.1, fontWeight: '700' }}>Shift:</Text>
              <Text style={{ color: colors.textColor, fontSize: fonts.medium }}>A</Text>
            </View>
            {formElementsArray?.map(
              (x, index) =>
              (
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
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItem: 'center', marginTop: 30, marginBottom: 0 }}>
              <TouchableOpacity onPress={()=> setFlag('Camera')}>
                <Image
                  style={{paddingTop: 50, width: '50%', height: 150}}
                  source={url
                    ? {
                      uri: url,
                    }
                    : AvatarImg}
                />
              </TouchableOpacity>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItem: 'center', marginTop: 30, marginBottom: 0 }}>
              <Text style={{ color: colors.textLight, fontSize: fonts.medium * 1.1, fontWeight: '700' }}>Location:</Text>
            </View>
            <StyledButton labelStyle={{ color: "white" }} style={{ backgroundColor: '#52C2CB', marginTop: 10 }} onPress={() => setFlag('Checked In')}>{"Check In"}</StyledButton>
          </InputView>
        </ModalComponent>
        <ModalComponent title={'Clock Out'} show={flag === 'CClock Out'} onClose={() => setFlag('Close')}>
          <InputView>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItem: 'center', marginTop: 30, marginBottom: 0 }}>
              <Text style={{ color: colors.textLight, fontSize: fonts.medium * 1.1, fontWeight: '700' }}>Shift:</Text>
              <Text style={{ color: colors.textColor, fontSize: fonts.medium }}>A</Text>
            </View>
            {formElementsArray?.map(
              (x, index) =>
              (
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
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItem: 'center', marginTop: 30, marginBottom: 0 }}>
              <Text style={{ color: colors.textLight, fontSize: fonts.medium * 1.1, fontWeight: '700' }}>Total Break Time:</Text>
              <Text style={{ color: colors.textColor, fontSize: fonts.medium }}>14hr</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItem: 'center', marginTop: 10, marginBottom: 0 }}>
              <Text style={{ color: colors.textColor, fontSize: fonts.medium * 1.1, fontWeight: '700' }}>24hr</Text>
              <Text style={{ color: colors.textColor, fontSize: fonts.medium }}>12:00am</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItem: 'center', marginTop: 30, marginBottom: 0 }}>
              <Text style={{ color: colors.textLight, fontSize: fonts.medium * 1.1, fontWeight: '700' }}>Location:</Text>
            </View>
            <StyledButton labelStyle={{ color: "white" }} style={{ backgroundColor: '#52C2CB', marginTop: 10 }} onPress={() => setFlag('Check In')}>{"Check Out"}</StyledButton>
            <StyledButton labelStyle={{ color: "#52C2CB" }} style={{ borderColor: '#52C2CB' }} mode="outlined" onPress={() => setFlag('EShift')}>Edit Shift</StyledButton>
          </InputView>
        </ModalComponent>
        <ModalComponent title={'Shift Overview'} show={flag === 'shift'} onClose={() => setFlag('Close')}>
          <InputView>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItem: 'center', marginTop: 30, marginBottom: 0 }}>
              <Text style={{ color: colors.textLight, fontSize: fonts.medium * 1.1, fontWeight: '700' }}>Shift:</Text>
              <Text style={{ color: colors.textColor, fontSize: fonts.medium }}>A</Text>
            </View>
            {formElementsArray?.map(
              (x, index) =>
              (
                index < 3 && <Input
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
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItem: 'center', marginTop: 30, marginBottom: 0 }}>
              <Text style={{ color: colors.textLight, fontSize: fonts.medium * 1.1, fontWeight: '700' }}>Total Break Time:</Text>
              <Text style={{ color: colors.textColor, fontSize: fonts.medium }}>14hr</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItem: 'center', marginTop: 10, marginBottom: 0 }}>
              <Text style={{ color: colors.textColor, fontSize: fonts.medium * 1.1, fontWeight: '700' }}>24hr</Text>
              <Text style={{ color: colors.textColor, fontSize: fonts.medium }}>12:00am</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItem: 'center', marginTop: 30, marginBottom: 0 }}>
              <Text style={{ color: colors.textLight, fontSize: fonts.medium * 1.1, fontWeight: '700' }}>Location:</Text>
            </View>
          </InputView>
        </ModalComponent>
        <ModalComponent title={'Camera'} show={flag === 'Camera'} onClose={() => setFlag('CCheck In')}>
          <View style={{height: 700}}>
            <CameraComponent setUrl={setUrl} close={() => setFlag('CCheck In')}/>
          </View>
        </ModalComponent>
      </StyledScrollView>
    </DashboardLayout>
  );
};

export default React.memo(Dashboard);
