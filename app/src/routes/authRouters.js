import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import logoImg from '../assets/images/logo.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Routes from '../constants/routeConst';
import { CustomTab, CustomHeader } from './custom';
import { BottomShadow } from '../sharedComponents/bottomShadow';
import { StyledImage } from './style';

import Dashboard from '../views/dashboard';
import Login from '../views/auth/login';
const UpdateDetails = React.lazy(() => import('../views/user/updateDetails'));
const ProfileScreen = React.lazy(() => import('../views/user/profileScreen'));
const Applets = React.lazy(() => import('../views/user/applets'));
const Setting = React.lazy(() => import('../views/user/setting'));
const Verification = React.lazy(() => import('../views/user/verification'));
const Camera = React.lazy(() => import('../views/camera'));
const ForgotPassword = React.lazy(() => import('../views/auth/forgotPassword'));
const Register = React.lazy(() => import('../views/auth/register'));
const AccessScreen = React.lazy(() => import('../views/access'));
const NotificationScreen = React.lazy(() => import('../views/notification'));

const UserChat = React.lazy(() => import('../views/chats/userChat'));
const ChatScreen = React.lazy(() => import('../views/chats/chatScreen'));
const TipsScreen = React.lazy(() => import('../views/tipsScreen'));

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthRouters = props => {
  const themeContext = useContext(ThemeContext);
  const spacing = themeContext.spacing;
  const colors = themeContext.colors[themeContext.baseColor];

  const TabComponent = () => {
    return (
      <Tab.Navigator
        tabBar={props => <CustomTab {...props} colors={colors} />}
        screenOptions={{
          lazy: true,
        }}>
        <Tab.Screen
          name={Routes.dashboard}
          options={{
            tabBarLabel: 'Dashboard',
            headerShown: false,
            tabBarIcon: (color, size) => (
              <AntDesign name="home" color={color} size={size} />
            ),
          }}
          component={Dashboard}
        />

        <Tab.Screen
          name={Routes.applets}
          options={{
            tabBarLabel: 'Applets',
            headerShown: false,
            header: () => (
              <BottomShadow>
                <CustomHeader logo={<StyledImage source={logoImg} />} />
              </BottomShadow>
            ),
            tabBarIcon: (color, size) => (
              <Ionicons
                name="apps-outline"
                color={color}
                size={size}
              />
            ),
          }}
          component={Applets}
        />
        <Tab.Screen
          name={Routes.chatList}
          options={{
            tabBarLabel: 'Chat',
            headerShown: false,
            header: () => (
              <BottomShadow>
                <CustomHeader logo={<StyledImage source={logoImg} />} />
              </BottomShadow>
            ),
            tabBarIcon: (color, size) => (
              <Ionicons
                name="chatbox-outline"
                color={color}
                size={size}
              />
            ),
          }}
          component={ChatScreen}
        />
        <Tab.Screen
          name={Routes.notification}
          options={{
            tabBarLabel: 'Notifications',
            headerShown: false,
            header: () => (
              <BottomShadow>
                <CustomHeader logo={<StyledImage source={logoImg} />} />
              </BottomShadow>
            ),
            tabBarIcon: (color, size) => (
              <Ionicons
                name="notifications-outline"
                color={color}
                size={size}
              />
            ),
          }}
          component={NotificationScreen}
        />
        <Tab.Screen
          name={Routes.setting}
          options={{
            tabBarLabel: 'Setting',
            headerShown: false,
            header: () => (
              <BottomShadow>
                <CustomHeader logo={<StyledImage source={logoImg} />} />
              </BottomShadow>
            ),
            tabBarIcon: (color, size) => (
              <Fontisto name="player-settings" color={color} size={size} />
            ),
          }}
          component={Setting}
        />
      </Tab.Navigator>
    );
  };

  return (
    <Stack.Navigator>
      {props.islogin ? <Stack.Screen
        name={Routes.login}
        component={Login}
        options={() => ({
          headerShown: false,
        })}
      /> : null}
      {!props.islogin ? <Stack.Screen
        name={Routes.home}
        component={TabComponent}
        options={() => ({
          headerShown: false,
        })}
      /> : null}
      {!props.islogin ? <Stack.Screen
        name={Routes.access}
        component={AccessScreen}
        options={() => ({
          headerShown: false,
        })}
      /> : null}
      {/*       
      {props.islogin ? (
        <Stack.Screen
          name={Routes.chatList}
          component={ChatScreen}
          options={({navigation}) => ({
            header: () => (
              <BottomShadow>
                <CustomHeader
                  navigation={() => navigation.goBack()}
                  left={
                    <Ionicons
                      name="chevron-back"
                      color={colors.iconColor}
                      size={spacing.width * 8}
                    />
                  }
                  logo={<StyledImage source={logoImg} />}
                />
              </BottomShadow>
            ),
          })}
        />
      ) : null} */}
      {/*       
      <Stack.Screen
        name={Routes.camera}
        component={Camera}
        options={({navigation}) => ({
          header: () => (
            <CustomHeader
              navigation={() => navigation.goBack()}
              left={
                <Ionicons
                  name="chevron-back"
                  color={colors.iconColor}
                  size={spacing.width * 8}
                />
              }
              logo={<StyledImage source={logoImg} />}
            />
          ),
        })}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthRouters;
