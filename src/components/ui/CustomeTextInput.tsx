// components/AppTextInput.jsx
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const CustomTextInput = ({ 
  className = '', 
  icon, 
  iconColor = '#6B7280', 
  iconSize = 16,
  onIconPress,
  containerClassName = '',
  ...props 
}:any) => {
  return (
    <View className={`border border-neutral-300  flex-row items-center border border-neutral-300 bg-gray-100 rounded-lg ${containerClassName}`}>
      {icon && (
        <TouchableOpacity
          onPress={onIconPress}
          disabled={!onIconPress}
          className="pl-3 pr-2"
        >
          <FontAwesomeIcon 
            icon={icon} 
            color={iconColor} 
            size={iconSize} 
          />
        </TouchableOpacity>
      )}
      <TextInput
        className={`flex-1  text-black p-3 font-inter ${icon ? 'pl-1' : 'pl-3'} ${className}`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;