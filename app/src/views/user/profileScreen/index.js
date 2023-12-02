import React, { useContext, useState, useMemo } from 'react';
import {
    Avatar,
    Divider,
    FAB,
    Menu
} from 'react-native-paper';
import {
    StyledProfileView,
    StyledTitle,
    StyledParagraph,
    StyledCenter,
    StyledReviewProfile,
    StyledImage,
    StyledScrollView,
    StyledViewButton,
    StyledStatus,
    StyledPopupWrapper,
    CardWrapper,
    StyledDotIcon,
    ImageWrapper,
    StyledFontAwesome,
    StyledRate,
    StyledMaterialIcons,
    StyledLogo,
    StyledEditIcon
} from './style';
import { ThemeContext } from 'styled-components';
import { useSelector, shallowEqual } from 'react-redux';
import Review from './review';

import Routes from '../../../constants/routeConst';
import OutsideAuthApi from '../../../services/outSideAuth';
import Loader from '../../../sharedComponents/loader';
import { BottomShadow, ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import Booking from './booking';
import Modal from '../../../sharedComponents/modal';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Platform, RefreshControl, TouchableOpacity } from 'react-native';
import defaultValue from '../../../constants/defaultValue';
import ListItem from '../../../sharedComponents/listItem';
import { dateFormat, onShare, openUrl, timeFormat, truncate } from '../../../utils';
import InsideAuthApi from '../../../services/inSideAuth';
import Tabs from '../../../sharedComponents/tab';
import ImagePreview from '../../../sharedComponents/imagePreview';
import errorFnc from '../../errorHandeler/errorFunc';
import AvatarImg from '../../../assets/images/avatar.png';

