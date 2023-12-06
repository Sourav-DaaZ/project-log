import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
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
import { ThemeContext } from 'styled-components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InsideAuthApi from '../../../services/inSideAuth';
import { detailsUpdate, tokenUpdate } from '../../../store/actions';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import Routes from '../../../constants/routeConst';
import { ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import Loader from '../../../sharedComponents/loader';
import { useIsFocused } from '@react-navigation/native';
import { onShare, openUrl, saveFncToStore, truncate } from '../../../utils';

const Applets = props => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const spacing = themeContext.spacing;
  const detailsStore = useSelector(state => state.details, shallowEqual);
  const authStore = useSelector(state => state.auth, shallowEqual);
  const [data, setData] = useState({});
  const [showLoader, setShowLoader] = useState(false);

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
          <StyledTitle>Applets</StyledTitle>
          <StyledTitle s>Category</StyledTitle>
          <ShadowWrapperContainer noSnack bgWhite>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate(Routes.userVerification)
            }>
            <StyledLeftContainer>
            <View style={{ backgroundColor: 'gray', padding: 10, borderRadius: 10, marginRight: spacing.width * 2 }}>
              <MaterialIcons
                style={{
                  color: colors.textLight,
                }}
                name="verified-user"
                size={spacing.width * 7}
              />
              </View>
              <StyledSemiTitle>Verifiy User</StyledSemiTitle>
            </StyledLeftContainer>
          </TouchableOpacity>
        </ShadowWrapperContainer>
        </React.Fragment>
      )}

    </DashboardLayout>
  );
};

export default React.memo(Applets);
