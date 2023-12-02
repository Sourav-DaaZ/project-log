import React, {useContext, useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import DashboardLayout from '../../../sharedComponents/layout/dashboardLayout';
import {
  StyledProfileView,
  StyledTitle,
  StyledParagraph,
  StyledCenter,
  StyledSemiTitle,
  StyledProfile,
  StyledLeftContainer,
  WrapperContainer,
} from './style';
import {ThemeContext} from 'styled-components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InsideAuthApi from '../../../services/inSideAuth';
import {detailsUpdate, tokenUpdate} from '../../../store/actions';
import {useSelector, shallowEqual} from 'react-redux';
import {useDispatch} from 'react-redux';
import Routes from '../../../constants/routeConst';
import {ShadowWrapperContainer} from '../../../sharedComponents/bottomShadow';
import Loader from '../../../sharedComponents/loader';
import {useIsFocused} from '@react-navigation/native';
import {onShare, openUrl, saveFncToStore, truncate} from '../../../utils';
import Admob from '../../../sharedComponents/admob';
import admobValue from '../../../constants/admob';
import errorFnc from '../../errorHandeler/errorFunc';
import AvatarImg from '../../../assets/images/avatar.png';

const Setting = props => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const spacing = themeContext.spacing;
  const detailsStore = useSelector(state => state.details, shallowEqual);
  const authStore = useSelector(state => state.auth, shallowEqual);
  const [data, setData] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  const onLoginOut = () => {
    try {
      InsideAuthApi()
        .logout()
        .then(async res => {
          dispatch(
            tokenUpdate({
              access_token: '',
              refresh_token: '',
            }),
          );
        })
        .catch(async err => {
          dispatch(
            tokenUpdate({
              access_token: '',
              refresh_token: '',
            }),
          );
        });
    } catch (e) {
      errorFnc(e);
    }
  };

  useEffect(() => {
    try {
      if (authStore.access_token !== '' && isFocused) {
        setShowLoader(true);
        InsideAuthApi()
          .detailsApi()
          .then(res => {
            setShowLoader(false);
            const varData = {
              id: res.data?.user ? res.data.user : '',
              name: res.data?.name ? res.data.name : '',
              gender: res.data?.gender ? res.data.gender : '',
              age: res.data?.age ? res.data.age : 0,
              userCat: res.data?.enlistedCategory
                ? res.data.enlistedCategory
                : [],
              expectedCat: res.data?.categoryPreference
                ? res.data.categoryPreference
                : [],
            };
            dispatch(detailsUpdate(varData));
            setData(res?.data);
            saveFncToStore('userData', varData);
          })
          .catch(err => {
            setShowLoader(false);
          });
      }
    } catch (e) {
      console.log(e);
    }
  }, [isFocused]);

  return (
    <DashboardLayout {...props} blockDetails>
      {showLoader ? (
        <Loader />
      ) : (
        <ShadowWrapperContainer noSnack bgWhite>
          <WrapperContainer>
            {authStore.access_token && authStore.access_token !== '' ? (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate(Routes.profile, {
                    id: detailsStore.id,
                  })
                }>
                <StyledProfileView>
                  <View>
                    <StyledTitle>
                      {truncate(data?.name ? data.name : '', 20)}
                    </StyledTitle>
                    <StyledParagraph>
                      {data?.category?.category_name}
                    </StyledParagraph>
                  </View>
                  <Avatar.Image
                    source={
                      data?.images
                        ? {
                            uri: data.images,
                          }
                        : AvatarImg
                    }
                    size={spacing.width * 20}
                  />
                </StyledProfileView>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => props.navigation.navigate(Routes.login)}>
                <StyledProfileView>
                  <View>
                    <StyledTitle>Login</StyledTitle>
                    <StyledParagraph>
                      Please login for see the details
                    </StyledParagraph>
                  </View>
                  <Avatar.Image
                    source={
                      data?.images
                        ? {
                            uri: data.images,
                          }
                        : AvatarImg
                    }
                    size={spacing.width * 20}
                  />
                </StyledProfileView>
              </TouchableOpacity>
            )}
            {authStore.access_token && authStore.access_token !== '' ? (
              <StyledProfileView style={{justifyContent: 'space-around'}}>
                {data?.user_socials?.fb_link ? (
                  <TouchableOpacity
                    onPress={() => openUrl(data.user_socials.fb_link)}>
                    <StyledCenter>
                      <FontAwesome
                        style={{color: colors.mainColor}}
                        name="facebook-square"
                        size={spacing.width * 8}
                      />
                    </StyledCenter>
                  </TouchableOpacity>
                ) : null}
                {data?.user_socials?.insta_link ? (
                  <TouchableOpacity
                    onPress={() => openUrl(data.user_socials.insta_link)}>
                    <StyledCenter>
                      <FontAwesome
                        style={{color: colors.mainColor}}
                        name="instagram"
                        size={spacing.width * 8}
                      />
                    </StyledCenter>
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  onPress={() =>
                    onShare(
                      {
                        page: Routes.profile,
                        id: data?.id,
                      },
                      data?.name,
                      'Profile',
                    )
                  }>
                  <StyledCenter>
                    <FontAwesome
                      style={{color: colors.mainColor}}
                      name="share"
                      size={spacing.width * 8}
                    />
                  </StyledCenter>
                </TouchableOpacity>
              </StyledProfileView>
            ) : null}
            {authStore.access_token && authStore.access_token !== '' ? (
              <StyledProfile>
                {data && !data.isVerified ? (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(Routes.userVerification)
                    }>
                    <StyledLeftContainer>
                      <MaterialIcons
                        style={{
                          marginRight: spacing.width * 2,
                          color: colors.textLight,
                        }}
                        name="verified-user"
                        size={spacing.width * 6}
                      />
                      <StyledSemiTitle>Verifiy User</StyledSemiTitle>
                    </StyledLeftContainer>
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(Routes.applicationList)
                  }>
                  <StyledLeftContainer>
                    <MaterialCommunityIcons
                      style={{
                        marginRight: spacing.width * 2,
                        color: colors.textLight,
                      }}
                      name="application-outline"
                      size={spacing.width * 6}
                    />
                    <StyledSemiTitle>My Connections</StyledSemiTitle>
                  </StyledLeftContainer>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate(Routes.myPost)}>
                  <StyledLeftContainer>
                    <MaterialCommunityIcons
                      style={{
                        marginRight: spacing.width * 2,
                        color: colors.textLight,
                      }}
                      name="post-outline"
                      size={spacing.width * 6}
                    />
                    <StyledSemiTitle>My Posts</StyledSemiTitle>
                  </StyledLeftContainer>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate(Routes.myTag)}>
                  <StyledLeftContainer>
                    <MaterialCommunityIcons
                      style={{
                        marginRight: spacing.width * 2,
                        color: colors.textLight,
                      }}
                      name="tag-outline"
                      size={spacing.width * 6}
                    />
                    <StyledSemiTitle>My Gangs</StyledSemiTitle>
                  </StyledLeftContainer>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(Routes.updateDetails, {
                      data: data,
                    })
                  }>
                  <StyledLeftContainer>
                    <MaterialCommunityIcons
                      style={{
                        marginRight: spacing.width * 2,
                        color: colors.textLight,
                      }}
                      name="account-details"
                      size={spacing.width * 6}
                    />
                    <StyledSemiTitle>Details Update</StyledSemiTitle>
                  </StyledLeftContainer>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate(Routes.myBooking)}>
                  <StyledLeftContainer>
                    <MaterialCommunityIcons
                      style={{
                        marginRight: spacing.width * 2,
                        color: colors.textLight,
                      }}
                      name="application-import"
                      size={spacing.width * 6}
                    />
                    <StyledSemiTitle>My Booking</StyledSemiTitle>
                  </StyledLeftContainer>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate(Routes.myReview)}>
                  <StyledLeftContainer>
                    <MaterialIcons
                      style={{
                        marginRight: spacing.width * 2,
                        color: colors.textLight,
                      }}
                      name="rate-review"
                      size={spacing.width * 6}
                    />
                    <StyledSemiTitle>My Review</StyledSemiTitle>
                  </StyledLeftContainer>
                </TouchableOpacity>
                {data.type === 'sadmin' ? (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(Routes.adminCategoryList)
                    }>
                    <StyledLeftContainer>
                      <MaterialCommunityIcons
                        style={{
                          marginRight: spacing.width * 2,
                          color: colors.textLight,
                        }}
                        name="application-outline"
                        size={spacing.width * 6}
                      />
                      <StyledSemiTitle>Admin Category List</StyledSemiTitle>
                    </StyledLeftContainer>
                  </TouchableOpacity>
                ) : null}
                {data.type === 'admin' || data.type === 'sadmin' ? (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(Routes.adminVerifyPost)
                    }>
                    <StyledLeftContainer>
                      <MaterialCommunityIcons
                        style={{
                          marginRight: spacing.width * 2,
                          color: colors.textLight,
                        }}
                        name="application-outline"
                        size={spacing.width * 6}
                      />
                      <StyledSemiTitle>Admin Verify Post</StyledSemiTitle>
                    </StyledLeftContainer>
                  </TouchableOpacity>
                ) : null}
                {data.type === 'admin' || data.type === 'sadmin' ? (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(Routes.adminBannerList)
                    }>
                    <StyledLeftContainer>
                      <MaterialCommunityIcons
                        style={{
                          marginRight: spacing.width * 2,
                          color: colors.textLight,
                        }}
                        name="application-outline"
                        size={spacing.width * 6}
                      />
                      <StyledSemiTitle>Admin Banner List</StyledSemiTitle>
                    </StyledLeftContainer>
                  </TouchableOpacity>
                ) : null}
                {data.type === 'admin' || data.type === 'sadmin' ? (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(Routes.adminVerifyUser)
                    }>
                    <StyledLeftContainer>
                      <MaterialCommunityIcons
                        style={{
                          marginRight: spacing.width * 2,
                          color: colors.textLight,
                        }}
                        name="application-outline"
                        size={spacing.width * 6}
                      />
                      <StyledSemiTitle>Admin Verify User</StyledSemiTitle>
                    </StyledLeftContainer>
                  </TouchableOpacity>
                ) : null}
                {data.type === 'admin' || data.type === 'sadmin' ? (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(Routes.adminVerifyReport)
                    }>
                    <StyledLeftContainer>
                      <MaterialCommunityIcons
                        style={{
                          marginRight: spacing.width * 2,
                          color: colors.textLight,
                        }}
                        name="application-outline"
                        size={spacing.width * 6}
                      />
                      <StyledSemiTitle>Admin Verify Report</StyledSemiTitle>
                    </StyledLeftContainer>
                  </TouchableOpacity>
                ) : null}
              </StyledProfile>
            ) : null}
            {authStore.access_token && authStore.access_token !== '' ? (
              <StyledProfile>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(Routes.webBrowser, {
                      uri: 'https://yarifi.com/terms.html',
                    })
                  }>
                  <StyledLeftContainer>
                    <MaterialCommunityIcons
                      style={{
                        marginRight: spacing.width * 2,
                        color: colors.textLight,
                      }}
                      name="file-eye-outline"
                      size={spacing.width * 6}
                    />
                    <StyledSemiTitle>Terms and Conditions</StyledSemiTitle>
                  </StyledLeftContainer>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(Routes.webBrowser, {
                      uri: 'https://yarifi.com/privacy_policy.html',
                    })
                  }>
                  <StyledLeftContainer>
                    <MaterialCommunityIcons
                      style={{
                        marginRight: spacing.width * 2,
                        color: colors.textLight,
                      }}
                      name="file-eye-outline"
                      size={spacing.width * 6}
                    />
                    <StyledSemiTitle>Privacy Policy</StyledSemiTitle>
                  </StyledLeftContainer>
                </TouchableOpacity>
              </StyledProfile>
            ) : null}
            <StyledProfile>
              <TouchableOpacity
                onPress={() => props.navigation.navigate(Routes.tipsScreen)}>
                <StyledLeftContainer>
                  <MaterialCommunityIcons
                    style={{
                      marginRight: spacing.width * 2,
                      color: colors.textLight,
                    }}
                    name="file-eye-outline"
                    size={spacing.width * 6}
                  />
                  <StyledSemiTitle>Tutorial</StyledSemiTitle>
                </StyledLeftContainer>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate(Routes.createReport)}>
                <StyledLeftContainer>
                  <MaterialIcons
                    style={{
                      marginRight: spacing.width * 2,
                      color: colors.textLight,
                    }}
                    name="bug-report"
                    size={spacing.width * 6}
                  />
                  <StyledSemiTitle>Report an Issue</StyledSemiTitle>
                </StyledLeftContainer>
              </TouchableOpacity>
            </StyledProfile>
            {authStore.access_token && authStore.access_token !== '' ? (
              <StyledProfile>
                <TouchableOpacity onPress={onLoginOut}>
                  <StyledLeftContainer>
                    <MaterialIcons
                      style={{
                        marginRight: spacing.width * 2,
                        color: colors.textLight,
                      }}
                      name="logout"
                      size={spacing.width * 6}
                    />
                    <StyledSemiTitle>Logout</StyledSemiTitle>
                  </StyledLeftContainer>
                </TouchableOpacity>
              </StyledProfile>
            ) : null}
          </WrapperContainer>
        </ShadowWrapperContainer>
      )}
      <View style={{marginBottom: spacing.height}}>
        <Admob id={admobValue.settingPage[0]} />
      </View>
    </DashboardLayout>
  );
};

export default React.memo(Setting);