const ProfileScreen = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const spacing = themeContext.spacing;
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const [data, setData] = useState([]);
    const [popupData, setPopupData] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [globalPost, setGlobalPost] = useState('review');
    const [modalShow, setModalShow] = useState(true);
    const [addNotes, setAddNotes] = useState('');
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [imgString, setImgString] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    useMemo(() => {
        if (!refreshing) {
            setShowLoader(true);
            OutsideAuthApi()
                .userDetailsApi(`?user_id=${props.route.params?.id}`)
                .then((res) => {
                    setData(res?.data);
                    setShowLoader(false);
                })
                .catch((err) => {
                    setShowLoader(false);
                    errorFnc(err?.data?.message ? err.data.message : '', true)
                });
        }
    }, [refreshing])

    const onEdit = (id, status, note) => {
        const requestData = {
            id: id,
            ...status && { status: status },
            ...note && { note: note },
        }
        if (note?.trim() !== '') {
            InsideAuthApi()
                .editBookinggApi(requestData)
                .then((res) => {
                    if (res?.data) {
                        setPopupData(res.data);
                    }
                    setAddNotes('');
                })
                .catch((err) => {
                    errorFnc(err?.data?.message ? err.data.message : '', true)
                })
        }
    }

    const onReviewEdit = (id, note) => {
        const requestData = {
            id: id,
            comment: note,
        }
        if (note?.trim() !== '') {
            InsideAuthApi()
                .editReviewApi(requestData)
                .then((res) => {
                    if (res?.data) {
                        setPopupData(res.data);
                    }
                    setAddNotes('');
                })
                .catch((err) => {
                    errorFnc(err?.data?.message ? err.data.message : '', true)
                })
        }
    }

    const openMap = async (address, city, zipCode) => {
        // const tag = `${Platform.OS === 'ios' ? 'maps' : 'geo'}:0,0?q=`;
        // const link = Platform.select({
        //     ios: `${scheme}${label}@${latitude},${longitude}`,
        //     android: `${scheme}${latitude},${longitude}(${label})`
        // });
        const destination = encodeURIComponent(`${address} ${zipCode}, ${city}`);
        const provider = Platform.OS === 'ios' ? 'apple' : 'google'
        const link = `http://maps.${provider}.com/?daddr=${destination}`;

        openUrl(link);
    }

    const openDialScreen = (num) => {
        let number = '';
        if (Platform.OS === 'ios') {
            number = `telprompt:${num}`;
        } else {
            number = `tel:${num}`;
        }
        openUrl(number);
    };

    const onClose = () => {
        setModalShow(false);
        setPopupData({});
    }

    const refreshFnc = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 200);
    }

    return (
        showLoader ? <Loader /> : <ShadowWrapperContainer none {...props}>
            <StyledScrollView
                stickyHeaderIndices={[1]}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshFnc} />
                }
                contentContainerStyle={{ flexGrow: 1 }}>
                <React.Fragment>
                    <ImageWrapper>
                        <StyledImage>
                            <TouchableOpacity onPress={() => setImgString(data.images ? data.images : '')}>
                                <Avatar.Image
                                    source={data.images ? {
                                        uri:
                                            data.images
                                    } : AvatarImg}
                                    size={spacing.width * 30}
                                />
                            </TouchableOpacity>
                        </StyledImage>
                    </ImageWrapper>
                    <StyledProfileView>
                        <StyledRate>
                            <StyledTitle>{data?.name}</StyledTitle>
                            {data?.isVerified ? <StyledMaterialIcons name='verified' /> : null}
                            {data?.rating?.totalRating && data?.rating?.numberOfUser ? <React.Fragment>
                                <StyledParagraph> {' ('}</StyledParagraph>
                                <StyledFontAwesome name='star' />
                                <StyledParagraph>{(data.rating.totalRating / data.rating.numberOfUser).toString() + ')'}</StyledParagraph>
                            </React.Fragment> : null}
                        </StyledRate>
                        {data?.profession ? <StyledRate><StyledLogo name='work' /><StyledParagraph> {data?.profession + (data?.subProfession ? ` (${data?.subProfession})` : '')}</StyledParagraph></StyledRate> : null}
                        {data?.contactAddress ? <StyledRate><StyledLogo name='location-on' /><StyledParagraph onPress={() => openMap(data.contactAddress, '', '')}>{data.contactAddress}</StyledParagraph></StyledRate> : null}
                        {data?.contactNumber ? <StyledRate><StyledLogo name='call' /><StyledParagraph onPress={() => openDialScreen(data.contactNumber)}>{data.contactNumber}</StyledParagraph></StyledRate> : null}
                    </StyledProfileView>
                    <StyledReviewProfile>
                        {data?.user_socials?.fb_link ? <TouchableOpacity onPress={() => openUrl(data.user_socials.fb_link)}>
                            <StyledCenter>
                                <FontAwesome style={{ color: colors.mainColor }} name='facebook-square' size={spacing.width * 8} />
                            </StyledCenter>
                        </TouchableOpacity> : null}
                        {data?.user_socials?.insta_link ? <TouchableOpacity onPress={() => openUrl(data.user_socials.insta_link)}>
                            <StyledCenter>
                                <FontAwesome style={{ color: colors.mainColor }} name='instagram' size={spacing.width * 8} />
                            </StyledCenter>
                        </TouchableOpacity> : null}
                        {!(props.route.params?.id === detailsStore.id) ? <StyledCenter>
                            <TouchableOpacity onPress={() => { authStore.access_token !== '' && props.route.params?.id && props.route.params.id !== detailsStore.id ? props.navigation.navigate(Routes.userChat, { id: props.route.params.id }) : props.navigation.navigate(Routes.login) }}>
                                <Fontisto style={{ color: colors.mainColor }} name='messenger' size={spacing.width * 8} />
                            </TouchableOpacity>
                        </StyledCenter> : null}
                        <TouchableOpacity onPress={() => onShare({
                            page: Routes.profile,
                            id: props.route.params?.id,
                        }, data?.name, 'Profile')}>
                            <StyledCenter>
                                <FontAwesome style={{ color: colors.mainColor }} name='share' size={spacing.width * 8} />
                            </StyledCenter>
                        </TouchableOpacity>
                    </StyledReviewProfile>
                </React.Fragment>
                <BottomShadow small>
                    <StyledViewButton>
                        <Tabs select={globalPost === 'review'} text='Review' onPress={() => setGlobalPost('review')} />
                        {authStore.access_token !== '' ? <Tabs select={globalPost === 'booking'} text='Booking' onPress={() => setGlobalPost('booking')} /> : null}
                    </StyledViewButton>
                </BottomShadow>
                {globalPost === 'review' ? <Review spacing={spacing} {...props} colors={colors} myUser={authStore.access_token !== '' && data.user === detailsStore.id ? true : false} userId={props.route.params?.id} setPopupData={setPopupData} setModalShow={setModalShow} modalShow={modalShow} /> : null}
                {authStore.access_token !== '' && globalPost === 'booking' ? <Booking {...props} spacing={spacing} colors={colors} myUser={authStore.access_token !== '' && data.user === detailsStore.id ? true : false} userId={props.route.params?.id} setPopupData={setPopupData} setModalShow={setModalShow} modalShow={modalShow} /> : null}
            </StyledScrollView>
            {authStore.access_token !== '' && props.route.params && props.route.params.id !== detailsStore.id ? <FAB
                style={{
                    position: 'absolute',
                    right: spacing.width * 5,
                    bottom: spacing.height * 3,
                    backgroundColor: colors.mainColor
                }}
                icon="plus"
                label={globalPost === 'booking' ? 'Book' : globalPost === 'review' ? 'Review' : ''}
                onPress={() => { globalPost === 'booking' ? props.navigation.navigate(Routes.createBooking, { id: data.user._id }) : globalPost === 'review' ? props.navigation.navigate(Routes.createReview, { id: data.user._id }) : null }}
            /> : null}
            {popupData._id && globalPost === 'booking' ? <Modal show={modalShow} notes={popupData?.notes} onEdit={() => onEdit(popupData._id, null, addNotes)} popupData={popupData} onClose={onClose} setAddNotes={setAddNotes} addNotes={addNotes} editable={detailsStore.id?.toString() === popupData.sender_id?.toString() || detailsStore.id?.toString() === popupData.receiver_id?.toString()}>
                <CardWrapper>
                    <ListItem topStyle={{ maxWidth: '90%' }} description={dateFormat(popupData.startDate) + ' (' + timeFormat(popupData.startDate) + ')' + (popupData.endDate ? ' - ' + dateFormat(popupData.endDate) + ' (' + timeFormat(popupData.endDate) + ')' : '')} />
                    {detailsStore.id?.toString() === popupData.sender_id?.toString() ? <Menu
                        visible={showMenu}
                        onDismiss={() => setShowMenu(false)}
                        anchor={<TouchableOpacity onPress={() => setShowMenu(true)}><StyledDotIcon name='dots-three-vertical' size={spacing.width * 10} /></TouchableOpacity>}
                    >
                        <Menu.Item onPress={() => {
                            props.navigation.navigate(Routes.editBooking, { data: popupData });
                            onClose();
                        }} title="Edit Booking" />
                        <Divider />
                        {popupData.status === defaultValue.bookingStatus[1] ? <Menu.Item onPress={() => {
                            props.navigation.navigate(Routes.createReview, { data: popupData, booking_id: popupData._id, id: popupData.sender_id });
                            onClose();
                        }} title="Review" /> : null}
                    </Menu> : null}
                </CardWrapper>
                <TouchableOpacity onPress={() => {
                    setModalShow(false);
                    props.navigation.goBack();
                    props.navigation.navigate(Routes.profile, { id: popupData?.sender_id?._id });
                }}>
                    <ListItem
                        image={<Avatar.Image style={{ margin: spacing.width }} size={spacing.width * 12} source={popupData?.sender_id?.userInfo?.images ? { uri: popupData?.sender_id.userInfo.images } : AvatarImg} />}
                        title={popupData?.sender_id?.userInfo?.name}
                    />
                </TouchableOpacity>
                <ListItem topStyle={{ marginBottom: 0, maxWidth: '90%' }} title={popupData.description ? popupData.description : ''} />
                <StyledPopupWrapper>
                    <Menu
                        visible={showStatusMenu}
                        onDismiss={() => setShowStatusMenu(false)}
                        anchor={<TouchableOpacity onPress={() => setShowStatusMenu(true)}>
                            <StyledStatus>
                                <StyledParagraph>{popupData.status ? "status: " + popupData.status[popupData.status.length - 1] : null} {popupData.status ? <StyledEditIcon name='edit' /> : null}</StyledParagraph>
                                <StyledParagraph>{popupData.status?.map((y, i) => y + (i !== popupData.status.length - 1 ? " -> " : ""))}</StyledParagraph>
                            </StyledStatus>
                        </TouchableOpacity>}
                    >
                        {defaultValue?.bookingStatus?.map((y, i) => detailsStore.id?.toString() === popupData.sender_id?.toString() && (i === 0 || i === 3) ? <React.Fragment key={i}>
                            <Menu.Item onPress={() => {
                                onEdit(popupData._id, y);
                                setShowStatusMenu(false);
                            }} title={y} />
                            <Divider />
                        </React.Fragment> : detailsStore.id?.toString() === popupData.user_id?.toString() && (i === 1 || i === 2) ? <React.Fragment key={i}>
                            <Menu.Item onPress={() => {
                                onEdit(popupData._id, y);
                                setShowStatusMenu(false);
                            }} title={y} />
                            <Divider />
                        </React.Fragment> : null)}
                    </Menu>
                </StyledPopupWrapper>
            </Modal> : null}
            {popupData._id && globalPost === 'review' ? <Modal show={modalShow} notes={popupData?.comment} onEdit={() => onReviewEdit(popupData._id, addNotes)} popupData={popupData} onClose={onClose} setAddNotes={setAddNotes} addNotes={addNotes} editable={detailsStore.id?.toString() === popupData.sender_id?.toString() || detailsStore.id?.toString() === popupData.receiver_id?.toString()}>
                <CardWrapper>
                    <ListItem topStyle={{ marginBottom: 0, maxWidth: '90%' }} description={dateFormat(popupData.createdAt)} />
                    {detailsStore.id?.toString() === popupData.sender_id?.toString() ? <Menu
                        visible={showMenu}
                        onDismiss={() => setShowMenu(false)}
                        anchor={<TouchableOpacity onPress={() => setShowMenu(true)}><StyledDotIcon name='dots-three-vertical' size={spacing.width * 10} /></TouchableOpacity>}
                    >
                        <Menu.Item onPress={() => {
                            props.navigation.navigate(Routes.editReview, { data: popupData });
                            onClose();
                        }} title="Edit Review" />
                        <Divider />
                    </Menu> : null}
                </CardWrapper>
                <ListItem full topStyle={{ marginBottom: 0, maxWidth: '90%' }} title={popupData.description ? popupData.description : ''} />
                <StyledPopupWrapper>
                    <StyledStatus>
                        <StyledParagraph>{popupData.status ? "status: " + popupData.status[popupData.status.length - 1] : null}</StyledParagraph>
                        <StyledParagraph>{popupData.status?.map((y, i) => y + (i !== popupData.status.length - 1 ? " -> " : ""))}</StyledParagraph>
                    </StyledStatus>
                </StyledPopupWrapper>
            </Modal> : null}
            <ImagePreview show={imgString !== ''} images={[{ url: imgString }]} setShowFalse={() => setImgString('')} />
        </ShadowWrapperContainer>
    )
}
export default React.memo(ProfileScreen);