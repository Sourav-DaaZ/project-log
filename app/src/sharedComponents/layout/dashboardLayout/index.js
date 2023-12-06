import React, {useContext, useEffect, useState} from 'react';
import {Platform, StatusBar} from 'react-native';
import {ThemeContext} from 'styled-components';
import {useSelector, shallowEqual} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {location} from '../../../store/actions';
import {useDispatch} from 'react-redux';
import {detailsUpdate, configUpdate} from '../../../store/actions';
import InsideAuthApi from '../../../services/inSideAuth';
import {DashboardOuterView, SplashTitle, LoginDescription} from './style';
import Routes from '../../../constants/routeConst';
import {useIsFocused} from '@react-navigation/native';
import {ShadowWrapperContainer} from '../../bottomShadow';
import Modal from '../../modal';
import OutsideAuthApi from '../../../services/outSideAuth';
import defaultValue from '../../../constants/defaultValue';
import {openUrl, saveFncToStore} from '../../../utils';

const DashboardLayout = props => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const authStore = useSelector(state => state.auth, shallowEqual);
  const detailsStore = useSelector(state => state.details, shallowEqual);
  const configStore = useSelector(state => state.config, shallowEqual);
  const [detailsShow, setDetailsShow] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(null);
  const [detailsData, setDetailsData] = useState(null);

  useEffect(() => {
    try {
      if (
        detailsStore.location.lat === 0 &&
        detailsStore.location.long === 0 &&
        !props.refreshing
      ) {
        Geolocation.getCurrentPosition(
          ({coords}) => {
            const varData = {
              lat: coords.latitude,
              long: coords.longitude,
            };
            dispatch(location(varData));
          },
          error => {
            props.navigation.navigate(Routes.access, {
              type: 'Location',
              err: error.message,
            });
          },
          {enableHighAccuracy: false, timeout: 50000},
        );
      }
      if (
        (configStore.appConfig === null || detailsStore.id !== '') &&
        !props.refreshing
      ) {
        const param = {
          ...(detailsStore.id !== '' && {id: detailsStore.id}),
        };
        OutsideAuthApi()
          .appConfigApi(param)
          .then(res => {
            setUpdatePopup(res.data);
            if (props.setChatCount) {
              props.setChatCount(res.data?.chatCount ? res.data.chatCount : 0);
            }
            dispatch(configUpdate(res.data));
          })
          .catch(err => {
            if (err.message && err.message?.includes('AxiosError')) {
              props.navigation.navigate(Routes.access, {
                type: 'Network',
                err: err.message,
              });
            }
            console.log(err);
          });
      }
    } catch (e) {
      console.log(e);
    }
  }, [isFocused, props.refreshing]);

  useEffect(() => {
    if (
      authStore.access_token !== '' &&
      !props?.blockDetails &&
      detailsStore.id === ''
    ) {
      apiCallWithToken();
    }
  }, [authStore.access_token, props.refreshing, isFocused]);

  const apiCallWithToken = () => {
    try {
      InsideAuthApi()
        .detailsApi()
        .then(res => {
          setDetailsData(res.data);
          const varData = {
            id: res?.data?.user ? res.data.user : '',
            name: res?.data?.name ? res.data.name : '',
            gender: res?.data?.gender ? res.data.gender : '',
            age: res?.data?.age ? res.data.age : 0,
            userCat: res?.data?.enlistedCategory
              ? res.data.enlistedCategory
              : [],
            expectedCat: res?.data?.categoryPreference
              ? res.data.categoryPreference
              : [],
          };
          dispatch(detailsUpdate(varData));
          saveFncToStore('userData', varData);
          if (
            !(
              res?.data &&
              res.data?.name &&
              res.data?.age &&
              res.data?.gender &&
              res.data?.enlistedCategory &&
              res.data?.categoryPreference
            )
          ) {
            setDetailsShow(true);
          }
        })
        .catch(err => {
          if (err.error_code === 'E-520') {
            props.navigation.navigate(Routes.updateDetails, {logedin: false});
          } else if (err.message && err.message?.includes('AxiosError')) {
            props.navigation.navigate(Routes.access, {
              type: 'Network',
              err: err.message,
            });
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <ShadowWrapperContainer none {...props}>
      <DashboardOuterView>
        <StatusBar
          backgroundColor={colors.backgroundDeepColor}
          barStyle="dark-content"
        />
        {props.children}
        <Modal
          show={detailsShow}
          onClose={() => setDetailsShow(false)}
          btn={[
            {
              text: 'Cancel',
              onPress: () => setDetailsShow(false),
              disabled: false,
            },
            {
              text: 'Details',
              onPress: () => {
                props.navigation.navigate(Routes.updateDetails, {
                  data: detailsData,
                });
                setDetailsShow(false);
              },
              disabled: detailsData === null,
            },
          ]}>
          <SplashTitle>Details Alert!</SplashTitle>
          <LoginDescription>Please update your details.</LoginDescription>
        </Modal>
        {updatePopup &&
        (defaultValue.appVersion[Platform.OS] <
          updatePopup?.buildVersion[Platform.OS] ||
          updatePopup?.maintenance[Platform.OS]) ? (
          <Modal
            show={
              updatePopup &&
              (defaultValue.appVersion[Platform.OS] <
                updatePopup?.buildVersion[Platform.OS] ||
                updatePopup?.maintenance[Platform.OS])
            }
            onClose={
              !updatePopup?.maintenance[Platform.OS] &&
              !(
                defaultValue.appVersion[Platform.OS] <
                updatePopup.minBuildVersion[Platform.OS]
              )
                ? () => setUpdatePopup(null)
                : null
            }
            btn={[
              {
                text:
                  !updatePopup?.maintenance[Platform.OS] &&
                  !(
                    defaultValue?.appVersion[Platform.OS] <
                    updatePopup?.minBuildVersion[Platform.OS]
                  )
                    ? 'Cancel'
                    : null,
                onPress: () => setUpdatePopup(null),
              },
              !updatePopup?.maintenance[Platform.OS] && {
                text: 'Update',
                onPress: () => openUrl(updatePopup?.link[Platform.OS]),
                full:
                  defaultValue?.appVersion[Platform.OS] <
                  updatePopup?.minBuildVersion[Platform.OS],
              },
            ]}>
            <SplashTitle
              critical={
                defaultValue.appVersion[Platform.OS] <
                updatePopup?.minBuildVersion[Platform.OS]
              }>
              {updatePopup?.maintenance[Platform.OS]
                ? 'Maintenance Alert!'
                : 'Update Alert!'}
            </SplashTitle>
            <LoginDescription
              marginLarge={updatePopup?.maintenance[Platform.OS]}
              mode="contained">
              {updatePopup?.maintenance[Platform.OS]
                ? updatePopup?.maintenance.msg
                : updatePopup.updateDetails[Platform.OS]}
            </LoginDescription>
          </Modal>
        ) : null}
      </DashboardOuterView>
    </ShadowWrapperContainer>
  );
};

export default DashboardLayout;
