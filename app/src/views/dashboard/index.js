import React, {useContext, useState, useEffect} from 'react';
import {ThemeContext} from 'styled-components';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import DashboardHeader from './header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';
import {
  StyledHorizontalScrollView,
  StyledSearchbarView,
  StyledBannerWrapper,
  StyledScrollView,
  StyledChip,
  StyledImage,
} from './style';
import OutsideAuthApi from '../../services/outSideAuth';
import Routes from '../../constants/routeConst';
import {
  BottomShadow,
  ShadowWrapperContainer,
} from '../../sharedComponents/bottomShadow';
import Input from '../../sharedComponents/input';
import Loader from '../../sharedComponents/loader';
import {useSelector, shallowEqual} from 'react-redux';
import Banner from '../../sharedComponents/banner';
import {openUrl} from '../../utils';
import {CustomHeader} from '../../routes/custom';
import logoImg from '../../assets/images/logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FAB} from 'react-native-paper';
import InsideAuthApi from '../../services/inSideAuth';
import Badge from '../../sharedComponents/badge';
import errorFnc from '../errorHandeler/errorFunc';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = props => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const spacing = themeContext.spacing;
  const fonts = themeContext.fonts;
  const authStore = useSelector(state => state.auth, shallowEqual);
  const detailsStore = useSelector(state => state.details, shallowEqual);
  const isFocused = useIsFocused();
  const [outerScrollViewScrollEnabled, setOuterScrollViewScrollEnabled] =
    useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [category, setCategory] = useState([]);
  const [banner, setBanner] = useState([]);
  const [saveTag, setSaveTag] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const handleInnerPressIn = () => setOuterScrollViewScrollEnabled(false);
  const handleInnerPressOut = () => setOuterScrollViewScrollEnabled(true);

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
        .then(res => {})
        .catch(err => {});
      if (!(saveTag > 0)) {
        InsideAuthApi()
          .getSaveTagApi()
          .then(res => {
            setSaveTag(res.data);
          })
          .catch(err => {});
      }
    } catch (e) {
      errorFnc(e);
    }
  };

  useEffect(() => {
    getTipsData();
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
          .then(() => {})
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
            <StyledImage
              style={{marginLeft: spacing.width}}
              source={logoImg}
            />
          }
          right={
            authStore?.access_token && authStore?.access_token !== '' ? (
              <Badge show={chatCount ? true : false} count={chatCount}>
                <Ionicons
                  name="md-chatbubble-outline"
                  color={colors.iconColor}
                  size={spacing.width * 8}
                  onPress={() => props.navigation.navigate(Routes.chatList)}
                />
              </Badge>
            ) : null
          }
        />
        <StyledBannerWrapper>
          {banner?.length > 0 ? <Banner data={banner} /> : null}
        </StyledBannerWrapper>
        {showLoader ? (
          <Loader />
        ) : (
          <ShadowWrapperContainer noSnack bgWhite>
            <DashboardHeader
              text="Category"
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
            <View style={{flexDirection: 'row'}}>
              <StyledHorizontalScrollView
                style={{height: '100%'}}
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
                    }}>
                    
                  </View>
                </TouchableWithoutFeedback>
              </StyledHorizontalScrollView>
            </View>
          </ShadowWrapperContainer>
        )}
        {saveTag?.tags && saveTag.tags?.length > 0 ? (
          <ShadowWrapperContainer noSnack bgWhite>
            <DashboardHeader
              text="Save Tag"
              outerScrollViewScrollEnabled={outerScrollViewScrollEnabled}
              onPress={() => props.navigation.navigate(Routes.myTag)}
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
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginVertical: spacing.height * 2,
              }}>
              {saveTag?.tags?.map((x, i) => (
                <StyledChip
                  textStyle={{fontSize: fonts.regular}}
                  key={i}
                  accessibilityLabel={x.details}
                  onPress={() =>
                    props.navigation.navigate(Routes.tagChat, {
                      id: x._id,
                      name: 'Gang: ' + x.tag_name,
                    })
                  }>
                  {x.tag_name}
                </StyledChip>
              ))}
            </View>
          </ShadowWrapperContainer>
        ) : null}
      </StyledScrollView>
      {authStore.access_token && authStore.access_token !== '' ? (
        <FAB
          style={{
            position: 'absolute',
            right: spacing.width * 5,
            bottom: spacing.height * 3,
            backgroundColor: colors.mainColor,
          }}
          icon="plus"
          label="Post"
          onPress={() =>
            props.navigation.navigate(Routes.createPost, {categories: category})
          }
        />
      ) : null}
    </DashboardLayout>
  );
};

export default React.memo(Dashboard);
