import React from 'react';
import {
  Image,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';

const checkIcon = 'https://image.emojipng.com/733/300733.jpg';

export type CardPropTypes = {
  /**
   * card's width
   */
  width?: number;
  /**
   * card's height
   */
  height?: number;
  /**
   * selected mode
   */
  selected?: boolean;
  /**
   * action for when pressing the card
   */
  onPress?: () => void;
  /**
   * card's border radius
   */
  borderRadius?: number;
  /**
   * card's border color
   */
  borderColor?: String;
  /**
   * card's border width
   */
  borderWidth?: number;
  /**
   * image's source
   */
  source?: ImageSourcePropType;
  /**
   * support shadow style
   */
  shadow?: boolean;
};

function Card(props: CardPropTypes) {
  const {
    width = 200,
    source,
    height = 300,
    borderRadius,
    borderColor,
    borderWidth,
    onPress,
    selected,
    shadow,
  } = props;
  const renderOverlayIcon = () => {
    return selected ? (
      <Image
        source={{uri: checkIcon}}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          top: -6,
          right: -6,
          width: 12,
          height: 12,
        }}
        borderRadius={6}
      />
    ) : undefined;
  };

  return (
    <TouchableOpacity onPress={onPress} style={shadow && styles.shadow}>
      <View>
        <Image
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          borderColor={borderColor}
          style={selected && styles.selected}
          source={{uri: source}}
          width={width}
          height={height}
        />
        {selected && renderOverlayIcon()}
      </View>
    </TouchableOpacity>
  );
}

export {Card};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#3e5363',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {height: 25, width: 25},
  },
  selected: {
    borderColor: 'blue',
    borderWidth: 2,
  },
});
