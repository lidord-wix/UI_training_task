import React from 'react';
import {PureComponent} from 'react';
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

class Card extends PureComponent<CardPropTypes> {
  static displayName = 'Card';
  static defaultProps = {
    selected: false,
    shadow: false,
    borderRadius: 0,
    width: 300,
    height: 300,
  };
  styles: any;

  constructor(props: CardPropTypes) {
    super(props);
  }

  renderOverlayIcon() {
    const {selected} = this.props;
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
  }

  render() {
    const {
      width,
      source,
      height,
      borderRadius,
      borderColor,
      borderWidth,
      onPress,
      selected,
      shadow,
    } = this.props;
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
          {selected && this.renderOverlayIcon()}
        </View>
      </TouchableOpacity>
    );
  }
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
