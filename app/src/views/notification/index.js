import React, {useContext, useState, useEffect} from 'react';
import {ThemeContext} from 'styled-components';
import {RefreshControl, TouchableOpacity, View} from 'react-native';
import {StyledButtonLoadMore, StyledScrollView, StyledTimeView} from './style';
import OutsideAuthApi from '../../services/outSideAuth';
import {useSelector, shallowEqual} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {dateFormat, timeFormat, truncate} from '../../utils';

import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';
import Routes from '../../constants/routeConst';
import ListItem from '../../sharedComponents/listItem';
import Loader from '../../sharedComponents/loader';
import defaultValue from '../../constants/defaultValue';
import admobValue from '../../constants/admob';
import Admob from '../../sharedComponents/admob';
import {ShadowWrapperContainer} from '../../sharedComponents/bottomShadow';
import {isArray} from 'lodash';

const NotificationScreen = props => {
  const themeContext = useContext(ThemeContext);
  const [showLoader, setShowLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const colors = themeContext.colors[themeContext.baseColor];
  const spacing = themeContext.spacing;
  const detailsStore = useSelector(state => state.details, shallowEqual);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [dataLoader, setDataLoader] = useState(false);

  const apiCall = pageCount => {
    try {
      const varParam = {
        ...(detailsStore.id !== '' && {id: detailsStore.id}),
        page: pageCount,
      };
      OutsideAuthApi()
        .myNotificationApi(varParam)
        .then(res => {
          if (res?.data && pageCount > 0) {
            let varData = data;
            if (res.data instanceof Array) {
              varData = varData.concat(res.data);
            } else {
              varData.push(res.data);
            }
            setData(varData);
          } else {
            setData(res.data);
          }
          if (res?.data && res.data?.length >= defaultValue.paginationLength) {
            setDataLoader(true);
          } else {
            setDataLoader(false);
          }
          setShowLoader(false);
        })
        .catch(err => {
          setShowLoader(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isFocused && !refreshing) {
      setShowLoader(true);
      setPage(0);
      apiCall(0);
    }
  }, [isFocused, refreshing]);

  useEffect(() => {
    if (page > 0) {
      apiCall(page);
    }
  }, [page]);

  const refreshFnc = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  };

  return (
    <DashboardLayout
      {...props}
      dataLength={data && isArray(data) ? data.length : null}>
      {showLoader ? (
        <Loader />
      ) : (
        <StyledScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshFnc} />
          }>
          {data?.map((x, i) => (
            <React.Fragment key={i}>
              {i === 0 && x.createdAt ? (
                <StyledTimeView>
                  {dateFormat(x.createdAt, undefined)}
                </StyledTimeView>
              ) : dateFormat(x.createdAt, data[i - 1]?.createdAt) ? (
                <StyledTimeView>
                  {dateFormat(x.createdAt, data[i - 1]?.createdAt)}
                </StyledTimeView>
              ) : null}
              <TouchableOpacity
                onPress={() =>
                  x?.data?.route
                    ? props.navigation.navigate(Routes[x.data.route], {
                        id: x.data.id,
                      })
                    : null
                }>
                <ListItem
                  full
                  title={x.data?.title ? x.data.title : ''}
                  description={timeFormat(x.createdAt)}
                />
              </TouchableOpacity>
            </React.Fragment>
          ))}
          {dataLoader ? (
            <StyledButtonLoadMore
              labelStyle={{color: colors.mainByColor}}
              mode="text"
              onPress={() => setPage(page + 1)}>
              Load More
            </StyledButtonLoadMore>
          ) : null}
        </StyledScrollView>
      )}
    </DashboardLayout>
  );
};
export default NotificationScreen;
