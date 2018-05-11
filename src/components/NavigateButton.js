import React from 'react';
import { Button } from 'react-native';

const RightBarButton = (title, onPress) => {
  return (
    <Button
      title={title}
      onPress={onPress} />
  )
}

const NavigateButton = (navigation, screen, props) => {
  const { navigate } = navigation;
  const onPress = () => {navigate(screen, props)}
  return RightBarButton('...', onPress)
}

export default NavigateButton;
