import React from 'react';
import {PureComponent} from 'react';
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

class Badge extends PureComponent<BadgePropTypes> {
  static displayName = 'Badge';
  static defaultProps = {
    size: 'medium',
    backgroundColor: 'red',
  };
  styles: any;

  constructor(props: BadgePropTypes) {
    super(props);
    this.state = {
      startValue: new Animated.Value(0.5),
      endValue: 1,
    };
  }

  componentDidMount() {
    Animated.spring(this.state.startValue, {
      toValue: this.state.endValue,
      friction: 1,
      useNativeDriver: true,
    }).start();
  }

  renderText() {
    const {text} = this.props;
    return (
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          color: 'white',
          fontWeight: '800',
          fontSize: this.getSize() - 4,
        }}>
        {' ' + text}
      </Text>
    );
  }

  getSize() {
    const {size} = this.props;
    switch (size) {
      case 'small':
        return 15;
      case 'large':
        return 21;
      default:
        return 18;
    }
  }

  render() {
    const {backgroundColor, source, text} = this.props;

    if (source) {
      return (
        <Animated.Image
          alignSelf={'center'}
          borderRadius={10}
          style={{
            width: this.getSize(),
            height: this.getSize(),
            transform: [
              {
                scale: this.state.startValue,
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
          width={(text.length + 1) * 0.5 * this.getSize()}
          height={this.getSize()}
          style={{
            transform: [
              {
                scale: this.state.startValue,
              },
            ],
          }}
          backgroundColor={backgroundColor}
          top={-26}
          right={-36}>
          {this.renderText()}
        </Animated.View>
      );
    }
  }
}

export {Badge};
