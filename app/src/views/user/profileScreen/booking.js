import React, { useState, useMemo, useContext } from 'react';
import {
    StyledButtonLoadMore,
    StyledHorizontalScrollView,
    StyledParagraph,
    StyledStatus,
} from './style';
import InsideAuthApi from '../../../services/inSideAuth';
import Card from '../../../sharedComponents/card';
import ListItem from '../../../sharedComponents/listItem';
import Loader from '../../../sharedComponents/loader';
import { dateFormat, timeFormat, truncate } from '../../../utils';
import { TouchableOpacity, View } from 'react-native';
import defaultValue from '../../../constants/defaultValue';
import admobValue from '../../../constants/admob';
import Admob from '../../../sharedComponents/admob';
import errorFnc from '../../errorHandeler/errorFunc';
import { Avatar } from 'react-native-paper';
import AvatarImg from '../../../assets/images/avatar.png';
import { ThemeContext } from 'styled-components';

const Booking = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const spacing = themeContext.spacing;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [dataLoader, setDataLoader] = useState(false);

    const apiCall = (pageCount) => {
        try {
            const varParam = {
                page: pageCount
            }
            if (props.myUser) {
                InsideAuthApi()
                    .bookingListApi(varParam)
                    .then((res) => {
                        if (res?.data && pageCount > 0) {
                            let varData = data;
                            if (res.data instanceof Array) {
                                varData = varData.concat(res.data)
                            } else {
                                varData.push(res.data)
                            }
                            setData(varData);
                        } else {
                            setData(res.data);
                        }
                        if (res?.data && res.data?.length >= defaultValue.paginationLength) {
                            setDataLoader(true)
                        } else {
                            setDataLoader(false)
                        }
                        setLoading(false);
                    })
                    .catch((err) => {
                        errorFnc(err?.data?.message ? err.data.message : '', true)
                        setLoading(false);
                    });
            } else {
                const varParam = {
                    id: props.route.params?.id ? props.route.params.id : '',
                    page: pageCount
                }
                InsideAuthApi()
                    .bookingListForAllApi(varParam)
                    .then((res) => {
                        if (res?.data && pageCount > 0) {
                            let varData = data;
                            if (res?.data instanceof Array) {
                                varData = varData.concat(res.data)
                            } else {
                                varData.push(res.data)
                            }
                            setData(varData);
                        } else {
                            setData(res.data);
                        }
                        if (res?.data && res.data?.length >= defaultValue.paginationLength) {
                            setDataLoader(true)
                        } else {
                            setDataLoader(false)
                        }
                        setLoading(false);
                    })
                    .catch((err) => {
                        setLoading(false);
                    });
            }
        } catch (e) {
            errorFnc(e)
        }
    }

    useMemo(() => {
        setData([]);
        setLoading(true);
        setPage(0);
        setDataLoader(true);
        apiCall(0);
    }, [props.modalShow])

    useMemo(() => {
        if (page > 0) {
            apiCall(page)
        }
    }, [page])


    return (
        loading ? <Loader /> : <StyledHorizontalScrollView>
            {data?.map((x, i) =>
                <React.Fragment key={i}>
                    <TouchableOpacity onPress={() => {
                        props.setPopupData(x);
                        props.setModalShow(true);
                    }}>
                        <Card
                            profile={
                                <React.Fragment>
                                    <ListItem topStyle={{ maxWidth: '90%' }} description={dateFormat(x.startDate) + ' (' + timeFormat(x.startDate) + ')' + (x.endDate ? ' - ' + dateFormat(x.endDate) + ' (' + timeFormat(x.endDate) + ')' : '')} />
                                    <ListItem
                                        image={<Avatar.Image style={{ margin: spacing.width }} size={spacing.width * 12} source={x?.sender_id?.userInfo?.images ? { uri: x?.sender_id.userInfo.images } : AvatarImg} />}
                                        title={x?.sender_id?.userInfo?.name}
                                    />
                                </React.Fragment>
                            }
                            title={truncate(x.description ? x.description : '')}
                            extraContent={
                                <StyledStatus>
                                    <StyledParagraph>{x.status ? "status: " + x.status[x.status.length - 1] : null}</StyledParagraph>
                                    <StyledParagraph>{x.status?.map((y, i) => y + (i !== x.status.length - 1 ? " -> " : ""))}</StyledParagraph>
                                </StyledStatus>
                            }
                        />
                    </TouchableOpacity>
                    {((i > 0 && ((i % Math.floor(defaultValue.paginationLength / 2)) === 0) || (i === data.length - 1 && data.length < Math.floor(defaultValue.paginationLength / 2)))) ? <View style={{ marginBottom: props.spacing.height }}><Admob id={admobValue.bookingPage[(i % Math.floor(defaultValue.paginationLength / 2))]} /></View> : null}
                </React.Fragment>
            )}
            {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: props.colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
        </StyledHorizontalScrollView>
    )
};

export default React.memo(Booking);