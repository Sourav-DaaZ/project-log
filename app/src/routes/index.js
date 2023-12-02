import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, shallowEqual} from 'react-redux';
import {useDispatch} from 'react-redux';
import {tokenUpdate, detailsUpdate} from '../store/actions';
import * as FCMNotificationHandler from '../services/google/firebase/FCMNotificationHandler';
import SplashScreen from '../views/splashScreen';
import AuthRouters from './authRouters';
import Loader from '../sharedComponents/loader';
import {getStoreObjData} from '../utils';
import ReduxStore from '../store';

function Routs(props) {
  const authStore = useSelector(state => state.auth, shallowEqual);
  const [entry, setEntry] = React.useState(false);
  const dispatch = useDispatch();

  const fetchCredentials = async () => {
    const data = await getStoreObjData('token');
    const userData = await getStoreObjData('userData');
    dispatch(
      tokenUpdate({
        access_token: data.access_token ? data.access_token : '',
        refresh_token: data.refresh_token ? data.refresh_token : '',
      }),
    );
    dispatch(
      detailsUpdate({
        id: userData.id ? userData.id : '',
        name: userData.name ? userData.name : '',
        gender: userData.gender ? userData.gender : '',
        age: userData.age ? userData.age : 0,
        userCat: userData.userCat ? userData.userCat : [],
        expectedCat: userData.expectedCat ? userData.expectedCat : [],
      }),
    );
  };

  useEffect(() => {
    fetchCredentials();
    if (Platform.OS === 'android') {
      FCMNotificationHandler.requestUserPermission();
      FCMNotificationHandler.createChannel();
    }
  }, []);

  useEffect(() => {
    console.log('hiii');
    console.log(ReduxStore.getState().config.navigation !== null)
    if (
      Platform.OS === 'android' &&
      ReduxStore.getState().config.navigation !== null &&
      !entry
    ) {
      console.log('hiiiiii')
      setEntry(true);
      FCMNotificationHandler.backgroundNotification();
      FCMNotificationHandler.NotifinationListener();
    }
  },[authStore]);
console.log(ReduxStore.getState().config)
  return (
    <React.Suspense fallback={<SplashScreen />}>
      <NavigationContainer>
        {authStore.access_token !== null &&
        (authStore.firebase_token !== null || Platform.OS === 'ios') ? (
          <AuthRouters
            {...props}
            islogin={authStore.access_token && authStore.access_token !== ''}
          />
        ) : (
          <Loader />
        )}
      </NavigationContainer>
    </React.Suspense>
  );
}

export default Routs;
