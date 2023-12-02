import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import {ThemeContext} from 'styled-components';
import Banner from '../../sharedComponents/banner';
import {
  SplashOuterView,
  StyledBannerWrapper,
  SplashTitle,
  SplashDescription,
  SplashButton,
  SplashInnerView,
} from './style';
import {data, titleData} from './data';

const TipsScreen = props => {
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const [key, setKey] = React.useState(1);

  return (
    <SplashOuterView>
      <SplashInnerView>
        <StatusBar
          backgroundColor={colors.backgroundDeepColor}
          barStyle="dark-content"
        />
        {key && data[key]?.length > 0 ? (
          <React.Fragment>
            <SplashTitle>{titleData[key].title}</SplashTitle>
            <SplashDescription>{titleData[key].subTitle}</SplashDescription>
            <StyledBannerWrapper>
              {key % 2 ? <Banner data={data[key]} keys="home" /> : null}
              {!(key % 2) ? <Banner data={data[key]} keys="home" /> : null}
            </StyledBannerWrapper>
          </React.Fragment>
        ) : null}
        <SplashButton
          labelStyle={{color: colors.backgroundColor}}
          mode="contained"
          circular
          onPress={() =>
            data[key + 1]?.length > 0
              ? setKey(key + 1)
              : props.navigation.goBack()
          }>
          {data[key + 1]?.length > 0 ? 'Next' : 'Close'}
        </SplashButton>
      </SplashInnerView>
    </SplashOuterView>
  );
};

export default TipsScreen;
