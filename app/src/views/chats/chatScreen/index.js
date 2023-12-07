import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { Avatar } from 'react-native-paper';
import { RefreshControl, TouchableOpacity, View } from 'react-native';
import {
    StyledButtonLoadMore,
    StyledScrollView,
    StyledTitle,
} from './style';
import { useSelector, shallowEqual } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getStoreData, setStoreData, timeFormat, truncate } from '../../../utils'

import Routes from '../../../constants/routeConst';
import ListItem from '../../../sharedComponents/listItem';
import Loader from '../../../sharedComponents/loader';
import InsideAuthApi from '../../../services/inSideAuth';
import defaultValue from '../../../constants/defaultValue';
import admobValue from '../../../constants/admob';
import Admob from '../../../sharedComponents/admob';
import errorFnc from '../../errorHandeler/errorFunc';
import AvatarImg from '../../../assets/images/avatar.png';
import { ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import { isArray } from 'lodash';

const ChatScreen = (props) => {
    const themeContext = useContext(ThemeContext);
    const [showLoader, setShowLoader] = useState(false);
    const isFocused = useIsFocused();
    const colors = themeContext.colors[themeContext.baseColor];
    const spacing = themeContext.spacing;
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [dataLoader, setDataLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const configStore = useSelector((state) => state.config, shallowEqual);

    const apiCall = (pageCount) => {
        try {
            const varParam = {
                page: pageCount
            }
            setShowLoader(true);
            InsideAuthApi()
                .myChatListApi(varParam)
                .then(async (res) => {
                    if (res.data && pageCount > 0) {
                        let varData = data;
                        if (res.data instanceof Array) {
                            varData = varData.concat(res.data)
                        } else {
                            varData.push(res.data)
                        }
                        setData(varData);
                        await setStoreData('chatList', varData);
                    } else if (res.data) {
                        setData(res.data);
                        await setStoreData('chatList', res.data);
                    }
                    if (res?.data && res.data?.length >= defaultValue.paginationLength) {
                        setDataLoader(true)
                    } else {
                        setDataLoader(false)
                    }
                    setShowLoader(false);
                })
                .catch((err) => {
                    setShowLoader(false);
                });
        } catch (e) {
            errorFnc(e)
        }
    }

    const setDataFnc = async () => {
        setData(await getStoreData('chatList'))
    }

    useEffect(() => {
        if (isFocused && !refreshing) {
            setDataFnc();
            apiCall(0)
        }
    }, [isFocused, configStore?.chatUpdate, refreshing])

    useEffect(() => {
        if (page > 0) {
            apiCall(page)
        }
    }, [page])

    const refreshFnc = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 200);
    }

    return (
        <React.Fragment>
            <StyledTitle>Chats</StyledTitle>
           { showLoader ? <Loader /> : <ShadowWrapperContainer none dataLength={data && !isArray(data) ? data.length : null}>
                <StyledScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refreshFnc} />
                    }
                    style
                >
                    {data?.map((x, i) => (
                        <React.Fragment key={i}>
                            <TouchableOpacity onPress={() => props.navigation.navigate(Routes.userChat, {
                                id: detailsStore.id?.toString() !== x?.sender_user_id?._id?.toString() ? x.sender_user_id?._id : x.receiver_user_id?._id,
                                userData: detailsStore.id?.toString() !== x?.sender_user_id?._id?.toString() ? x.sender_user_id?.userInfo : x.receiver_user_id.userInfo
                            })}>
                                <ListItem
                                    title={truncate(detailsStore.id?.toString() !== x?.sender_user_id?._id?.toString() ? x.sender_user_id?.userId : x.receiver_user_id?.userId)}
                                    description={truncate(x?.comments ? x.comments[0]?.msg : '')}
                                    descriptionBold={x?.viewList && x.viewList.length > 0 && !x.viewList.includes(detailsStore.id) ? x?.comments ? truncate(x.comments[0]?.msg) : '' : null}
                                    smallDescription={timeFormat(x?.updatedAt)}
                                    image={<Avatar.Image style={{ margin: spacing.width }} size={spacing.width * 15} source={detailsStore.id?.toString() !== x?.sender_user_id?._id?.toString() ? x.sender_user_id?.userInfo?.images ? { uri: x.sender_user_id.userInfo.images } : AvatarImg : (x.receiver_user_id?.userInfo?.images ? { uri: x.receiver_user_id.userInfo.images } : AvatarImg)} />}
                                />
                            </TouchableOpacity>
                            {((i > 0 && ((i % Math.floor(defaultValue.paginationLength / 2)) === 0) || (i === data.length - 1 && data.length < Math.floor(defaultValue.paginationLength / 2)))) ? <View style={{ marginBottom: spacing.height }}><Admob id={admobValue.chatPage[(i % Math.floor(defaultValue.paginationLength / 2))]} /></View> : null}
                        </React.Fragment>
                    ))}
                    <ListItem
                        title={'Sourav'}
                        description={"MSG"}
                        // descriptionBold={x?.viewList && x.viewList.length > 0 && !x.viewList.includes(detailsStore.id) ? x?.comments ? truncate(x.comments[0]?.msg) : '' : null}
                        smallDescription={'12:00'}
                        image={<Avatar.Image style={{ margin: spacing.width }} size={spacing.width * 15} source={AvatarImg} />}
                    />
                    {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
                </StyledScrollView>
            </ShadowWrapperContainer>}
        </React.Fragment>
    )
}
export default ChatScreen;