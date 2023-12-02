import React, {useContext, useState, useRef, useEffect} from 'react';
import {ThemeContext} from 'styled-components';
import {io} from 'socket.io-client';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, TouchableOpacity} from 'react-native';
import {
  StyledSafeAreaView,
  StyledScrollView,
  StyledInputView,
  StyledInput,
  StyledUserChatView,
  StyledUserChatViewText,
  StyledClock,
  StyledMyChatView,
  StyledMyChatViewText,
  StyledButtonLoadMore,
  StyledTimeView,
  WrapperView,
  HeaderText,
  StyledSmallImage,
  StyledRemove,
  StyledImage,
  StyledTap,
} from './style';
import {API} from '../../../constants/apiConstant';
import {
  timeFormat,
  dateFormat,
  apiEncryptionData,
  apiDecryptionData,
  truncate,
} from '../../../utils';
import {useSelector, shallowEqual} from 'react-redux';
import {
  BottomShadow,
  ShadowWrapperContainer,
} from '../../../sharedComponents/bottomShadow';
import {CustomHeader} from '../../../routes/custom';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePreview from '../../../sharedComponents/imagePreview';
import errorFnc from '../../errorHandeler/errorFunc';
import defaultValue from '../../../constants/defaultValue';
import Loader from '../../../sharedComponents/loader';
import Routes from '../../../constants/routeConst';

