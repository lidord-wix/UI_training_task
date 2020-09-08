import React, {useState, useEffect} from 'react';
import {ImageSourcePropType, Animated, Text} from 'react-native';

export type BadgePropTypes = {
  /**
   * badge's size - small, medium or large
   */
  size?: String;
  /**
   * badge's background color
   */
  backgroundColor?: String;
  /**
   * badge's icon source
   */
  source?: ImageSourcePropType;
  /**
   * badge's text
   */
  text?: String;
};

function Badge(props: BadgePropTypes) {
  const [startValue] = useState(new Animated.Value(0.5));
  const [endValue] = useState(1);

  useEffect(() => {
    Animated.spring(startValue, {
      toValue: endValue,
      friction: 1,
      useNativeDriver: true,
    }).start();
  });

  const {backgroundColor = 'red', source, text, size = 'medium'} = props;

  const renderText = () => {
    return (
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          color: 'white',
          fontWeight: '800',
          fontSize: getSize() - 4,
        }}>
        {' ' + text}
      </Text>
    );
  };

  const getSize = () => {
    switch (size) {
      case 'small':
        return 15;
      case 'large':
        return 21;
      default:
        return 18;
    }
  };

  if (source) {
    return (
      <Animated.Image
        alignSelf={'center'}
        borderRadius={10}
        style={{
          width: getSize(),
          height: getSize(),
          transform: [
            {
              scale: startValue,
            },
          ],
        }}
        top={-26}
        source={{uri: source}}
        right={-36}
      />
    );
  } else if (text) {
    return (
      <Animated.View
        alignSelf={'center'}
        borderRadius={10}
        width={(text.length + 1) * 0.5 * getSize()}
        height={getSize()}
        style={{
          transform: [
            {
              scale: startValue,
            },
          ],
        }}
        backgroundColor={backgroundColor}
        top={-26}
        right={-36}>
        {renderText()}
      </Animated.View>
    );
  }
}

export {Badge};
