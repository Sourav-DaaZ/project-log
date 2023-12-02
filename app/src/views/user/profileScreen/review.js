import React, { useState, useEffect } from 'react';
import {
    StyledButtonLoadMore,
    StyledHorizontalScrollView,
} from './style';
import InsideAuthApi from '../../../services/inSideAuth';
import Card from '../../../sharedComponents/card';
import { useSelector, shallowEqual } from 'react-redux';
import OutsideAuthApi from '../../../services/outSideAuth';
import ListItem from '../../../sharedComponents/listItem';
import Loader from '../../../sharedComponents/loader';
import { dateFormat, truncate } from '../../../utils';
import { TouchableOpacity, View } from 'react-native';
import defaultValue from '../../../constants/defaultValue';
import admobValue from '../../../constants/admob';
import Admob from '../../../sharedComponents/admob';
import errorFnc from '../../errorHandeler/errorFunc';

const Review = (props) => {
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [dataLoader, setDataLoader] = useState(false);

    const apiCall = (pageCount) => {
        try {
            const varParam = {
                page: pageCount
            }
            if (props.myUser) {
                InsideAuthApi()
                    .getReviewApi(varParam)
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
                    user_id: props.route.params?.id ? props.route.params.id : '',
                    token: authStore.firebase_token,
                    page: pageCount
                }
                OutsideAuthApi()
                    .getReviewForOtherApi(varParam)
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
            }
        } catch (e) {
            errorFnc(e)
        }
    }

    useEffect(() => {
        setData([]);
        setLoading(true);
        setPage(0);
        setDataLoader(true);
        apiCall(0);
    }, [props?.modalShow])

    useEffect(() => {
        if (page > 0) {
            apiCall(page)
        }
    }, [page])

    return (
        loading ? <Loader /> : <StyledHorizontalScrollView>
            {data?.map((x, i) =>
                <React.Fragment key={i}>
                    <TouchableOpacity key={i} onPress={() => {
                        props.setPopupData(x);
                        props.setModalShow(true);
                    }}>
                        <Card
                            images={x.image ? x.image : ''}
                            profile={
                                <ListItem topStyle={{ marginBottom: 0, maxWidth: '90%' }} description={dateFormat(x.createdAt) + ` (${x.isPublic ? 'public' : 'private'})`} />
                            }
                            review={x.rating ? x.rating : 0}
                            title={truncate(x.description ? x.description : '')}
                        />
                    </TouchableOpacity>
                    {((i > 0 && ((i % Math.floor(defaultValue.paginationLength / 2)) === 0) || (i === data.length - 1 && data.length < Math.floor(defaultValue.paginationLength / 2)))) ? <View style={{ marginBottom: props.spacing.height }}><Admob id={admobValue.bookingPage[(i % Math.floor(defaultValue.paginationLength / 2))]} /></View> : null}
                </React.Fragment>
            )}
            {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: props.colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
        </StyledHorizontalScrollView>
    )
};

export default Review;