const GlobalChat = props => {
  const scrollViewRef = useRef();
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const spacing = themeContext.spacing;
  const detailsStore = useSelector(state => state.details, shallowEqual);
  const [inputValue, setInputValue] = useState('');
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState({});
  const [dataLoader, setDataLoader] = useState(false);
  const [page, setPage] = useState(0);
  const [image, setImage] = useState('');
  const [loader, setLoader] = useState(false);
  const [newChatloader, setNewChatloader] = useState(false);
  const [show, setShow] = useState('');
  const socket = io(
    API.baseUrls[API.currentEnv] + API.noAuthUrls.globalChatSocket,
    {
      transports: ['websocket'],
      upgrade: false,
      // forceNew: true,
    },
  );

  const onLeave = () => {
    try {
      const varParam = {
        room: props.route.params.id,
      };
      socket.emit('close', varParam, error => {
        console.warn(error);
        socket.disconnect();
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      const varParam = apiEncryptionData({
        room: props.route.params.id,
      });
      socket.emit('join', varParam, qData => {
        const data = apiDecryptionData(qData);
        if (data?.error) {
          console.warn(data.error);
        }
        setPage(data.data?.lastPage ? data.data.lastPage : 0);
        setChats(data.data?.data ? data.data.data : []);
        if (data.data && data.data.lastPage > 0) {
          setDataLoader(true);
        } else {
          setDataLoader(false);
        }
        scrollViewRef.current?.scrollToEnd({animated: true});
      });
    } catch (e) {
      errorFnc(e);
    }
    return () => {
      onLeave();
    };
  }, []);

  useEffect(() => {
    try {
      if (newChat?.time) {
        const varData = newChat;
        let varChat = chats;
        varChat.push(varData);
        setChats(varChat);
        setNewChatloader(false);
      }
      scrollViewRef.current?.scrollToEnd({animated: true});
    } catch (e) {
      errorFnc(e);
    }
  }, [newChat]);

  const onChangePage = () => {
    try {
      const vPage = page;
      const varParam = apiEncryptionData({
        room: props.route?.params?.id ? props.route.params.id : '',
        page: vPage,
      });
      socket.emit('loadData', varParam, qData => {
        const data = apiDecryptionData(qData);
        if (data.error) {
          errorFnc(data.error, true);
        }
        if (data?.data && data.data?.data && vPage > 0) {
          let varData = data.data.data;
          varData = varData.concat(chats);
          setChats(varData);
          setPage(data.data?.lastPage ? data.data.lastPage : 0);
        } else {
          setChats(data?.data?.data ? data.data.data : []);
          setPage(data.data?.lastPage ? data.data.lastPage : 0);
        }
        if (data?.data && data.data?.lastPage <= 0) {
          setDataLoader(false);
        }
      });
    } catch (e) {
      errorFnc(e);
    }
  };

  const changeInput = () => {
    try {
      setLoader(true);
      const varParam = apiEncryptionData({
        room: props.route?.params?.id ? props.route.params.id : '',
        msg: inputValue,
        image: image,
        user_id: detailsStore.id,
      });
      socket.emit('sendMessage', varParam, qData => {
        const data = apiDecryptionData(qData);
        if (data?.error) {
          errorFnc(data.error, true);
        }
        if (data?.success) {
          setImage('');
          setInputValue('');
        }
        setLoader(false);
      });
    } catch (e) {
      errorFnc(e);
    }
  };

  const uploadImg = async () => {
    try {
      const result = await launchImageLibrary(defaultValue.imageUploadOptions);
      if (result.assets[0].fileSize > defaultValue.maxImageSize) {
        errorFnc('Image size should be less than 1 MB.', true);
      } else {
        setImage('data:image/png;base64,' + result.assets[0].base64);
      }
    } catch (e) {
      errorFnc(e);
    }
  };

  socket.on('receivedMessage', qData => {
    setNewChatloader(true);
    const data = apiDecryptionData(qData);
    setNewChat(data?.data);
  });

  const chatUI = (x, i, load) => {
    
    try {
      return (
        <WrapperView key={i}>
          {i === 0 && x.time ? (
            <StyledTimeView>{dateFormat(x.time, undefined)}</StyledTimeView>
          ) : dateFormat(x.time, chats[i - 1]?.time) ? (
            <StyledTimeView>
              {dateFormat(x.time, chats[i - 1]?.time)}
            </StyledTimeView>
          ) : null}
          {x?.user?._id?.toString() === detailsStore.id?.toString() ? (
            <StyledMyChatView>
              {x.image ? (
                <TouchableOpacity onPress={() => setShow(x.image)}>
                  <StyledImage source={{uri: x.image}} />
                </TouchableOpacity>
              ) : null}
              {x?.user?.userId ? (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(Routes.profile, {
                      id: x?.user?._id,
                    })
                  }>
                  <StyledTap>{x?.user?.userId}</StyledTap>
                </TouchableOpacity>
              ) : (
                <StyledTap>User</StyledTap>
              )}
              <StyledMyChatViewText>{x.msg}</StyledMyChatViewText>
              <StyledClock style={{right: 0}}>{timeFormat(x.time)}</StyledClock>
            </StyledMyChatView>
          ) : (
            <StyledUserChatView>
              {x.image ? (
                <TouchableOpacity onPress={() => setShow(x.image)}>
                  <StyledImage source={{uri: x.image}} />
                </TouchableOpacity>
              ) : null}
              {x?.user?.userId ? (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(Routes.profile, {
                      id: x?.user?._id,
                    })
                  }>
                  <StyledTap>{x?.user?.userId}</StyledTap>
                </TouchableOpacity>
              ) : (
                <StyledTap>User</StyledTap>
              )}
              <StyledUserChatViewText>{x.msg}</StyledUserChatViewText>
              <StyledClock style={{left: 0}}>{timeFormat(x.time)}</StyledClock>
            </StyledUserChatView>
          )}
          {load && i === load ? (
            <StyledButtonLoadMore
              labelStyle={{color: colors.mainByColor}}
              mode="text">
              Loading
            </StyledButtonLoadMore>
          ) : null}
        </WrapperView>
      );
    } catch (e) {
      return <WrapperView key={i}></WrapperView>;
    }
  };

  return (
    <StyledSafeAreaView>
      <ShadowWrapperContainer none {...props}>
        <BottomShadow>
          <CustomHeader
            navigation={() => props.navigation.goBack()}
            left={
              <Ionicons
                name="chevron-back"
                color={colors.iconColor}
                size={spacing.width * 10}
              />
            }
            logo={
              <HeaderText>
                {'Global: ' + truncate(props.route.params?.name, 10)}
              </HeaderText>
            }
          />
        </BottomShadow>
        <StyledScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}>
          {dataLoader ? (
            <StyledButtonLoadMore
              labelStyle={{color: colors.mainByColor}}
              mode="text"
              onPress={onChangePage}>
              Load More
            </StyledButtonLoadMore>
          ) : null}
          {newChatloader
            ? chats?.map((x, i) => chatUI(x, i, chats.length - 1))
            : chats?.map((x, i) => chatUI(x, i))}
        </StyledScrollView>
        <StyledInputView>
          {image !== '' ? (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <StyledSmallImage source={{uri: image}} />
              <TouchableOpacity onPress={() => setImage('')}>
                <StyledRemove
                  labelStyle={{color: colors.mainByColor}}
                  mode="text">
                  Remove
                </StyledRemove>
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={{width: '85%'}}>
            <StyledInput
              ele="input"
              styleView={{
                backgroundColor: colors.mainColor,
                borderBottomWidth: 0,
              }}
              value={inputValue}
              maxLength={2000}
              onInputChange={val => setInputValue(val)}
            />
          </View>
          {loader ? (
            <TouchableOpacity style={{width: '15%'}}>
              <Loader
                loaderOnly
                style={{
                  color: colors.mainByColor,
                  marginLeft: spacing.width * 2,
                  marginTop: spacing.height * 1.5,
                }}
              />
            </TouchableOpacity>
          ) : inputValue !== '' || image !== '' ? (
            <TouchableOpacity
              onPress={!loader ? changeInput : null}
              style={{width: '15%', opacity: loader ? 0.5 : 1}}>
              <Ionicons
                name="send"
                size={spacing.width * 11}
                style={{
                  color: colors.mainByColor,
                  marginLeft: spacing.width * 2,
                  marginTop: spacing.height,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={!loader ? uploadImg : null}
              style={{width: '15%', opacity: loader ? 0.5 : 1}}>
              <Ionicons
                name="md-add-circle-sharp"
                size={spacing.width * 11}
                style={{
                  color: colors.mainByColor,
                  marginLeft: spacing.width * 2,
                  marginTop: spacing.height * 1.5,
                }}
              />
            </TouchableOpacity>
          )}
        </StyledInputView>
        <ImagePreview
          show={show !== ''}
          images={[{url: show}]}
          setShowFalse={() => setShow('')}
        />
      </ShadowWrapperContainer>
    </StyledSafeAreaView>
  );
};
export default React.memo(GlobalChat);
