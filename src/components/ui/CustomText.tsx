// components/AppText.jsx
import React from 'react';
import { Text as RNText } from 'react-native';

const AppText = ({ className = '', ...props }) => {
  return (
    <RNText 
      className={`font-inter ${className}`}
      {...props}
    />
  );
};

export default AppText;