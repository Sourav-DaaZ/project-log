import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { Avatar } from 'react-native-paper';
import DashboardLayout from '../../../sharedComponents/layout/dashboardLayout';
import {
  StyledProfileView,
  StyledTitle,
  StyledParagraph,
  StyledSemiTitle,
  WrapperContainer,
} from './style';
import { ThemeContext } from 'styled-components';
import InsideAuthApi from '../../../services/inSideAuth';
import { detailsUpdate, tokenUpdate } from '../../../store/actions';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import Routes from '../../../constants/routeConst';
import { ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import Loader from '../../../sharedComponents/loader';
import { useIsFocused } from '@react-navigation/native';
import { onShare, openUrl, saveFncToStore, truncate } from '../../../utils';
import errorFnc from '../../errorHandeler/errorFunc';
import AvatarImg from '../../../assets/images/avatar.png';
import {
  BarChart,
} from "react-native-chart-kit";
import DashboardHeader from '../../dashboard/header';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
        <React.Fragment>
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
            <ShadowWrapperContainer noSnack bgWhite>
              <DashboardHeader
                text="Performance"
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
              <View>
                <StyledSemiTitle>Totel Work Hours: 24Hr</StyledSemiTitle>
                <BarChart
                  // style={graphStyle}
                  data={{
                    labels: ["January", "February", "March", "April", "May"],
                    datasets: [
                      {
                        data: [20, 45, 28, 80, 99]
                      }
                    ]
                  }}
                  width={Dimensions.get("window").width - 50}
                  height={220}
                  yAxisLabel="$"
                  withInnerLines={false}
                  chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `#52C2CB`,
                    labelColor: (opacity = 1) => `#52C2CB`,
                    style: {
                      borderRadius: 16
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "5",
                      stroke: "#ffa726"
                    }
                  }}
                  verticalLabelRotation={0}
                />
              </View>
              <View>
                <StyledSemiTitle>Performance Index</StyledSemiTitle>
                <BarChart
                  // style={graphStyle}
                  data={{
                    labels: ["January", "February", "March", "April", "May"],
                    datasets: [
                      {
                        data: [20, 45, 28, 80, 99]
                      }
                    ]
                  }}
                  width={Dimensions.get("window").width - 50}
                  height={220}
                  yAxisLabel="$"
                  withInnerLines={false}
                  chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `#52C2CB`,
                    labelColor: (opacity = 1) => `#52C2CB`,
                    style: {
                      borderRadius: 16
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "",
                      stroke: "#ffa726"
                    }
                  }}
                  verticalLabelRotation={0}
                />
              </View>
            </ShadowWrapperContainer>
          </WrapperContainer>
        </React.Fragment>
      )}
    </DashboardLayout>
  );

};

export default React.memo(Setting);
