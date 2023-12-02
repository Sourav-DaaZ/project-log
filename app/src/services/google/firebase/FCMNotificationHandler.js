import messaging from '@react-native-firebase/messaging';
import ReduxStore from '../../../store';
import {fTokenUpdate} from '../../../store/actions';
import Routes from '../../../constants/routeConst';
import PushNotification from 'react-native-push-notification';
import defaultValue from '../../../constants/defaultValue';
import {chatUpdate} from '../../../store/actions/config';
import {getStoreObjData, saveFncToStore} from '../../../utils';
const {dispatch} = ReduxStore;

export function createChannel() {
  try {
    PushNotification.createChannel(
      {
        channelId: defaultValue.channelID, // (required)
        channelName: 'My channel',
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  } catch (e) {
    console.log(e);
  }
}
export async function requestUserPermission() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
      GetFCMToken();
    }
  } catch (e) {
    console.log(e);
  }
}
async function GetFCMToken() {
  try {
    let fcmToken = await getStoreObjData('fcmToken');
    if (!fcmToken || typeof fcmToken !== 'string') {
      try {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
          await saveFncToStore('fcmToken', fcmToken);
          dispatch(fTokenUpdate(fcmToken));
        } else {
          dispatch(fTokenUpdate(''));
        }
      } catch (error) {
        dispatch(fTokenUpdate(''));
        console.error('[ERROR]', error);
      }
    } else {
      dispatch(fTokenUpdate(fcmToken));
      console.log('Token is present!');
    }
  } catch (e) {
    console.log(e);
  }
}
export const NotifinationListener = () => {
  try {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.data,
      );
      if (remoteMessage?.data && remoteMessage.data?.route) {
        if (remoteMessage.data.id && remoteMessage.data.name) {
          ReduxStore.getState().config.navigation &&
            ReduxStore.getState().config.navigation(
              Routes[remoteMessage.data.route],
              {id: remoteMessage.data.id, name: remoteMessage.data.name},
            );
        } else if (remoteMessage.data.id) {
          ReduxStore.getState().config.navigation &&
            ReduxStore.getState().config.navigation(
              Routes[remoteMessage.data.route],
              {id: remoteMessage.data.id},
            );
        } else if (remoteMessage?.data?.route) {
          ReduxStore.getState().config.navigation &&
            ReduxStore.getState().config.navigation(
              Routes[remoteMessage.data.route],
            );
        } else {
          ReduxStore.getState().config.navigation &&
            ReduxStore.getState().config.navigation(Routes.dashboard);
        }
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          if (remoteMessage?.data && remoteMessage.data?.route) {
            if (remoteMessage.data.id && remoteMessage.data.name) {
              ReduxStore.getState().config.navigation &&
                ReduxStore.getState().config.navigation(
                  Routes[remoteMessage.data.route],
                  {id: remoteMessage.data.id, name: remoteMessage.data.name},
                );
            } else if (remoteMessage?.data?.id) {
              ReduxStore.getState().config.navigation &&
                ReduxStore.getState().config.navigation(
                  Routes[remoteMessage.data.route],
                  {id: remoteMessage.data.id},
                );
            } else if (remoteMessage?.data?.route) {
              ReduxStore.getState().config.navigation &&
                ReduxStore.getState().config.navigation(
                  Routes[remoteMessage.data.route],
                );
            } else {
              ReduxStore.getState().config.navigation &&
                ReduxStore.getState().config.navigation(Routes.dashboard);
            }
          }
          //setInitialRoute( remoteMessage.data.type ); // e.g. "Settings"
        }
        //setLoading( false );
      });

    messaging().onMessage(async remoteMessage => {
      //   console.log('foreground notification', remoteMessage);
      PushNotification.configure({
        onNotification: function (notification) {
          console.log(notification);
          if (notification?.data && notification.data?.route) {
            if (notification?.data?.id && notification?.data?.name) {
              ReduxStore.getState().config.navigation &&
                ReduxStore.getState().config.navigation(
                  Routes[notification.data.route],
                  {id: notification.data.id, name: notification.data.name},
                );
            } else if (notification?.data?.id) {
              ReduxStore.getState().config.navigation &&
                ReduxStore.getState().config.navigation(
                  Routes[notification.data.route],
                  {id: notification.data.id},
                );
            } else if (notification?.data?.route) {
              ReduxStore.getState().config.navigation &&
                ReduxStore.getState().config.navigation(
                  Routes[notification.data.route],
                );
            } else {
              ReduxStore.getState().config.navigation &&
                ReduxStore.getState().config.navigation(Routes.dashboard);
            }
          }
        },
      });
      PushNotification.localNotification({
        channelId: defaultValue.channelID,
        channelName: 'My channel',
        message: remoteMessage?.notification?.body,
        title: remoteMessage?.notification?.title,
        name: remoteMessage?.notification?.name,
        data: remoteMessage?.data,
        bigPictureUrl: null,
        // smallIcon: remoteMessage.notification.android.imageUrl,
      });
      dispatch(chatUpdate(remoteMessage.notification.body));
    });
  } catch (e) {
    console.log(e);
  }
};

export const backgroundNotification = () => {
  try {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  } catch (e) {
    console.log(e);
  }
};
