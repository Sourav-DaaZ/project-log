import React, { useContext } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { StyledInputElement, StyledInputView, StyledTitle, StyledError, StyledPicker, StyledSwitch, StyledSearchbar } from './style';
import { ThemeContext } from 'styled-components';
import { View } from 'react-native';

const Input = (props) => {
  const [dot, setDot] = React.useState(true);
  const themeContext = useContext(ThemeContext);
  const colors = themeContext.colors[themeContext.baseColor];
  const fonts = themeContext.fonts;
  const fontWeight = themeContext.fontWeight;

  let inputElement = null;

  switch (props.ele) {
    case 'input':
      inputElement = (
        <View style={props.styleContainer}>
          <StyledTitle>{props.title}</StyledTitle>
          <StyledInputView
            style={props.styleView}>
            {props.icons ? props.icons[0] : null}
            <StyledInputElement
              icons={props.icons}
              placeholder={props.placeholder}
              style={props.style}
              autoFocus={props.autoFocus}
              multiline={props.multiline ? props.multiline : false}
              numberOfLines={props.multiline ? 3 : 1}
              placeholderTextColor={colors.textLight}
              keyboardType={props.keyNum ? "numeric" : null}
              onChangeText={(val) => props.onInputChange(val, props.type)}
              value={props.value}
              onBlur={() => props.onBlur ? props.onBlur(props.type) : null}
              onSubmitEditing={() => props.onSubmit()}
              autoCapitalize="none"
              onFocus={props.onFocus}
              maxLength={props.maxLength ? props.maxLength : 150}
              editable={props.editable !== undefined ? props.editable : true}
            />
            {props.isValid ? (props.icons ? props.icons[1] : null) : null}
          </StyledInputView>
          {props.errorMsg !== '' ? <StyledError>{props.errorMsg}</StyledError> : null}
        </View>
      );
      break;
    case 'password':
      inputElement = (
        <View style={props.styleContainer}>
          <StyledTitle>{props.title}</StyledTitle>
          <StyledInputView
            style={props.styleView}>
            {props.icons ? props.icons[0] : null}
            <StyledInputElement
              icons={props.icons}
              placeholder={props.placeholder}
              style={props.inputStyle}
              placeholderTextColor={colors.textLight}
              onChangeText={(val) => props.onInputChange(val, props.type)}
              value={props.value}
              maxLength={props.maxLength ? props.maxLength : 150}
              autoFocus={props.autoFocus}
              onSubmitEditing={() => props.onSubmit()}
              autoCapitalize="none"
              secureTextEntry={dot}
              keyboardType={props.keyNum ? "numeric" : null}
            />
            <Feather
              name={dot ? 'eye-off' : 'eye'}
              color="gray"
              size={20}
              onPress={() => setDot(!dot)}
            />
          </StyledInputView>
          {props.errorMsg !== '' ? <StyledError>{props.errorMsg}</StyledError> : null}
        </View>
      );
      break;
    case 'select':
      inputElement = (
        <View style={props.styleContainer}>
          <StyledTitle>{props.title}</StyledTitle>
          <StyledPicker
            value={props.value}
            open={props.open}
            items={props.items}
            multiple={props.multiple}
            zIndex={props.zIndex}
            zIndexInverse={props.zIndexInverse}
            min={props.min}
            max={props.max}
            textStyle={{
              fontFamily: fontWeight.light
            }}
            style={props.style}
            listItemContainerStyle={props.listStyle}
            dropDownContainerStyle={props.containerStyle}
            itemSeparator={true}
            setOpen={props.setOpen}
            setValue={props.setValue}
            setItems={props.setItems}
            placeholder={props.placeholder}
          />
        </View>)
      break;
    case 'switch':
      inputElement = (
        <StyledSwitch color={props.color} value={props.value} onValueChange={props.onChange} />
      )
      break;
    case 'search':
      inputElement = (
        <StyledSearchbar
          ref={props.ref}
          theme={props.theme}
          style={props.style}
          inputStyle={{ fontSize: fonts.medium, fontFamily: fontWeight.light }}
          icon={props.icon}
          value={props.value}
          onChangeText={props.onChange}
          placeholder={props.placeholder}
          isFocused={props.isFocused}
          onFocus={props.onFocus}
          autoFocus={props.focus}
          disabled
          editable={props.editable !== undefined ? props.editable : true}
        />
      )
  }
  return inputElement;
};

export default Input;