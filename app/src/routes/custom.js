import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {ThemeContext} from 'styled-components';
import {
  StyledTabView,
  StyledCercularBorder,
  StyledHeaderView,
  StyledEachHeaderView,
  StyledOption,
} from './style';

export const CustomTab = ({state, descriptors, navigation, colors}) => {
  const themeContext = useContext(ThemeContext);
  const spacing = themeContext.spacing;
  return (
    <StyledTabView>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        // const midEle = Math.floor(state.routes.length / 2) !== index;
        // const icon = options.tabBarIcon(isFocused && midEle || !midEle ? colors.backgroundColor : colors.textDeep, (isFocused && midEle) || (!midEle && !isFocused) ? 25 : 30)
        const icon = options.tabBarIcon(
          isFocused ? colors.backgroundColor : colors.mainColor,
          isFocused ? spacing.width * 6 : spacing.width * 7,
        );
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            // style={{minWidth: 50, minHeight: 30}}
            onLongPress={onLongPress}>
            {/* {isFocused && midEle ? <StyledCercularBorder>{icon}</StyledCercularBorder> : !midEle ? <StyledCercularByBorder>{icon}</StyledCercularByBorder> : <StyledOption>{icon}</StyledOption>} */}
            {isFocused ? (
              <StyledCercularBorder>{icon}</StyledCercularBorder>
            ) : (
              <StyledOption>{icon}</StyledOption>
            )}
            {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                            {label}
                        </Text> */}
          </TouchableOpacity>
        );
      })}
    </StyledTabView>
  );
};

export const CustomHeader = props => {
  const themeContext = useContext(ThemeContext);
  const spacing = themeContext.spacing;
  return (
    <StyledHeaderView dark={props.dark ? true : false}>
      <StyledEachHeaderView
        style={{
          justifyContent: 'flex-start',
          width: props.logo ? '20%' : '70%',
        }}>
        {props.navigation ? (
          <TouchableOpacity
            onPress={props.navigation ? props.navigation : null}>
            <View style={{paddingHorizontal: 10, paddingRight: 25}}>
              {props.left}
            </View>
          </TouchableOpacity>
        ) : (
          props.left
        )}
      </StyledEachHeaderView>
      {props.logo ? (
        <StyledEachHeaderView
          style={{marginTop: -(spacing.height * 0.7), width: '60%'}}>
          {props.logo}
        </StyledEachHeaderView>
      ) : null}
      {props.logo || props.right ? (
        <StyledEachHeaderView
          style={{justifyContent: 'flex-end', width: '20%'}}>
          {props.right}
        </StyledEachHeaderView>
      ) : null}
    </StyledHeaderView>
  );
};
